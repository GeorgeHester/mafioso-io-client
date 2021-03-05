/*
    Module import(s)
*/
import * as data from './data';
import * as gameHandler from './game-handler';
import * as renderQueueHandler from './render-queue-handler';

/*
    Image import(s)
*/
import personMafia from '../img/assets/game/people/mafioso-mafia-256.png';
import personVillager from '../img/assets/game/people/mafioso-villager-256.png';
import personDoctor from '../img/assets/game/people/mafioso-doctor-256.png';
import personDetective from '../img/assets/game/people/mafioso-detective-256.png';
import personUnknown from '../img/assets/game/people/mafioso-unknown-256.png';
import personMafiaDead from '../img/assets/game/people/mafioso-mafia-dead-256.png';
import personVillagerDead from '../img/assets/game/people/mafioso-villager-dead-256.png';
import personDoctorDead from '../img/assets/game/people/mafioso-doctor-dead-256.png';
import personDetectiveDead from '../img/assets/game/people/mafioso-detective-dead-256.png';
import personUnknownDead from '../img/assets/game/people/mafioso-unknown-dead-256.png';

/*
    Image enum references
*/
const personImages = {
    'personMafia': personMafia,
    'personVillager': personVillager,
    'personDoctor': personDoctor,
    'personDetective': personDetective,
    'personUnknown': personUnknown,
    'personMafiaDead': personMafiaDead,
    'personVillagerDead': personVillagerDead,
    'personDoctorDead': personDoctorDead,
    'personDetectiveDead': personDetectiveDead,
    'personUnknownDead': personUnknownDead
};

/*
    Function to add players to currentPlayers arrray
*/
function addPlayer(personType, alive, selectable, clientName, clientId, counter) {

    // Adds player data to current players array
    data.currentPlayers.push({
        "clientName": clientName,
        "personType": personType,
        "clientId": clientId,
        "alive": alive,
        "selectable": selectable,
        "counter": counter
    });
};

/*
    Function to clear players from currentPlayers arrray
*/
function clearPlayers() {

    // Removes all render queue enteries
    for (let i = 0; i < data.currentPlayers.length; i++) {

        delete data.renderQueue[data.currentPlayers[i].clientId];

        if (data.currentPlayers[i].counter) {
            delete data.renderQueue[data.currentPlayers[i].clientId + '-counter'];
        };
    };

    // Resets current players array to default state
    data.currentPlayers = [];
};

/*
    Function to draw players from currentPlayers arrray
*/
function drawPlayers() {

    // Get the html game container
    let gameContainerElement = document.getElementById('game-container');

    // Get the html players container
    let playersContainerElement = document.getElementById('game-players-container');

    // Reset players container
    playersContainerElement.innerHTML = '';

    // Calculate angle between players and set defualt client size
    let seperationAngle = (2 * Math.PI) / data.currentPlayers.length;
    let clientSize, clientSizeX, clientSizeY = 0;

    // Set the min size to the client size
    if (gameContainerElement.clientHeight > gameContainerElement.clientWidth) {

        clientSizeX = gameContainerElement.clientWidth * (2 / 3);
        clientSize = clientSizeX;
        clientSizeY = gameContainerElement.clientHeight - gameContainerElement.clientWidth * (1 / 3);

        /*clientSizeX = gameContainerElement.clientWidth * (2 / 3);
        clientSize = clientSizeX;

        if (gameContainerElement.clientWidth * (4 / 3) < gameContainerElement.clientHeight * (2 / 3)) {
            clientSizeY = gameContainerElement.clientWidth * (4 / 3);
        } else {
            clientSizeY = gameContainerElement.clientHeight * (2 / 3);
        };*/
    } else {

        clientSizeY = gameContainerElement.clientHeight * (2.25 / 3);
        clientSize = clientSizeY;
        clientSizeX = gameContainerElement.clientWidth - gameContainerElement.clientHeight * (0.75 / 3);

        /*clientSizeY = gameContainerElement.clientHeight * (2.25 / 3);
        clientSize = clientSizeY;

        if (gameContainerElement.clientHeight * (4 / 3) < gameContainerElement.clientWidth * (1 / 2)) {
            clientSizeX = gameContainerElement.clientHeight * (4 / 3);
        } else {
            clientSizeX = gameContainerElement.clientWidth * (1 / 2);
        };

        clientSizeX = clientSizeY * (4 / 3);*/
    };

    // Loops through all players in the current players array
    for (let i = 0; i < data.currentPlayers.length; i++) {

        let style = '';
        let hoverStyle = '';

        // Generates player card element
        let playerCardElement = document.createElement('div');


        // Sets style based on player status
        if (data.currentPlayers[i].alive) {

            if (data.currentPlayers[i].selectable) {

                playerCardElement.className = 'player-card';
                style = 'white';
                hoverStyle = 'whiteHover';
            } else {

                playerCardElement.className = 'player-card-disabled';
                style = 'whiteDisabled';
                hoverStyle = 'whiteDisabled';
            };
        } else {

            playerCardElement.className = 'player-card-dead';
            style = 'redLight';
            hoverStyle = 'redLight';
        };

        playerCardElement.setAttribute('client-id', data.currentPlayers[i].clientId);
        playerCardElement.id = `player-card-${data.currentPlayers[i].clientId}`;

        // Sets click event based on player status
        if (data.currentPlayers[i].selectable && data.currentPlayers[i].alive) {

            playerCardElement.onclick = function (eventData) { gameHandler.playerClicked(eventData) };
        };

        // Generates player image element
        let playerImageElement = document.createElement('img');

        // Set element size
        playerImageElement.style.width = `${(clientSize * (1 / (8 + (0.2 * data.currentPlayers.length))))}px`;
        playerImageElement.style.height = `${(clientSize * (1 / (8 + (0.2 * data.currentPlayers.length))))}px`;

        // Sets style based on player status
        if (data.currentPlayers[i].alive) {

            playerImageElement.src = personImages[data.currentPlayers[i].personType];
        } else {

            playerImageElement.src = personImages[data.currentPlayers[i].personType + "Dead"];
        };

        // Generates player name element
        let playerNameElement = document.createElement('span');

        // Set element value
        playerNameElement.innerHTML = data.currentPlayers[i].clientName;

        playerCardElement.appendChild(playerImageElement);
        playerCardElement.appendChild(playerNameElement);

        if (data.currentPlayers[i].counter) {

            playerCardElement.insertAdjacentHTML('beforeend', `
            <div class="player-card-counter">
                <span>${data.currentPlayers[i].counter}</span>
                <div class="pixel-background">
                </div>
            </div>
            `);

            data.renderQueue[data.currentPlayers[i].clientId + '-counter'] = {
                id: data.currentPlayers[i].clientId + '-counter',
                parent: playerCardElement.getElementsByClassName('pixel-background')[0],
                type: 'button',
                style: 'red',
                hoverStyle: null,
                hoverElementId: null,
                focusStyle: null,
                focusElementId: null
            };

            /*// Generate counter elements
            let playerCounterElement = document.createElement('div');
            let playerCounterTextElement = document.createElement('span');

            // Set counter element class 
            playerCounterElement.className = 'player-card-counter';

            // Set counter element value
            playerCounterTextElement.innerHTML = data.currentPlayers[i].counter;

            playerCounterElement.appendChild(playerCounterTextElement);
            playerCardElement.appendChild(playerCounterElement);*/
        };

        // Generates player background element 
        let playerPixelBackgroundElement = document.createElement('div');
        playerPixelBackgroundElement.className = 'pixel-background';

        playerCardElement.appendChild(playerPixelBackgroundElement);

        // Set player block element position on screen
        playerCardElement.style.position = 'absolute';
        playerCardElement.style.left = `${Math.round((gameContainerElement.clientWidth / 2) + (Math.cos((seperationAngle * (i + 1)) - (Math.PI / 2))) * (clientSizeX / 2))}px`;
        playerCardElement.style.top = `${Math.round((gameContainerElement.clientHeight / 2) + (Math.sin((seperationAngle * (i + 1)) - (Math.PI / 2))) * (clientSizeY / 2))}px`;

        playersContainerElement.appendChild(playerCardElement);



        data.renderQueue[data.currentPlayers[i].clientId] = {
            id: data.currentPlayers[i].clientId,
            parent: playerPixelBackgroundElement,
            type: 'card',
            style: style,
            hoverStyle: hoverStyle,
            hoverElementId: `player-card-${data.currentPlayers[i].clientId}`,
            focusStyle: null,
            focusElementId: null
        };
    };

    renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);
};

/*
    Event that happens when window is resized
*/
window.addEventListener("resize", () => {

    // Calls draw players to redraw players with new dimesnions
    drawPlayers();
});

/*
    Module export(s)
*/
export {
    addPlayer,
    clearPlayers,
    drawPlayers
};