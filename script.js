const API_KEY = 'http://hp-api.herokuapp.com/api/characters';
const childDiv = document.querySelector('.childContainer');
const mainDiv = document.querySelector('.mainContainer');
const searchBtn = document.querySelector('.submit');
const search = document.getElementById('search');
let resultNum = document.querySelector('.resultNum');
let displayed = 0;
let data = [];
let filteredData = [];
var loadBtn;


//---Fecthes the data through the API_KEY---//
async function fetchData(key) {
    data = await fetch(key);
    data = await data.json();
    console.log(data);
    displayData(data);
}
fetchData(API_KEY);


//---Displays the Data ---//

function displayData(arr) {
    for(let i = displayed; i < displayed + 10; i++) {

        if(arr[i] == undefined){
            
        }

        else{
            var div = document.createElement('div');
            div.setAttribute('class', 'characterCard');
            childDiv.appendChild(div);

            let img = document.createElement('img');
            img.src = arr[i].image;
            img.setAttribute('alt', arr[i].name + "'s Image");
            div.appendChild(img);
            
        }
    }
    
    //--Displays the 'Load More' button depending if the data is displayed completely or not---//
    
    if (arr.length === childDiv.getElementsByTagName('div').length) {
        
    }

    else {
        loadBtn = document.createElement('button');
        loadBtn.innerHTML = 'Load More';
        mainDiv.appendChild(loadBtn);
        displayed += 10;

        loadBtn.addEventListener('click', ()=> {
            loadBtn.remove();
            displayData(arr);
            
    })
    }

}

searchBtn.addEventListener('click', ()=> {
    if (search.value == '') {
        
    }
    else {
        filteredData = [];
        childDiv.innerHTML = '';
        if (loadBtn !== undefined) {
            loadBtn.remove();
        }
        data.forEach((person)=> {
            if (person.name.toLowerCase().includes(search.value.toLowerCase())) {
                filteredData.push(person);
               
            }
            
        })
        displayed = 0;
        displayData(filteredData);
        resultNum.innerHTML = 'Results: '+ filteredData.length;
    }
})
