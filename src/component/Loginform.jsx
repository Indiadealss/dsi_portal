import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";


export const Loginform = () => {


    const loginData = [
        { email: '1998keshavyadav@gmail.com', password: 'kapil98yadaV@', userName: 'Keshav Yadav', city: 'Gajraula', dirstict: 'Amroha' }
    ]

    const [form, setForm] = useState('Register')
    const [buttName,setButtName] = useState('Login')

    // input field 

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [conformPassword,setConformPassword] = useState('')
    const [iname,setIname] = useState('')
    const [ervalidate,setErvalidate] = useState('')
    // const [log]
    function login() {
        if(buttName === 'Login'){
            if(loginData[0].email === email && loginData[0].password === password){
                alert('You are sussfully Login')
            }
            else if(email === '' || password === ''){
                if(email === ''){
                    document.getElementById('email-address-icon').classList.add('border-red-500')
                }
                if(password === ''){
                    document.getElementById('Password').classList.add('border-red-500')
                }
                if(email != ''){
                    document.getElementById('email-address-icon').classList.remove('border-red-500')
                }
                if(password != ''){
                    document.getElementById('Password').classList.remove('border-red-500')
                }
            }
            else if(loginData[0].email != email || loginData[0].password != password ){
                    document.getElementById('email-address-icon').classList.add('border-red-500')
                    document.getElementById('Password').classList.add('border-red-500')
                    setErvalidate('You have Enter the wrong cridintals');
            }
        }
        else if(buttName === 'Register'){
            if(iname === ''){
                document.getElementById('').classList.add('border-red-500')
            }
            if(email === ''){
                    document.getElementById('email-address-icon').classList.add('border-red-500')
                }
                if(password === ''){
                    document.getElementById('Password').classList.add('border-red-500')
                }
                if(password != '' && conformPassword != password){
                    document.getElementById('Password').classList.add('border-red-500')
                    document.getElementById('ConformPassword').classList.add('border-red-500')
                    setErvalidate('Password Not match')
                }
        }
        

    }

    function RegisterPage() {
        if (form === 'Register') {
            setForm('Login')
            setButtName('Register')
        }
        else if(form === 'Login'){
            setForm('Register')
            setButtName('Login')
        }
    }

    function forgotPassword(){
        setForm('Password')
        setButtName('Generate Password')
    }
    return (
        <section id='loginForm' className=''>

            <form className="max-w-sm mx-auto">

                <label for="email-address-icon" className={`${form ==='Login' ? ' block mb-2 text-sm font-medium text-gray-900 dark:text-white':'hidden'}`}>Name</label>
                <div className={`${form === 'Login' ? 'flex' : 'hidden'}`}>
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                    </span>
                    <input type="text" id="website-admin" onChange={(e) => setIname(e.currentTarget.value)} className={`${form === 'Register' ? 'hidden': 'rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}`} placeholder="Full Name" />
                </div>
                <label for="email-address-icon" className='my-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your Email</label>

                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input type="email" id="email-address-icon" onChange={(e) => setEmail(e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                
                </div>
                {/* <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
                        <FaRegUserCircle />
                    </div>
                    <input type="text" id="name-address-icon" className="bg-gray-50 my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" />
                </div> */}

                <div className={`${form === 'Password' ? 'hidden' : 'my-5'}`}>
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="Password" onChange={(e) => setPassword(e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    <span><a className={`${form === 'Login' ? 'hidden' :'text-xs cursor-pointer'} `} onClick={forgotPassword}>Forgot Password?</a></span>
                    <div className={`${form === 'Login' ? 'hidden' : 'flex w-auto items-center h-5 float-right'}`}>
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                </div>
                    <span className='text-red-500 font-semibold text-xs '>{ervalidate}</span>

                <div className={`${form === 'Login' ? 'my-5' : 'hidden'}`}>
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conform Password</label>
                    <input type="password" id="ConformPassword" onChange={(e) => setConformPassword(e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    <span><a className={`${form === 'Login' ? 'hidden' :'text-xs'} `}>Forgot Password?</a></span>
                    <div className={`${form === 'Login' ? 'hidden' : 'flex w-auto items-center h-5 float-right'}`}>
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                </div>
                <div className='flex flex-col justify-center w-auto'>
                    <button type='button' className='bg-blue-500 rounded-sm px-25 cursor-pointer my-2 py-2' onClick={login}>
                        {buttName}
                    </button>
                    {/* <span className='text-center'>or</span> */}
                    <span className={`${form ==='Password' ? 'hidden':'text-center cursor-pointer'}`} onClick={RegisterPage}><a>{form}</a></span>

                </div>
            </form>

        </section>
    )
}
