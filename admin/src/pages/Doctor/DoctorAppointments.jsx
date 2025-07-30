import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment, setAppointments } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  
  const [loadingStates, setLoadingStates] = useState({})

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: 'completing' }))
      await completeAppointment(appointmentId)
      // Update local state immediately
      if (appointments) {
        const updatedAppointments = appointments.map(appointment => 
          appointment._id === appointmentId 
            ? { ...appointment, isComplete: true }
            : appointment
        )
        setAppointments(updatedAppointments)
      }
    } catch (error) {
      console.error('Error completing appointment:', error)
    } finally {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: null }))
    }
  }

  const handleCancelAppointment = async (appointmentId) => {
    try {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: 'canceling' }))
      await cancelAppointment(appointmentId)
      // Update local state immediately
      if (appointments) {
        const updatedAppointments = appointments.map(appointment => 
          appointment._id === appointmentId 
            ? { ...appointment, canceled: true }
            : appointment
        )
        setAppointments(updatedAppointments)
      }
    } catch (error) {
      console.error('Error canceling appointment:', error)
    } finally {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: null }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-1 sm:px-4 md:px-8 lg:px-16 pb-24">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-3 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-6 sm:mb-8 text-center tracking-tight">All Appointments</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[340px] sm:min-w-[700px]">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-7 gap-2 sm:gap-4 bg-blue-100 rounded-lg px-2 sm:px-4 py-2 font-semibold text-blue-700 text-xs sm:text-sm uppercase">
              <p>#</p>
              <p>Patient</p>
              <p>Payment</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Fees</p>
              <p>Action</p>
            </div>
            <div>
              {appointments.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-lg">No appointments found.</div>
              ) : (
                appointments.map((item, index) => {
                  const isLoading = loadingStates[item._id]
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-7 gap-y-2 sm:gap-4 items-center bg-white hover:bg-blue-50 transition rounded-lg px-2 sm:px-4 py-3 my-2 shadow-sm"
                    >
                      {/* Mobile label for each field */}
                      <div className="sm:hidden flex justify-between items-center">
                        <span className="font-semibold text-blue-700">#</span>
                        <span className="font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <p className="hidden sm:block font-bold text-blue-600">{index + 1}</p>

                      <div className="sm:col-span-1 flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={item.userData.image}
                          alt=""
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-200 object-cover shadow"
                          onError={(e) => {
                            e.target.src = assets.default_profile
                          }}
                        />
                        <p className="font-medium text-gray-700 text-xs sm:text-base">{item.userData.name}</p>
                      </div>

                      <div className="sm:col-span-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.payment
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {item.payment ? 'Online' : 'CASH'}
                        </span>
                      </div>

                      <p className="text-gray-600 text-xs sm:text-base">{calculateAge(item.userData.dob)}</p>
                      <p className="text-gray-600 text-xs sm:text-base">
                        {slotDateFormat(item.slotDate)}, {item.slotTime}
                      </p>
                      <p className="font-semibold text-blue-700 text-xs sm:text-base">
                        {currency}
                        {item.amount}
                      </p>
                      {/* Action and Status Column */}
                      <div className="flex flex-col items-center space-y-1">
                        {/* Status display */}
                        {item.isComplete ? (
                          <span className="px-2 py-0.5 rounded-full bg-green-200 text-green-800 text-xs font-bold text-center w-16 sm:w-20 mb-1">Completed</span>
                        ) : item.canceled ? (
                          <span className="px-2 py-0.5 rounded-full bg-red-200 text-red-800 text-xs font-bold text-center w-16 sm:w-20 mb-1">Canceled</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold text-center w-16 sm:w-20 mb-1">Pending</span>
                        )}
                        {/* Action buttons */}
                        <div className="flex flex-row space-x-1 w-full justify-center">
                          <button
                            onClick={() => handleCompleteAppointment(item._id)}
                            disabled={item.isComplete || item.canceled || isLoading}
                            className={`px-2 py-1 rounded-md transition font-semibold text-xs w-16 sm:w-20 text-center shadow-sm border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center justify-center
                              ${item.isComplete || item.canceled
                                ? 'bg-green-50 text-green-300 cursor-not-allowed opacity-60'
                                : isLoading === 'completing'
                                ? 'bg-green-100 text-green-700 cursor-wait'
                                : 'bg-green-100 hover:bg-green-200 text-green-700'}
                            `}
                            title="Mark as Completed"
                          >
                            {isLoading === 'completing' ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b border-green-600"></div>
                            ) : (
                              'Completed'
                            )}
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(item._id)}
                            disabled={item.canceled || item.isComplete || isLoading}
                            className={`px-2 py-1 rounded-md transition font-semibold text-xs w-16 sm:w-20 text-center shadow-sm border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 flex items-center justify-center
                              ${item.canceled || item.isComplete
                                ? 'bg-red-50 text-red-300 cursor-not-allowed opacity-60'
                                : isLoading === 'canceling'
                                ? 'bg-red-100 text-red-700 cursor-wait'
                                : 'bg-red-100 hover:bg-red-200 text-red-700'}
                            `}
                            title="Mark as Canceled"
                          >
                            {isLoading === 'canceling' ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b border-red-600"></div>
                            ) : (
                              'Canceled'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments