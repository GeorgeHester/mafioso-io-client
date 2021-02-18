/*
    Module import(s)
*/
import * as data from './data';
import * as pixelBackgroundDrawer from './pixel-background-drawer';

/*
    Asset import(s)
*/
import chatImage from '../img/assets/game/ui/icon-message.png';
import closeImage from '../img/assets/game/ui/icon-close.png';

const buttonOpenChat = document.getElementById('button-open-chat');
const gameChatContainer = document.getElementById('game-chat-container');

gameChatContainer.style.display = 'none';

buttonOpenChat.addEventListener('click', () => {

    if (data.game.chatOpen) {

        data.game.chatOpen = false;
        buttonOpenChat.children[0].src = chatImage;
        gameChatContainer.style.display = 'none';
    } else {

        data.game.chatOpen = true;
        buttonOpenChat.children[0].src = closeImage;
        gameChatContainer.style.display = 'block';
    };
});