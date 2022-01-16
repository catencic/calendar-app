
const baseUrl = process.env.REACT_APP_API_URL;


const fetchSinToken = (endpoint , data , method = "GET") =>{

    const url = `${baseUrl}/${endpoint}`; //http://localhost:4000/api/---------

    if(method === "GET"){
        return fetch(url); // si es un get retornamos lo que nos devuelve el api de fetch
    }else{
        return fetch(url,{  // si no debemos configurar la petición
             method,  //se le indica el metdodo
             headers: {   //se envia el headers
                 'Content-Type': 'application/json'  
             },
             body: JSON.stringify(data)
        });
    }

}


export {
    fetchSinToken
}