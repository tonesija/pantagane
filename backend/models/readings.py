

from datetime import datetime
from pydantic import BaseModel


class ReadingBase(BaseModel):
    ammount: int

class ReadingIn(ReadingBase):
    pass

class ReadingOut(ReadingBase):
    id: int
    created_at: datetime