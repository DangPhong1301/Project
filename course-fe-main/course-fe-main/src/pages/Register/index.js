/* eslint-disable jsx-a11y/anchor-is-valid */
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
// import '../Login/Login.css'
import { ApiClient } from "../../interceptors/axios";
import { useState } from "react";
import React from "react"


function Form(props) {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const nav = useNavigate();
    const onSubmit = (data) => {
        // console.log(data);
        if (data.password.length < 6) {
            setError("Password must be larger than 6 character")
        } else if (data.password != data.confirmPassword) {
            setError("Password and Confirm Password Incorrect. Please try again !")
        } else {
            const register_data = {
                email: data.email,
                password: data.password
            }
            ApiClient().post('account/register', data).then(res => {
                // eslint-disable-next-line eqeqeq
                if (res.status == 200) {
                    nav('/login')
                } else {
                    setError(`${res.data.msg}`)
                }
            })
        }

    }
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up to your account
                        </h1>
                        {error && (
                            <p className="text-[red] text-sm">{error}</p>
                        )}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <input type="email" {...register("email")} name="email" id="email" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                <input type="password" {...register("password")} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" {...register("confirmPassword")} name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                You have an account yet? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Register() {
    return (
        <div>
            <Form />
        </div>
    )
}
export default Register;