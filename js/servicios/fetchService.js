export class FetchService
{
    constructor(urlServidor)
    {
        this.urlServidor = urlServidor;
    }

    mostrar()
    {
        return fetch(this.urlServidor) //devuelve una promesa
            .then(respuesta => respuesta.json()) //se ejecuta cuando haya resuelto la promesa
            .catch(error => console.log("ha ocurrido un error: ", error))
    }
}