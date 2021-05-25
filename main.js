"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee col-10 col-md-6 mb-5 ">';
    html += `<h2 class="d-inline">` + coffee.name;
    html += `<h4 class="d-inline text-secondary">` + " " + coffee.roast;
    html += `</div>`;
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    //selectedRoast ='';
    var selectedCoffeeNameUpperCase = coffeeName.value.toUpperCase();
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        let coffeeNameUpperCase = coffee.name.toUpperCase();
        if ((coffee.roast === selectedRoast)
            &&
            coffeeNameUpperCase.search(selectedCoffeeNameUpperCase) > -1) {
            filteredCoffees.push(coffee);
        }
    });
    divCoffee.innerHTML = renderCoffees(filteredCoffees);
}

function addCoffee(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = addRoastSelection.value;
    var newCoffeeName = addCoffeeName.value;
    let newCoffee = {
        id: coffees.length,
        name: newCoffeeName,
        roast: selectedRoast
    }
    coffees.push(newCoffee);
    divCoffee.innerHTML = renderCoffees(coffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var divCoffee = document.querySelector('#coffees');
var coffeeName = document.querySelector('#coffeeName');
var roastSelection = document.querySelector('#roast-selection');

divCoffee.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);
//coffeeName.addEventListener('click', updateCoffees);
coffeeName.addEventListener('keyup', updateCoffees);

var addCoffeeName = document.querySelector('#addCoffeeName');
var addRoastSelection = document.querySelector('#addRoastType');
var submitButton = document.querySelector('#submitAddCoffee');


submitButton.addEventListener('click', addCoffee);