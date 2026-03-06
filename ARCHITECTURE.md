# System Architecture

## Overview
WOD Lens is a decoupled full-stack application for CrossFit performance analysis, designed to transform workout logs into actionable athlete profiles.

## Backend (FastAPI)
- **Framework**: FastAPI for high-performance asynchronous API handling.
- **Service-Oriented Architecture**: Logic is partitioned into specialized services:
    - `ExcelLoader`: Handles ingestion and parsing of multi-format workout logs.
    - `CapacityAnalyzer`: Computes time-weighted skill scores using a decay function.
    - `AIInsightsService`: Interfaces with LLMs to provide qualitative coaching feedback.
- **Data Modeling**: Strict validation via Pydantic models ensures data integrity from ingestion to analysis.

## Frontend (React + Vite)
- **Stack**: React 18, TypeScript, TailwindCSS, and Recharts.
- **State Management**: Local component state for UI transitions; Axios for server communication.
- **Visualization**: Radar charts for holistic skill overview and individual cards for AI insights.

## Design Patterns & Core Logic
- **Time-Decay Weighted Average**: The `CapacityAnalyzer` prioritizes recent performance by applying a linear weight based on the age of the workout relative to the dataset range.
- **Normalization Utility**: Centralized logic in `app/utils/normalization.py` ensures all scores are scaled [0.0 - 1.0] relative to total dataset weight.
- **Volatile Storage**: Currently uses in-memory global state for the prototype phase (see `routes_upload.py`).

## Deployment & Environment
- **Conda**: Managed via the `WODLens` environment.
- **Configuration**: Environment-based settings managed by Pydantic-Settings.
