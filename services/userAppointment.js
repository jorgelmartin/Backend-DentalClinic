/// SI no lo pones lo borras
// //Change to sql
// const appointmentService = {};


// app.get('/get-appoiment-by-user', appointmentController.getAllAppointmentByUser)

// appointmentController.getAllAppointmentByUser = async(req,res) => {
//     try {
//         const

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