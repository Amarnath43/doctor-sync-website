import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { signinInitiate,signinVerify } from '../apiManager/auth'
import { useNavigate } from 'react-router-dom';

const signin = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();

  const onSubmit=async(data)=>{
    setIsLoading(true);
    console.log(data);
    const formData = {
      ...data
  }
  try{
    const response=await signinInitiate(formData);
    localStorage.setItem('emailForVerification',formData.email)
            // Redirect to OTP verification page
            navigate("verify");
            setIsLoading(false);
  }
  catch(e)
  {
    console.log(e.message);
    setIsLoading(false);
  }

  }

  
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500'>
      <div className='bg-white w-full sm:w-[500px] text-center px-6 py-8 rounded-xl shadow-xl'>
        <h1 className='font-bold text-3xl text-gray-800 mb-4'>Welcome Back</h1>
        <p className='text-gray-600 mb-6'>Sign in to access your account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email field*/}
          <div>
            <input
              type="email"
              placeholder='Email address'
              className='w-full px-4 py-3 border bg-gray-100 rounded-lg placeholder-gray-500 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500'
              {...register("email", {
                required: "Email is required", pattern: {
                  value: /^[A-z0-9._%+-]+@[A-z0-9.-]+.[A-z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>

          {
            errors.email && (
              <p style={{ color: 'red' }}>{errors.email.message}</p>
            )
          }

          {/* Password field*/}

          <div>
            <input
              type="password"
              placeholder='Password'
              className='w-full px-4 py-3 border bg-gray-100 rounded-lg placeholder-gray-500 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500'
              {...register("password", {
                required: "Password is Mandatory", minLength: {
                  value: 8, message: "Password must be of atleast 6 characters long"
                }
              })}
            />
          </div>
          {
            errors.password && (
              <p style={{ color: 'red' }}>{errors.password.message}</p>
            )
          }


<div disabled={isLoading}>
                                <button className=' h-10 px-4 text-white border-green-500 bg-green-500 font-bold rounded-lg w-full mt-4 mb-2'>{isLoading ? "Loading..." : "Sign In"
                                }</button>
                            </div>
          <div className='mt-4'>
            <p className='text-gray-600'>Don’t have an account yet?
              <NavLink to="/signup/patient" className="text-green-500 font-semibold"> Sign Up</NavLink>
            </p>
            <p className='text-gray-600 mt-2'>Register as
              <NavLink to="/signup/doctor" className="text-green-500 font-semibold"> Doctor</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default signin
