from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crud.investor import get_investors
from app.schemas.investor import Investor

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[Investor])
def read_investors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    investors = get_investors(db, skip=skip, limit=limit)
    return investors