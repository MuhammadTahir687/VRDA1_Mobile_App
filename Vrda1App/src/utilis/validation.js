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
export const ShopValidation = (detail,fileName) => {
    if (fileName === ''){
        return {
            valid: false,
            errors: fileName === '' ? "Please Add Image First" : null
        }
    }else if (detail === '') {
        return {
            valid: false,
            errors: detail === '' ? "Please Enter Notes Details" : null
        }
    }
    else{
        return { valid: true, errors: null }
    }
}
export const processWithdrawValidation = (amount,selectedValue,detail) => {
    if (amount === ''){
        return {
            valid: false,
            errors: amount === '' ? "Please Enter Amount" : null
        }
    }else if (amount < 500) {
        return {
            valid: false,
            errors: amount < 500 ? "Minimum Amount is 500" : null
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
export const processTransferValidation = (amount,selectedValue,detail) => {
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
