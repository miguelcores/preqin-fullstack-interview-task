from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crud.commitment import get_commitments
from app.schemas.commitment import Commitment

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{investor_id}", response_model=list[Commitment])
def read_commitments(investor_id: int, asset_class: str = None, db: Session = Depends(get_db)):
    commitments = get_commitments(db, investor_id=investor_id, asset_class=asset_class)
    if not commitments:
        raise HTTPException(status_code=404, detail="No commitments found")
    return commitments