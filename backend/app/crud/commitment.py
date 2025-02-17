from sqlalchemy.orm import Session
from app.models.commitment import Commitment

def get_commitments(db: Session, investor_id: int, asset_class: str = None):
    query = db.query(Commitment).filter(Commitment.investor_id == investor_id)
    if asset_class:
        query = query.filter(Commitment.asset_class == asset_class)
    return query.all()
    