/*
    Module import(s)
*/
import * as webSocketHandler from './web-socket-handler';
import * as data from './data';
import * as playerDrawer from './player-drawer';
import * as interactionBarHandler from './interaction-bar-handler';

function playerClicked(event) {

    let clickedClientId = event.target.getAttribute('client-id');

    if (event.target.classList.contains('player-card-selected')) {

        data.player.currentSelection = null;
        event.target.classList.remove('player-card-selected');
    } else {

        if (data.player.currentSelection != null) {

            let oldClickedClientElement = document.getElementById(`player-card-${data.player.currentSelection}`);
            oldClickedClientElement.classList.remove('player-card-selected');
        };

        data.player.currentSelection = clickedClientId;
        event.target.classList.add('player-card-selected');
    };

    switch (data.currentGame.status) {
        case "inGameDayTime":

            data.player.currentSelection = clickedClientId;
            event.target.classList.add('player-block-selected');
            break;
        case "inGameNightTime":

            switch (data.player.personType) {
                case "personMafia":

                    data.player.currentSelection = clickedClientId;
                    event.target.classList.add('player-block-selected');
                    //webSocketHandler.sendMafiaVoteTargetPlayer();
                    break;
                case "personDetective":

                    data.player.currentSelection = clickedClientId;
                    event.target.classList.add('player-block-selected');
                    break;
                case "personDoctor":

                    data.player.currentSelection = clickedClientId;
                    event.target.classList.add('player-block-selected');
                    break;
            };
            break;
    };
};

function updatePlayerData(personType, alive) {

    data.player.personType = personType;
    data.player.alive = alive;
};

function updateGameData(gameStatus, hostId) {

    data.currentGame.status = gameStatus;
    data.currentGame.hostId = hostId;
};

function updateGame(game) {

    // Clear players array 
    playerDrawer.clearPlayers();

    // Update the local game data
    updatePlayerData(game.public.playerData[data.player.clientId].personType, game.public.playerData[data.player.clientId].alive);
    updateGameData(game.public.status, game.public.hostId);

    // Loop through players
    for (let i = 0; i < Object.keys(game.public.playerData).length; i++) {

        // Store current player 
        let loopPlayer = game.public.playerData[Object.keys(game.public.playerData)[i]];

        // Set default selectable value
        let selectable = true;

        // Check if player is alive
        if (data.player.alive) {

            // Set correct selectable items
            if (data.currentGame.status == "preGame" || data.currentGame.status == "postGame") {

                selectable = false;
            } else if (data.currentGame.status == "inGameDayTime") {

                if (Object.keys(game.public.playerData)[i] == data.player.clientId) {
                    selectable = false;
                };
            } else if (data.currentGame.status == "inGameNightTime") {

                if (data.player.personType == "personMafia" && loopPlayer.personType == "personMafia") {
                    selectable = false;
                } else if (data.player.personType == "personDetective" && loopPlayer.personType != "personUnknown") {
                    selectable = false;
                } else if (data.player.personType == "personVillager") {
                    selectable = false;
                };
            };
        };

        let counter = false;

        if (loopPlayer.votes) {

            counter = loopPlayer.votes;
        };

        // Add player to be drawn
        playerDrawer.addPlayer(loopPlayer.personType, loopPlayer.alive, selectable, loopPlayer.clientName, Object.keys(game.public.playerData)[i], counter);
    };

    // Calls functiong to draw players
    playerDrawer.drawPlayers();

    // Determines if buttons should be shown
    switch (data.currentGame.status) {
        case "preGame":

            interactionBarHandler.hideConfirmButton();
            if (data.currentGame.hostId == data.player.clientId) {
                interactionBarHandler.displayStartButton();
            };
            break;
        case "inGameDayTime":

            interactionBarHandler.hideStartButton();
            if (data.player.actionComplete == false) {
                interactionBarHandler.displayConfirmButton();
            };
            break;
        case "inGameNightTime":

            interactionBarHandler.hideStartButton();
            interactionBarHandler.hideStartButton();
            if (data.player.actionComplete == false) {
                if (data.player.personType == "personMafia") {
                    interactionBarHandler.displayConfirmButton();
                } else if (data.player.personType == "personDetective") {
                    interactionBarHandler.displayConfirmButton();
                } else if (data.player.personType == "personDoctor") {
                    interactionBarHandler.displayConfirmButton();
                };
            };
            break;
        case "postGame":

            interactionBarHandler.hideStartButton();
            interactionBarHandler.hideStartButton();
            break;
        default:

            break;
    };
};

/*
    Module export(s)
*/
export {
    playerClicked,
    updateGame
};