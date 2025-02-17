from pydantic import BaseModel

class CommitmentBase(BaseModel):
    investor_id: int
    asset_class: str
    amount: float
    currency: str

class CommitmentCreate(CommitmentBase):
    pass

class Commitment(CommitmentBase):
    id: int

    class Config:
        orm_mode = True