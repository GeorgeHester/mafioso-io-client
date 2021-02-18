/*
    Module import(s)
*/
import * as data from './data';

function drawErrorMessage(error, persistent) {

    // Get contatiner element 
    let errorMessagesContainer = document.getElementById("error-messages-container");

    // Generate new error message element 
    let errorMessageCardElement = document.createElement('div');
    errorMessageCardElement.className = 'error-message-card';

    let errorMessageCardTextElement = document.createElement('span');
    errorMessageCardTextElement.innerHTML = error;

    // Generates player background element 
    let errorMessageCardBackgroundElement = document.createElement('div');
    errorMessageCardBackgroundElement.className = 'card-background';
    errorMessageCardBackgroundElement.innerHTML = data.cardBackgroundInnerHtml;

    // Append elements to error message card 
    errorMessageCardElement.appendChild(errorMessageCardTextElement);
    errorMessageCardElement.appendChild(errorMessageCardBackgroundElement);

    // Append error message to container
    errorMessagesContainer.appendChild(errorMessageCardElement);

    // Check if persistant to remove message
    if (!persistent) {
        setTimeout(removeErrorMessage, 3000, errorMessageCardElement);
    };
};

function removeErrorMessage(errorMessageCardElement) {

    // Get contatiner element 
    let errorMessagesContainer = document.getElementById('error-messages-container');

    errorMessagesContainer.removeChild(errorMessageCardElement);
};

function drawFullScreenMessage(message, type, persistent, timeout) {

    // Get contatiner element 
    let fullScreenMessagesContainer = document.getElementById("full-messages-container");
    fullScreenMessagesContainer.style.display = 'block';

    let fullScreenMessageCardContainer = document.createElement("div");
    fullScreenMessageCardContainer.className = `full-message-card-shadow-${type}`;

    let fullScreenMessageCardElement = document.createElement("div");
    fullScreenMessageCardElement.className = `full-message-card-${type}`;

    let fullScreenMessageCardTextElement = document.createElement("span");
    fullScreenMessageCardTextElement.innerHTML = message;

    // Generates full screen message background element 
    let fullScreenMessageCardBackgroundElement = document.createElement('div');
    fullScreenMessageCardBackgroundElement.className = 'card-background';
    fullScreenMessageCardBackgroundElement.innerHTML = data.cardBackgroundInnerHtml;

    fullScreenMessageCardElement.appendChild(fullScreenMessageCardTextElement);
    fullScreenMessageCardElement.appendChild(fullScreenMessageCardBackgroundElement);

    fullScreenMessageCardContainer.appendChild(fullScreenMessageCardElement);

    fullScreenMessagesContainer.appendChild(fullScreenMessageCardContainer);

    // Check if persistant to remove message
    if (!persistent) {
        setTimeout(removeFullScreenMessage, timeout, fullScreenMessageCardContainer);
    };
};

function removeFullScreenMessage(fullScreenMessageCardContainer) {

    // Get contatiner element 
    let fullScreenMessagesContainer = document.getElementById("full-messages-container");
    fullScreenMessagesContainer.style.display = 'none';

    fullScreenMessagesContainer.removeChild(fullScreenMessageCardContainer);
};

/*
    Module export(s)
*/
export {
    drawErrorMessage,
    drawFullScreenMessage
};