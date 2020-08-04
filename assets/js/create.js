let status = [
    'Problem has been successfully added',
    'Error adding problem'
]

class Problem {
    constructor() {
        this.element = document.getElementById(`problem`);
        this.supply = [0];
        this.demand = [0];
        this.supplier = [];
        this.demander = [];
        this.cost = [
            [0]
        ];
        this.totalUnits = 0;
        this.status = [
            'All values must be a positive whole number',
            'Demands and supplies total units must be equal',
            "All demanders must be different",
            "All suppliers must be different",
            "Demanders and Suppliers must be picked"
        ];
    }
    addDemand() {
        // object
        this.demand.push(0);
        this.cost.push([...this.cost[0]]);

        // DOM
        let rows = this.element.querySelectorAll('tr');
        rows.forEach(row => {
            let columns = row.querySelectorAll('td, th');
            let firstColumn = columns[1].cloneNode(true);
            let lastColumn = columns[columns.length - 1];
            row.insertBefore(firstColumn, lastColumn);
        });

        this.submitState(true, false);
    }
    addSupply() {
        // object
        this.supply.push(0);
        this.cost.forEach(supply => {
            supply.push(0);
        });

        // DOM
        let rows = this.element.querySelectorAll('tr');
        let firstRow = rows[1].cloneNode(true);
        let lastRow = rows[rows.length - 1];
        this.element.querySelector('tbody').insertBefore(firstRow, lastRow);

        this.submitState(true, false);
    }
    calculateTotalUnits() {
        let select = document.querySelectorAll('select');

        // test demander harus beda semua
        let demanders = [];
        for (let index = 0; index < this.demand.length; index++) {
            const demander = select[index].value;
            if (demander.trim() === "") {
                new customAlert(this.status[4]);
                this.submitState(true, false);
                return false;
            }
            demanders.push(demander);
        }
        if (isThereADuplicate(demanders)) {
            new customAlert(this.status[2]);
            this.submitState(true, false);
            return false;
        }
        this.demander = demanders;

        // test suppliers harus beda semua
        let suppliers = [];
        for (let index = 0; index < this.supply.length; index++) {
            const supplier = select[index + this.demand.length].value;
            if (supplier.trim() === "") {
                new customAlert(this.status[4]);
                this.submitState(true, false);
                return false;
            }
            suppliers.push(supplier);
        }
        if (isThereADuplicate(suppliers)) {
            new customAlert(this.status[3]);
            this.submitState(true, false);
            return false;
        }
        this.supplier = suppliers;


        // update object values from DOM values
        let rows = this.element.querySelectorAll('tr');
        for (let y = 1; y < rows.length; y++) {
            const row = rows[y].querySelectorAll('td, th');
            for (let x = 1; x < row.length; x++) {
                const column = parseInt(row[x].querySelector('input').value);
                if (y === rows.length - 1 && x === row.length - 1) {
                    // total units
                    // not set because will be generated
                } else {
                    if (isNaN(column) || column < 1) {
                        new customAlert(this.status[0]);
                        this.submitState(true, false);
                        return false;
                    }
                    if (y < rows.length - 1 && x < row.length - 1) {
                        // cost
                        this.cost[x - 1][y - 1] = column;
                    } else {
                        if (y === rows.length - 1) {
                            // demand
                            this.demand[x - 1] = column;
                        } else if (x === row.length - 1) {
                            // supply
                            this.supply[y - 1] = column;
                        }
                    }
                }
            }
        }
        // calculate total units
        let totalDemand = 0;
        this.demand.forEach(d => {
            totalDemand += d;
        });
        let totalSupply = 0;
        this.supply.forEach(s => {
            totalSupply += s;
        });
        if (totalDemand === totalSupply) {
            this.totalUnits = totalDemand;
            let lastRow = rows[rows.length - 1].querySelectorAll('td, th');
            lastRow[lastRow.length - 1].querySelector('input').value = this.totalUnits;
            this.submitState(false, false);
            return true;
        } else {
            new customAlert(this.status[1]);
            this.submitState(true, false);
            return false;
        }
    }
    submitState(disabled, loading) {
        let submit = document.getElementById('submit');
        submit.disabled = disabled;
        if (loading) {
            submit.classList.add('is-loading');
        } else {
            submit.classList.remove('is-loading');
        }
    }
    submit() {
        let supply = [];
        for (let index = 0; index < this.supply.length; index++) {
            supply.push({supplierId: this.supplier[index], unit: this.supply[index]});
        }

        let demand = [];
        for (let index = 0; index < this.demand.length; index++) {
            demand.push({demanderId: this.demander[index], unit: this.demand[index]});
        }

        this.submitState(true, true);
        let request = new XMLHttpRequest();
        let data = {
            supply: supply,
            demand: demand,
            cost: this.cost,
            totalUnits: this.totalUnits
        }
        request.open('POST', '/create', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.onload = function () {
            window.location = this.response;
        }
        request.send(JSON.stringify(data));
    }
}

let problem = new Problem();