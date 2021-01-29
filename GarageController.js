'use strict';
const garage = document.querySelector("#garage");
const inputName = document.querySelector("#garageName");
const inputGarageId = document.querySelector("#garageId");
// const inputCars = document.querySelector("#cars");
const clearHisButton = document.querySelector("#clearHistory");

const printGarageToScreen = (name, id) => {
    let garageInfo = document.createElement("p");
    let text = document.createTextNode(`Garage ID: ${id},  Name: ${name}`);
    garageInfo.appendChild(text);
    garage.appendChild(garageInfo);
}

const retrieveData = () => {
    fetch("http://localhost:9092/garage/read")
        .then((response) => {
            if (response.status !== 200) {
                console.log(response);
                throw new Error("I don't have a status of 200");
            } else {
                console.log(`response is OK (200)`);
                //json-ify it (which returns a promise)
                garage.innerHTML = "";
                response.json().then((infoGarage) => {
                    console.log(infoGarage);
                    console.log(infoGarage.cars); // key - return array(6)
                    for (let garage of infoGarage) {
                        console.log(garage.name);
                        printGarageToScreen(garage.name, garage.id);
                        for (let cars in garage) {

                        }

                    }
                })
            }
        }).catch((err) => {
            console.error(err);
        })
}

const createGarage = () => {
    // const userValue = username.value;
    // const jobValue = job.value;
    // const carsValue = inputCars.value;
    const nameValue = inputName.value;
    // console.log(nameValue);

    let data = {
        // cars: carsValue,
        name: nameValue
    }

    fetch("http://localhost:9092/garage/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(`${data.name} created`);
            inputName.value = "";
        })
        .catch(err => console.error(`Stopppppp! ${err}`));
}

clearHisButton.addEventListener("click", () => {
    garage.innerHTML = "";
});

const deleteGarage = () => {
    // const userValue = username.value;
    // const jobValue = job.value;
    // const carsValue = inputCars.value;
    const idValue = inputGarageId.value;
    // console.log(nameValue);

    let data = {
        // cars: carsValue,
        id: idValue
    }

    fetch(`http://localhost:9092/garage/delete/${data.id}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(`Garage ID:${data.id} deleted`);
            inputGarageId.value = "";
        })
        .catch(err => console.error(`Stopppppp! ${err}`));
}
