import csv
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.models.investor import Investor
from app.models.commitment import Commitment
import os

def load_data(db: Session):

    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)

    file_path = os.path.join(os.path.dirname(__file__), 'data.csv')
    
    with open(file_path, mode="r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Create or get investor
            investor = db.query(Investor).filter(Investor.name == row["Investor Name"]).first()
            if not investor:
                investor = Investor(
                    name=row["Investor Name"],
                    investor_type=row["Investory Type"],
                    country=row["Investor Country"],
                    date_added=datetime.strptime(row["Investor Date Added"], "%Y-%m-%d").date(),
                    last_updated=datetime.strptime(row["Investor Last Updated"], "%Y-%m-%d").date()
                )
                db.add(investor)
                db.commit()
                db.refresh(investor)

            # Create commitment
            commitment = Commitment(
                investor_id=investor.id,
                asset_class=row["Commitment Asset Class"],
                amount=float(row["Commitment Amount"]),
                currency=row["Commitment Currency"]
            )
            db.add(commitment)
        db.commit()

if __name__ == "__main__":
    db = SessionLocal()
    load_data(db)