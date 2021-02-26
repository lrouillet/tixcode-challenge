const User = require('../models/user');
const auth = require('../middleware/auth')
const express = require('express');
const router = new express.Router();

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

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users', auth, async (req, res) => {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    
    // Quito limit y skip del objeto query para que no interfieran en los filtros
    delete req.query.limit;
    delete req.query.skip;

    const users = await User.find(req.query, null, { limit, skip });
    res.status(200).send(users);
});

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findOne({ _id });
        if (!user) {
            res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;