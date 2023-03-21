let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

const celdaEventoConMayorPorcentajeDeAsistencia = document.getElementById("Event_with_the_highest_percentage_of_attendance")

const celdaEventoConMenorPorcentajeDeAsistencia = document.getElementById("Event_with_the_lowest_percentage_of_attendance")

const celdaEventoConMayorCapacidad = document.getElementById("Event_with_larger_capacity")

const Tabla2UpcomingEvents = document.getElementById("Tabla2")
const Tabla3PastEvents = document.getElementById("Tabla3")

let PastEvents = []
let UpcomingEvents = []

fetch(urlApi)
.then(response => response.json())
.then (datos => {
    const Events = datos.events
    const currentDate = datos.currentDate;
    

    function filtroDeEventosPasados() {
        for (let i=0; i < Events.length; i++){
            if (Events[i].date < currentDate) {
            PastEvents.push (Events[i])
            }
        }
        return;
    }
    
    filtroDeEventosPasados(Events, currentDate)
    
    PastEvents.sort((a,b) => {
        if (a.assistance * 100 / a.capacity > b.assistance * 100 / b.capacity) {
            return -1;
        }
        if (a.assistance * 100 / a.capacity < b.assistance * 100 / b.capacity) {
            return 1;
        }
        return 0;
    })

    function PorcentajeDeAsistencia(array, position) {
        return array[position].assistance*100/array[position].capacity
    }

    celdaEventoConMayorPorcentajeDeAsistencia.innerHTML = `${PastEvents[0].name} (${PorcentajeDeAsistencia(PastEvents, 0).toFixed(2)} %)`
    celdaEventoConMenorPorcentajeDeAsistencia.innerHTML = `${PastEvents[PastEvents.length - 1].name} (${PorcentajeDeAsistencia(PastEvents, PastEvents.length-1).toFixed(2)} %)`
    
    PastEvents.sort((a,b) => {
        if (a.capacity > b.capacity) {
            return -1;
        }
        if (a.capacity < b.capacity) {
            return 1;
        }
        return 0;
    })
    celdaEventoConMayorCapacidad.innerHTML =  `${PastEvents[0].name} (${PastEvents[0].capacity})`
    

    function filtroDeEventosFuturos() {
        for (let i=0; i < Events.length; i++){
            if (Events[i].date > currentDate) {
            UpcomingEvents.push (Events[i])
            }
        }
        return;
    }
    filtroDeEventosFuturos(Events, currentDate)

    function SumarIngresosPorCategoria(array) {
        let ingresos = 0
        for (let i=0; i < array.length; i++){
            ingresos += parseInt(array[i].assistance) * parseInt(array[i].price)   
        }
        return ingresos;
    }

    function SumarEstimadosIngresosPorCategoria(array) {
        let ingresosEstimados = 0
        for (let i=0; i < array.length; i++){
            ingresosEstimados += parseInt(array[i].estimate) * parseInt(array[i].price)   
        }
        return ingresosEstimados;
    }

    function PorcentajeDeAsistenciaPorCategoria(array) {
        let porcentaje = 0
        for (let i=0; i < array.length; i++){
            porcentaje += parseInt(array[i].assistance) * 100 / parseInt(array[i].capacity)
        }
        return porcentaje / array.length;
    }

    function PorcentajeDeAsistenciaEstimadaPorCategoria(array) {
        let porcentaje = 0
        for (let i=0; i < array.length; i++){
            porcentaje += parseInt(array[i].estimate) * 100 / parseInt(array[i].capacity)
        }
        return porcentaje / array.length;
    }


    let EventosFuturosFiltradosFood = UpcomingEvents.filter(evento => evento.category == "Food")
    let EventosFuturosFiltradosMuseum = UpcomingEvents.filter(evento => evento.category == "Museum")
    let EventosFuturosFiltradosConcert = UpcomingEvents.filter(evento => evento.category == "Concert")
    let EventosFuturosFiltradosRace = UpcomingEvents.filter(evento => evento.category == "Race")
    let EventosFuturosFiltradosBooks = UpcomingEvents.filter(evento => evento.category == "Books")
    let EventosFuturosFiltradosParty = UpcomingEvents.filter(evento => evento.category == "Party")

    let EventosPasadosFiltradosFood = PastEvents.filter(evento => evento.category == "Food")
    let EventosPasadosFiltradosMuseum = PastEvents.filter(evento => evento.category == "Museum")
    let EventosPasadosFiltradosConcert = PastEvents.filter(evento => evento.category == "Concert")
    let EventosPasadosFiltradosRace = PastEvents.filter(evento => evento.category == "Race")
    let EventosPasadosFiltradosBooks = PastEvents.filter(evento => evento.category == "Books")
    let EventosPasadosFiltradosCinema = PastEvents.filter(evento => evento.category == "Cinema")
    let EventosPasadosFiltradosParty = PastEvents.filter(evento => evento.category == "Party")
    
    Tabla3PastEvents.innerHTML =
        `<tr>
            <th class="header_table" colspan="3"><h4>Past events statistic by category</h4></th>
        </tr>
        <tr>
            <th>Categories</th>
            <th>Reveneus</th>
            <th>Percentage of attendance</th>
        </tr>
        <tr>
            <td>Food</td>
            <td> $ ${SumarIngresosPorCategoria(EventosPasadosFiltradosFood)}</td>
            <td>${PorcentajeDeAsistenciaPorCategoria(EventosPasadosFiltradosFood).toFixed(2)} %</td>
        </tr>
        <tr>
            <td>Museum</td>
            <td> $ ${SumarIngresosPorCategoria(EventosPasadosFiltradosMuseum)}</td>
            <td>${PorcentajeDeAsistenciaPorCategoria(EventosPasadosFiltradosMuseum).toFixed(2)} %</td>
        </tr>
        <tr>
            <td>Concert</td>
            <td> $ ${SumarIngresosPorCategoria(EventosPasadosFiltradosConcert)}</td>
            <td>${PorcentajeDeAsistenciaPorCategoria(EventosPasadosFiltradosConcert).toFixed(2)} %</td>
        </tr>
        <tr>
            <td>Race</td>
            <td> $ ${SumarIngresosPorCategoria(EventosPasadosFiltradosRace)}</td>
            <td>${PorcentajeDeAsistenciaPorCategoria(EventosPasadosFiltradosRace).toFixed(2)} %</td>
        </tr>
        <tr>
            <td>Books</td>
            <td> $ ${SumarIngresosPorCategoria(EventosPasadosFiltradosBooks)}</td>
            <td>${PorcentajeDeAsistenciaPorCategoria(EventosPasadosFiltradosBooks).toFixed(2)} %</td>
        </tr>
        <tr>
            <td>Cinema</td>
            <td> $ ${SumarIngresosPorCategoria(EventosPasadosFiltradosCinema)}</td>
            <td>${PorcentajeDeAsistenciaPorCategoria(EventosPasadosFiltradosCinema).toFixed(2)} %</td>
        </tr>
        <tr>
            <td>Party</td>
            <td> $ ${SumarIngresosPorCategoria(EventosPasadosFiltradosParty)}</td>
            <td>${PorcentajeDeAsistenciaPorCategoria(EventosPasadosFiltradosParty).toFixed(2)} %</td>
        </tr>`


    Tabla2UpcomingEvents.innerHTML =
    `<tr>
    <th class="header_table" colspan="3"><h4>Upcoming events statistics by category</h4></th>
    </tr>
    <tr>
        <th>Categories</th>
        <th>Reveneus</th>
        <th>Percentage of attendance</th>
    </tr>
    <tr>
        <td>Food</td>
        <td> $ ${SumarEstimadosIngresosPorCategoria(EventosFuturosFiltradosFood)}</td>
        <td>${PorcentajeDeAsistenciaEstimadaPorCategoria(EventosFuturosFiltradosFood) .toFixed(2)} %</td>
    </tr>
    <tr>
        <td>Museum</td>
        <td> $ ${SumarEstimadosIngresosPorCategoria(EventosFuturosFiltradosMuseum) }</td>
        <td>${PorcentajeDeAsistenciaEstimadaPorCategoria(EventosFuturosFiltradosMuseum) .toFixed(2)} %</td>
    </tr>
    <tr>
        <td>Concert</td>
        <td> $ ${SumarEstimadosIngresosPorCategoria(EventosFuturosFiltradosConcert) }</td>
        <td>${PorcentajeDeAsistenciaEstimadaPorCategoria(EventosFuturosFiltradosConcert).toFixed(2)} %</td>
    </tr>
    <tr>
        <td>Race</td>
        <td> $ ${SumarEstimadosIngresosPorCategoria(EventosFuturosFiltradosRace)}</td>
        <td>${PorcentajeDeAsistenciaEstimadaPorCategoria(EventosFuturosFiltradosRace).toFixed(2)} %</td>
    </tr>
    <tr>
        <td>Books</td>
        <td> $ ${SumarEstimadosIngresosPorCategoria(EventosFuturosFiltradosBooks)}</td>
        <td>${PorcentajeDeAsistenciaEstimadaPorCategoria(EventosFuturosFiltradosBooks).toFixed(2)} %</td>
    </tr>
    <tr>
        <td>Party</td>
        <td> $ ${SumarEstimadosIngresosPorCategoria(EventosFuturosFiltradosParty)}</td>
        <td>${PorcentajeDeAsistenciaEstimadaPorCategoria(EventosFuturosFiltradosParty).toFixed(2)} %</td>
    </tr>`
})