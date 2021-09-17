import { post_request, get_request, get_request_P, get_request_Vreit } from "./Requests";

const Import_vallet = async (body) => {
    const Test = await post_request({ target: "/importWallet", body: body });
    return Test
}
const createWallet = async (body) => {
    const Test = await post_request({ target: "/createWallet", body: body });
    return Test
}

const createAccount = async (body) => {
    const Test = await post_request({ target: "/createAccount", body: body });
    return Test
}

const getAccountBalance = async (link) => {
    const Test = await get_request("/getAccountBalance/" + link);
    return Test
}

const getBtcBalance = async (link) => {
    const Test = await get_request("/getBtcBalance/" + link);
    return Test
}
const getPrice = async (link) => {
    const Test = await get_request_P("/data/price?fsym=" + link + "&tsyms=USD");
    return Test
}
const getBtcTx = async (link) => {
    const Test = await get_request("/getBtcTx/" + link);
    return Test
}

const getTx = async (link) => {
    const Test = await get_request("/getTx/" + link);
    return Test
}
const getUsdtBalance = async (link) => {
    const Test = await get_request("/getUsdtBalance/" + link);
    return Test
}
const getGasPrice = async (link) => {
    const Test = await get_request("/getGasPrice");
    return Test
}
const sendUSDT = async (body) => {
    const Test = await post_request({ target: "/createUsdtTransaction", body: body });
    return Test
}
const sendBtc = async (body) => {
    const Test = await post_request({ target: "/sendBtc", body: body });
    return Test
}
const sendEth = async (body) => {
    const Test = await post_request({ target: "/createTransaction", body: body });
    return Test
}
const getVreitBalance = async (link) => {
    const Test = await get_request("/getVreitBalance/" + link);
    return Test
}
const sendVriet = async (body) => {
    const Test = await post_request({ target: "/createVreitTransaction", body: body });
    return Test
}
const getVreitPrice = async () => {
    const Test = await get_request_Vreit("/api/token-price");
    return Test
}
export { Import_vallet, createWallet, getAccountBalance, createAccount, getBtcBalance, getPrice, getBtcTx, getTx, getUsdtBalance, getGasPrice, sendUSDT, sendEth, sendBtc, getVreitBalance, sendVriet , getVreitPrice}