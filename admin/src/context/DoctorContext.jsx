import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ?localStorage.getItem('dToken'):'')

    const [appointments, setAppointments] = useState([])

    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {headers: {dToken}})
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse())
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/appointments-completed', {appointmentId}, {headers: {dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/appointments-cancel', {appointmentId}, {headers: {dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers: {dToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/doctor-profile', {headers: {dToken}})
            if (data.success) {
                setProfileData(data.docData)  // Fixed: using docData instead of profileData
                console.log('Profile data received:', data.docData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log('Error fetching profile:', error)
            toast.error(error.message)
        }
    }

    const updateProfileData = async (updateData) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers: {dToken}})
            if (data.success) {
                toast.success(data.message)
                getProfileData() // Refresh profile data
                return true
            } else {
                toast.error(data.message)
                return false
            }
        } catch (error) {
            console.log('Error updating profile:', error)
            toast.error(error.message)
            return false
        }
    }
    
    const updateAvailability = async (available) => {
        try {
            console.log('Updating availability to:', available);
            console.log('Backend URL:', backendUrl);
            console.log('Token:', dToken);
            
            const { data } = await axios.post(
                backendUrl + '/api/doctor/update-profile',
                { available },
                { headers: { dToken } }
            );
            console.log('Response:', data);
            
            if (data.success) {
                toast.success('Availability updated');
                // Don't call getProfileData() here since we're handling it in the component
            } else {
                toast.error(data.message);
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error updating availability:', error);
            throw error; // Re-throw to let component handle it
        }
    };

    const value = {
        dToken,
        setDToken,
        backendUrl,
        getAppointments,
        appointments,
        setAppointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        dashData,
        setDashData,
        profileData,
        getProfileData,
        setProfileData,
        updateProfileData,
        updateAvailability
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider