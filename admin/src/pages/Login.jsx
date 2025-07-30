import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const {setAToken, backendUrl} = useContext(AdminContext);
  const {setDToken} = useContext(DoctorContext)

const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
        
        if (state === 'Admin') {
            
            const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
            if (data.success) {
                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
            }else{
                toast.error(data.message)
            }
        }else{
          const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
          if (data.success) {
              localStorage.setItem('dToken', data.token)
              setDToken(data.token)
              console.log(data.token)
          }else{
              toast.error(data.message)
          }
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={onSubmitHandler} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <span className="text-gray-700">{state}</span> Login
              </h1>
              <p className="text-gray-500 mt-2">
                Welcome back! Please sign in to your account.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
            >
              Login
            </button>
            {
                state === 'Admin'
                ? <p>Doctor Login? <span className="text-indigo-500 underline cursor-pointer" onClick={()=>setState('Doctor')}>Click here</span></p>
                : <p>Admin Login? <span className="text-indigo-500 underline cursor-pointer" onClick={()=>setState('Admin')}>Click here</span></p>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
