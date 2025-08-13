// server.js
require('dotenv').config(); // load env variables at the very start

const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const { sequelize } = require('./src/models'); // import sequelize & models

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./src/routes/user.routes');
// Add other route imports as needed
// const projectRoutes = require('./src/routes/project.routes');

// Default test route
app.get('/', (req, res) => {
  res.send('MyTeamCamp API is running...');
});

// Mount routes
app.use('/users', userRoutes);
// app.use('/projects', projectRoutes);

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ All models synced successfully.');
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err.message);
  });

