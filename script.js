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

searchBtn.addEventListener('click', () => {
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
            console.log(person.name);
            filteredData.push(person);
            total += 1;

            document.querySelector('.resultNum').innerHTML = 'Results: ' + total;

            var div = document.createElement('div');
            div.setAttribute('class', 'characterCard');
            document.querySelector('.childContainer').appendChild(div);
            
            var img = document.createElement('img');
            img.src = person.image;
            img.setAttribute('alt', person.name + "'s image");
            div.appendChild(img);
        }

        else{
            document.querySelector('.resultNum').innerHTML = 'Results: ' + total;
        }
    })

    console.log(total);
}

fetchData();
