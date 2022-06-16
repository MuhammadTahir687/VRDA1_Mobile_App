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
    const Test = await get_request("/api/buy-packages-list");
    return Test
}
const sendShopPayment = async (body) => {
    const Test = await post_request({ target: "/api/package-payment-form", body: body });
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
const getMyPurchase = async () => {
    const Test = await get_request("/api/purchase-report");
    return Test
}
const getOwnershipPurchase = async () => {
    const Test = await get_request("/api/own-purchase-report");
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
const getBTCDetail = async () => {
    const Test = await get_request("/api/btc-profile");
    return Test
}
const getUSDTDetail = async () => {
    const Test = await get_request("/api/usdt-profile");
    return Test
}

const sendUpdateBTC = async (body) => {
    const Test = await post_request({ target: "/api/btc-profile-update", body: body });
    return Test
}
const sendUpdateBank = async (body) => {
    const Test = await post_request({ target: "/api/update-bank-info", body: body });
    return Test
}
const sendUpdateProfile = async (body) => {
    const Test = await post_request({ target: "/api/update-info", body: body });
    return Test
}
const sendWithdrawFunds_Charges = async (body) => {
    const Test = await post_request({ target: "/api/get-services-charges", body: body });
    return Test
}
const getVreitTransferC2C = async () => {
    const Test = await get_request("/api/vreit-transfer-customer");
    return Test
}
const getVreitLogs = async (link) => {
    const Test = await get_request("/api/vreits-logs/" + link);
    return Test
}
const getVreitWithdrawl = async () => {
    const Test = await get_request("/api/vreit-points-withdrawal");
    return Test
}
const sendVreitWithdrawl = async (body) => {
    const Test = await post_request({ target: "/api/vreit-amount-swapped-withdrawal", body: body });
    return Test
}
const getVreitQuaterly = async () => {
    const Test = await get_request("/api/quarterly-vreits");
    return Test
}
const sendVreitC2Csubmit = async (body) => {
    const Test = await post_request({ target: "/api/vreit-transfer-process", body: body });
    return Test
}
// const getTeamSale = async () => {
//     const Test = await get_request("/api/team-sale");
//     return Test
// }
const sendTeamSale = async (body) => {
    const Test = await post_request({ target: "/api/search-team-sale", body: body });
    return Test
}
const getVREITDetail = async () => {
    const Test = await get_request("/api/vreit-profile");
    return Test
}
const sendVreitUpdate = async (body) => {
    const Test = await post_request({ target: "/api/vreit-profile-update", body: body });
    return Test
}
const sendUsdtUpdate = async (body) => {
    const Test = await post_request({ target: "/api/usdt-profile-update", body: body });
    return Test
}
const sendVreitShiftedBtn = async (body) => {
    const Test = await post_request({ target: "/api/shift-quarterly-vreit-points", body: body });
    return Test
}
const sendProcessTransferBtn = async (body) => {
    const Test = await post_request({ target: "/api/post-transfer-funds", body: body });
    return Test
}
const sendDeletePackageRequest = async (body) => {
    const Test = await post_request({ target: "/api/delete-requests", body: body });
    return Test
}
const sendBad_NewEmail = async (body) => {
    const Test = await post_request({ target: "/api/send-verify-email", body: body });
    return Test
}

const ChangePasswordApi = async (body) => {
    const Test = await post_request({ target: "/api/change-password	", body: body });
    return Test
}

export {LoginApi,ChangePasswordApi,getDashboard,getShop,sendShopPayment,sendShopSubmit,getcommissionlogs,getactivityfeed,getcommissiondirect,getcommissionbinary,getallcommission,getwithdrawfunds,gettransferfunds,sendProcessWithdraw,getMyPurchase,getOwnershipPurchase,getPurchaseRequest,getTransferHistory,getReceiveHistory,getWithdrawHistory,getPersonalDetail,getBankDetail,getBTCDetail,getUSDTDetail,sendUpdateBTC,sendUpdateBank,sendUpdateProfile,sendWithdrawFunds_Charges,getVreitTransferC2C,getVreitLogs,getVreitWithdrawl,sendVreitWithdrawl,getVreitQuaterly,sendVreitC2Csubmit,sendTeamSale,getVREITDetail,sendVreitUpdate,sendUsdtUpdate,sendVreitShiftedBtn,sendProcessTransferBtn,sendDeletePackageRequest,sendBad_NewEmail}
