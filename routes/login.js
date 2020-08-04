const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    req.session.userId = undefined;
    res.render(`login`, { layout: 'main' });
});

router.post('/', async (req, res) => {
    User.find({ email: req.body.email }).exec().then(docs => {
        if (docs.length === 1) {
            if (docs[0].password === req.body.password) {
                req.session.name = docs[0].name.first;
                req.session.userId = docs[0]._id;
                res.redirect('/');
            } else {
                res.redirect('/login?statusId=0');
            }
        } else {
            res.redirect('/login?statusId=1');
        }
        console.log(docs);
    }).catch(error => {
        console.log(error);
        res.redirect('/login?statusId=2');
    });
});

module.exports = router;