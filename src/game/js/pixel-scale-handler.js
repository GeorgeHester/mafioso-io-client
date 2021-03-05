/*
    Module import(s)
*/
import * as data from './data';

// Function to set the correct pixel size
function setPixelValue(width, height) {

    if (width <= 425) {
        data.pixelBackground.pixelSize = 2;
    } else {
        data.pixelBackground.pixelSize = 3;
    };
};

/*
    Module export(s)
*/
export {
    setPixelValue
};