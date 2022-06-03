from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from db.user import User
from sqlalchemy.exc import IntegrityError
from auth.auth_middleware import (
    authenticate_user,
    create_access_token,
    get_password_hash,
    Token,
)

from models.users import UserIn, UserOut

ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=UserOut)
def create_user(user: UserIn, db: Session = Depends(get_db)):
    """Creates a user.

    Args:
        user (UserIn): api payload for creating a user.

    Raises:
        HTTPException: 409 if the user already exists.

    Returns:
        (UserOut)
    """

    try:
        user_db = User(**user.dict())
        user_db.password = get_password_hash(user_db.password)
        db.add(user_db)
        db.commit()
        return user_db
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="User already exists."
        )


@router.post("/login", response_model=Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    """Authentificates a user.

    Args:
        form_data: user credentials

    Raises:
        HTTPException: 401 if the credentials are wrong

    Returns:
        cookie with set auth token
    """

    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized."
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    # return {"access_token": access_token, "token_type": "bearer"}
    token = jsonable_encoder(access_token)
    content = {
        "message": "You've successfully logged in. Welcome back!",
        "username": user.username,
    }
    response = JSONResponse(content=content)
    response.set_cookie(
        "Authorization",
        value=f"Bearer {token}",
        httponly=True,
        max_age=1800,
        expires=1800,
        samesite="None",
        secure=True,
    )

    return response
