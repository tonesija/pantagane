from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import and_
from sqlalchemy.orm import Session
from db.reading import Reading
from database import get_db
from db.device import Device
from db.user import User
from auth.auth_middleware import get_current_user
from iot_platform.mqtt_client import (
    mqtt_publish_actuate_max_capacity,
    mqtt_publish_actuate_max_interval,
    mqtt_publish_actuate_set_counter,
)
from models.devices import DeviceIn, DeviceOut, DeviceUpdate
from sqlalchemy.exc import IntegrityError, NoResultFound

router = APIRouter(prefix="/devices", tags=["devices"])


@router.get("/", response_model=List[DeviceOut])
def list_devices(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Gets all devices that belong to the current user.

    Args:
        username (str): username of the user.

    Returns:
        (List[DeviceOutWithCounter])
    """

    devices = db.query(Device).filter(Device.user_id == current_user.id).all()

    return devices


@router.post("/", response_model=DeviceOut)
def register_device(
    device: DeviceIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Registers and creates a devices belonging to a user.

    Args:
        device (DeviceIn): api payload for registering a device.
        username (str): username of the user

    Raises:
        HTTPException: 409 if registering was unsuccessful.

    Returns:
        (DeviceOut)
    """

    try:
        user = db.query(User).filter(User.username == current_user.username).one()
        device_db = Device(**device.dict())
        user.devices.append(device_db)
        db.commit()

        mqtt_publish_actuate_max_capacity(device.max_capacity, device_db.device_id)
        mqtt_publish_actuate_max_interval(device.max_interval, device_db.device_id)
        mqtt_publish_actuate_set_counter(0, device_db.device_id)
        return device_db
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Error registering device."
        )
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist."
        )


@router.put("/{device_id}", response_model=DeviceOut)
def update_device(
    device_id: str,
    device: DeviceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Updates a device.

    Args:
        device_id (str): aka thing name.
        device (DeviceUpdate): update payload.

    Raises:
        HTTPException: 404 if the device does not exist.

    Returns:
        (DeviceOut)
    """

    try:
        device_query = db.query(Device).filter(Device.device_id == device_id)
        if device_query.one().user.username != current_user.username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Unauthorized to change device with device_id: {device_id}.",
            )

        update_dict = device.dict(exclude_none=True, exclude_unset=True)

        device_query.update(update_dict)
        device_model = device_query.one()

        db.commit()

        # Send mqtt actuation messages about changes.
        if device.max_capacity is not None:
            mqtt_publish_actuate_max_capacity(device.max_capacity, device_id)
        if device.max_interval is not None:
            mqtt_publish_actuate_max_interval(device.max_interval, device_id)
        if device.counter is not None:
            mqtt_publish_actuate_set_counter(device.counter, device_id)

    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Device with device_id: {device_id} not found.",
        )

    return device_model


@router.delete("/{device_id}", response_model=DeviceOut)
def delete_device(
    device_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Deletes a device.

    Args:
        device_id (str): aka thing name.

    Raises:
        HTTPException: 404 if the device does not exist.)
    """

    try:
        device_query = db.query(Device).filter(Device.device_id == device_id)
        if device_query.one().user.username != current_user.username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Unauthorized to change device with device_id: {device_id}.",
            )

        device_query.delete()

        db.commit()
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Device with device_id: {device_id} not found.",
        )
