/*
    Module import(s)
*/
const express = require('express');
const path = require('path');
const fs = require('fs');

/*
    Attempt to load config and log error if not
*/
try {
    var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
} catch (error) {
    console.error(`[ ERROR ][ Could not read or parse config ]`);
};

/*
    Generate express app
*/
const app = express();

/*
    Set app to use express json 
    Set static content folder
    Set views path
    Set view engine
    Set view engine to use .hmtl files
*/
app.use(express.json());
app.use(express.static('../dist'));
app.set('views', path.join(__dirname, '../dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/*
    Route for default url
*/
app.get('/', (req, res) => {
    res.render('index.html', { gameId: "" });
});

/*
    Route for url with gameid 
*/
app.get('/:gameId', (req, res) => {
    res.render('index.html', { gameId: req.params.gameId });
});

/*
    Set server to listen on port 
*/
app.listen(config.server.port, () => {
    console.log(`[ Server ][ Online ]`);
});