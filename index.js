const duckdb = require('duckdb');
const fs = require('fs'); // Node's built-in file system module
const path = require('path');

const db = new duckdb.Database(':memory:');

// Pointing to your real data folders - using glob pattern to read all Parquet files
const dataPath = path.join(__dirname, 'player_data', '**', '*.nakama-0');

const mapConfigs = {
  AmbroseValley: { scale: 900, originX: -370, originZ: -473 },
  GrandRift: { scale: 581, originX: -290, originZ: -290 },
  Lockdown: { scale: 1000, originX: -500, originZ: -500 }
};
const IMAGE_SIZE = 1024;

console.log('Extracting 1,000 events and saving them to a JSON file...');

db.all(`
  SELECT 
    user_id,
    match_id,
    map_id,
    x,
    z,
    event as event_name 
  FROM read_parquet('${dataPath}')
  LIMIT 10000
`, function(err, rows) {
  if (err) {
    console.error("Error reading Parquet files:", err);
    return;
  }

  const processedData = rows.map(row => {
    const config = mapConfigs[row.map_id];

    const u = (row.x - config.originX) / config.scale;
    const v = (row.z - config.originZ) / config.scale;
    
    const pixel_x = Math.round(u * IMAGE_SIZE);
    const pixel_y = Math.round((1 - v) * IMAGE_SIZE);

    // Handle event data - convert Buffer to string if needed
    let eventStr = row.event_name;
    if (Buffer.isBuffer(row.event_name)) {
      eventStr = row.event_name.toString('utf-8');
    }

    return {
      user: row.user_id, // Keeping full user ID for the frontend
      event: eventStr,
      map: row.map_id,
      minimap_x: pixel_x,
      minimap_y: pixel_y
    };
  });

  // Convert the JavaScript array into a neatly formatted JSON string
  const jsonData = JSON.stringify(processedData, null, 2);

  // Write it to a file named 'map_data.json'
  fs.writeFileSync('map_data.json', jsonData);
  
  console.log(`✅ Success! Saved ${processedData.length} events to map_data.json!`);
});