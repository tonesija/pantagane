from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from db.reading import Reading
from models.readings import ReadingOut


router = APIRouter(prefix="/readings", tags=["readings"])


@router.get("/{device_id}", response_model=List[ReadingOut])
def list_readings(device_id: str, db: Session = Depends(get_db)):
    """Gets all readings that belong to a device.

    Args:
        device_id (int): id of the device.

    Returns:
        (List[ReadingsOut])
    """

    return db.query(Reading).filter(Reading.device_id == device_id).all()
