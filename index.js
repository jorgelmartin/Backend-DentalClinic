const express = require('express');
const db = require('./db');
const router = require('./router');
const auth = require('./middlewares/verifyToken')

const authController = require('./controllers/authController');

const app = express();

const PORT = 3000;

app.use(express.json());

// gestiona las rutas de router.js
app.use(router);

app.get('/health', auth, (req, res) => {
    return res.send('healthy');
});

db.then(() =>
    {
        app.listen(PORT, () => {
            console.log('Server is running on port: ' + PORT);
        })
    }
).catch((error) => {
    console.error('Error starting server', error.message);
})