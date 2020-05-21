class Validation {

    _phoneRegex = /^(\+)?([ 0-9]){10,12}$/;
    _emailRegex = /.*(@).*(\.).*/;

    validateEmail(email: string) {
        return this._emailRegex.test(email);
    }

    validatePhone(phone: string) {
        return this._phoneRegex.test(phone);
    }
}

export default Validation;