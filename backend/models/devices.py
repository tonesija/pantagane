from typing import List
from pydantic import BaseModel
from models.readings import ReadingOut


class DeviceBase(BaseModel):
    device_id: str

    class Config:
        orm_mode = True


class DeviceIn(DeviceBase):
    pass


class DeviceOut(DeviceBase):
    id: int
    readings: List[ReadingOut] = []
