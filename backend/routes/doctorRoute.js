import express from 'express'
import { appointmentCancel, appointmentCompleted, appointmentsDoctor, doctorDashboard, doctorList, loginDoctor } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor ,appointmentsDoctor)
doctorRouter.post('/appointments-completed', authDoctor, appointmentCompleted)
doctorRouter.post('/appointments-cancel', authDoctor, appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)

export default doctorRouter