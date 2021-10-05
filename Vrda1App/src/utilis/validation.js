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
