from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class Commitment(Base):
    __tablename__ = "commitments"

    id = Column(Integer, primary_key=True, index=True)
    investor_id = Column(Integer, ForeignKey("investors.id"))
    asset_class = Column(String)
    amount = Column(Float)
    currency = Column(String)