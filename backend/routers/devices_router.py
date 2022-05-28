from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from db.device import Device
from models.devices import DeviceIn, DeviceOut
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/devices", tags=["devices"])


@router.get("/{user_id}", response_model=List[DeviceOut])
def list_devices(user_id: int, db: Session = Depends(get_db)):
    """Gets all devices that belong to a user.

    Args:
        user_id (int): id of the user.

    Returns:
        (List[DeviceOut])
    """

    return db.query(Device).filter(Device.user_id == user_id).all()


@router.post("", response_model=DeviceOut)
def register_device(device: DeviceIn, db: Session = Depends(get_db)):
    """Registers and creates a devices belonging to a user.

    Args:
        device (DeviceIn): api payload for registering a device.

    Raises:
        HTTPException: 409 if registering was unsuccessful.

    Returns:
        (DeviceOut)
    """

    try:
        device_db = Device(**device.dict())
        db.add(device_db)
        db.refresh(device_db)
        db.commit()
        return device_db
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Error registering device."
        )
