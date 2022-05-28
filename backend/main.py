from fastapi import FastAPI
from starlette.responses import RedirectResponse

from database import Base, engine
from routers import readings_router, devices_router, users_router

# Create database
Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(readings_router.router)
app.include_router(devices_router.router)
app.include_router(users_router.router)


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")
