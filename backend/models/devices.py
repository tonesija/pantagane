from typing import List, Optional
from pydantic import BaseModel
from db.device import Device
from db.reading import Reading
from models.readings import ReadingOut


class DeviceBase(BaseModel):
    device_id: str
    max_capacity: int
    max_interval: int
    desc: str

    class Config:
        orm_mode = True


class DeviceIn(DeviceBase):
    pass


class DeviceOut(DeviceBase):
    id: int


class DeviceOutWithCounter(DeviceOut):
    counter: int

    @classmethod
    def from_orm(cls, device: Device, counter):
        to_return = cls(**device.__dict__, counter=counter)
        return to_return


class DeviceUpdate(BaseModel):
    max_capacity: Optional[int]
    desc: Optional[str]
    counter: Optional[int]
    max_interval: Optional[int]
