/* constantes capturadas y variables */

const Events = data.events;
let categoriasEventos = []
const ContenedorTarjetas = document.getElementById("ContenedorTarjetas")
const inputTexto = document.querySelector("input[type='search']")
const checkContainer = document.getElementById("checkbox_category")

let cardString = ""
let CategoryString = ""

Events.forEach(element => {
    if (categoriasEventos.includes(element.category)) {
        return;
    } else {
        categoriasEventos.push(element.category)
    }
});

AgregarTarjetas(Events)
CrearCheckbox(categoriasEventos)


/* Eventos */

inputTexto.addEventListener('input', superFiltro)

checkContainer.addEventListener("change", superFiltro)


/* Funciones */

function superFiltro() {
    let primerFiltro = FiltrarPorTexto(Events,input.value)
    let segundoFiltro = FiltrarPorCategorias(primerFiltro)
    AgregarTarjetas(segundoFiltro)
}

function FiltrarPorTexto(array, texto) {
    let arrayFiltradoPorTexto = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltradoPorTexto
}

function FiltrarPorCategorias(array) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayCheckboxes = Array.from(checkboxes)
    let checksCheckeados = arrayCheckboxes.filter(check => check.checked)
    if (checksCheckeados.length == 0) {
        return array
    }
    let categoriasMarcadas = checksCheckeados.map(check => check.value)
    let arrayFiltradoPorCategorias = array.filter(elemento => categoriasMarcadas.includes(elemento.category))
    return arrayFiltradoPorCategorias
}

function AgregarTarjetas(arrayEvents) {
    if (arrayEvents.length == 0) {
        ContenedorTarjetas.innerHTML = "<h2 class='display-1' fw-bolder >No hay eventos que coincidan con su búsqueda!</h2>"
        return
    }
    for (elemento of arrayEvents) {
        cardString +=
        `<div class="card">
            <img src= ${elemento.image} class="card-img-top" alt="Foto del evento">
            <div class="card-body">
                <h5 class="card-title">${elemento.name}</h5>
                <p class="card-text">${elemento.description}</p>
                <div class="space-between_inCard">
                    <a href="#" class="btn btn-light btn-sm">Price: $${elemento.price}</a>
                    <a href="Details.html?id=${elemento.id}" class="btn btn-primary btn-sm">See more</a>
                </div>
            </div>
        </div>`
    }
    ContenedorTarjetas.innerHTML = cardString
}

function CrearCheckbox(arrayCategorias) {
    for (category of arrayCategorias) {
        CategoryString +=
        `<div class="category">
            <input type="checkbox" name=${category} id=${category}  value=${category}/>
            <label for=${category}>${category}</label>
        </div>`
    }
    checkContainer.innerHTML = CategoryString
}