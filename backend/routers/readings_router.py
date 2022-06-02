from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from db.reading import Reading
from models.readings import ReadingOut
from db.user import User
from auth.auth_middleware import get_current_user


router = APIRouter(prefix="/readings", tags=["readings"])


@router.get("/{device_id}", response_model=List[ReadingOut])
def list_readings(
    device_id: str,
    start_time: datetime = Query(
        default=datetime(1900, 1, 1), example="2022-06-01T21:59:04.461Z"
    ),
    end_time: datetime = Query(
        default=datetime.now(), example="2022-06-01T21:59:04.461Z"
    ),
    page: int = 0,
    page_size: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Gets all readings that belong to a device.

    Args:
        device_id (int): id of the device.

    Returns:
        (List[ReadingsOut])
    """
    print(start_time)

    return (
        db.query(Reading)
        .filter(Reading.device_id == device_id)
        .filter(Reading.created_at.between(start_time, end_time))
        .limit(page_size)
        .offset(page_size * page)
        .all()
    )
