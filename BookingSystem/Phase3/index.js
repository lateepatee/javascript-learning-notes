require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

// Fallback to 3000 if process.env.PORT is undefined
const PORT = process.env.PORT || 3000;

// Timestamp helper
function timestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").split(".")[0];
}

// --- Middleware ---
app.use(express.json()); // Parse application/json

// Serve everything in ./public as static assets
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- Views (HTML pages) ---
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/resources", (req, res) => {
  res.sendFile(path.join(publicDir, "resources.html"));
});

// POST /api/resources -> create/update/delete based on "action"
app.post("/api/resources", (req, res) => {
  const {
    action = "",
    resourceName = "",
    resourceDescription = "",
    resourceAvailable = false,
    resourcePrice = 0,
    resourcePriceUnit = "",
  } = req.body || {};

  // Normalize inputs
  const resourceAction = String(action).trim();
  const name = String(resourceName).trim();
  const description = String(resourceDescription).trim(); // FIXED: Was hardcoded to ""
  const available = Boolean(resourceAvailable);
  const price = Number.isFinite(Number(resourcePrice))
    ? Number(resourcePrice)
    : 0;
  const unit = String(resourcePriceUnit || "").trim();

  // The client's request to the console
  console.log(`[${timestamp()}] Incoming POST request`);
  console.log("--------------------------");
  console.log("Action      ➡️ ", resourceAction);
  console.log("Name        ➡️ ", name);
  console.log("Description ➡️ ", description);
  console.log("Available   ➡️ ", available);
  console.log("Price       ➡️ ", price, unit);
  console.log("--------------------------");

  // Return the normalized data so the frontend can display exactly what was saved
  return res.json({ 
    ok: true, 
    echo: {
        action: resourceAction,
        resourceName: name,
        resourceDescription: description,
        resourceAvailable: available,
        resourcePrice: price,
        resourcePriceUnit: unit
    } 
  });
});

// --- Fallback 404 for unknown API routes ---
// FIXED: Removed the double res.json call which causes server crashes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API Route Not found" });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});