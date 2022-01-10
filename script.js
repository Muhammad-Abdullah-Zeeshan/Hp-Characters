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

            //---Creates the Character Card---//
            var div = document.createElement('div');
            div.setAttribute('class', 'characterCard');
            childDiv.appendChild(div);

            let img = document.createElement('img');
            img.src = arr[i].image;
            img.setAttribute('alt', arr[i].name + "'s Image");
            div.appendChild(img);

            let name = document.createElement('h2');
            name.innerText = arr[i].name;
            div.appendChild(name);

            let actName = document.createElement('h3');
            actName.innerText = arr[i].actor;
            div.appendChild(actName);
            if (actName.innerText == '') {
                actName.innerText = 'None';
            }

            let detailBtn = document.createElement('button');
            detailBtn.setAttribute('class', 'detailsBtn')
            detailBtn.innerText = 'Details'
            div.appendChild(detailBtn);

            //---Opens the Modal---//
            
            detailBtn.addEventListener('click', (e)=> {
                document.querySelector('.modal').style.transform = 'translate(-50%, 0) scale(1)';
                document.getElementById('overlay').style.opacity = '1';
                document.getElementById('overlay').style.pointerEvents = 'all';

                //---Closes the Modal when clicked on the darker area---// 
                document.getElementById('overlay').addEventListener('click', ()=> {
                    document.querySelector('.modal').style.transform = 'translate(-50%, 0) scale(0)';
                    document.getElementById('overlay').style.opacity = '0';
                    document.getElementById('overlay').style.pointerEvents = 'none'
                })
                
            });
            
            //---Closes the Modal when 'x' btn is pressed---//
            let closeBtn = document.querySelector('.closeBtn');
            closeBtn.addEventListener('click', () => {
                document.querySelector('.modal').style.transform = 'translate(-50%, 0) scale(0)';
                document.getElementById('overlay').style.opacity = '0';
                document.getElementById('overlay').style.pointerEvents = 'none'
            })
        }
    }
    
    //--Displays the 'Load More' button depending if the data is displayed completely or not---//
    
    if (arr.length === childDiv.getElementsByTagName('div').length) {
        
    }

    else {
        loadBtn = document.createElement('button');
        loadBtn.innerHTML = 'Load More';
        loadBtn.setAttribute('class', 'loadBtn')
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
