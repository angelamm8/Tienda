import {FetchService} from "./servicios/fetchService.js";
const service = new FetchService("http://localhost:8080/EmprInfRs_MachadoAngela/webresourcesAngela/tienda");

const templateTienda = document.querySelector("#tempTienda");
const  divTiendas = document.querySelector("#tiendas");
const formulario = document.querySelector("#addTienda");
formulario.addEventListener('submit', addTienda);

service.mostrar().then(mostrarTiendas);

function mostrarTiendas(tiendas)
{
    vaciarContenedor(divTiendas);
    
    tiendas.forEach(tienda => {
        const divTienda = templateTienda.content.cloneNode(true);

        divTienda.querySelector(".nombreTienda").textContent = tienda.nombreTienda;

        divTiendas.appendChild(divTienda);
        
    });
}

function addTienda(event)
{
    event.preventDefault(); //cancela su comportamiento por defecto

    let inputs = [...formulario.querySelectorAll(`input[type="text"]`)];
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
    if (input.validity.valid)
        return true; //todo está bien

    return false;
}

function vaciarContenedor(contenedor)
{
    while (contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);
    }
}