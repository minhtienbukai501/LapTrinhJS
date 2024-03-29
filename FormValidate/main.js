function Validator(option) {
    const formElement = document.querySelector(option.form);

    if (formElement) {
        option.rules.forEach(function(rule) {
            const inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function() {
                    const errMSG = rule.test(inputElement.value);
                    console.log(errMSG);
                }
            }
        })
    }
}


Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {

            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };

}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function() {

        }
    };
}