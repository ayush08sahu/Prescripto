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

// api for doctor profile
const docProfile = async (req, res) => {
    try {
        const docId = req.docId;
        console.log('Doctor ID from token:', docId);
        
        if (!docId) {
            return res.json({ success: false, message: 'Doctor ID not found in token' });
        }

        // Find doctor by ID and exclude password
        const docData = await doctorModel.findById(docId).select('-password');
        console.log('Doctor data found:', docData ? 'Yes' : 'No');
        
        if (!docData) {
            return res.json({ success: false, message: 'Doctor profile not found' });
        }

        // Return successful response with doctor profile data
        return res.json({ 
            success: true, 
            docData: {
                _id: docData._id,
                name: docData.name,
                email: docData.email,
                image: docData.image,
                speciality: docData.speciality,
                degree: docData.degree,
                experience: docData.experience,
                about: docData.about,
                fee: docData.fee,
                address: docData.address,
                available: docData.available,
                date: docData.date
            }
        });
        
    } catch (error) {
        console.log('Error in docProfile function:', error);
        return res.json({ success: false, message: 'Server error: ' + error.message });
    }
};

// api to update profile from doctor pannel
const updateProfile = async (req, res) => {
    try {
        console.log('Update profile request received:', req.body)
        const {name, email, speciality, degree, experience, about, fee, address, available} = req.body
        const docId = req.docId
        console.log('Doctor ID:', docId)
        
        // If only updating availability, skip validation
        if (Object.keys(req.body).length === 1 && req.body.hasOwnProperty('available')) {
            console.log('Updating only availability to:', available)
            await doctorModel.findByIdAndUpdate(docId, { available })
            return res.json({ success: true, message: 'Availability updated successfully' })
        }
        
        // Validate required fields for full profile update
        if (!name || !email || !speciality || !degree || !experience || !about || !fee) {
            return res.json({ success: false, message: 'All fields are required' })
        }

        // Check if email is already taken by another doctor
        const existingDoctor = await doctorModel.findOne({ email, _id: { $ne: docId } })
        if (existingDoctor) {
            return res.json({ success: false, message: 'Email already exists' })
        }

        const updateData = {
            name,
            email,
            speciality,
            degree,
            experience,
            about,
            fee,
            address,
            available
        }

        await doctorModel.findByIdAndUpdate(docId, updateData)
        res.json({ success: true, message: 'Profile updated successfully' })
    } catch (error) {
        console.log('Error in updateProfile:', error)
        res.json({ success: false, message: error.message })
    }
}


export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCompleted, appointmentCancel, doctorDashboard, docProfile, updateProfile }