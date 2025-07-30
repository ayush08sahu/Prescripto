import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment, setDashData } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loadingStates, setLoadingStates] = useState({})

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (dToken) {
        try {
          setLoading(true)
          setError(null)
          await getDashData()
        } catch (err) {
          setError('Failed to load dashboard data')
          console.error('Dashboard error:', err)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [dToken]) // Removed getDashData from dependencies

  // Navigation functions
  const handleViewAllAppointments = () => {
    navigate('/doctor-appointments')
  }

  const handleUpdateProfile = () => {
    navigate('/doctor-profile')
  }

  const handleViewAnalytics = () => {
    // For now, just show a toast or navigate to a future analytics page
    console.log('Analytics feature coming soon')
  }

  // Appointment action functions
  const handleCompleteAppointment = async (appointmentId) => {
    try {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: 'completing' }))
      await completeAppointment(appointmentId)
      // Update local state immediately
      if (dashData && dashData.latestAppointments) {
        const updatedAppointments = dashData.latestAppointments.map(appointment => 
          appointment._id === appointmentId 
            ? { ...appointment, isComplete: true }
            : appointment
        )
        // Update the dashData state locally
        const updatedDashData = {
          ...dashData,
          latestAppointments: updatedAppointments
        }
        setDashData(updatedDashData)
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
      if (dashData && dashData.latestAppointments) {
        const updatedAppointments = dashData.latestAppointments.map(appointment => 
          appointment._id === appointmentId 
            ? { ...appointment, canceled: true }
            : appointment
        )
        // Update the dashData state locally
        const updatedDashData = {
          ...dashData,
          latestAppointments: updatedAppointments
        }
        setDashData(updatedDashData)
      }
    } catch (error) {
      console.error('Error canceling appointment:', error)
    } finally {
      setLoadingStates(prev => ({ ...prev, [appointmentId]: null }))
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <svg className="w-8 h-8 text-red-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your practice overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Earnings Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {currency}{dashData?.earnings || 0}
                </p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {dashData?.appointments || 0}
                </p>
                <p className="text-xs text-blue-600 mt-1">This month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 sm:col-span-2 lg:col-span-1 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Patients</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {dashData?.patients || 0}
                </p>
                <p className="text-xs text-purple-600 mt-1">Active patients</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Appointments</h2>
            <p className="text-sm text-gray-600 mt-1">Latest 5 appointments</p>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {dashData?.latestAppointments && dashData.latestAppointments.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {dashData.latestAppointments.map((appointment, index) => {
                    const isLoading = loadingStates[appointment._id]
                    return (
                      <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={appointment.userData?.image || assets.default_profile}
                                alt="Patient"
                                onError={(e) => {
                                  e.target.src = assets.default_profile
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {appointment.userData?.name || 'Unknown Patient'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              appointment.isComplete
                                ? 'bg-green-100 text-green-800'
                                : appointment.canceled
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.isComplete ? 'Completed' : appointment.canceled ? 'Canceled' : 'Pending'}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {currency}{appointment.amount}
                            </span>
                            {/* Action buttons */}
                            <div className="flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCompleteAppointment(appointment._id)
                                }}
                                disabled={appointment.isComplete || appointment.canceled || isLoading}
                                className={`px-2 py-1 rounded-md transition font-semibold text-xs w-16 text-center shadow-sm border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center justify-center
                                  ${appointment.isComplete || appointment.canceled
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
                                  'Complete'
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCancelAppointment(appointment._id)
                                }}
                                disabled={appointment.canceled || appointment.isComplete || isLoading}
                                className={`px-2 py-1 rounded-md transition font-semibold text-xs w-16 text-center shadow-sm border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 flex items-center justify-center
                                  ${appointment.canceled || appointment.isComplete
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
                                  'Cancel'
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="px-6 py-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">No recent appointments found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={handleViewAllAppointments}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>View All Appointments</span>
          </button>
          <button 
            onClick={handleUpdateProfile}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Update Profile</span>
          </button>
          <button 
            onClick={handleViewAnalytics}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard