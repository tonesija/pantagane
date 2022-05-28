from fastapi import FastAPI

from database import Base, engine


# Create database
Base.metadata.create_all(bind=engine)


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
