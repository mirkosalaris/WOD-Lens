from typing import Dict

def normalize_scores(scores: Dict[str, float], total_weight: float) -> Dict[str, float]:
    """
    Normalizes scores between 0 and 1 based on the sum of recency weights.
    """
    if total_weight == 0:
        return {k: 0.0 for k in scores}
    
    return {k: min(v / total_weight, 1.0) for k, v in scores.items()}
