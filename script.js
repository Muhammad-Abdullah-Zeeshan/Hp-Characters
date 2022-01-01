const url = 'http://hp-api.herokuapp.com/api/characters';
const searchBtn = document.querySelector('.submit');
const inputContainer = document.getElementById('search');
var childDiv =document.querySelector('.childContainer');
var data = [];
var filteredData = [];
var term;
var total = 0;
var displayed = 0;

// Fetching the Data through API

async function fetchData() {
    const response = await fetch(url);
    data = await response.json();
    displayDataOnHome(data);

}

//Diaplays Characters before search
//Displays Characters in order (Ascending Order)

function displayDataOnHome(arr) {
    for (let i = displayed ; i < displayed + 10; i++) {
        
        if (typeof arr[i] === 'undefined') {
            document.querySelector('.loadBtn').remove();
        }

        else {
            var div = document.createElement('div');
            div.setAttribute('class', 'characterCard');
            document.querySelector('.childContainer').appendChild(div);

            var img = document.createElement('img');
            img.src = arr[i].image;
            img.setAttribute('alt', arr[i].name + "'s image");
            div.appendChild(img);
        }

    }

    displayed += 10;

    var loadBtn = `<button class='loadBtn'>
            Load More
        </button>`;
    document.querySelector('.mainContainer').innerHTML += loadBtn;

    document.querySelector('.loadBtn').addEventListener('click', ()=> {
        document.querySelector('.loadBtn').remove();
        displayDataOnHome(arr);
    })
    
}

// Search Functionality
// Returns all characters with search term containing in their Names...

searchBtn.addEventListener('click', () => {
    document.querySelector('.childContainer').innerHTML = '';
    if (document.querySelector('.loadBtn') != null) {
        document.querySelector('.loadBtn').remove();
    }

    if (inputContainer.value == '') {
        
    }

    else {
        total = 0;
        returnFilteredData();
    }
});


function returnFilteredData() {
    term = inputContainer.value;
    term = term.toLowerCase()
    filteredData.forEach(()=>{
        if (document.querySelector('.characterCard') != null) {
            document.querySelector('.characterCard').remove();
        }
    })
    
    data.forEach((person) => {
        
        if (person.name.toLowerCase().includes(term)) {
            filteredData.push(person);
            total += 1;

            document.querySelector('.resultNum').innerHTML = 'Results: ' + total;
        }

        else{
            document.querySelector('.resultNum').innerHTML = 'Results: ' + total;
        }
    })

    //Displays the search results with load more feature!

    displayed = 0;
    displayDataOnHome(filteredData);

}
//Fetches the data from API
fetchData();
