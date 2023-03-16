/* constantes capturadas y variables */

const Events = data.events
const PastEvents = []
const currentDate = data.currentDate
let categoriasEventos = []
let CategoryString = ""

const ContenedorTarjetas = document.getElementById("ContenedorTarjetas")
const inputTexto = document.querySelector("input[type='search']")
const checkContainer = document.getElementById("checkbox_category")


/* Llamadas*/

filtroDeEventosPasados(Events, currentDate)
AgregarTarjetas(PastEvents)

PastEvents.forEach(element => {
    if (categoriasEventos.includes(element.category)) {
        console.log(categoriasEventos);
    } else {
        categoriasEventos.push(element.category)
    }
});
CrearCheckbox(categoriasEventos)


/* Eventos */

inputTexto.addEventListener('input', superFiltro)
checkContainer.addEventListener("change", superFiltro)

/* Funciones */

function superFiltro() {
    let primerFiltro = FiltrarPorTexto(PastEvents,inputTexto.value)
    console.log(primerFiltro);
    let segundoFiltro = FiltrarPorCategorias(primerFiltro)
    console.log(segundoFiltro);
    AgregarTarjetas(segundoFiltro)
}

function FiltrarPorTexto(array, texto) {
    let arrayFiltradoPorTexto = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltradoPorTexto
}

function FiltrarPorCategorias(array) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayCheckboxes = Array.from(checkboxes)
    console.log(arrayCheckboxes);
    let checksCheckeados = arrayCheckboxes.filter(check => check.checked)
    console.log(checksCheckeados)
    if (checksCheckeados.length == 0) {
        return array;
    }
    let categoriasMarcadas = checksCheckeados.map(check => check.value)
    let arrayFiltradoPorCategorias = array.filter(elemento => {
    return categoriasMarcadas.some(categoria => elemento.category.includes (categoria));
    })
    return arrayFiltradoPorCategorias
}

function AgregarTarjetas(array) {
    let cardString = ""
    if (array.length == 0) {
        ContenedorTarjetas.innerHTML = "<h2 class='display-1' fw-bolder >No hay eventos que coincidan con su búsqueda!</h2>"
        return array
    }
    for (elemento of array) {
        cardString +=
        `<div class="card">
            <img src= ${elemento.image} class="card-img-top" alt="Foto del evento">
            <div class="card-body">
                <h5 class="card-title">${elemento.name}</h5>
                <p class="card-text">${elemento.description}</p>
                <div class="space-between_inCard">
                    <a href="#" class="btn btn-light btn-sm">Price: $${elemento.price}</a>
                    <a href="Details.html?id=${elemento._id}" class="btn btn-primary btn-sm">See more</a>
                </div>
            </div>
        </div>`
    }
    ContenedorTarjetas.innerHTML = cardString
}

function CrearCheckbox(array) {
    for (category of array) {
        CategoryString +=
        `<div class="category">
            <input type="checkbox" name=${category} id=${category}  value=${category} />
            <label for=${category}>${category}</label>
        </div>`
    }
    checkContainer.innerHTML = CategoryString
}

function filtroDeEventosPasados() {
    for (let i=0; i < Events.length; i++){
        if (Events[i].date < currentDate) {
        PastEvents.push (Events[i])
        }
    }
    return console.log(PastEvents);
}