document.addEventListener("DOMContentLoaded", event => {
    let statusId = GetURLParameter('statusId');
    if (statusId !== undefined) {
        new customAlert(status[parseInt(statusId)]);
    }

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

function GetURLParameter(urlParameter) {
    var url = window.location.search.substring(1);
    var urlVariables = url.split('&');
    for (var i = 0; i < urlVariables.length; i++) {
        var parameter = urlVariables[i].split('=');
        if (parameter[0] === urlParameter) {
            return parameter[1];
        }
    }
}

function indexOfMax(arr, indexToExclude = []) {
    if (arr.length === 0) {
        return -1;
    }
    const sortedArray = []
    for (let index = 0; index < arr.length; index++) {
        sortedArray.push({ value: arr[index], index })
    }
    sortedArray.sort((a, b) => { return b.value - a.value });
    for (let index = 0; index < sortedArray.length; index++) {
        const element = sortedArray[index].index;
        if (!indexToExclude.includes(element)) {
            return element;
        }
    }
    // all arr is excluded
    return -2;
}

function isThereADuplicate(arrayOfNumbers) {
    // Create an empty associative array or hash. 
    // This is preferred,
    let counts = {};
    // // but this also works. Comment in below and comment out above if you want to try.
    // let counts = [];

    for (let i = 0; i <= arrayOfNumbers.length; i++) {
        // As the arrayOfNumbers is being iterated through,
        // the counts hash is being populated.
        // Each value in the array becomes a key in the hash. 
        // The value assignment of 1, is there to complete the hash structure.
        // Once the key exists, meaning there is a duplicate, return true.
        // If there are no duplicates, the if block completes and returns false.
        if (counts[arrayOfNumbers[i]] === undefined) {
            counts[arrayOfNumbers[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

function indexOfMin(arr, indexToExclude = []) {
    if (arr.length === 0) {
        return -1;
    }
    const sortedArray = []
    for (let index = 0; index < arr.length; index++) {
        sortedArray.push({ value: arr[index], index })
    }
    sortedArray.sort((a, b) => { return a.value - b.value });
    for (let index = 0; index < sortedArray.length; index++) {
        const element = sortedArray[index].index;
        if (!indexToExclude.includes(element)) {
            return element;
        }
    }
    // all arr is excluded
    return -2;
}

class customAlert {
    constructor(message = ``) {
        this.message = message;
        if (message === ``) {
            message += `<strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>`;
            message += `<br>`;
            message += `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa`;
            message += `fringilla egestas. Nullam condimentum luctus turpis.`;
        }
        this.element = document.getElementById('customAlert');
        this.element.querySelector('button').onclick = () => this.hide();
        this.element.querySelector('.modal-background').onclick = () => this.hide();
        this.setMessage(this.message);
        this.show();
    }
    show() {
        this.element.classList.add('is-active');
    }
    hide() {
        this.element.classList.remove('is-active');
        this.setMessage(``);
    }
    setMessage(message) {
        this.element.querySelector('p').innerHTML = message;
    }
}