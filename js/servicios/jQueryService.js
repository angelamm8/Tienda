export default class jQueryService
{
    constructor(urlServidor)
    {
        this.urlServidor = urlServidor;

        if (!window.jQuery)
        {
            throw new Error("Este servicio necesita de jQuery");
        }
    }

    mostrar()
    {
        //resolve es una funcion que se llama cuando tenemos resultados
        return new Promise((resolve) => {
            $.get(this.urlServidor, (data) => {
                resolve(data);
            })
        });
    }

    insertar(tienda)
    {
        return new Promise((resolve) => {
            $.ajax({
                type: "POST",
                url: this.urlServidor,
                data: JSON.stringify(tienda),
                success: () => resolve(true),
                error: () => resolve(false),
                contentType: 'application/json'
            })
        });
    }

    buscar(id)
    {
        return new Promise((resolve, reject) => {
            $.get(`${this.urlServidor}/${id}`)
            .done((data) => {
                resolve(data);
            })
            .fail(reject)
        });
    }
}