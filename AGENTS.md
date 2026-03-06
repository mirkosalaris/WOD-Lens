# Agent Guidelines

## Context Bootstrapping
> **CRITICAL**: Before performing any repository-wide scans, deep investigations, or architectural changes, you MUST read `ARCHITECTURE.md` and `PROJECT_INDEX.md` to establish an accurate mental map of the system.

## Project Purpose
WOD Lens provides a mobile-first experience for CrossFit athletes to visualize their 10 General Physical Skills.

## Dataset Format
Columns:
- `date`: workout date
- `wod`: name/description
- `score`: result
- `Skills`: CaReEndurance, Stamina, Strength, Flexibility, Power, Speed, Coordination, Agility, Balance, Accuracy.
- `Allowed values`: [0, 0.5, 1]

## Architecture Rules
- **Backend**: Clean service layer for logic, controllers for routing.
- **Frontend**: Functional React components, modular Tailwind CSS, Recharts for visualization.
- **AI Logic**: Prompt-driven coach insights via OpenAI GPT models.

## Coding Guidelines
- **Python**: Use type hints (e.g., `List[Workout]`). Keep business logic out of API routes.
- **TypeScript**: Maintain strict interface definitions for API responses in `frontend/src/types/`.
- **Styling**: Use Utility-First CSS (Tailwind) and ensure mobile responsiveness.

## Operational Mandates
- **Conda Environment**: Always ensure the `WODLens` conda environment is activated before running backend commands.
- **Surgical Edits**: Prefer `replace` over `write_file` for large existing files to maintain stability.
- **Context Efficiency**: Use the `PROJECT_INDEX.md` to target your investigations rather than listing directories recursively.

## AI Responsibilities
The AI acts as a professional CrossFit coach.
- **Tone**: Technical, encouraging, objective.
- **Length**: Max 120 words.
- **Focus**: Identify one strength, one bottleneck, and one actionable training recommendation.
