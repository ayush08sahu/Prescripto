import React from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";


const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fee, setFee] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [about, setAbout] = useState('')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        setIsLoading(true)

        try {
            
            if (!docImg) {
                setIsLoading(false)
                return toast.error('Please upload a doctor image')
            }

            if (!name || !email || !password || !fee || !degree || !address1 || !about) {
                setIsLoading(false)
                return toast.error('Please fill all required fields')
            }

            const formData = new FormData()

            // Ensure all field names match exactly what backend expects
            formData.append('image', docImg)
            formData.append('name', name.trim())
            formData.append('email', email.trim())
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fee', fee)
            formData.append('speciality', speciality)
            formData.append('about', about.trim())
            formData.append('degree', degree.trim())
            formData.append('address1', address1.trim())
            formData.append('address2', address2.trim())
            formData.append('address', JSON.stringify({line1: address1.trim(), line2: address2.trim()}))

            console.log('Submitting form data:')
            console.log('Image:', docImg)
            console.log('Name:', name)
            console.log('Email:', email)
            console.log('Password:', password)
            console.log('Experience:', experience)
            console.log('Fee:', fee)
            console.log('Speciality:', speciality)
            console.log('About:', about)
            console.log('Degree:', degree)
            console.log('Address1:', address1)
            console.log('Address2:', address2)
            console.log('Address JSON:', JSON.stringify({line1: address1.trim(), line2: address2.trim()}))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
                headers: { 
                    'aToken': aToken,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', data)

            if (data.success) {
                toast.success(data.message)
                // Reset form after successful submission
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 Year')
                setFee('')
                setSpeciality('General physician')
                setAbout('')
                setDegree('')
                setAddress1('')
                setAddress2('')
            } else {
                console.log('Error response:', data)
                toast.error(data.message || 'Failed to add doctor')
            }
        } catch (error) {
            console.log('Full error:', error)
            console.log('Error response:', error.response?.data)
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else if (error.response?.data?.error) {
                toast.error(error.response.data.error)
            } else {
                toast.error('Something went wrong. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <form  onSubmit={onSubmitHandler} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Add Doctor
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Fill in the details to add a new doctor to the system
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Image Upload Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300">
                <label htmlFor="doc-img" className="cursor-pointer block">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <img
                      src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                      alt="Upload"
                      className="mx-auto w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-gray-700">
                        Upload Doctor Image
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Click to select or drag and drop
                      </p>
                    </div>
                  </div>
                </label>
                <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Doctor Name
                  </label>
                  <input
                    onChange={(e)=> setName(e.target.value)} value={name}
                    type="text"
                    placeholder="Enter doctor's name"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Doctor Email
                  </label>
                  <input
                    onChange={(e)=> setEmail(e.target.value)} value={email}
                    type="email"
                    placeholder="Enter email address"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Doctor Password
                  </label>
                  <input
                    onChange={(e)=> setPassword(e.target.value)} value={password}
                    type="password"
                    placeholder="Enter password"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Experience
                  </label>
                  <select onChange={(e)=> setExperience(e.target.value)} value={experience} className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 bg-white text-sm sm:text-base">
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Year</option>
                    <option value="3 Year">3 Year</option>
                    <option value="4 Year">4 Year</option>
                    <option value="5 Year">5 Year</option>
                    <option value="6 Year">6 Year</option>
                    <option value="7 Year">7 Year</option>
                    <option value="8 Year">8 Year</option>
                    <option value="9 Year">9 Year</option>
                    <option value="10 Year">10 Year</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Fee
                  </label>
                  <input
                    onChange={(e)=> setFee(e.target.value)} value={fee}
                    type="number"
                    placeholder="Enter consultation fee"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Speciality
                  </label>
                  <select  onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 bg-white text-sm sm:text-base">
                    <option value="General physician">General physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Education
                </label>
                <input
                  onChange={(e)=> setDegree(e.target.value)} value={degree}
                  type="text"
                  placeholder="Enter educational background"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <label className="text-sm font-medium text-gray-700 block">
                  Address
                </label>
                <div className="space-y-3">
                  <input
                    onChange={(e)=> setAddress1(e.target.value)} value={address1}
                    type="text"
                    placeholder="Address Line 1"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 text-sm sm:text-base"
                  />
                  <input
                    onChange={(e)=> setAddress2(e.target.value)} value={address2}
                    type="text"
                    placeholder="Address Line 2"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  About Doctor
                </label>
                <textarea
                  onChange={(e)=> setAbout(e.target.value)} value={about}
                  placeholder="Write about the doctor's expertise, achievements, and background..."
                  rows={4}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400 resize-none text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? 'Adding Doctor...' : 'Add Doctor'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
