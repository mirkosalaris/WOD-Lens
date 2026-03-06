from pydantic import BaseModel
from typing import Dict

class CapacityProfile(BaseModel):
    endurance: float
    stamina: float
    strength: float
    flexibility: float
    power: float
    speed: float
    coordination: float
    agility: float
    balance: float
    accuracy: float
