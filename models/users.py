from typing import List
from pydantic import BaseModel
from models.devices import DeviceOut


class UserBase(BaseModel):
    username: str

    class Config:
        orm_mode = True


class UserIn(UserBase):
    password: str



class UserOut(UserBase):
    id: int
    devices: List[DeviceOut] = []
