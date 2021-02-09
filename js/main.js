import {FetchService} from "./servicios/fetchService.js";
const service = new FetchService("http://localhost:8080/EmprInfRs_MachadoAngela/webresourcesAngela/tienda");

const templateTienda = document.querySelector("#tempTienda");
const  divTiendas = document.querySelector("#tiendas");

service.mostrar().then(mostrarTiendas);

function mostrarTiendas(tiendas)
{
    console.log
    tiendas.forEach(tienda => {
        const divTienda = templateTienda.content.cloneNode(true);

        divTienda.querySelector(".nombreTienda").textContent = tienda.nombreTienda;

        divTiendas.appendChild(divTienda);
        
    });
}