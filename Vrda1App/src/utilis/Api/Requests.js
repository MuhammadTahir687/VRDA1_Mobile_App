import axios from "axios";
import { instance, instance_P, instance_Vreit } from "./instance";
const post_request = async ({ target, body }) => {
    try {
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
        const response = await instance.get(target)
        console.log("get response", response.data);
        var res = response
        return res

    } catch (error) {
        console.log("get error", error);
        return "Error"
    }
}

const get_request_P = async (target) => {
    try {
        const response = await instance_P.get(target)
        console.log("get response", response.data);
        var res = response
        return res
    } catch (error) {
        console.log("get error", error);
        return "Error"
    }
}
const get_request_Vreit = async (target) => {
    try {
        const response = await instance_Vreit.get(target)
        console.log("get response", response.data);
        var res = response
        return res
    } catch (error) {
        console.log("get error", error);
        return "Error"
    }
}

export { post_request, get_request, get_request_P, get_request_Vreit }
