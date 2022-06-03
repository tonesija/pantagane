from typing import Optional
from pydantic import BaseModel
from db.device import Device


class DeviceBase(BaseModel):
    device_id: str
    max_capacity: int
    max_interval: int
    desc: str
    counter: int

    class Config:
        orm_mode = True


class DeviceIn(DeviceBase):
    counter: Optional[int]


class DeviceOut(DeviceBase):
    id: int


class DeviceUpdate(BaseModel):
    max_capacity: Optional[int]
    desc: Optional[str]
    counter: Optional[int]
    max_interval: Optional[int]
