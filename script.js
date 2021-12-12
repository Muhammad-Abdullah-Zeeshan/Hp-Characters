const url = 'http://hp-api.herokuapp.com/api/characters';
const searchBtn = document.querySelector('.submit');
const inputContainer = document.getElementById('search');
var data = [];
var filteredData = [];
var term;
var total = 0;

async function fetchData() {
    const response = await fetch(url);
    data = await response.json();
    await console.log(data);

}

searchBtn.addEventListener('click', ()=> {
    if (inputContainer.value == '') {
        
    }

    else {
        returnFilteredData();
    }
});


function returnFilteredData() {
    term = inputContainer.value;
    term = term.toLowerCase()
    data.forEach((person)=> {
        if (person.name.toLowerCase().includes(term)) {
            console.log(person.name);
            total += 1;
        }
    })

    console.log(total);
}

fetchData();