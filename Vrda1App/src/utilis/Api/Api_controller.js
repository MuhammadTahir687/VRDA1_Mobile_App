import { post_request, get_request,} from "./Requests";

const LoginApi = async (body) => {
    const Test = await post_request({ target: "/api/login", body: body });
    return Test
}
const getDashboard = async () => {
    const Test = await get_request("/api/home");
    return Test
}
const getShop = async () => {
    const Test = await get_request("/api/buy-a-package");
    return Test
}
const sendShopPayment = async (body) => {
    const Test = await post_request({ target: "/api/get-payment-form", body: body });
    return Test
}
const sendShopSubmit = async (body) => {
    const Test = await post_request({ target: "/api/shop-proceed-payments", body: body });
    return Test
}
const getcommissionlogs = async () => {
    const Test = await get_request("/api/closing-commissions-logs");
    return Test
}
const getactivityfeed = async () => {
    const Test = await get_request("/api/activity-feeds");
    return Test
}
const getcommissiondirect = async () => {
    const Test = await get_request("/api/get-commission-report/direct");
    return Test
}
const getcommissionbinary = async () => {
    const Test = await get_request("/api/get-commission-report/binary");
    return Test
}
const getwithdrawfunds = async () => {
    const Test = await get_request("/api/withdraw-funds");
    return Test
}
const gettransferfunds = async () => {
    const Test = await get_request("/api/transfer-funds");
    return Test
}

// const getAccountBalance = async (link) => {
//     const Test = await get_request("/api/home" + link);
//     return Test
// }
export {LoginApi,getDashboard,getShop,sendShopPayment,sendShopSubmit,getcommissionlogs,getactivityfeed,getcommissiondirect,getcommissionbinary,getwithdrawfunds,gettransferfunds}
