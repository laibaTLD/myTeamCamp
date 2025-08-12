// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const models = require('./models');

const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const messageRoutes = require('./routes/message.routes');
const fileRoutes = require('./routes/file.routes');
const notificationRoutes = require('./routes/notification.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/notifications', notificationRoutes);

// basic health route
app.get('/', (req, res) => res.json({ message: 'MyTeamCamp API is running' }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
