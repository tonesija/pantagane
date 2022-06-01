import asyncio
import time
from fastapi import FastAPI
from starlette.responses import RedirectResponse
import uvicorn
from constants import SUB_TOPIC

from database import Base, engine
from iot_platform.mqtt_client import mqtt_client, mqtt_subscrube_sensor
from routers import readings_router, devices_router, users_router

# Create database
Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(readings_router.router)
app.include_router(devices_router.router)
app.include_router(users_router.router)


def customCallback(client, userdata, message):
    print("Received a new message: ")
    print(message.payload)
    print("from topic: ")
    print(message.topic)
    print("--------------\n\n")


@app.on_event("startup")
def init():
    mqtt_subscrube_sensor(customCallback)


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")


def main():
    mqtt_subscrube_sensor(customCallback)
    uvicorn.run("main:app", loop="asyncio")


if __name__ == "__main__":
    main()
