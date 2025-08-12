require('dotenv').config();

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'src', '.env') });
