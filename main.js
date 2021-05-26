"use strict"

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let arrCoffees = [
    {id: 0, name: 'Full City', roast: 'medium'},
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

// SETMAXINDEX if no MAXINDEX in local storage
function setMaxIndex() {
    let MAXINDEX = 0;
    if (localStorage.getItem(MAXINDEX.toString()) === null) {
        localStorage.setItem("MAXINDEX", MAXINDEX.toString());
    }
}

//function call
setMaxIndex();

//Get current max index
function getMaxIndex() {
    return localStorage.getItem("MAXINDEX")
}

//increase Index by 1
function increaseIndexBy1() {
    let index = getMaxIndex();
    //delete the MAXINDEX to Updated increased index
    localStorage.removeItem("MAXINDEX");
    index++;
    localStorage.setItem("MAXINDEX", index.toString())
    return index;
}

// Add coffees from the array to storage
function createCoffeesOnStorage(arrCoffees) {
    if (localStorage) {
        //Add the arrCoffee only if it's not added before
        if (getMaxIndex() == 0) {
            arrCoffees.forEach(coffee => {
                localStorage.setItem(getMaxIndex(), JSON.stringify(coffee));
                increaseIndexBy1()
            })
        }
    } else {
        console.log("Sorry, your browser do not support local storage.");
    }
}

//function call
createCoffeesOnStorage(arrCoffees);

//get all the coffees from storage
function getCoffeesFromStorage() {
    let coffees = []
    for (let i = 0; i < getMaxIndex(); i++) {
        //if any coffee is deleted, skip adding null
        if (localStorage.getItem(i.toString()) === null) {
            continue;
        }
        coffees.push(JSON.parse(localStorage.getItem(i.toString())))
    }
    return coffees;
}

//Add newCoffee to storage and increase the MaxIndex
function addCoffeeToStorage(newCoffee) {
    localStorage.setItem(getMaxIndex(), JSON.stringify(newCoffee));
    increaseIndexBy1();
}

//Delete coffee for given coffeeID
function deleteCoffeeFromStorage(coffeeID) {
    localStorage.removeItem(coffeeID + "");
}

//Render coffee
function renderCoffee(coffee) {
    let html = '<div class="coffee col-10 col-md-6 mb-5 ">';
    html += `<h2 class="d-inline">` + coffee.name;
    html += `<h4 class="d-inline text-secondary">` + " " + coffee.roast;
    html += `</div>`;
    return html;
}

//Render Coffees - call RenderCoffee for every coffee
function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}
//filter the coffees as selected criteria and display the filtered list.
function displayFilteredCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelectionQS.value;
    // if all is selected in Roast criteria, show all Roast types
    let flag = (roastSelectionQS.value === "all");
    //Make all criteria Uppercase for case insensitive search
    let selectedCoffeeNameUpperCase = coffeeNameQS.value.toUpperCase();
    let filteredCoffees = [];
    //Get coffees from storage for filtering
    let coffees = getCoffeesFromStorage();
    coffees.forEach(function (coffee) {
        //uppercase for case insensitive search
        let coffeeNameUpperCase = coffee.name.toUpperCase();
        //if all is selected in Roast criteria
        if (flag) {
            if (coffeeNameUpperCase.search(selectedCoffeeNameUpperCase) > -1) {
                filteredCoffees.push(coffee);
            }
        } else {
            if ((coffee.roast === selectedRoast)
                &&
                coffeeNameUpperCase.search(selectedCoffeeNameUpperCase) > -1) {
                filteredCoffees.push(coffee);
            }
        }
    });
    divCoffeeQS.innerHTML = renderCoffees(filteredCoffees);
}

//Change the text on the Button to Add or Remove
//checks if the Roast and Coffee Name is present.
//If found - Changes the button text to Remove
//If not found - Changes the button text to Add
function changeSubmitButton(e) {
    let selectedRoast = addRoastSelectionQS.value;
    let newCoffeeName = addCoffeeNameQS.value;
    let coffees = getCoffeesFromStorage();
    let found = {};
    //if Roast and Coffee name is present
    found = coffees.findIndex(element =>
        element.name.toUpperCase() === newCoffeeName.toUpperCase()
        && element.roast.toUpperCase() === selectedRoast.toUpperCase());
    //if no match for roast and coffeeName found change button text to Add
    if (found === -1) {
        submitButtonQS.value = "Add"
    } else {
        submitButtonQS.value = "Remove"
    }
}

//Add or Remove coffee
function addRemoveCoffee(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = addRoastSelectionQS.value;
    let newCoffeeName = addCoffeeNameQS.value;
    let flag = false;
    let coffees = getCoffeesFromStorage();
    let newCoffee = {
        id: getMaxIndex(),
        name: newCoffeeName,
        roast: selectedRoast
    }
    let found = {};
    console.log(coffees.length)
    found = coffees.find(element =>
        element.name.toUpperCase() === newCoffeeName.toUpperCase()
        && element.roast.toUpperCase() === selectedRoast.toUpperCase());
    if (found === undefined) {
        addCoffeeToStorage(newCoffee);
    } else {
        console.log(found.id.toString())
        deleteCoffeeFromStorage(found.id.toString())
    }
    submitButtonQS.value = "Add / Remove";
    addCoffeeNameQS.value = "";
    addRoastSelectionQS.value = "light";
    console.log("After add " + getCoffeesFromStorage());
    divCoffeeQS.innerHTML = renderCoffees(getCoffeesFromStorage());
}


let divCoffeeQS = document.querySelector('#coffees');
let coffeeNameQS = document.querySelector('#coffeeName');
let roastSelectionQS = document.querySelector('#roast-selection');

divCoffeeQS.innerHTML = renderCoffees(getCoffeesFromStorage());

roastSelectionQS.addEventListener('change', displayFilteredCoffees);
coffeeNameQS.addEventListener('keyup', displayFilteredCoffees);

let addCoffeeNameQS = document.querySelector('#addCoffeeName');
let addRoastSelectionQS = document.querySelector('#addRoastType');
let submitButtonQS = document.querySelector('#submitAddCoffee');
addCoffeeNameQS.addEventListener('keyup', changeSubmitButton);
addRoastSelectionQS.addEventListener('change', changeSubmitButton);


submitButtonQS.addEventListener('click', addRemoveCoffee);