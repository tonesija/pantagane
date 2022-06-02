from datetime import datetime
from pydantic import BaseModel


class ReadingBase(BaseModel):
    ammount: int
    device_id: str

    class Config:
        orm_mode = True


class ReadingIn(ReadingBase):
    pass


class ReadingOut(ReadingBase):
    id: int
    created_at: datetime
