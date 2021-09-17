export const loginValidation = (email) => {
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
    else {
        return { valid: true, errors: null }
    }
}
