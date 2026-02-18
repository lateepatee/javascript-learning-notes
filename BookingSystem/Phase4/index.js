require("dotenv").config();
const express = require("express");
const path = require("path");
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');

const app = express();
// FIX: Fallback to 3000 if IPORT/PORT is not defined
const PORT = process.env.IPORT || process.env.PORT || 3000;

// --- Database Configuration ---
// Pool will automatically use PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT from .env
const pool = new Pool();

// --- Middleware ---
app.use(express.json());
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- Helper ---
function timestamp() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
}

// --- Views ---
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get('/resources', (req, res) => {
  res.sendFile(path.join(publicDir, 'resources.html'));
});

// --- Validation Rules ---
const resourceValidators = [
  body('action')
    .trim()
    .equals('create').withMessage("action must be 'create'"),

  body('resourceName')
    .trim()
    .notEmpty().withMessage('resourceName is required')
    .isString()
    .escape(),

  body('resourceDescription')
    .trim()
    .isLength({ min: 10, max: 255 }).withMessage('Description must be 10-255 characters'),

  body('resourceAvailable')
    .isBoolean().withMessage('resourceAvailable must be a boolean')
    .toBoolean(),

  body('resourcePrice')
    .isFloat({ min: 0 }).withMessage('resourcePrice must be a non-negative number')
    .toFloat(),

  body('resourcePriceUnit')
    .trim()
    // FIX: Added 'week' and 'month' to match your error message logic
    .isIn(['hour', 'day', 'week', 'month'])
    .withMessage("resourcePriceUnit must be 'hour', 'day', 'week', or 'month'"),
];

// --- API Routes ---
app.post('/api/resources', resourceValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array().map(e => ({ field: e.path, msg: e.msg })),
    });
  }

  const {
    resourceName,
    resourceDescription,
    resourceAvailable,
    resourcePrice,
    resourcePriceUnit
  } = req.body;

  console.log(`[${timestamp()}] POST /api/resources - Name: ${resourceName}`);

  try {
    const insertSql = `
      INSERT INTO resources (name, description, available, price, price_unit)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, description, available, price, price_unit, created_at
    `;
    
    // FIX: Removed the SHA256 hashing of the name (unless you specifically wanted it hidden)
    // FIX: Removed the *2 multiplier on price
    // FIX: Removed "resourceAvailable = false" override
    const params = [
      resourceName,
      resourceDescription,
      resourceAvailable,
      resourcePrice,
      resourcePriceUnit
    ];

    const { rows } = await pool.query(insertSql, params);
    return res.status(201).json({ ok: true, data: rows[0] });
    
  } catch (err) {
    console.error('DB Error:', err.message);
    return res.status(500).json({ ok: false, error: 'Internal Database error' });
  }
});

// 404 for API
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});