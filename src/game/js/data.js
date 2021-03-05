/*
    Server Defaults
*/
let mode = 'debug';

let webSocket = {
    url: "wss://api.mafioso.io",
    //url: "ws://192.168.0.63:8080",
    webSocket: null,
    isOpen: false
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
    time: 0,
    timer: null
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

let renderQueue = {};

let pageHandler = {
    previousPage: {
        id: ''
    },
    currentPage: {
        id: ''
    }
};

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
        lime: {
            border: '000000',
            outer: '80f2c3',
            inner: '00e587'
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
        whiteDisabled: {
            border: '000000',
            outer: 'acacac',
            inner: 'e6e6e6'
        },
        whiteHover: {
            border: '000000',
            outer: 'b5b5b5',
            inner: 'f2f2f2'
        },
        whiteFocus: {
            border: '000000',
            outer: '56cbf9',
            inner: 'f2f2f2'
        },
        whiteWarning: {
            border: '000000',
            outer: 'ffd700',
            inner: 'f2f2f2'
        },
        whiteError: {
            border: '000000',
            outer: 'e61c50',
            inner: 'f2f2f2'
        },
        grey: {
            border: '000000',
            outer: 'a3a3a3',
            inner: 'd9d9d9'
        },
        redLight: {
            border: '000000',
            outer: 'e61c50',
            inner: 'f9c6d3'
        },
        red: {
            border: '000000',
            outer: 'f38ea8',
            inner: 'e61c50'
        },
        redHover: {
            border: '000000',
            outer: 'ec557c',
            inner: 'ad153c'
        }
    }
}

/*
    Module export(s)
*/
module.exports = {
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
    pixelBackground,
    renderQueue,
    pageHandler,
    mode
};