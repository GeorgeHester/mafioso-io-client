/*
    Server Defaults
*/
let webSocket = {
    url: "ws://192.168.0.100",
    webSocket: null
};

/*
    Client Defaults
*/
let player = {
    clientId: null,
    clientSecret: null,
    clientName: "GeorgeGerorgeGeorge",
    gameId: null,
    personType: null,
    alive: null,
    actionComplete: false
};

let game = {
    chatOpen: false
};

/*
    Game Defaults
*/
let previousGame = {
    status: null,
};

let currentGame = {
    status: null
};

/*
    Game Countdown Defaults
*/
let gameCountdown = {
    time: 0
};

let currentPlayers = [];

var currentPage = {
    id: null
};

let cardBackgroundInnerHtml = `
<div class="card-background-corner-top-left"></div>
<div class="card-background-corner-top-right"></div>
<div class="card-background-corner-bottom-left"></div>
<div class="card-background-corner-bottom-right"></div>
<div class="card-background-side-y-left"></div>
<div class="card-background-side-y-right"></div>
<div class="card-background-side-x-top "></div>
<div class="card-background-side-x-bottom"></div>
<div class="card-background-center"></div>
`;

let cookies = {};

let pixelBackground = {
    itemsRendering: [],
    pixelSize: 3,
    styles: {
        green: {
            border: '000000',
            outer: 'c7f0e9',
            inner: '73d9c8'
        },
        greenHover: {
            border: '000000',
            outer: '9ac8c0',
            inner: '56a396'
        },
        blue: {
            border: '000000',
            outer: 'bbeafd',
            inner: '56cbf9'
        },
        blueHover: {
            border: '000000',
            outer: '8dc1d6',
            inner: '4098bb'
        },
        black: {
            border: '000000',
            outer: 'ffffff',
            inner: '000000'
        },
        blackHover: {
            border: '000000',
            outer: 'e6e6e6',
            inner: '262626'
        },
        white: {
            border: '000000',
            outer: 'bfbfbf',
            inner: 'ffffff'
        },
        whiteHover: {
            border: '000000',
            outer: 'b5b5b5',
            inner: 'f2f2f2'
        },
        grey: {
            border: '000000',
            outer: 'a3a3a3',
            inner: 'd9d9d9'
        }
    }
}

/*
    Module export(s)
*/
export {
    webSocket,
    player,
    //previousGame,
    currentGame,
    gameCountdown,
    currentPlayers,
    currentPage,
    game,
    cardBackgroundInnerHtml,
    cookies,
    pixelBackground
};