from fastapi import FastAPI
from starlette.responses import RedirectResponse

from database import Base, engine
from iot_platform.mqtt_client import mqtt_subscribe_sensor
from routers import readings_router, devices_router, users_router

from helpers.iot_platform_handlers import base_handler

# Create database
Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(readings_router.router)
app.include_router(devices_router.router)
app.include_router(users_router.router)


@app.on_event("startup")
def init():
    mqtt_subscribe_sensor(base_handler)


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")
