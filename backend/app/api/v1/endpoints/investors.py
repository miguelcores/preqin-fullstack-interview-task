from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crud.investor import get_investors, get_investor
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

@router.get("/{investor_id}", response_model=Investor)
def read_investor(investor_id: int, db: Session = Depends(get_db)):
    investor = get_investor(db, investor_id=investor_id)
    if investor is None:
        raise HTTPException(status_code=404, detail="Investor not found")
    return investor