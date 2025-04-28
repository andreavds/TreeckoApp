const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const setup = require('./setup');
const authRoutes = require('./routes/auth.js');
const boardRoutes = require('./routes/boards');
const taskRoutes = require('./routes/tasks');
const setupSwagger = require('./swagger');

const PORT = process.env.PORT || 3000;

/*
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
};*/

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api', taskRoutes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

module.exports = app;