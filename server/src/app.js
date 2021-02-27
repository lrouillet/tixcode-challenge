require('./db/mongoose');
const cors = require('cors');

const express = require('express');
const usersRouter = require('./routers/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(usersRouter);

module.exports = app;