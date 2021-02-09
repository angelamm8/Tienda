export default class FetchService
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

    insertar(tienda)
    {
        return fetch(this.urlServidor, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tienda)
        })
            .then(respuesta => respuesta.json())
    }

    buscar(id)
    {
        return fetch(`${this.urlServidor}/${id}`) 
            .then(respuesta => respuesta.json()) 
    }
}