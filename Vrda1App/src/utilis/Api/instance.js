import axios from "axios";
const instance = axios.create({
    baseURL: "https://wallet.vrda1.net", 
    // timeout: 1000,
    // headers: {}
});

const instance_P = axios.create({
    baseURL: "https://min-api.cryptocompare.com", 
    timeout: 1000,
    // headers: {}
});
const instance_Vreit = axios.create({
    baseURL: "https://vrda1.net", 
    // timeout: 1000,
    // headers: {}
});

export { instance, instance_P, instance_Vreit }
