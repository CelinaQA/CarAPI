'use strict'

const cars = document.querySelector("cars");
const make = document.querySelector("make");
const model = document.querySelector("model");
const id = document.querySelector("id");
const alert = document.querySelector("#onsuccess");
const modal = document.querySelector("#deleteModal");

const deleteCar = () => {
    const carMake = make.value
    const carModel = model.value;
    const carID = id.value;

    let data = {
        make: carMake,
        model: carModel,
        id: carID
    }

    fetch("http://localhost:9092/swagger-ui/car/delete/", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(info => {
            console.log(info);
            alert.setAttribute("class", "alert alert-success");
            alert.innerHTML = "Car has been successfully deleted!";
            setTimeout(() => {
                alert.removeAttribute("class");
                alert.innerHTML = "";
            }, 2000);

        })
        .catch(err => console.error(`STOP! ${err}`));
}