import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


// api for adding doctor
const addDoctor = async (req, res) => {


    try {
        const { name, email, password, speciality, degree, experience, about, fee, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        // validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }
        
        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: 'Doctor added successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({ success: true, message: 'Admin logged in successfully', token })

        }else{
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// api for get all doctors list for admin
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, message: 'Doctors fetched successfully', doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        
        const appointments = await appointmentModel.find({}).populate('userId').populate('docId')
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for appointment cancellation

const appointmentCancel = async (req, res) => {
  try {

    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);


    await appointmentModel.findByIdAndUpdate(appointmentId, { canceled: true });

    // releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // notify the user about cancellation
        try {
            const userId = appointmentData.userId;
            if (userId) {
                const notification = {
                    type: "info",
                    message: `Your appointment on ${slotDate} at ${slotTime} has been canceled by admin.`,
                    appointmentId,
                    date: Date.now(),
                    read: false,
                };
                await userModel.findByIdAndUpdate(userId, { $push: { notifications: notification } });
            }
        } catch (err) {
            console.log("Failed to send cancellation notification to user:", err.message);
        }

        res.json({ success: true, message: "Appointment canceled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        
        const dashData = {
            doctors: doctors.length,
            users: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
    res.json({ success: false, message: error.message });
    }
}

export { addDoctor , loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }