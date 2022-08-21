const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

router.get('/', async (req, res) => {
    res.render(`create`);
});

router.post('/', (req, res) => {
    let problem = new Problem();
    problem.supply = req.body.supply;
    problem.demand = req.body.demand;
    problem.cost = req.body.cost;
    problem.save().then(result => {
        console.log(result);
        res.send('/create?statusId=0');
    }).catch(error => {
        console.log(error);
        res.send('/create?statusId=1');
    });
});

module.exports = router;