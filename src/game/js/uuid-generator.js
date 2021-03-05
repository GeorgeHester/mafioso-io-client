// Function to test uuid for validity
function generateUuid() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxx'.replace(/[xy]/g, (character) => {
        var random = Math.random() * 16 | 0, v = character == 'x' ? random : (random & 0x3 | 0x8);
        return v.toString(16);
    });
};

/*
    Module export(s)
*/
export {
    generateUuid
};