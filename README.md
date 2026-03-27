# LILA BLACK - Player Journey Visualization

**Live Demo:** https://kannuabhishekraj-commits.github.io/lila-black-telemetry/

## Overview
This tool allows Level Designers at LILA Games to visualize and explore player telemetry data across different maps, distinguishing between human and bot behaviors, and tracking key events like combat, looting, and storm deaths.

## Tech Stack
* **Data Processing Pipeline:** Node.js, DuckDB (chosen for lightning-fast Parquet reading)
* **Frontend Visualization:** HTML5 Canvas API, Vanilla JavaScript

## How to Run Locally
1. Clone this repository.
2. Open the directory in your terminal.
3. Start a local web server (e.g., using `npx serve` or VS Code Live Server).
   ```bash
   npx serve