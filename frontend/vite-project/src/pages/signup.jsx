import React from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { signupInitiate,signupVerify } from '../apiManager/auth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate();
    const { role } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log("data", data, role)
        const formData = {
            ...data, role
        }
        try {
            const response = await signupInitiate(formData);
            localStorage.setItem('emailForVerification',formData.email)
            // Redirect to OTP verification page
            navigate("verify");
           
        }
        catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500'>
            <div className='bg-white w-full sm:w-[500px] text-center px-6 py-8 rounded-xl shadow-xl'>
                <h1 className='font-bold text-3xl text-gray-800 mb-4'>
                    {
                        role == "patient" ? "Sign Up as Patient" : "Sign Up as Doctor"
                    }


                </h1>
                <p className='text-gray-600 mb-6'>Sign in to access your account</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name field*/}
                    <div>
                        <input
                            type="text"
                            placeholder='Name'
                            className='w-full px-4 py-3 border bg-gray-100 rounded-lg placeholder-gray-500 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500'
                            {...register("name", { required: "Name is required" })}
                        />
                    </div>

                    {
                        errors.name && (
                            <p style={{ color: 'red' }}>{errors.name.message}</p>
                        )
                    }

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

                    {/* Username field*/}
                    <div>
                        <input
                            type="text"
                            placeholder='Username'
                            className='w-full px-4 py-3 border bg-gray-100 rounded-lg placeholder-gray-500 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500'
                            {...register("username", { required: "Username is required", minLength: { value: 4, message: "Username must be of length 4 characters long" } })}
                        />
                    </div>

                    {
                        errors.username && (
                            <p style={{ color: 'red' }}>{errors.username.message}</p>
                        )
                    }
                    {/* specialization field*/}

                    {role === "doctor" &&<div>
                        <input
                            type="text"
                            placeholder='Specialization'
                            className='w-full px-4 py-3 border bg-gray-100 rounded-lg placeholder-gray-500 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500'
                            {...register("specialization", { required: "Specialization is required", minLength: { value: 4, message: "Specialization must be of length 4 characters long" } })}
                        />
                    

                    {
                        errors.specialization && (
                            <p style={{ color: 'red' }}>{errors.specialization.message}</p>
                        )
                    }
                    </div>
                }

                    {/* hospital field*/}

                    {role === "doctor" && (<div>
                        <input
                            type="text"
                            placeholder='Hospital Name'
                            className='w-full px-4 py-3 border bg-gray-100 rounded-lg placeholder-gray-500 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500'
                            {...register("hospital", { required: "hospital name is required", minLength: { value: 4, message: "Hospital name must be of length 4 characters long" } })}
                        />
                   

                        {
                        errors.hospital && (
                            <p style={{ color: 'red' }}>{errors.hospital.message}</p>
                        )
                    }
                     </div>
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
                        <button className='w-full px-4 py-3 border rounded-lg bg-green-500 text-white font-semibold mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'>
                            {isLoading ? "Loading..." : "Sign Up"}
                        </button>
                    </div>
                    <div className='mt-4'>
                        <p className='text-gray-600'>Already have an account?
                            <NavLink to="/signin" className="text-green-500 font-semibold"> Sign In</NavLink>
                        </p>

                    </div>
                </form>
            </div>
        </div>
    )
}


export default Signup
