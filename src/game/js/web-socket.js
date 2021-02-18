/*
    Module import(s)
*/
import * as data from './data';
import * as messageDrawer from './message-drawer';
import * as gameHandler from './game-handler';
import * as countdownHandler from './countdown-handler';
import * as cookieHandler from './cookie-handler';

/*
    Generate new web socket
*/
data.webSocket.webSocket = new WebSocket(data.webSocket.url);

/*
    Function for when websocket connection is opened
*/
data.webSocket.webSocket.onopen = () => {

    if (data.cookies.clientId) {
        data.player.clientId = data.cookies.clientId;

        data.webSocket.webSocket.send(JSON.stringify({
            "method": "reconnectClient",
            "clientId": data.player.clientId,
            "clientName": data.player.clientName
        }));
    } else {

        data.webSocket.webSocket.send(JSON.stringify({
            "method": "connectClient",
            "clientName": data.player.clientName
        }));
    };
};

/*
    Function for when websocket has a message
*/
data.webSocket.webSocket.onmessage = (message) => {

    // Parses the message data into json.
    const jsonMessage = JSON.parse(message.data);
    console.log(jsonMessage);

    /*
        Event for when you are connected to server
    */
    if (jsonMessage.method === 'clientConnected') {

        /*
            Save generated client data in the front end
        */
        data.player.clientId = jsonMessage.clientId;
        data.player.clientSecret = jsonMessage.clientSecret;
        
        cookieHandler.addCookie('clientId', data.player.clientId);

        /*
            Log info 
            FOR DEBUGGING
        */
        console.log(`[ Connected ][ Id: ${data.player.clientId} ]`);

        // Skip all other methods
        return;
    };

    /*
        Event for when a game is created 
    */
    if (jsonMessage.method === 'gameCreated') {

        /*
            Save generated game id in front end
        */
        data.player.gameId = jsonMessage.game.public.id;

        /*
            Update html copy element
        */
        let copyGameIdElement = document.getElementById("button-copy-input");
        copyGameIdElement.value = `${window.location.host}/${data.player.gameId}`;

        /*
            Log info 
            FOR DEBUGGING
        */
        console.log(`[ Game Created ][ Id: ${data.player.gameId} ]`);

        /*
            Join client to game
        */
        data.webSocket.webSocket.send(JSON.stringify({
            "method": "joinGame",
            "clientId": data.player.clientId,
            "clientSecret": data.player.clientSecret,
            "gameId": data.player.gameId
        }));

        // Skip all other methods
        return;
    };

    if (jsonMessage.method === 'clientJoined') {
        /*console.log(`[ Client Joined ][ Id: ${jsonMessage.game.clients[jsonMessage.game.clients.length - 1].clientId} ]`);

        clearPlayers();

        for (let i = 0; i < jsonMessage.game.clients.length; i++) {
            addPlayer('person', jsonMessage.game.clients[i].clientName, jsonMessage.game.clients[i].clientId);
        };*/

        return;
    };

    if (jsonMessage.method === 'gameUpdated') {

        /*playerDrawer.clearPlayers();

        for (let i = 0; i < Object.keys(jsonMessage.game.public.playerData).length; i++) {

            let player = jsonMessage.game.public.playerData[Object.keys(jsonMessage.game.public.playerData)[i]];
            playerDrawer.addPlayer(player.personType, player.alive, player.clientName, Object.keys(jsonMessage.game.public.playerData)[i]);
            if (Object.keys(jsonMessage.game.public.playerData)[i] == player.clientId) { personType = player.personType };
        };*/

        gameHandler.updateGame(jsonMessage.game);

        return;
    };

    /*
        Event for when countdown is updated
    */
    if (jsonMessage.method === 'countdownUpdated') {

        /*
            Update on screen countdown object
        */
        countdownHandler.updateCountdown(jsonMessage.countdownTime, jsonMessage.countdownMessage);

        // Skip all other methods
        return;
    };

    if (jsonMessage.method === 'gameMessage') {

        /* IMPLEMENT CHAT MESSAGE DRAWING AND SENDING */
        return;
    };

    if (jsonMessage.method === 'fullScreenMessage') {

        messageDrawer.drawFullScreenMessage(jsonMessage.message, jsonMessage.messageType);
        return;
    };

    if (jsonMessage.method === 'errorMessage') {

        messageDrawer.drawErrorMessage(jsonMessage.message, jsonMessage.messagePersistent);
        return;
    };
};

data.webSocket.webSocket.onclose = () => {

    messageDrawer.drawErrorMessage('Server disconnected.', true);
};

data.webSocket.webSocket.onerror = () => {

    messageDrawer.drawErrorMessage('Cannot connect to server. Try again by refreshing the page.', true);
};