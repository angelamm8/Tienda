import {FetchService} from "./servicios/fetchService.js";

const service = new FetchService("http://localhost:8080/EmprInfRs_MachadoAngela/webresourcesAngela/tienda");

service.mostrar().then(tiendas => console.log(tiendas));