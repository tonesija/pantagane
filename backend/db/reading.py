from sqlalchemy import Column, DateTime, Integer
from database import Base
from sqlalchemy.sql import func

class Reading(Base):

    __tablename__ = "Readings"

    id = Column(Integer, primary_key=True, index=True)
    ammount = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
