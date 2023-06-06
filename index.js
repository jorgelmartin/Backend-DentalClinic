const express = require('express'); 
// const db = require('./db');
// const router = require('./router');
// const auth = require('./middlewares/verifyToken');
// const authController = require('./controllers/authController');

const app = express();

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

app.get('/health', (req, res) => {
    return res.send('healthy');
});

app.use(express.json());

// db.then(() =>
//     {
//         app.listen(PORT, () => {
//             console.log('Server is runing on PORT: ' + PORT);
//         })
//     }
// ).catch((error) => {
//     console.log('error starting ar server', error.message);
// });