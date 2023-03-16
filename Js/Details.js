const queryString = location.search
let params = new URLSearchParams(queryString)
let id = params.get("id")
const Events = data.events

console.log(Events);

let elementoDetails = Events.find((elemento) => elemento._id == id)

const container = document.getElementById("container-detail");
let htmlString ="";

htmlString +=
    `<div class="card-img-left">
        <div class="div-img-card-left">
            <img src="${elementoDetails.image}" alt="${elementoDetails.name}" width:"100%">
        </div>
        <div class="card-body-Details">
            <h5 class="card-title">${elementoDetails.name}</h5>
            <p class="card-text-center" class="card-text">${elementoDetails.description}</p>
            <p class="card-text">Category: ${elementoDetails.category}</p>
            <p class="card-text">Capacity: ${elementoDetails.capacity}</p>
            <p class="card-text">Assistance / Estimate: ${elementoDetails.assistance} || ${elementoDetails.estimate} </p>
            <div class="space-between_inCard">
                <a href="#" class="btn btn-light btn-sm">Price: $${elementoDetails.price}</a>
                <p class="card-text">Date: ${elementoDetails.date}</p>
            </div>
        </div>
    </div>`

container.innerHTML = htmlString


/* No encuentro el error */