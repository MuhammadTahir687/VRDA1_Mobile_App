import {get_data} from "../AsyncStorage/Controller";
import axios from "axios";
const post_request = async ({ target, body }) => {
    try {
        let ACCOUNT_DATA = await get_data("ACCOUNT_DATA")
        let token=ACCOUNT_DATA!==null?{'Authorization':'Bearer '+ACCOUNT_DATA}:null
        const instance = axios.create({baseURL: "https://staging.vrda1.net",  headers: token});
        const response = await instance.post(target, body)
        console.log("post response", response.data);
        return response
    } catch (error) {
        console.log("post error", error);
        return "Error"
    }
}
const get_request = async (target) => {
    try {
        let ACCOUNT_DATA = await get_data("ACCOUNT_DATA")
        let token=ACCOUNT_DATA!==null?{'Authorization' :"Bearer "+ACCOUNT_DATA}:null
        const instance = axios.create({baseURL: "https://staging.vrda1.net", headers: token});
        const response = await instance.get(target)
        console.log("get response", response.data);
        const res = response
        return res
    } catch (error) {
        console.log("get error", error);
        return "Error"
    }
}
export { post_request, get_request }
