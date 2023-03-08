const UpcomingEvents = []
const currentDate = data.currentDate
const Events = data.events

let ContenedorTarjetas = document.getElementById("ContenedorTarjetas")
let cardString = ""

function filtroDeEventosFuturos() {
    for (let i=0; i < Events.length; i++){
        if (Events[i].date > currentDate) {
        UpcomingEvents.push (Events[i])
        }
    }
    return console.log(UpcomingEvents)
}

function AgregarTarjetas(arrayEvents) {
    for (elemento of arrayEvents) {
        cardString +=
        `<div class="card">
            <img src= ${elemento.image} class="card-img-top" alt="Foto del evento">
            <div class="card-body">
                <h5 class="card-title">${elemento.name}</h5>
                <p class="card-text">${elemento.description}</p>
                <div class="space-between_inCard">
                    <a href="#" class="btn btn-light btn-sm">Price: $${elemento.price}</a>
                    <a href="See_More.html" class="btn btn-primary btn-sm">See more</a>
                </div>
            </div>
        </div>`
    }    
}

filtroDeEventosFuturos(Events, currentDate)
AgregarTarjetas(UpcomingEvents)
ContenedorTarjetas.innerHTML = cardString
