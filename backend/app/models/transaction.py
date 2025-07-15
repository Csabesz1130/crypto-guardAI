from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.sql import func

from ..database.database import Base

class Transaction(Base):
    __tablename__ = 'Transaction'

    id = Column(String, primary_key=True, index=True)
    hash = Column(String, unique=True, index=True, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, nullable=False)
    riskLevel = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    from_addr = Column(String, nullable=False)
    to_addr = Column(String, nullable=False)
    status = Column(String, nullable=False)
    createdAt = Column(DateTime, server_default=func.now())