const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token  = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        console.log(user);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    
    // Quito limit y skip del objeto query para que no interfieran en los filtros
    delete req.query.limit;
    delete req.query.skip;

    const users = await User.find(req.query, null, { limit, skip });
    res.status(200).send(users);
});

module.exports = router;