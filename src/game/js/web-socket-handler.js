/*
    Module import(s)
*/
import * as data from './data';

/*
    Function to send create game command to websocket
*/
function createGame() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "createGame",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret
    }));
};

/*
    Function to send join game command to websocket
*/
function joinGame() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "joinGame",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "gameId": data.player.gameId
    }));
};

/*
    Function to send start game command to websocket
*/
function startGame() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "startGame",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "gameId": data.player.gameId
    }));
};

/*
    Function to send update client name command to websocket
*/
function updateClientName() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "updateClientName",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "clientName": data.player.clientName
    }));
};

/*
    Function to send mafia vote target command to websocket
*/
function sendMafiaVoteTargetPlayer() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "voteTargetPlayer",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "gameId": data.player.gameId,
        "chosenClientId": data.player.currentSelection
    }));
};

/*
    Function to send mafia confirm target command to websocket
*/
function sendMafiaConfirmTargetPlayer() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "confirmTargetPlayer",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "gameId": data.player.gameId,
        "chosenClientId": data.player.currentSelection
    }));
};

/*
    Function to send detective confirm reveal command to websocket
*/
function sendDetectiveConfirmRevealPlayer() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "confirmRevealPlayer",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "gameId": data.player.gameId,
        "chosenClientId": data.player.currentSelection
    }));
};

/*
    Function to send doctor confirm immunise command to websocket
*/
function sendDoctorConfirmImmunisePlayer() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "confirmImmunisePlayer",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "gameId": data.player.gameId,
        "chosenClientId": data.player.currentSelection
    }));
};

/*
    Function to send confirm kill command to websocket
*/
function sendConfirmKillPlayer() {

    data.webSocket.webSocket.send(JSON.stringify({
        "method": "confirmKillPlayer",
        "clientId": data.player.clientId,
        "clientSecret": data.player.clientSecret,
        "gameId": data.player.gameId,
        "chosenClientId": data.player.currentSelection
    }));
};

/*
    Module export(s)
*/
export {
    createGame,
    joinGame,
    startGame,
    updateClientName,
    sendMafiaVoteTargetPlayer,
    sendMafiaConfirmTargetPlayer,
    sendDetectiveConfirmRevealPlayer,
    sendDoctorConfirmImmunisePlayer,
    sendConfirmKillPlayer
};