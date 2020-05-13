export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {  
    // So now isValid is updated to True or false 
    //depending on the check if the trimmed value is unequal
    // to an empty string


    //we can add something to each check
    // here. We can say isValid should it be true if a check is true
    // and if isValid already was true
    // so we change && isValid. If we do
    // this in every rule, then just one rule resolving to true alone won't do the trick,
    // all the rules now have to resolve to true.  
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    if(rules.isPassword){
        const pattern = /(?=.{8,})/;
        isValid = pattern.test(value);
    }
    return isValid;
}