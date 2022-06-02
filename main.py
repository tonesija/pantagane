from fastapi import FastAPI

from database import Base, engine
from iot_platform.mqtt_client import mqtt_subscribe_sensor
from routers import readings_router, devices_router, users_router

from iot_platform.iot_platform_handlers import base_handler

from fastapi.staticfiles import StaticFiles

# Create database
Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(readings_router.router)
app.include_router(devices_router.router)
app.include_router(users_router.router)


@app.on_event("startup")
def init():
    mqtt_subscribe_sensor(base_handler)


# Serve SPA
app.mount("/", StaticFiles(directory="public", html=True))

# if __name__ == "__main__":
#     uvicorn.run(
#         "main:app",
#         host=Settings().http_url,
#         reload=Settings().debug_mode,
#         port=Settings().port,
#     )
