from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from db.device import Device
from db.user import User
from models.devices import DeviceIn, DeviceOut
from sqlalchemy.exc import IntegrityError

from models.users import UserIn, UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=UserOut)
def create_user(user: UserIn, db: Session = Depends(get_db)):
    """Creates a user.

    Args:
        user (UserIn): api payload for creating a user.

    Raises:
        HTTPException: 409 if the user already exists.

    Returns:
        (UserOut)
    """

    try:
        user_db = User(**user.dict())
        db.add(user_db)
        db.commit()
        return user_db
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User already exists."
        )
