const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Problem = require('../models/problem');
const Solution = require('../models/solution');

// View list of problems
router.get('/', async (req, res) => {
    let responses = [];

    let problems = await Problem.find().sort({ dateIn: 'desc' }).exec().then(docs => {
        return JSON.parse(JSON.stringify(docs));
    }).catch(error => {
        return error;
    });

    for (let index = 0; index < problems.length; index++) {
        const problem = problems[index];
        let date = new Date(problem.dateIn);
        let response = {};
        let totalUnits = 0;
        let totalCost = 0;

        problem.supply.forEach(sup => {
            totalUnits += sup;
        });

        const solutions = await Solution.findById(problem._id).exec().then(doc => {
            return JSON.parse(JSON.stringify(doc.solution));
        }).catch(error => {
            return null;
            // return error;
        });

        if (solutions !== null) {
            for (let x = 0; x < solutions[solutions.length - 1].distribution.length; x++) {
                for (let y = 0; y < solutions[solutions.length - 1].distribution[x].length; y++) {
                    totalCost += (problem.cost[x][y] * solutions[solutions.length - 1].distribution[x][y]);
                }
            }
        }

        response.id = problem._id;
        response.date = date.toLocaleString('id-ID');
        response.suppliers = problem.supply.length;
        response.demanders = problem.demand.length;
        response.totalUnits = totalUnits;
        response.totalCost = totalCost;

        responses.push(response);
    }

    res.render(`view`, { problems: responses });
});

// View Problem
router.get('/problem/:problemId', async (req, res) => {
    let problem = await Problem.findById(req.params.problemId).exec().then(doc => {
        return JSON.parse(JSON.stringify(doc));
    }).catch(error => {
        return error;
    });
    res.json(problem);
});

// Generate Solution
router.post('/solution/:problemId', async (req, res) => {

    function indexOfMax(arr, indexToExclude = []) {
        if (arr.length === 0) {
            return -1;
        }
        const sortedArray = []
        for (let index = 0; index < arr.length; index++) {
            sortedArray.push({ value: arr[index], index })
        }
        sortedArray.sort(function (a, b) { return b.value - a.value });
        for (let index = 0; index < sortedArray.length; index++) {
            const element = sortedArray[index].index;
            if (!indexToExclude.includes(element)) {
                return element;
            }
        }
        // all arr is excluded
        return -2;
    }

    function indexOfMin(arr, indexToExclude = []) {
        if (arr.length === 0) {
            return -1;
        }
        const sortedArray = []
        for (let index = 0; index < arr.length; index++) {
            sortedArray.push({ value: arr[index], index })
        }
        sortedArray.sort(function (a, b) { return a.value - b.value });
        for (let index = 0; index < sortedArray.length; index++) {
            const element = sortedArray[index].index;
            if (!indexToExclude.includes(element)) {
                return element;
            }
        }
        // all arr is excluded
        return -2;
    }

    class Table {
        constructor(problem, solutions) {
            this.number = solutions.length;
            this.problem = problem;
            this.penalty = [];
            this.indexOfZeroed = { supply: [], demand: [] };
        }
        calculate() {
            this.penalty.push({
                supply: [],
                demand: []
            });
            const currentPenalty = this.penalty[this.penalty.length - 1];
    
            // render supply penalty
            for (let index = 0; index < this.problem.supply.length; index++) {
                currentPenalty.supply.push(this.calculateSupplyPenalty(index));
            }
    
            // render demand penalty
            for (let index = 0; index < this.problem.demand.length; index++) {
                currentPenalty.demand.push(this.calculateDemandPenalty(index));
            }
    
            // 
            const maxSupplyPenaltyIndex = indexOfMax(currentPenalty.supply);
            const maxDemandPenaltyIndex = indexOfMax(currentPenalty.demand);
            if (currentPenalty.supply[maxSupplyPenaltyIndex] > currentPenalty.demand[maxDemandPenaltyIndex]) {
                this.adjustSupplyOrDemand(maxSupplyPenaltyIndex, -1);
            } else if (currentPenalty.supply[maxSupplyPenaltyIndex] <= currentPenalty.demand[maxDemandPenaltyIndex]) {
                this.adjustSupplyOrDemand(-1, maxDemandPenaltyIndex);
            }
    
    
        }
        highlight(row, column) {
            if (row != -1) {
                this.indexOfZeroed.supply.push(row);
            }
            if (column != -1) {
                this.indexOfZeroed.demand.push(column);
            }
        }
        adjustSupplyOrDemand(row, column) {
            if (column == -1 && row != -1) {
                const values = [];
                for (let index = 0; index < this.problem.cost.length; index++) {
                    console.log(this.problem.cost);
                    console.log(index);
                    console.log(row);
                    values.push(this.problem.cost[index][row]);
                }
                column = indexOfMin(values, this.indexOfZeroed.demand);
            }
            if (row == -1 && column != -1) {
                // console.log(this.problem.length);
                row = indexOfMin(this.problem.cost[column], this.indexOfZeroed.supply);
            }
            const minSupplyOrDemand = Math.min(this.getSupply(row), this.getDemand(column))
            this.setDistribution(row, column, minSupplyOrDemand);
            this.setDemand(column, this.getDemand(column) - minSupplyOrDemand);
            this.setSupply(row, this.getSupply(row) - minSupplyOrDemand);
            if (this.getDemand(column) == 0) {
                this.highlight(-1, column);
            }
            if (this.getSupply(row) == 0) {
                this.highlight(row, -1);
            }
        }
        setDistribution(row, column, value) {
            this.problem.distribution[column][row] = value;
        }
        getDistribution(row, column) {
            return this.problem.distribution[column][row];
        }
        setCost(row, column, cost) {
            this.problem.cost[column][row] = cost;
        }
        getCost(row, column) {
            return this.problem.cost[column][row];
        }
        setSupply(row, supply) {
            this.problem.supply[row] = supply;
        }
        getSupply(row) {
            return this.problem.supply[row];
        }
        setDemand(column, demand) {
            this.problem.demand[column] = demand;
        }
        getDemand(column) {
            return this.problem.demand[column];
        }
        calculateSupplyPenalty(row) {
            if (this.indexOfZeroed.supply.includes(row)) {
                return 0;
            } else {
                const values = [];
                console.log(this.problem.cost.length);
                for (let column = 0; column < this.problem.cost.length; column++) {
                    if (this.indexOfZeroed.demand.includes(column)) {
                        continue;
                    }
                    values.push(this.problem.cost[column][row]);
                }
                if (values.length == 1) {
                    return values[0];
                } else {
                    return values[indexOfMin(values, [indexOfMin(values)])] - values[indexOfMin(values)];
                }
            }
        }
        calculateDemandPenalty(column) {
            if (this.indexOfZeroed.demand.includes(column)) {
                return 0;
            } else {
                const costs = [];
                for (let row = 0; row < this.problem.cost[column].length; row++) {
                    if (this.indexOfZeroed.supply.includes(row)) {
                        continue;
                    }
                    costs.push(this.problem.cost[column][row]);
                }
                if (costs.length == 1) {
                    return costs[0];
                } else {
                    return costs[indexOfMin(costs, [indexOfMin(costs)])] - costs[indexOfMin(costs)];
                }
            }
        }
        getTotalSupplyOrDemand() {
            return this.problem.demand.reduce((a, b) => a + b, 0);
        }
    }

    function generateSteps(solutions) {
        do {
            solutions.push(new Table(JSON.parse(JSON.stringify(solutions[0].problem)), solutions));
            for (let index = 1; index < solutions.length; index++) {
                solutions[solutions.length - 1].calculate();
            }
        } while (solutions[solutions.length - 1].getTotalSupplyOrDemand() != 0);
    }
    
    function loadStep(solutions, problem) {
        solutions.push(new Table(JSON.parse(JSON.stringify(problem)), solutions));
        generateSteps(solutions);
    }

    let problem = await Problem.findById(req.params.problemId).exec().then(doc => {
        return JSON.parse(JSON.stringify(doc));
    }).catch(error => {
        return error;
    });

    let supply = [];
    problem.supply.forEach(element => {
        supply.push(element);
    });   

    let demand = [];
    problem.demand.forEach(element => {
        demand.push(element);
    });

    let distribution = [];
    problem.cost.forEach(x => {
        const asdf = [];
        x.forEach(y => {
            asdf.push(0);
        });
        distribution.push(asdf);
    });

    problem.supply = supply;
    problem.demand = demand;
    problem.distribution = distribution;

    let solutions = [];

    loadStep(solutions, problem);
    
    let solutionsSchema = new Solution();
    solutionsSchema._id = mongoose.Types.ObjectId(req.params.problemId);
    solutionsSchema.solution = [];
    solutions.forEach(solution => {
        solutionsSchema.solution.push({
            supply: solution.problem.supply,
            demand: solution.problem.demand,
            distribution: solution.problem.distribution,
            penalty: solution.penalty
        });
    });
    solutionsSchema.save().then(result => {
        console.log(result);
        res.send('/view?statusId=0');
    }).catch(error => {
        console.log(error);
    });
    // res.json(solutions);
});

// View Solution
router.get('/solution/:problemId', async (req, res) => {
    let problem = await Problem.findById(req.params.problemId).exec().then(doc => {
        return JSON.parse(JSON.stringify(doc));
    }).catch(error => {
        return error;
    });
    let solutions = await Solution.findById(req.params.problemId).exec().then(doc => {
        return JSON.parse(JSON.stringify(doc.solution));
    }).catch(error => {
        return null;
    });
    res.json({problem, solutions});
});

module.exports = router;