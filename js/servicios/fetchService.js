export class FetchService
{
    constructor(urlServidor)
    {
        this.urlServidor = urlServidor;
    }

    mostrar()
    {
        return fetch(this.urlServidor) 
            .then(respuesta => respuesta.json()) 
    }

    insertar()
    {
        fetch(this.urlServidor, {
            method: 'POST'
        })
    }
}