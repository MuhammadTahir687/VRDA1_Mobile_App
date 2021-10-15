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
const getallcommission = async () => {
    const Test = await get_request("/api/get-commission-report/all");
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
const sendProcessWithdraw = async (body) => {
    const Test = await post_request({ target: "/api/post-withdraw-funds", body: body });
    return Test
}
const sendProcessTransfer = async (body) => {
    const Test = await post_request({ target: "/api/transfer-funds", body: body });
    return Test
}
const getMyPurchase = async () => {
    const Test = await get_request("/api/purchase-report");
    return Test
}
const getOwnershipPurchase = async () => {
    const Test = await get_request("/api/own-purchase-report");
    return Test
}
const getTeamSale = async () => {
    const Test = await get_request("/api/team-sale");
    return Test
}
const getPurchaseRequest = async () => {
    const Test = await get_request("/api/my-requests");
    return Test
}
const getTransferHistory = async () => {
    const Test = await get_request("/api/my-transfers");
    return Test
}
const getReceiveHistory = async () => {
    const Test = await get_request("/api/my-receiving");
    return Test
}
const getWithdrawHistory = async () => {
    const Test = await get_request("/api/withdrawals");
    return Test
}
const getPersonalDetail = async () => {
    const Test = await get_request("/api/profile");
    return Test
}
const getBankDetail = async () => {
    const Test = await get_request("/api/bank-update");
    return Test
}
// const getAccountBalance = async (link) => {
//     const Test = await get_request("/api/home" + link);
//     return Test
// }
export {LoginApi,getDashboard,getShop,sendShopPayment,sendShopSubmit,getcommissionlogs,getactivityfeed,getcommissiondirect,getcommissionbinary,getallcommission,getwithdrawfunds,gettransferfunds,sendProcessWithdraw,sendProcessTransfer,getMyPurchase,getOwnershipPurchase,getTeamSale,getPurchaseRequest,getTransferHistory,getReceiveHistory,getWithdrawHistory,getPersonalDetail,getBankDetail}
