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
        service.mostrar().then(mostrarTiendas);
    });
    
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

function addTienda(event)
{
    event.preventDefault(); //cancela su comportamiento por defecto

    let inputs = [...formularioAdd.querySelectorAll(`input[type="text"]`)];
    let validacion = inputs.map(validarCampo); //devulve true o false si el campo esta bien o mal
    
    if (validacion.some(v => !v)) //si hay algun falso salimos de lsa funcion
        return;

    let tienda = {};
    inputs.forEach(input => {
        tienda[input.name] = input.value;
    });

    service.insertar(tienda).then(mostrarTiendas);
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

function buscarTienda(event)
{
    event.preventDefault();

    let id = formularioBuscar.querySelector("input");

    if (!validarCampo(id))
        return;

    service.buscar(id.value)
        .then((tienda) => {
            mostrarTiendas([tienda]);
        })
        .catch(() => {
            sinResultados();
        })
}

function sinResultados()
{
    vaciarContenedor(divTiendas);

    let h2 = document.createElement("h2");
    h2.textContent = "Tienda no encontrada";

    divTiendas.appendChild(h2);
}