import React from 'react'
import { AdminContext } from '../../context/AdminContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointment = () => {

  const {aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext);
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)


  useEffect(()=>{
    if (aToken) {
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-6">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            All Appointments
          </h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg sm:ml-16">Manage and monitor all patient appointments</p>
        <div className="sm:ml-16 mt-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-500">{appointments.length} Total Appointments</span>
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
          <div className="grid grid-cols-7 gap-4 text-white font-semibold text-sm uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">#</span>
              <span>ID</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Patient</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Age</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Date & Time</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Doctor</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span>Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Action</span>
            </div>
          </div>
        </div>

        {/* Desktop Table Body */}
        <div className="divide-y divide-gray-100">
          {appointments
            .sort((a, b) => {
              // Sort by date and time - latest first
              // Parse slotDate format: "day-month-year" to proper date
              const parseDate = (slotDate, slotTime) => {
                const [day, month, year] = slotDate.split('-');
                // Convert to standard format: "month/day/year time"
                return new Date(`${month}/${day}/${year} ${slotTime}`);
              };
              
              const dateA = parseDate(a.slotDate, a.slotTime);
              const dateB = parseDate(b.slotDate, b.slotTime);
              return dateB - dateA; // Descending order (latest first)
            })
            .map((item, index) => (
            <div key={index} className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group">
              {/* ID */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {index + 1}
                </div>
              </div>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={item.userData.image} 
                    alt={item.userData.name} 
                    className="w-12 h-12 rounded-full object-cover border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {item.userData.name}
                  </p>
                  <p className="text-xs text-gray-500">Patient ID: {item.userData._id?.slice(-6)}</p>
                </div>
              </div>

              {/* Age */}
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                  <span className="text-purple-700 font-semibold text-sm">{calculateAge(item.userData.dob)} years</span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-2 rounded-lg border border-amber-200">
                  <p className="text-amber-800 font-medium text-sm">{slotDateFormat(item.slotDate)}</p>
                  <p className="text-amber-600 text-xs">{item.slotTime}</p>
                </div>
              </div>

              {/* Doctor */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={item.docData.image} 
                    alt={item.docData.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-700 text-sm group-hover:text-blue-600 transition-colors duration-300">
                    Dr. {item.docData.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.docData.speciality}</p>
                </div>
              </div>

              {/* Fees */}
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-lg border border-emerald-200">
                  <span className="text-emerald-700 font-bold text-lg">{currency} {item.amount}</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center">
                {item.canceled ? (
                  <div className="bg-gradient-to-r from-red-100 to-pink-100 px-4 py-2 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-red-700 font-semibold text-sm">Canceled</span>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm font-medium">Cancel</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Appointments Found</h3>
            <p className="text-gray-500 text-lg">There are currently no appointments to display.</p>
          </div>
        )}
      </div>

      {/* Mobile Card View - Visible on mobile and tablet */}
      <div className="lg:hidden space-y-4 pb-24 md:pb-6">
        {appointments
          .sort((a, b) => {
            // Sort by date and time - latest first
            // Parse slotDate format: "day-month-year" to proper date
            const parseDate = (slotDate, slotTime) => {
              const [day, month, year] = slotDate.split('-');
              // Convert to standard format: "month/day/year time"
              return new Date(`${month}/${day}/${year} ${slotTime}`);
            };
            
            const dateA = parseDate(a.slotDate, a.slotTime);
            const dateB = parseDate(b.slotDate, b.slotTime);
            return dateB - dateA; // Descending order (latest first)
          })
          .map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {index + 1}
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  ID: {item.userData._id?.slice(-6)}
                </div>
              </div>
              {item.canceled ? (
                <div className="bg-gradient-to-r from-red-100 to-pink-100 px-3 py-1 rounded-full border border-red-200">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-red-700 font-semibold text-xs">Canceled</span>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-xs font-medium">Cancel</span>
                </button>
              )}
            </div>

            {/* Patient Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img 
                  src={item.userData.image} 
                  alt={item.userData.name} 
                  className="w-14 h-14 rounded-full object-cover border-3 border-blue-100 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{item.userData.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-1 rounded-full">
                    <span className="text-purple-700 font-semibold text-xs">{calculateAge(item.userData.dob)} years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Date & Time */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Schedule</span>
                </div>
                <p className="text-amber-800 font-medium text-sm">{slotDateFormat(item.slotDate)}</p>
                <p className="text-amber-600 text-xs">{item.slotTime}</p>
              </div>

              {/* Fees */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Fees</span>
                </div>
                <span className="text-emerald-700 font-bold text-lg">{currency} {item.amount}</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Doctor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={item.docData.image} 
                    alt={item.docData.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                </div>
                <div>
                  <p className="font-medium text-blue-800 text-sm">Dr. {item.docData.name}</p>
                  <p className="text-xs text-blue-600">{item.docData.speciality}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Appointments Found</h3>
            <p className="text-gray-500">There are currently no appointments to display.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointment