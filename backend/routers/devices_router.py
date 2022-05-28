from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from db.device import Device
from db.user import User
from models.devices import DeviceIn, DeviceOut
from sqlalchemy.exc import IntegrityError, NoResultFound

router = APIRouter(prefix="/devices", tags=["devices"])


@router.get("/{username}", response_model=List[DeviceOut])
def list_devices(username: str, db: Session = Depends(get_db)):
    """Gets all devices that belong to a user.

    Args:
        username (str): username of the user.

    Returns:
        (List[DeviceOut])
    """

    try:
        user = db.query(User).filter(User.username == username).one()
        return db.query(Device).filter(Device.user_id == user.id).all()
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist."
        )


@router.post("/{username}", response_model=DeviceOut)
def register_device(username: str, device: DeviceIn, db: Session = Depends(get_db)):
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
        user = db.query(User).filter(User.username == username).one()
        device_db = Device(**device.dict())
        user.devices.append(device_db)
        db.commit()
        return device_db
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Error registering device."
        )
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exist."
        )
