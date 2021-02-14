export default class xhrService
{
    constructor(urlServidor)
    {
        this.urlServidor = urlServidor;
    }

    mostrar()
    {
        return new Promise((resolve, reject) => {
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", () => {
                try 
                {
                    let data = JSON.parse(oReq.responseText);
                    resolve(data);
                }
                catch (ex)
                {
                    reject(ex);
                }
            });
            oReq.open("GET", this.urlServidor);
            oReq.send();
        });
    }

    insertar(tienda)
    {
        return new Promise((resolve, reject) => {
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", () => {
                try 
                {
                    if (oReq.status >= 200 && oReq.status <= 299)
                        resolve(true);
                    else 
                        resolve(false);

                    //resolve(oReq.status >= 200 && oReq.status <= 299);
                }
                catch (ex)
                {
                    reject(ex);
                }
            });
            oReq.open("POST", this.urlServidor);
            oReq.setRequestHeader('Content-Type', 'application/json');
            oReq.send(JSON.stringify(tienda));
        });
    }

    buscar(id)
    {
        return new Promise((resolve, reject) => {
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", () => {
                try 
                {
                    let data = JSON.parse(oReq.responseText);
                    resolve(data);
                }
                catch (ex)
                {
                    reject(ex);
                }
            });
            oReq.open("GET", `${this.urlServidor}/${id}`);
            oReq.send();
        });
    }
}