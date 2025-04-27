const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const setup = require('./setup');
const authRoutes = require('./routes/auth.js');
const boardRoutes = require('./routes/boards');
const taskRoutes = require('./routes/tasks');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Setting up initial environment')
})

app.use('/api/boards', boardRoutes);

app.use('/api', taskRoutes);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});