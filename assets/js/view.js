let status = [
    'Solution has been generated successfully'
]

class ProblemViewer {
    constructor() {
        this.table = document.getElementById(`problem`);
        this.element = document.getElementById(`problem-modal`);
        this.supply = [];
        this.demand = [];
        this.cost = [];
        this.element.querySelector('button.modal-close').onclick = () => this.hide();
        this.element.querySelector('.modal-background').onclick = () => this.hide();
    }
    render(id) {
        let data;
        let request = new XMLHttpRequest();
        request.open('GET', `/view/problem/${id}`, true);
        request.onload = (request) => {
            if (request.target.status >= 200 && request.target.status < 400) {
                // Success!
                data = JSON.parse(request.target.response);
                this.supply = data.supply;
                this.demand = data.demand;
                this.cost = data.cost;
                
                this.createHTML();

                // Menampilkan modal
                this.element.classList.add('is-active');

            } else {
                // We reached our target server, but it returned an error
            }
        };
        request.onerror = function () {
            // There was a connection error of some sort
        };
        request.send();
    }
    createHTML(){
        let totalUnit = 0;
        this.supply.forEach(sup => {
            totalUnit += sup.unit;
        });
        let string = ``;
        string += `<tbody>`;
        for (let row = 0; row < this.supply.length + 2; row++) {
            string += `    <tr>`;
            for (let column = 0; column < this.demand.length + 2; column++) {
                if (row === 0) {
                    if (column === 0) {
                        string += `        <th style="visibility:hidden"></th>`;
                    } else if (column < this.demand.length + 1) {
                        string += `        <th>${this.demand[column - 1].name}</th>`;
                    } else if (column === this.demand.length + 1) {
                        string += `        <th>Supply</th>`;
                    }
                } else if (row < this.supply.length + 1) {
                    if (column === 0) {
                        string += `        <th>${this.supply[row - 1].name}</sub></th>`;
                    } else if (column < this.demand.length + 1) {
                        string += `        <td>${this.cost[column - 1][row - 1]}</td>`;
                    } else if (column === this.demand.length + 1) {
                        string += `        <th>${this.supply[row - 1].unit}</th>`;
                    }
                } else if (row === this.supply.length + 1) {
                    if (column === 0) {
                        string += `        <th>Demand</th>`;
                    } else if (column < this.demand.length + 1) {
                        string += `        <th>${this.demand[column - 1].unit}</sub></th>`;
                    } else if (column === this.demand.length + 1) {
                        string += `        <th>${totalUnit}</th>`;
                    }
                }
            }
            string += `    </tr>`;
        }
        string += `</tbody>`;
        this.table.innerHTML = string;

    }
    hide() {
        this.element.classList.remove('is-active');

        // reset ukuran column table
        let rows = this.table.querySelectorAll('tr');
        rows.forEach(row => {
            let columns = row.querySelectorAll('td, th');
            for (let column = 2; column < columns.length - 1; column++) {
                const element = columns[column];
                element.remove();
            }
        });

        // reset ukuran row table
        for (let row = 2; row < rows.length - 1; row++) {
            const element = rows[row];
            element.remove();
        }
    }
}

let problemViewer = new ProblemViewer();

class SolutionViewer {
    constructor() {
        this.tables = document.getElementById(`solutions`);
        this.element = document.getElementById(`solution-modal`);
        this.supply = [];
        this.demand = [];
        this.cost = [];
        this.solutions = [];
        this.currentSolution = 0;
        this.nextButton = document.getElementById('next');
        this.previousButton = document.getElementById('previous');
        this.element.querySelector('button.modal-close').onclick = () => this.hide();
        this.element.querySelector('.modal-background').onclick = () => this.hide();
    }
    render(id) {
        let data;
        let request = new XMLHttpRequest();
        request.open('GET', `/view/solution/${id}`, true);
        request.onload = (request) => {
            if (request.target.status >= 200 && request.target.status < 400) {
                // Success!
                data = JSON.parse(request.target.response);
                console.log(data);
                this.supply = data.problem.supply;
                this.demand = data.problem.demand;
                this.cost = data.problem.cost;
                this.solutions = data.solutions;

                for (let index = 0; index < this.solutions.length; index++) {
                    this.createHTML(index);
                }
                this.currentSolution = this.solutions.length - 1;
                document.getElementById(`solution-${this.currentSolution}`).classList.remove(`is-hidden`);
                this.checkButtons();

                let totalCost = 0;
                let calculation = `Total Cost = `;
                for (let x = 0; x < this.solutions[this.solutions.length - 1].distribution.length; x++) {
                    for (let y = 0; y < this.solutions[this.solutions.length - 1].distribution[x].length; y++) {
                        if (this.solutions[this.solutions.length - 1].distribution[x][y] > 0) {
                            totalCost += (this.cost[x][y] * this.solutions[this.solutions.length - 1].distribution[x][y]);
                            calculation += `(${this.cost[x][y]} * ${this.solutions[this.solutions.length - 1].distribution[x][y]}) + `
                        }
                    }
                }
                calculation = calculation.substring(0, calculation.length - 2);
                calculation += `= ${totalCost}`;
                document.getElementById('total').innerText = calculation;

                // Menampilkan modal
                this.element.classList.add('is-active');

            } else {
                // We reached our target server, but it returned an error
            }
        };
        request.onerror = function () {
            // There was a connection error of some sort
        };
        request.send();
    }
    createHTML(index){
        const currentSolution = this.solutions[index];
        let totalUnit = 0;
        currentSolution.supply.forEach(sup => {
            totalUnit += sup;
        });
        let string = ``;
        string += `<table id="solution-${index}" class="table is-bordered is-striped is-hoverable is-hidden">`;
        string += `    <tbody>`;
        for (let row = 0; row < this.supply.length + currentSolution.penalty.length + 2; row++) {
            string += `        <tr>`;
            for (let column = 0; column < this.demand.length + currentSolution.penalty.length + 2; column++) {
                if (row === 0) {
                    if (column === 0) {
                        string += `            <th style="visibility:hidden"></th>`;
                    } else if (column < this.demand.length + 1) {
                        string += `            <th>${this.demand[column - 1].name}</th>`;
                    } else if (column === this.demand.length + 1) {
                        string += `            <th>Supply</th>`;
                    } else {
                        string += `            <th>P<sub>${column - this.demand.length - 1}</th>`;
                    }
                } else if (row < this.supply.length + 1) {
                    if (column === 0) {
                        string += `            <th>${this.supply[row - 1].name}</th>`;
                    } else if (column < this.demand.length + 1) {
                        string += `            <td>${this.cost[column - 1][row - 1]} / ${currentSolution.distribution[column - 1][row - 1]}</td>`;
                    } else if (column === this.demand.length + 1) {
                        string += `            <th>${currentSolution.supply[row - 1]}</th>`;
                    } else {
                        string += `            <th>${currentSolution.penalty[column - this.demand.length - 2].supply[row - 1]}</th>`;
                    }
                } else if (row === this.supply.length + 1) {
                    if (column === 0) {
                        string += `            <th>Demand</th>`;
                    } else if (column < this.demand.length + 1) {
                        string += `            <th>${currentSolution.demand[column - 1]}</th>`;
                    } else if (column === this.demand.length + 1) {
                        string += `            <th>${totalUnit}</th>`;
                    } else {
                        string += `            <th style="visibility:hidden">></th>`;
                    }
                } else {
                    if (column === 0) {
                        string += `            <th>P<sub>${row - this.supply.length - 1}</th>`;
                    } else if (column < this.demand.length + 1) {
                        string += `            <th>${currentSolution.penalty[row - this.supply.length - 2].demand[column - 1]}</th>`;
                    } else if (column === this.demand.length + 1) {
                        string += `            <th style="visibility:hidden"></th>`;
                    } else {
                        string += `            <th style="visibility:hidden"></th>`;
                    }
                }
            }
            string += `        </tr>`;
        }
        string += `    </tbody>`;
        string += `</table>`;
        this.tables.innerHTML += string;
    }
    hide() {
        this.element.classList.remove('is-active');
        this.tables.innerHTML = "";
    }
    previous(){
        document.getElementById(`solution-${this.currentSolution}`).classList.add(`is-hidden`);
        this.currentSolution = this.currentSolution - 1;
        document.getElementById(`solution-${this.currentSolution}`).classList.remove(`is-hidden`);
        this.checkButtons();
        
    }
    next(){
        document.getElementById(`solution-${this.currentSolution}`).classList.add(`is-hidden`);
        this.currentSolution = this.currentSolution + 1;
        document.getElementById(`solution-${this.currentSolution}`).classList.remove(`is-hidden`);
        this.checkButtons();
    }
    checkButtons(){
        this.previousButton.removeAttribute('disabled');
        this.nextButton.removeAttribute('disabled');
        if (this.currentSolution === 0) {
            this.previousButton.setAttribute('disabled', 'true');
        }
        if (this.currentSolution === this.solutions.length - 1) {
            this.nextButton.setAttribute('disabled', 'true');
        }

    }
}

let solutionViewer = new SolutionViewer();

function viewProblem(id) {
    problemViewer.render(id);
}

function generateSolution(id) {
    let request = new XMLHttpRequest();
    request.open('POST', `/view/solution/${id}`, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = function () {
        window.location = this.response;
    }
    request.send();
}

function viewSolution(id) {
    solutionViewer.render(id);
}

function getProblemId(element) {
    return element.closest('tr').attributes[0].value;
}