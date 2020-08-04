const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

router.get('/', async (req, res) => {
    let activity = await Problem.aggregate(
        [
            {
                $group:
                {
                    _id:
                    {
                        day: { $dayOfMonth: "$dateIn" },
                        month: { $month: "$dateIn" },
                        year: { $year: "$dateIn" }
                    },
                    count: { $sum: 1 },
                    date: { $first: "$dateIn" }
                }
            },
            {
                $project:
                {
                    date:
                    {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    count: 1,
                    _id: 0
                }
            }
        ]).sort({ date: 'asc' }).then(docs => {
            return JSON.stringify(docs);
        }).catch(error => {
            return null;
        });
        
    console.log(activity);
    res.render(`dashboard`, { activity });
});

module.exports = router;