from typing import List, Dict
from datetime import datetime
from app.models.workout import Workout
from app.models.capacity_profile import CapacityProfile
import numpy as np

class CapacityAnalyzer:
    @staticmethod
    def analyze(workouts: List[Workout]) -> CapacityProfile:
        if not workouts:
            return CapacityProfile(
                endurance=0, stamina=0, strength=0, flexibility=0,
                power=0, speed=0, coordination=0, agility=0, balance=0, accuracy=0
            )

        # Sort workouts by date (descending)
        sorted_workouts = sorted(workouts, key=lambda x: x.date, reverse=True)
        
        # Calculate recency weights
        # Simple implementation: latest workout has weight 1.0, oldest has 0.5
        # Or more simply, just aggregate for now and add weight logic
        
        scores = {
            "endurance": 0.0, "stamina": 0.0, "strength": 0.0, "flexibility": 0.0,
            "power": 0.0, "speed": 0.0, "coordination": 0.0, "agility": 0.0, 
            "balance": 0.0, "accuracy": 0.0
        }
        
        mapping = {
            "CaReEndurance": "endurance",
            "Stamina": "stamina",
            "Strength": "strength",
            "Flexibility": "flexibility",
            "Power": "power",
            "Speed": "speed",
            "Coordination": "coordination",
            "Agility": "agility",
            "Balance": "balance",
            "Accuracy": "accuracy"
        }

        # For capacity in capacities: total_capacity_score += workout_capacity_value * recency_weight
        # We'll use a time-decay weight
        max_date = sorted_workouts[0].date
        min_date = sorted_workouts[-1].date
        total_days = (max_date - min_date).days if max_date != min_date else 1

        for workout in workouts:
            # weight = 1.0 - (days_ago / total_days) * 0.5  (ranges from 0.5 to 1.0)
            days_ago = (max_date - workout.date).days
            weight = 1.0 - (days_ago / (total_days + 1)) * 0.5
            
            for attr, score_key in mapping.items():
                val = getattr(workout, attr)
                scores[score_key] += val * weight

        # Normalize scores between 0 and 1
        # We'll find the max possible score (count of workouts) and divide by it, 
        # or just normalize relative to the maximum score in the set.
        # Let's normalize relative to the maximum possible if they all were 1.
        
        from app.utils.normalization import normalize_scores
        
        total_weight = sum(1.0 - ((max_date - w.date).days / (total_days + 1)) * 0.5 for w in workouts)
        
        normalized_scores = normalize_scores(scores, total_weight)

        return CapacityProfile(**normalized_scores)
