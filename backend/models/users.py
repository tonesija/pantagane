

from typing import List
from pydantic import BaseModel
from models.devices import DeviceOut


class UserBase(BaseModel):
    username: str

class UserIn(UserBase):
    pass

class UserOut(UserBase):
    id: int
    devices: List[DeviceOut] = []