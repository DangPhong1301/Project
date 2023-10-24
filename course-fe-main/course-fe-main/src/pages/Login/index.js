/* eslint-disable jsx-a11y/anchor-is-valid */
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom";
// import '../Login/Login.css'
import { ApiClient } from "../../interceptors/axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react"

function Form(props) {
    if (localStorage.getItem('level')) {
        localStorage.removeItem('level');
        localStorage.removeItem('accessToken');
    }
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const nav = useNavigate();
    const onSubmit = (data) => {
        ApiClient().post('account/login', data).then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.status == 200) {
                const level = res.data.level;
                localStorage.setItem('level', level)
                localStorage.setItem('accessToken', res.data.accessToken)
                if (level == '1') {
                    nav('/home')
                } else if (level == '2') {
                    nav('/teacher')
                } else if (level == '3') {
                    nav('/admin')
                }
            } else {
                toast.error(`${res.data.msg}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        })
    }
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {error && (
                            <p className="text-[red] text-sm">{error}</p>
                        )}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" {...register("email")} placeholder="Enter Your Email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" {...register("password")} name="password" id="password" placeholder="Enter Your Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="ml-3 text-sm">
                                        <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                    </div>
                                </div>
                                <Link to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Lost Your password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Login() {
    return (
        <div>
            <Form />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
export default Login;