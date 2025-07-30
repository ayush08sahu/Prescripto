import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {

const { backendUrl, token, getDoctorsData } = useContext(AppContext);

const [appointments, setAppointments] = useState([])

const navigate = useNavigate();

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const slotDateFormat = (slotDate) => {
  const dateArray = slotDate.split("-")
  return dateArray[0]+" "+ months[Number(dateArray[1])] + " " + dateArray[2]
}

const getUserAppointments = async () => {
  try {
    const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})
    if (data.success) {
      setAppointments(data.appointments.reverse())
      console.log(data.appointments)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

const cancelAppointment = async (appointmentId) => {
  try {
    
    const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})
    if (data.success) {
      toast.success(data.message)
      getUserAppointments()
      getDoctorsData()
    }else{
      toast.error(data.message)
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Appointment Payment",
    description: "Appointment Payment",
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      console.log(response)
      try {
        const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
        if (data.success) {
          getUserAppointments()
          toast.success('Payment successful!')
          navigate('/my-appointments')
        }
      } catch (error) {
        console.log(error)
        toast.error('Payment verification failed')
      }
    }
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}

const appointmentRazorpay = async (appointmentId) => {
  try {
    const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId}, {headers:{token}})
    if (data.success) {
      initPay(data.order)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(() => {
  if (token) {
    getUserAppointments()
  }
}, [token])


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
          My Appointments
        </h1>
        
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border ${item.canceled ? 'border-gray-300 bg-gray-50' : 'border-gray-100'} relative`}>
              {/* Status Badge */}
              {item.canceled && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  CANCELED
                </div>
              )}
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <div className={`w-24 h-24 rounded-full overflow-hidden border-4 shadow-md ${item.canceled ? 'border-gray-300 opacity-60' : 'border-blue-100'}`}>
                    <img 
                      src={item.docData.image} 
                      alt={`Dr. ${item.name}`} 
                      className={`w-full h-full object-cover ${item.canceled ? 'grayscale' : ''}`}
                    />
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1">
                      {item.docData.name}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {item.docData.speciality}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Address:</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>{item.docData.address.line1}</p>
                      <p>{item.docData.address.line2}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-700">
                      Date & Time: 
                      <span className="ml-2 font-semibold text-blue-500">
                        {slotDateFormat(item.slotDate)} | {item.slotTime}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {!item.canceled ? (
                    <>
                      {item.payment ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-default relative overflow-hidden">
                            <div className="flex items-center gap-2 relative z-10">
                              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-lg tracking-wide">PAID</span>
                              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-shimmer"></div>
                          </div>
                          <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            ✨ Payment Completed
                          </div>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => appointmentRazorpay(item._id)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 relative overflow-hidden group">
                            <span className="relative z-10 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                              Pay Online
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-500"></div>
                          </button>
                          <button 
                            onClick={() => cancelAppointment(item._id)} 
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                          >
                            Cancel Appointment
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg opacity-90 cursor-not-allowed">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Appointment Canceled
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
                        Slot Released
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments</h3>
            <p className="text-gray-500">You don't have any appointments scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments