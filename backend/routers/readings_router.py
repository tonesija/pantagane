from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from db.reading import Reading
from models.readings import ReadingOut
from db.user import User
from db.device import Device
from auth.auth_middleware import get_current_user
from sqlalchemy.exc import IntegrityError, NoResultFound


router = APIRouter(prefix="/readings", tags=["readings"])


@router.get("/{device_id}", response_model=List[ReadingOut])
def list_readings(
    device_id: str,
    start_time: datetime = Query(
        default=datetime(1900, 1, 1), example="2022-06-01T21:59:04.461Z"
    ),
    end_time: datetime = Query(
        default=datetime(2100, 1, 1), example="2022-06-01T21:59:04.461Z"
    ),
    page: int = 0,
    page_size: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Gets all readings that belong to a device.

    Args:
        device_id (int): id of the device.

    Returns:
        (List[ReadingsOut])
    """

    try:
        device_query = db.query(Device).filter(Device.device_id == device_id)
        device_query.one()
        if device_query.one().user.username != current_user.username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unauthorized to see readings from devices that belong to other users!",
            )

        return (
            db.query(Reading)
            .filter(Reading.device_id == device_id)
            .filter(Reading.created_at.between(start_time, end_time))
            .order_by(Reading.created_at.desc())
            .limit(page_size)
            .offset(page_size * page)
            .all()
        )
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Device with device_id: {device_id} does not exist.",
        )
