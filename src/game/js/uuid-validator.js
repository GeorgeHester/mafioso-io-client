function validateUuid(uuid) {

    let validator = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    return validator.test(uuid);
};

/*
    Module export(s)
*/
export {
    validateUuid
};