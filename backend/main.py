from fastapi import FastAPI

from database import Base, engine
from iot_platform.mqtt_client import (
    mqtt_subscribe_device_connect,
    mqtt_subscribe_sensor,
)
from routers import readings_router, devices_router, users_router
from fastapi.middleware.cors import CORSMiddleware

from iot_platform.iot_platform_handlers import base_handler, base_handler_connect

from fastapi.staticfiles import StaticFiles

# Create database
Base.metadata.create_all(bind=engine)


app = FastAPI()

# Allow CORS for now
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pantagane-web-app.herokuapp.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["set-cookie"],
)

app.include_router(readings_router.router)
app.include_router(devices_router.router)
app.include_router(users_router.router)


@app.on_event("startup")
def init():
    mqtt_subscribe_sensor(base_handler)
    mqtt_subscribe_device_connect(base_handler_connect)


# Serve SPA
app.mount("/", StaticFiles(directory="public", html=True))
