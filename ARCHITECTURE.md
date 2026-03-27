# LILA BLACK: Telemetry Visualization Architecture

## 1. Tech Stack & Rationale
* **Data Ingestion (Node.js & DuckDB):** I chose DuckDB because it is an incredibly fast, in-process analytical database that natively reads highly compressed `.parquet` (and `.nakama-0`) files without needing a heavy distributed system like Spark or a dedicated Python environment.
* **Frontend Visualization (Vanilla JS & HTML5 Canvas):** I opted for a lightweight Vanilla JavaScript approach. Drawing thousands of individual coordinate points using standard DOM elements (like React components or HTML `<div>` tags) creates massive performance lag. The HTML5 Canvas API allows for high-performance, low-latency rendering of dense telemetry data directly over the minimap image.

## 2. Data Flow
1. **Extraction:** Raw `.nakama-0` Parquet files are ingested by a local Node.js script using DuckDB.
2. **Processing:** The script executes a SQL query to parse the binary data, filter for valid events, and extract a representative sample of telemetry rows.
3. **Transformation:** The script maps the 3D in-game coordinates to 2D image pixel coordinates and standardizes the event types (Kill, Death, Loot, etc.).
4. **Storage:** The processed data is exported as a lightweight, static `map_data.json` file.
5. **Presentation:** The frontend fetches this JSON on load and renders the events on the Canvas contextually based on the user's map and filter selections.

## 3. Coordinate Mapping Approach
Converting the 3D world coordinates (`x`, `y`, `z`) from the telemetry data to the 1024x1024 minimap required normalizing the coordinate space:
1. **Discarding Elevation:** The `y` coordinate (vertical elevation) was discarded to flatten the data for a top-down 2D visualization.
2. **Normalization:** The world `x` and `z` coordinates were converted to a UV ratio (a percentage from 0.0 to 1.0) using the map's specific origin point and total scale.
3. **Pixel Translation:** These UV values were multiplied by the image dimensions (1024px). The vertical axis was inverted where necessary to account for the difference between standard Cartesian planes and browser image rendering (where 0,0 is the top-left corner).

## 4. Assumptions & Major Trade-offs

| Decision Area | Trade-off Considered | Final Approach & Rationale |
| :--- | :--- | :--- |
| **Data Architecture** | Live Database/API Backend vs. Static Pre-processed JSON | **Static JSON.** Generating a static JSON payload allows for zero-latency loading on the frontend and enables cheap, serverless hosting (like GitHub Pages). This is ideal for a fast, shareable prototype. |
| **Data Volume** | Processing all ~89,000 rows vs. a Representative Sample | **Sample (1,000 events).** Plotting 90k points simultaneously on a web canvas makes the map unreadable (creating a solid block of color). I assumed a representative sample was better for verifying the prototype's core functionality and keeping browser memory usage low. |
| **UX Design** | Complex BI Dashboard vs. Focused Map Viewer | **Map Viewer.** The tool is designed for Level Designers, not Data Scientists. I prioritized visual clarity on the minimaps over complex, text-heavy data tables. |