//Require Express / DB / Router
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = require('./router');

const app = express();

app.set('trust proxy', 1); // To allow the use of the client's real IP in proxy environments

app.use(cors());
app.use(express.static('public'));

// Port
const PORT = 4000; 
app.use(express.json());
app.use(router);

db.then(() =>
    {
        app.listen(PORT, () => {
            console.log('Server is running on port: ' + PORT);
        })
    }
).catch((error) => {
    console.error('Error starting server', error.message);
})