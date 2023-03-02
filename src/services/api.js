import axios from "axios";


//base url api viacep.com.br/ws/ 


const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});


export default api;