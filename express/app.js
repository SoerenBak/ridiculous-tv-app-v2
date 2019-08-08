const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config()
const path = require('path');
const app = express();
const checkJwt = require('express-jwt');
const bcrypt = require('bcrypt');           
var mongoose = require('mongoose')
app.use(express.static(path.join(__dirname, '../build')));

/****** Configuration *****/
app.use(bodyParser.json());
app.use(morgan('combined'));   

const port = (process.env.PORT || 9000);

console.log(process.env.JWT_SECRET)
if (!process.env.JWT_SECRET) {
    console.error('You need to put a secret in the JWT_SECRET env variable!');
    process.exit(1);
}

require('dotenv').config({
    path: "../.env"
})

// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

mongoose.connect(process.env.dbUrl, (err) => {
    console.log('Atlas Cluster connection errors =', err)
})

var Schema = mongoose.Schema;

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});

const users = []
const data = []
const Programs = []

const usersRouter = require('./users_router')(users);
app.use('/api/users', usersRouter);

const programsRouter = require('./programs_router')(Programs);
app.use('/api/programs', programsRouter)

let openPaths = [
    '/api/users/authenticate',    
    '/api/users/create',
    '/api/programs/channel',
    '/api/programs/newCategory',    
    '/my_app',
    '/api/programs/categories',
    "/programs/:category/:channel",
    'programs/categories/channels',
    "/api/programs/newChannel",
    "/api/programs/channels",
    "/api/programs/newProgram",
    "/api/programs",
    "/watchlist",
    "/newprogram",
    "/newProgram",
    "/favicon.ico",
];

app.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path : openPaths})
);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({msg: 'Something broke!'})
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


//const server = app.listen(port, () => console.log(`TV APP API running on port ${port}!`));

