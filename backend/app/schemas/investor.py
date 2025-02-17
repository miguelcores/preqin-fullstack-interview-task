from pydantic import BaseModel
from datetime import date

class InvestorBase(BaseModel):
    name: str
    investor_type: str
    country: str
    date_added: date 
    last_updated: date 

class InvestorCreate(InvestorBase):
    pass

class Investor(InvestorBase):
    id: int
    total_commitment: float  # Computed field for total commitment

    class Config:
        orm_mode = True