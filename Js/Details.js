let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

const queryString = location.search
let params = new URLSearchParams(queryString)
let id = params.get("id")

const container = document.getElementById("container-detail");
let htmlString ="";

fetch(urlApi)
.then(response => response.json())
.then (datos => {
    const Events = datos.events
    let elementoDetails = Events.find((elemento) => elemento._id == id)

    htmlString +=
        `<div class="card-img-left">
            <img id="img-Details" src="${elementoDetails.image}" alt="${elementoDetails.name}" class="img-fluid">
            <div class="card-body-Details">
                <h5 class="card-title">${elementoDetails.name}</h5>
                <p class="card-text-center">${elementoDetails.description}</p><br>
                <p><strong>Category:</strong> ${elementoDetails.category}</p>
                <p><strong>Capacity:</strong> ${elementoDetails.capacity}</p>
                <p>${elementoDetails.assistance == undefined? "<strong>Estimate:</strong>" : "<strong>Assistance:</strong>"} ${elementoDetails.assistance == undefined? elementoDetails.estimate : elementoDetails.assistance} </p>
                <p><strong>Price:</strong> $ ${elementoDetails.price}</p>
                <p><strong>Date:</strong> ${elementoDetails.date}</p>
            </div>
        </div>`

    container.innerHTML = htmlString
})