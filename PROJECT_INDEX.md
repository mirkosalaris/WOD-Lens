# Project Index: WOD Lens

## Core Directories
- `backend/app/api/`: REST API route definitions (Upload, Analysis, AI).
- `backend/app/models/`: Pydantic data models (Workout, CapacityProfile).
- `backend/app/services/`: Business logic (Excel parsing, normalization, AI generation).
- `backend/app/utils/`: Shared utilities (Normalization logic).
- `frontend/src/api/`: Frontend API client and communication logic.
- `frontend/src/components/`: Reusable React components and UI logic.
- `frontend/src/pages/`: Page-level components.
- `frontend/src/types/`: TypeScript interface definitions.
- `data/`: Storage for sample datasets and processed results.

## Key Files & Entry Points
- `backend/app/main.py`: FastAPI application initialization and middleware.
- `backend/app/config.py`: Environment and configuration management.
- `frontend/src/main.tsx`: React application entry point.
- `frontend/src/App.tsx`: Main application routing and layout.
- `GEMINI.md`: Project-specific mandates and environment rules.

## Data Schema
- **Workout**: Core entity representing a single session with 10 physical skills (CaReEndurance, Stamina, Strength, Flexibility, Power, Speed, Coordination, Agility, Balance, Accuracy).
- **CapacityProfile**: Aggregated and normalized athlete state across the 10 skills.
