from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.sql import func


class Reading(Base):

    __tablename__ = "readings"

    id = Column(Integer, primary_key=True, index=True)
    ammount = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    device_id = Column(String, ForeignKey("devices.device_id"))
    device = relationship("Device", back_populates="readings")
