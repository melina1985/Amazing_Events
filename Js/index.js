const Events = data.events;

let ContenedorTarjetas = document.getElementById("ContenedorTarjetas")
let cardString = ""
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
                    <a href="Details.html?id=${elemento.id}" class="btn btn-primary btn-sm">See more</a>
                </div>
            </div>
        </div>`
    }    
}

AgregarTarjetas(Events)
ContenedorTarjetas.innerHTML = cardString

let categoriasEventos = []
Events.forEach(element => {
    if (categoriasEventos.includes(element.category)) {
        console.log(categoriasEventos);
    } else {
        categoriasEventos.push(element.category)
    }
});

console.log(categoriasEventos);


let FormCategorias = document.getElementById("checkbox_category")
let CategoryString = ""

function CrearCheckbox(arrayCategorias) {
    for (category of arrayCategorias) {
        CategoryString +=
        `<div class="category">
            <input type="checkbox" name=${category} id=${category}  value=${category}/>
            <label for=${category}>${category}</label>
        </div>`
    }
}
CrearCheckbox(categoriasEventos)
FormCategorias.innerHTML = CategoryString

/* agregar eventos tipo click y filtros a cada categoria */

const divCategory = document.getElementsByClassName("category")
const formularioCategorias = document.forms[0]

formularioCategorias.addEventListener("click", (accion) =>{
    accion.preventDefault()
    FiltroPorCategoria(input.value)
})

function FiltroPorCategoria(categoria) {
    Events.filter((evento) => evento.category == categoria)
}