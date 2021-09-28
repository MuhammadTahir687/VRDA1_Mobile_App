import axios from "axios";
const instance = axios.create({
    baseURL: "https://staging.vrda1.net",
    timeout: 1000,
    // headers: {}
});


export { instance }
