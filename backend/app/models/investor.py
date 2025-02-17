from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class Investor(Base):
    __tablename__ = "investors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    investor_type = Column(String)
    country = Column(String)
    date_added = Column(Date)  
    last_updated = Column(Date)  