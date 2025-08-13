// server.js
require('dotenv').config(); // load env variables at the very start
const config = require('./src/config/config');
const { sequelize } = require('./src/models');
const app = require('./src/app'); // ✅ use the already configured app

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
