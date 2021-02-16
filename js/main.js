var service;
//const url = "http://localhost:8080/EmprInfRs_MachadoAngela/webresourcesAngela/tienda"
const url = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/";
const templateTienda = document.querySelector("#tempTienda");
const  divTiendas = document.querySelector("#tiendas");
const formularioAdd = document.querySelector("#addTienda");
formularioAdd.addEventListener('submit', addTienda);
const formularioBuscar = document.querySelector("#buscarTienda");
formularioBuscar.addEventListener('submit', buscarTienda);
const selectServicio = document.querySelector("#selectServicio");
selectServicio.addEventListener("click", tipoServicio);
let mostradoForm = false;
const newTienda = document.querySelector("#newTienda");
newTienda.addEventListener("click", mostrarOcultarForm);
const divAddForm = document.querySelector("#divAddForm");
var busqueda = false;
const btnBuscar = document.querySelector("#btn-buscar");
btnBuscar.addEventListener("click", comprobarEstadoBusqueda);

/**
 * Comprueba el tipo de servicio para ejecutarlo
 * @param {*} event 
 * @returns void
 */
function tipoServicio(event)
{
    const boton = event.target.closest("button");

    if (!boton)
        return;

    switch (boton.id)
    {
        case "xhr":
            cargarServicio("./servicios/xhrService.js");
            break;
        case "fetch":
            cargarServicio("./servicios/fetchService.js");
            break;
        case "jQuery":
            cargarServicio("./servicios/jQueryService.js");
            break;
    }

    selectServicio.remove();
}

function cargarServicio(ruta)
{
    import(ruta).then(modulo => {
        service = new modulo.default(url);
        mostrarTodas();
    });
    
}

function mostrarTodas()
{
    showLoading();
    service.mostrar()
        .then(mostrarTiendas)
        .catch(() => {
            sinResultados("No se ha podido cargar el servicio");
        })
        .finally(hideLoading);
}

function mostrarOcultarForm()
{
    if (!mostradoForm)
    {
        let height = formularioAdd.offsetHeight;
        divAddForm.style.height = `${height}px`;
        mostradoForm = true;
    }
    else
    {
        divAddForm.style.height = `0px`;
        mostradoForm = false;
    }
}

function mostrarTiendas(tiendas)
{
    vaciarContenedor(divTiendas);

    tiendas.forEach(tienda => {
        const divTienda = templateTienda.content.cloneNode(true);

        divTienda.querySelector(".nombreTienda").textContent = tienda.nombreTienda;
        divTienda.querySelector(".direccionTienda").textContent = tienda.direccion + ` (${tienda.localidad})`;
        divTienda.querySelector(".telefonoTienda").textContent = tienda.telefono;

        divTiendas.appendChild(divTienda);
        
    });
}

function showLoading()
{
    document.querySelector("#loading").classList.add("show");
    divTiendas.style.display = "none";
}

function hideLoading()
{
    document.querySelector("#loading").classList.remove("show");
    divTiendas.style.display = null;
}

function addTienda(event)
{
    const btnAdd = document.querySelector("#btn-add");
    event.preventDefault(); //cancela su comportamiento por defecto

    let inputs = [...formularioAdd.querySelectorAll(`input[type="text"]`)];
    let validacion = inputs.map(validarCampo); //devulve true o false si el campo esta bien o mal
    
    if (validacion.some(v => !v)) //si hay algun falso salimos de lsa funcion
        return;

    let tienda = {};
    inputs.forEach(input => {
        tienda[input.name] = input.value;
        input.value = "";
    });

    btnAdd.disabled = true;
    btnAdd.textContent = "Cargando...";

    service.insertar(tienda)
        .then((ok) => {
            if (ok)
                return service.mostrar().then(mostrarTiendas);
            else
                errorInsertar();
        })
        .finally( () => {
            btnAdd.disabled = false;
            btnAdd.textContent = "Añadir tienda";
        } );
}

function validarCampo(input)
{
    const divError = input.parentElement.querySelector(".error");
    vaciarContenedor(divError);

    if (input.validity.valid)
        return true; //todo está bien

    if (input.validity.valueMissing)
        divError.textContent = "Este campo es obligatorio";
    else if (input.validity.patternMismatch)
        divError.textContent = "Formato incorrecto";
    
    return false;
}

function vaciarContenedor(contenedor)
{
    while (contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function comprobarEstadoBusqueda(event)
{
    if (busqueda) 
    {
        mostrarTodas();
        busqueda = false;
        event.preventDefault(); //para q no se haga un envio del formulario
        
        btnBuscar.innerHTML = `<span class="oi oi-magnifying-glass"></span>`;
        formularioBuscar.querySelector("input").value = "";
    }
}

function buscarTienda(event)
{
    event.preventDefault();

    let id = formularioBuscar.querySelector("input");

    if (!validarCampo(id))
        return;

    showLoading();
    busqueda = true;
    
    btnBuscar.textContent = "Cargando...";
    
    service.buscar(id.value)
        .then((tienda) => {
            mostrarTiendas([tienda]);
        })
        .catch(() => {
            sinResultados("Tienda no encontrada");
        })
        .finally(() => {
            hideLoading();
            btnBuscar.textContent = "X";
        });
}

function sinResultados(mensaje)
{
    vaciarContenedor(divTiendas);

    let h2 = document.createElement("h2");
    h2.textContent = mensaje;

    divTiendas.appendChild(h2);
}

function errorInsertar()
{
    vaciarContenedor(divTiendas);

    let h2 = document.createElement("h2");
    h2.textContent = "Error al insertar";

    divTiendas.appendChild(h2);
}