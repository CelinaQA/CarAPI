'use strict';

const peeps = document.querySelector("#peeps"); 
const carBrand = document.querySelector("#carBrand"); 
const make = document.querySelector("#make"); 
const alert = document.querySelector("#onsuccess");
const modal = document.querySelector("#firstModal");


const printNameToScreen = (carName) => {
    let car = document.createElement("p"); // <p> </p>
    let text = document.createTextNode(`${carName}`); // username
    car.appendChild(text); // <p> username </p>
    peeps.appendChild(car);
}

const retrieveData = () => {
    fetch("http://localhost:9092/swagger-ui/index.html")
    .then((response) => {
        // check that the response is OK (i.e. 200)
        if(response.status !== 200){
            throw new Error("I don't have a status of 200");
        }else{
            console.log(response);
            console.log(`response is OK (200)`);
            //json-ify it (which returns a promise)
            response.json().then((infofromserver) =>{
                console.log(infofromserver);
                console.log(infofromserver.data); // key - return array(6)
                for(let users of infofromserver.data){
                    console.log(users.first_name);
                    printNameToScreen(users.first_name);
                }
            })
        }
    }).catch((err) => {
        console.error(err);
    })
}

const createCar = () => {
    const carValue = carBrand.value; 
    const makeValue = make.value;

    let data = {
        brand: carValue, 
        make: makeValue
    }

    fetch("http://localhost:9092/swagger-ui/index.html",{
        method: "POST", 
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(info => {
        console.log(info);
        alert.setAttribute("class", "alert alert-success"); 
        alert.innerHTML = "User has been successfully created!"; 
        setTimeout( () => {
           alert.removeAttribute("class"); 
           alert.innerHTML = ""; 
        },2000);
    })
    .catch(err => console.error(`Stopppppp! ${err}`));
}


retrieveData(); 