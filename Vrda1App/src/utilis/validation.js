export const loginValidation = (email,password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email === '') {
        return {
            valid: false,
            errors: email === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(email) === false) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Email format is invalid" : null
        }
    }
    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else if (password.length < 6) {
        return {
            valid: false,
            errors: password.length < 6 ? "Password must should contain 6 digits" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}
export const ShopValidation = (fileName,imageSourceData) => {
    if (fileName === ''){
        return {
            valid: false,
            errors: fileName === '' ? "Please Add Image First" : null
        }
    }else if (imageSourceData === null) {
        return {
            valid: false,
            errors: imageSourceData === null ? "Please Add Image First" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const processWithdrawValidation = (amount,selectedValue,detail) => {
    if (selectedValue==="bank"){
        var value=500
    }else {
        var value=200
    }
    if (amount === ''){
        return {
            valid: false,
            errors: amount === '' ? "Please Enter Amount" : null
        }
    }else if (amount < value) {
        return {
            valid: false,
            errors: amount < value ? `Minimum Amount is ${value}` : null
        }

    }
    else if (amount < selectedValue ==="usdt"?200:"") {
        return {
            valid: false,
            errors: amount < selectedValue ==="usdt"?200:"" ? "Minimum Amount is 200" : null
        }
    }else if (amount > 5000) {
        return {
            valid: false,
            errors: amount > 5000 ? "Maximum Amount is 5000" : null
        }
    }else if (selectedValue === "") {
        return {
            valid: false,
            errors: selectedValue === "" ? "Please Select Value" : null
        }
    }else if (selectedValue === null) {
        return {
            valid: false,
            errors: selectedValue === null ? "Please Select Value" : null
        }
    }else if (detail === '') {
        return {
            valid: false,
            errors: detail === '' ? "Please Enter Details" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const processTransferValidation = (amount,selectedValue,detail,value) => {
    if (selectedValue === "") {
        return {
            valid: false,
            errors: selectedValue === "" ? "Please Select Value" : null
        }
    }else if (selectedValue === null) {
        return {
            valid: false,
            errors: selectedValue === null ? "Please Select Value" : null
        }
    }else if (selectedValue === "Please Select") {
        return {
            valid: false,
            errors: selectedValue === "Please Select" ? "Please Select Value" : null
        }
    }else if (amount === ''){
        return {
            valid: false,
            errors: amount === '' ? "Please Enter Amount" : null
        }
    }else if (amount < 100) {
        return {
            valid: false,
            errors: amount < 100 ? "Minimum Amount is 100" : null
        }
    }else if (amount > value) {
        return {
            valid: false,
            errors: amount > value ? "Amount is exceeded" : null
        }
    }else if (detail === '') {
        return {
            valid: false,
            errors: detail === '' ? "Please Enter Details" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const BuyValidation = (walletAmount,packagePrice) => {
    if (walletAmount === ''){
        return {
            valid: false,
            errors: walletAmount === ''? "insuffient Balance" : null
        }
    }else if (packagePrice > walletAmount) {
        return {
            valid: false,
            errors: packagePrice > walletAmount? "insuffient Balance" : null
        }
    } else{
        return { valid: true, errors: null }
    }
}
export const UpdateBtcvalid = (fileName,imageSourceData,btcAddress) => {
    if (btcAddress === "") {
        return {
            valid: false,
            errors: btcAddress === "" ? "Please Enter Address" : null
        }
    }else if (btcAddress.length < 16) {
        return {
            valid: false,
            errors: btcAddress.length < 16 ?"Btc address must be 16": null
        }
    } else if (fileName === ''){
        return {
            valid: false,
            errors: fileName === '' ? "Please Add Image First" : null
        }
    }else if (imageSourceData === null) {
        return {
            valid: false,
            errors: imageSourceData === null ? "Please Add Image First" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const UpdateBankValidation = (fullName,bankname,branchname,accountNumber,phonenumber,completeAdd,country) => {
    if (fullName === "") {
        return {
            valid: false,
            errors: fullName === "" ? "Name is Required" : null
        }
    }else if (bankname === "") {
        return {
            valid: false,
            errors: bankname === "" ? "Bank Name is Required" : null
        }
    }else if (branchname === "") {
        return {
            valid: false,
            errors: branchname === "" ? "Branch Name is Required" : null
        }
    }else if (accountNumber === "") {
        return {
            valid: false,
            errors: accountNumber === "" ? "Account# is Required" : null
        }
    }else if (phonenumber === "") {
        return {
            valid: false,
            errors: phonenumber === "" ? "Phone# is Required" : null
        }
    }else if (phonenumber.length < 8 ) {
        return {
            valid: false,
            errors: phonenumber.length < 8 ? "The phone number must be at least 8 characters." : null
        }
    }else if (completeAdd === "") {
        return {
            valid: false,
            errors: completeAdd === "" ? "Address is Required" : null
        }
    }else if (country === "") {
        return {
            valid: false,
            errors: country === "" ? "Country is Required" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const UpdateProfileValidation = (address,city,identity,passport,kinname,kinrelation) => {

    if (address === "") {
        return {
            valid: false,
            errors: address === "" ? "Address is Required" : null
        }
    }else if (address.length < 3) {
        return {
            valid: false,
            errors: address.length < 3 ? "Address length at least 3" : null
        }
    }else if (city === "") {
        return {
            valid: false,
            errors: city === "" ? "City is Required" : null
        }
    }else if (city.length < 3) {
        return {
            valid: false,
            errors: city.length < 3 ? "City length at least 3" : null
        }
    }else if (identity === "") {
        return {
            valid: false,
            errors: identity === "" ? "Identity is Required" : null
        }
    }else if (identity.length < 3 ) {
        return {
            valid: false,
            errors: identity.length < 3 ? "Identity length at least 3" : null
        }
    }else if (passport === "") {
        return {
            valid: false,
            errors: passport === "" ? "Passport is Required" : null
        }
    }else if (passport.length < 3) {
        return {
            valid: false,
            errors: passport.length < 3 ? "Passport length at least 3" : null
        }
    }else if (kinname === ''){
        return {
            valid: false,
            errors: kinname === '' ? "Kin Name is Required" : null
        }
    }else if (kinname.length < 3) {
        return {
            valid: false,
            errors: kinname.length < 3 ? "Kin Name length at least 3" : null
        }
    }else if (kinrelation === "") {
        return {
            valid: false,
            errors: kinrelation === "" ? "Kin Relation is Required" : null
        }
    }else if (kinrelation.length < 3) {
        return {
            valid: false,
            errors: kinrelation.length < 3 ? "Kin Relation length at least 3" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const VreitWithdrawlValidation = (amount,exceedAmount) => {
    if (amount === "") {
        return {
            valid: false,
            errors: amount === "" ? "Please Enter Amount" : null
        }
    }else if (exceedAmount < amount) {
        return {
            valid: false,
            errors: exceedAmount < amount ?"Amount Exceeded": null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const processVreitTransferValidae = (amount,selectedValue,exceedvalue) => {
    if (selectedValue === "") {
        return {
            valid: false,
            errors: selectedValue === "" ? "Please Select Value" : null
        }
    }else if (selectedValue === null) {
        return {
            valid: false,
            errors: selectedValue === null ? "Please Select Value" : null
        }
    }else if (selectedValue === "Please Select") {
        return {
            valid: false,
            errors: selectedValue === "Please Select" ? "Please Select Value" : null
        }
    }else if (selectedValue === "parent") {
        return {
            valid: false,
            errors: selectedValue === "parent" ? "Please Select Value" : null
        }
    }else if (selectedValue === "child") {
        return {
            valid: false,
            errors: selectedValue === "child" ? "Please Select Value" : null
        }
    }else if (amount === ''){
        return {
            valid: false,
            errors: amount === '' ? "Please Enter Points" : null
        }
    }else if (amount > exceedvalue) {
        return {
            valid: false,
            errors: amount > exceedvalue ? "Amount Exceeded" : null
        }
    }else{
        return { valid: true, errors: null }
    }
}
export const UpdateVreitvalid = (fileName,imageSourceData,btcAddress) => {
    if (btcAddress === "") {
        return {
            valid: false,
            errors: btcAddress === "" ? "Please Enter Address" : null
        }
    }else if (btcAddress.length < 16) {
        return {
            valid: false,
            errors: btcAddress.length < 16 ?"Vreit Address must be 16": null
        }
    } else if (fileName === ''){
        return {
            valid: false,
            errors: fileName === '' ? "Please Add Image First" : null
        }
    }else if (imageSourceData === null) {
        return {
            valid: false,
            errors: imageSourceData === null ? "Please Add Image First" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const UpdateUsdtvalid = (fileName,imageSourceData,btcAddress) => {
    if (btcAddress === "") {
        return {
            valid: false,
            errors: btcAddress === "" ? "Please Enter Address" : null
        }
    }else if (btcAddress.length < 16) {
        return {
            valid: false,
            errors: btcAddress.length < 16 ?"USDT Address must be 16": null
        }
    } else if (fileName === ''){
        return {
            valid: false,
            errors: fileName === '' ? "Please Add Image First" : null
        }
    }else if (imageSourceData === null) {
        return {
            valid: false,
            errors: imageSourceData === null ? "Please Add Image First" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
