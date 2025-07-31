import React, { useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'

const DoctorProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isAvailLoading, setIsAvailLoading] = useState(false);

  const { dToken, profileData, setProfileData, getProfileData, updateProfileData, updateAvailability } = useContext(DoctorContext)
  const {currency, backendUrl} = useContext(AppContext)

  useEffect(()=>{
    if (dToken) {
      getProfileData()
    }
  },[dToken])

  const handleEditClick = () => {
    setEditFormData({
      name: profileData.name || '',
      email: profileData.email || '',
      speciality: profileData.speciality || '',
      degree: profileData.degree || '',
      experience: profileData.experience || '',
      about: profileData.about || '',
      fee: profileData.fee || 0,
      address: profileData.address || {},
      available: profileData.available || false
    })
    setIsEditModalOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const success = await updateProfileData(editFormData)
    if (success) {
      setIsEditModalOpen(false)
    }
    setIsLoading(false)
  }

  const handleAvailabilityToggle = async () => {
    if (!profileData) {
      console.log('Profile data not available');
      return;
    }
    
    const currentAvailability = profileData.available || false;
    const newAvailability = !currentAvailability;
    console.log('Current availability:', currentAvailability, 'New availability:', newAvailability);
    
    // Update frontend immediately for instant feedback
    setProfileData(prev => ({
      ...prev,
      available: newAvailability
    }));
    
    setIsAvailLoading(true);
    
    try {
      await updateAvailability(newAvailability);
    } catch (error) {
      console.error('Error updating availability:', error);
      // Revert the frontend change if API call fails
      setProfileData(prev => ({
        ...prev,
        available: currentAvailability
      }));
      toast.error('Failed to update availability');
    } finally {
      setIsAvailLoading(false);
    }
  };

  // Show loading state if profile data is not available
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-32">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img 
                  src={profileData.image} 
                  alt="Doctor Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-lg text-gray-600 font-medium">{profileData.degree} - {profileData.speciality}</p>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {profileData.experience}
                  </span>
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                    {profileData.about}
                  </p>
                </div>

                {/* Fee Section */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Appointment Fee</p>
                      <p className="text-2xl font-bold text-green-600">{currency}{profileData.fee}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 lg:mt-0 lg:ml-8 space-y-4">
                {/* Availability Toggle */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          id="availability"
                          checked={profileData.available || false}
                          onChange={handleAvailabilityToggle}
                          disabled={isAvailLoading}
                        />
                        <label
                          htmlFor="availability"
                          className="flex items-center cursor-pointer"
                        >
                                                     <div className={`w-12 h-6 ${(profileData.available || false) ? 'bg-green-400' : 'bg-gray-300'} rounded-full p-1 transition-colors duration-200 ease-in-out`}>
                             <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${(profileData.available || false) ? 'translate-x-6' : ''}`}></div>
                           </div>
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            {isAvailLoading ? 'Updating...' : 'Available'}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 ${(profileData.available || false) ? 'bg-green-500' : 'bg-gray-400'} rounded-full mr-2`}></div>
                      <span className="text-xs text-gray-500">{(profileData.available || false) ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button 
                  onClick={handleEditClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Speciality</label>
                  <input
                    type="text"
                    name="speciality"
                    value={editFormData.speciality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={editFormData.degree}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={editFormData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* About Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                <textarea
                  name="about"
                  value={editFormData.about}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Fee and Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Fee ({currency})</label>
                  <input
                    type="number"
                    name="fee"
                    value={editFormData.fee}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min="0"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="available"
                    checked={editFormData.available}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Available for Appointments</label>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorProfile