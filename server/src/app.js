require('./db/mongoose');

const express = require('express');
const usersRouter = require('./routers/users');

const app = express();

app.use(express.json());
app.use(usersRouter);

module.exports = app;