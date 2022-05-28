from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from db.device import Device
from models.devices import DeviceIn, DeviceOut
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/users", tags=["users"])
