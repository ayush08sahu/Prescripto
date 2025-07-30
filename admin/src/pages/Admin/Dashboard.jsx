import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-6 pb-20 md:pb-6">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg sm:ml-16">Welcome back! Here's your overview</p>
          <div className="sm:ml-16 mt-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-gray-500">System Status: Online</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Doctors Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src={assets.doctor_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 filter brightness-0 invert" />
              </div>
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {dashData.doctors}
                </p>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Total Doctors</p>
                <div className="mt-2 flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-blue-600 font-semibold">Active</span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-800">Medical Staff</span>
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src={assets.appointment_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 filter brightness-0 invert" />
              </div>
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {dashData.appointments}
                </p>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Appointments</p>
                <div className="mt-2 flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-emerald-600 font-semibold">Scheduled</span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">Bookings</span>
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src={assets.patients_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 filter brightness-0 invert" />
              </div>
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {dashData.patients}
                </p>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Total Patients</p>
                <div className="mt-2 flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-purple-600 font-semibold">Registered</span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-800">Healthcare</span>
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <img src={assets.list_icon} alt="" className="w-5 h-5 filter brightness-0 invert" />
              </div>
              <h2 className="text-white font-bold text-lg sm:text-xl">Latest Appointments</h2>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-semibold">Live Updates</span>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Doctor Image */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={item.docData.image} 
                      alt={item.docData.name} 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Appointment Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300 truncate">
                      Dr. {item.docData.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-2 py-1 rounded-full">
                        <span className="text-amber-800 font-semibold text-xs">{item.slotDate}</span>
                      </div>
                      <div className="text-xs text-gray-500">#{item._id?.slice(-6)}</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {item.canceled ? (
                      <div className="bg-gradient-to-r from-red-100 to-pink-100 px-3 py-2 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-red-700 font-semibold text-xs sm:text-sm">Canceled</span>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => cancelAppointment(item._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group/btn"
                      >
                        <svg className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium hidden sm:inline">Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {dashData.latestAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Recent Appointments</h3>
              <p className="text-gray-500">New appointments will appear here.</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
