/*
    Module import(s)
*/
//import * as webSocketHandler from './web-socket-handler';
import * as data from './data';
import * as playerDrawer from './player-drawer';
import * as interactionBarHandler from './interaction-bar-handler';
import * as renderQueueHandler from './render-queue-handler';

function playerClicked(event) {

    let clickedClientId = event.target.getAttribute('client-id');

    if (data.player.currentSelection == clickedClientId) {

        data.renderQueue[clickedClientId].style = 'white';
        data.renderQueue[clickedClientId].hoverStyle = 'whiteHover';

        data.player.currentSelection = null;

    } else if (data.player.currentSelection != null) {

        data.renderQueue[data.player.currentSelection].style = 'white';
        data.renderQueue[data.player.currentSelection].hoverStyle = 'whiteHover';

        data.renderQueue[clickedClientId].style = 'grey';
        data.renderQueue[clickedClientId].hoverStyle = 'grey';

        data.player.currentSelection = clickedClientId;

    } else {

        data.renderQueue[clickedClientId].style = 'grey';
        data.renderQueue[clickedClientId].hoverStyle = 'grey';

        data.player.currentSelection = clickedClientId;
    };

    renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);

    /*
        if (data.renderQueue[clickedClientId] != undefined) {
    
            data.renderQueue[clickedClientId].style = 'grey';
            data.renderQueue[clickedClientId].hoverStyle = 'grey';
    
            renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);
        };*/
    /*
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
        };*/
};

function updatePlayerData(personType, alive) {

    data.player.personType = personType;
    data.player.alive = alive;
};

function updateGameData(gameStatus, hostId) {

    if (data.currentGame.status != gameStatus) {
        data.player.actionComplete = false;
        data.currentGame.status = gameStatus;
    };
    data.currentGame.hostId = hostId;
};

function updateGame(game) {

    // Clear current players array 
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
        let counter = false;

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

        // Check if the user has votes
        if (loopPlayer.votes) {
            counter = loopPlayer.votes;
        };

        // Add player to be drawn
        playerDrawer.addPlayer(loopPlayer.personType, loopPlayer.alive, selectable, loopPlayer.clientName, Object.keys(game.public.playerData)[i], counter);
    };

    // Calls function to draw players
    playerDrawer.drawPlayers();

    // Determines if buttons should be shown
    switch (data.currentGame.status) {
        case "preGame":

            interactionBarHandler.hideStartButton();
            if (data.currentGame.hostId == data.player.clientId) {
                interactionBarHandler.displayStartButton();
            };
            break;
        case "inGameDayTime":

            interactionBarHandler.hideStartButton();
            if (data.player.actionComplete == false && data.player.alive) {
                interactionBarHandler.displayConfirmButton();
            };
            break;
        case "inGameNightTime":

            interactionBarHandler.hideStartButton();
            if (data.player.actionComplete == false && data.player.alive) {
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