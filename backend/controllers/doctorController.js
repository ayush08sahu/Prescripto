import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"



const changeAvailability = async (req, res) => {
    try {
        
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({ success: true, message: 'Availability changed successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// api for doctor login
const loginDoctor = async (req,res) => {
    try {
        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password,doctor.password)

        if (isMatch) {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({ success: true, message: 'Doctor logged in successfully', token })
        }else{
            res.json({ success: false, message: 'Invalid credentials' })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to get doctor appointments
const appointmentsDoctor = async (req, res) => {
    try {
        
        const docId = req.docId
        const appointments = await appointmentModel.find({docId})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to mark appointment as completed
const appointmentCompleted = async (req, res) => {
    try {
        
        const docId = req.docId
        const appointmentId = req.body.appointmentId

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isComplete: true})
            return res.json({ success: true, message: 'Appointment marked as completed' })
        }else{
            return res.json({ success: false, message: 'Marking failed' })
        }
        

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to mark appointment as cancelled
const appointmentCancel = async (req, res) => {
    try {
        
        const docId = req.docId
        const appointmentId = req.body.appointmentId

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {canceled: true})
            return res.json({ success: true, message: 'Appointment marked as cancelled' })
        }else{
            return res.json({ success: false, message: 'Cancellation failed' })
        }
        

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Api to get doctor dashboard in doctor pannel
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId;
        // Fetch all appointments for this doctor
        const appointments = await appointmentModel.find({ docId });

        // Calculate earnings from completed appointments
        let earnings = 0;
        appointments.forEach((item) => {
            if (item.isComplete && !item.canceled) {
                earnings += item.amount;
            }
        });

        // Get unique patient IDs
        let patients = [];
        appointments.forEach((item) => {
            if (!patients.includes(item.userId.toString())) {
                patients.push(item.userId.toString());
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: [...appointments].reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCompleted, appointmentCancel, doctorDashboard }