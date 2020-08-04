const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

router.get('/', (req, res) => {
    res.render(`issue`);
});

router.post('/', async (req, res) => {
    let issue = new Issue();
    issue.description = req.body.description;
    let result = await issue.save().then(result => {
        return result;
    }).catch(error => {
        console.log(error);
        return null;
    });
    if (result === null) {
        res.redirect('/issue?statusId=0');
    } else {
        res.redirect('/issue?statusId=1');
    }
});

module.exports = router;