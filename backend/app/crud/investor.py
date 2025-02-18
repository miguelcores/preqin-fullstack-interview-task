from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.investor import Investor
from app.models.commitment import Commitment


def get_investors(db: Session, skip: int = 0, limit: int = 100):
    investors = db.query(Investor).offset(skip).limit(limit).all()
    for investor in investors:
        # Calculate total commitment for each investor
        total_commitment = db.query(func.sum(Commitment.amount)).filter(Commitment.investor_id == investor.id).scalar() or 0
        investor.total_commitment = total_commitment
    return investors