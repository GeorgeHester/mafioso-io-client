// Function to test uuid for validity
function validateUuid(uuid) {

    // Regex string
    let validator = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    // Regex test function
    return validator.test(uuid);
};

/*
    Module export(s)
*/
export {
    validateUuid
};