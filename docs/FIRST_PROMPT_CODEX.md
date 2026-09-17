# FIRST PROMPT FOR CODEX

You are starting this game project from scratch. There is no existing implementation yet.

Before writing code, read these files in this exact order:

1. CODEX_START_HERE.md
2. FULL_GAME_SPEC.md
3. CARD_CATALOG.md
4. PRESET_BUILDS.md
5. ASSET_CATALOG.md
6. VIDEO_VISUAL_TARGET.md
7. ROADMAP_CODEX.md

Also inspect every provided PNG asset and preserve the exact approved filenames.

## Rules for this first task

- Do not invent or change game rules.
- Do not redesign, replace, or regenerate approved visual assets.
- Do not hard-code text or numeric gameplay values into image files.
- Use the approved PNGs as reusable UI/game assets exactly as described in ASSET_CATALOG.md.
- The game must be structured so rules are independent from presentation.
- Keep the rules engine deterministic and testable.
- Do not implement future phases early.
- Do not build authentication, database, online PvP, ranked, AI campaign, or full art production in this first task.

## First task: Foundation only

Implement only the initial project foundation described as Etapa zero in ROADMAP_CODEX.md.

Create the project/repository structure from scratch, including the recommended TypeScript monorepo structure, apps/packages, linting, formatting, testing foundation, shared types, rules-engine package shell, card-data package shell, UI package shell, game-server shell, and version identifiers for rules and card data.

Import/copy the documentation and approved assets into clear project folders without modifying their content or filenames.

Create an asset manifest/index that maps the approved filenames to their intended roles, but do not redesign them.

Add a README explaining how to install dependencies, run tests, start the local web app, and start the local game-server shell.

Add a minimal smoke test proving that the workspace, rules-engine package, and shared-types package build and test successfully.

## Stop condition

When Etapa zero is complete, STOP.

Do not continue into universal combat rules, classes, UI battle implementation, Supabase, PvP, AI, or any later phase until explicitly instructed.

At the end, report:

- files/folders created;
- architecture chosen;
- commands to run locally;
- tests executed and results;
- any conflicts or ambiguities found in the provided documentation;
- any asset filenames referenced by the project.
