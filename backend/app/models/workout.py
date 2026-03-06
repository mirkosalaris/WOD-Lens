from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Workout(BaseModel):
    date: datetime
    wod: str
    score: str
    CaReEndurance: float = 0
    Stamina: float = 0
    Strength: float = 0
    Flexibility: float = 0
    Power: float = 0
    Speed: float = 0
    Coordination: float = 0
    Agility: float = 0
    Balance: float = 0
    Accuracy: float = 0
