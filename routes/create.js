const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');
const Demander = require('../models/demander');
const Supplier = require('../models/supplier');

router.get('/', async (req, res) => {
    let suppliers = await Supplier.find().exec().then(docs => {
        return JSON.parse(JSON.stringify(docs));
    }).catch(error => {
        return error;
    });

    let demanders = await Demander.find().exec().then(docs => {
        return JSON.parse(JSON.stringify(docs));
    }).catch(error => {
        return error;
    });

    res.render(`create`, {suppliers, demanders});
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