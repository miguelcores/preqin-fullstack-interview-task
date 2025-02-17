from fastapi import FastAPI
from app.api.v1.endpoints import investors, commitments
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

# Create tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(investors.router, prefix="/api/v1/investors", tags=["investors"])
app.include_router(commitments.router, prefix="/api/v1/commitments", tags=["commitments"])