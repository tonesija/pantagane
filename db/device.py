from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class Device(Base):

    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, unique=True)
    max_capacity = Column(Integer)
    max_interval = Column(Integer)
    desc = Column(String)
    counter = Column(Integer, default=0)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="devices")

    readings = relationship("Reading", back_populates="device")
