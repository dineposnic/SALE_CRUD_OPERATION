require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

app.use(cors());
app.use(express.json()); // ✅ Required to parse JSON request body
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Debugging middleware to log request body
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  console.log("🔍 Raw Body Received:", req.body);
  next();
});

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sales Management API',
      version: '1.0.0',
      description: 'API for managing sales records',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'],
};

const salesRoutes = require('./routes/sales');
app.use('/api/sales', salesRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.post("/api/sales", (req, res) => {
  console.log("📥 Parsed Body:", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty. Ensure Content-Type is application/json" });
  }

  res.status(200).json({ message: "Success", data: req.body });
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Error: MONGO_URI is not defined in the .env file.');
  process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
