//REQUIRE EXPRESS / DB / ROUTER
const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = require('./router');

const app = express();
app.use(cors());
app.use(express.static('public'));
//PORT
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use(router);

db.then(() =>
    {
        app.listen(PORT, '0.0.0.0', () => {
            console.log('Server is running on port: ' + PORT);
        })
    }
).catch((error) => {
    console.error('Error starting server', error.message);
})

