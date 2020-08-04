const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    req.session.userId = undefined;
    res.render(`register`, { layout: 'main' });
});

router.post('/', async (req, res) => {
    let users = await User.find({ "email": req.body.email }).exec().then(result => {
        return result;
    }).catch(error => {
        console.log(error);
        return null;
    });
    console.log(users);
    if (users.length < 1) {
        let user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.name = { first: req.body.first, last: req.body.last };
        let result = await user.save().then(result => {
            return result;
        }).catch(error => {
            console.log(error);
            return null;
        });
        if (result === null) {
            res.redirect('/register?statusId=0');
        } else {
            res.redirect('/login?statusId=3');
        }
    } else {
        res.redirect('/register?statusId=1');
    }
});

module.exports = router;