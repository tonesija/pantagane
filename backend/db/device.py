from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class Device(Base):

    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, unique=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="devices")

    readings = relationship("Reading", back_populates="device")
