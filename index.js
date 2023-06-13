const express = require('express');
const db = require('./db');
const router = require('./router');
const auth = require('./middlewares/verifyToken');
const appointmentController = require('./controllers/appointmentController');

const app = express();

const PORT = 4000;

app.use(express.json());

// gestiona las rutas de router.js
app.use(router);

//TRAER TODAS LAS CITAS DE UN USUARIO // Cambiar a SQL ejem belongsTo // Include

// app.get('/get-appoiment-by-user', appointmentController.getAllAppointmentByUser)

// appointmentController.getAllAppointmentByUser = async(req,res) => {
//     try {
//         const userId = req.body.user_id;

//         const appointmentByUser = await appointment.find({
//             user_id: userId
//         }).populate('user_id');
//         //Para traer los servicios del cliente:
//         // populate('service_id')

//         return res.status(200).json(
//             {
//                 success: true,
//                 message: "Appointment by user retrieved",
//                 data: appointmentByUser
//             }
//         )
//     } catch (error) {
//         return res.status(500).json(
//             {
//                 success: false,
//                 message: "Appointment cant be retrieved",
//                 error: error.message
//             }
//         )
//     }
// }

db.then(() =>
    {
        app.listen(PORT, () => {
            console.log('Server is running on port: ' + PORT);
        })
    }
).catch((error) => {
    console.error('Error starting server', error.message);
})

