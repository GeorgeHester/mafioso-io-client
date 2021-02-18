/*
    Module import(s)
*/
import * as data from './data';
import * as gameHandler from './game-handler';

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

    // Calls function to draw all players
    //drawPlayers();
};

/*addPlayer('personUnknown', true, true, 'Test TT', 'x1', 2);
addPlayer('personMafia', true, true, 'Test TT 91', 'x2', 1);
addPlayer('personDoctor', true, true, 'Test TT', 'x3', false);
addPlayer('personDetective', false, true, 'Test FT', 'x4', false);
addPlayer('personVillager', true, false, 'Test TF', 'x5', false);
addPlayer('personUnknown', false, false, 'Test FF', 'x6', false);
addPlayer('personDoctor', true, true, 'Test TT', 'x3', false);
addPlayer('personDetective', false, true, 'Test FT', 'x4', false);
addPlayer('personVillager', true, false, 'Test TF', 'x5', false);
addPlayer('personUnknown', false, false, 'Test FF', 'x6', false);*/

//drawPlayers();

/*
    Function to clear players from currentPlayers arrray
*/
function clearPlayers() {

    // Resets current players array to default state
    //data.currentPlayers = [];
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
    let clientSize = 0;

    // Set the min size to the client size
    if (gameContainerElement.clientHeight > gameContainerElement.clientWidth) {

        clientSize = gameContainerElement.clientWidth - (gameContainerElement.clientWidth * (1 / 3));
    } else {

        clientSize = gameContainerElement.clientHeight - (gameContainerElement.clientHeight * (1 / 3));
    };

    // Loops through all players in the current players array
    for (let i = 0; i < data.currentPlayers.length; i++) {

        // Generates player card element
        let playerCardElement = document.createElement('div');

        // Sets style based on player status
        if (data.currentPlayers[i].alive) {

            if (data.currentPlayers[i].selectable) {

                playerCardElement.className = 'player-card';
            } else {

                playerCardElement.className = 'player-card-disabled';
            };
        } else {

            playerCardElement.className = 'player-card-dead';
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

            // Generate counter elements
            let playerCounterElement = document.createElement('div');
            let playerCounterTextElement = document.createElement('span');

            // Set counter element class 
            playerCounterElement.className = 'player-card-counter';

            // Set counter element value
            playerCounterTextElement.innerHTML = data.currentPlayers[i].counter;

            playerCounterElement.appendChild(playerCounterTextElement);
            playerCardElement.appendChild(playerCounterElement);
        };

        // Generates player background element 
        let playerBackgroundElement = document.createElement('div');
        playerBackgroundElement.className = 'card-background';
        playerBackgroundElement.innerHTML = data.cardBackgroundInnerHtml;

        playerCardElement.appendChild(playerBackgroundElement);

        // Set player block element position on screen
        playerCardElement.style.position = 'absolute'
        playerCardElement.style.left = `${(gameContainerElement.clientWidth / 2) + (Math.cos((seperationAngle * (i + 1)) - (Math.PI / 2))) * (clientSize / 2)}px`;
        playerCardElement.style.top = `${(gameContainerElement.clientHeight / 2) + (Math.sin((seperationAngle * (i + 1)) - (Math.PI / 2))) * (clientSize / 2)}px`;

        playersContainerElement.appendChild(playerCardElement);
    };
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