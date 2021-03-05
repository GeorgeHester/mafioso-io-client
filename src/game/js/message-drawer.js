/*
    Module import(s)
*/
import * as data from './data';
import * as uuidGenerator from './uuid-generator';
import * as renderQueueHandler from './render-queue-handler';

function drawErrorMessage(error, persistent) {

    // Get error messages contatiner element 
    let errorMessagesContainerElement = document.getElementById('error-messages-container');

    // Generate uuid for message
    let errorMessageId = uuidGenerator.generateUuid();

    // Generate message html and append
    errorMessagesContainerElement.insertAdjacentHTML('beforeend', `
    <div id="error-message-${errorMessageId}" class="error-message">
        <span>${error}</span>
        <div class="pixel-background">
        </div>
    </div>
    `);

    // Add message to the render queue
    data.renderQueue[`error-message-${errorMessageId}`] = {
        id: `error-message-${errorMessageId}`,
        parent: document.getElementById(`error-message-${errorMessageId}`).getElementsByClassName('pixel-background')[0],
        type: 'button',
        style: 'red',
        hoverStyle: null,
        hoverElementId: null,
        focusStyle: null,
        focusElementId: null
    };

    // Render the items in the render queue
    renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);

    // Check if persistent and remove element after 3 seconds if not
    if (!persistent) {
        setTimeout(removeErrorMessage, 3000, errorMessageId);
    };
};

function removeErrorMessage(errorMessageId) {

    // Remove html element from dom and entry from render queue
    document.getElementById(`error-message-${errorMessageId}`).remove();
    delete data.renderQueue[`error-message-${errorMessageId}`];
};

function drawFullScreenMessage(message, type, persistent, timeout) {

    let style;

    // Set the style for correct message type
    switch (type) {
        case 'default':
            style = 'black';
            break;
        case 'success':
            style = 'lime';
            break;
        case 'fail':
            style = 'red';
            break;
    };

    // Get full screen messages contatiner element 
    let fullScreenMessagesContainerElement = document.getElementById("full-messages-container");
    fullScreenMessagesContainerElement.style.display = 'block';

    // Generate uuid for message
    let fullScreenMessageId = uuidGenerator.generateUuid();

    // Generate message html and append
    fullScreenMessagesContainerElement.insertAdjacentHTML('beforeend', `
    <div id="full-message-${fullScreenMessageId}" class="full-message-shadow-${type}">
        <div class="full-message">
            <span>${message}</span>
            <div class="pixel-background">
            </div>
        </div>
    </div>
    `);

    // Add message to the render queue
    data.renderQueue[`full-message-${fullScreenMessageId}`] = {
        id: `full-message-${fullScreenMessageId}`,
        parent: document.getElementById(`full-message-${fullScreenMessageId}`).getElementsByClassName('pixel-background')[0],
        type: 'card',
        style: style,
        hoverStyle: null,
        hoverElementId: null,
        focusStyle: null,
        focusElementId: null
    };

    // Render the items in the render queue
    renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);

    // Check if persistent and remove element
    if (!persistent) {
        setTimeout(removeFullScreenMessage, timeout, fullScreenMessageId);
    };
};

function removeFullScreenMessage(fullScreenMessageId) {

    // Get full screen messages contatiner element 
    let fullScreenMessagesContainerElement = document.getElementById("full-messages-container");
    fullScreenMessagesContainerElement.style.display = 'none';

    // Remove html element from dom and entry from render queue
    document.getElementById(`full-message-${fullScreenMessageId}`).remove();
    delete data.renderQueue[`full-message-${fullScreenMessageId}`];
};

/*
    Module export(s)
*/
export {
    drawErrorMessage,
    drawFullScreenMessage
};