import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {

    const [alert, setAlert] = useState({
        message: '',
        error: false
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (<>
        <div className='flex flex-col items-center justify-start h-screen bg-gradient-to-r from-gray-200 to-gray-300'>
            {/* NAVBAR */}
            <div className="flex items-center justify-between w-full px-3 py-2 bg-gradient-to-r from-gray-200 to-gray-300">
                {/* ICON */}
                <Link to={'/'} className="flex items-center w-1/6 text-4xl font-bold text-red-900">
                    BloodCare
                </Link>
                {/* LINKS */}
                <div className="flex items-center justify-end w-5/6 h-full gap-3 ">
                    <Link to={'/register'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        Register
                    </Link>
                    <Link to={'/'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        Home
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-full ">
                <div className="flex flex-col items-center justify-center w-2/6 gap-6 p-8 my-5 border-2 border-red-900 shadow-md shadow-red-900 bg-gradient-to-r from-gray-300 to-gray-300 rounded-3xl">
                    <div className="flex flex-col items-center justify-center gap-3 text-5xl font-bold tracking-tight">
                        <FaUserAlt className="w-20 h-20 p-1 border-4 border-black rounded-full"/>
                        <div>
                            WELCOME
                        </div>
                    </div>
                    { alert.message &&
                        <div className={`px-4 py-1 text-sm shadow-sm shadow-black text-center rounded-full font-semibold ${ alert.error ? "bg-red-400" : "bg-green-400"}`}>
                            {alert.message}
                        </div>
                    }
                    <form onSubmit={() =>{}} className="flex flex-col items-start justify-center w-full gap-4 px-10 py-3">
                        <div className='flex flex-col items-center justify-center w-full gap-3 pb-3 text-lg'>
                            <div className="flex items-center justify-center w-full gap-3 ">
                                <FaEnvelope className="w-8 h-8 mx-2"/>
                                <input className="w-full px-3 py-2 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="50" value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} placeholder="Email" autoComplete="email" required/>
                            </div>
                            <div className="flex items-center justify-center w-full gap-3">
                                <FaLock className="w-8 h-8 mx-2"/>
                                <input className="w-full px-3 py-2 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="15" value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} placeholder="Password" autoComplete="password" required/>
                            </div>
                        </div>
                        <button type="submit" className="w-full py-3 text-xl font-bold tracking-wide text-gray-200 bg-green-900 rounded-sm shadow-md shadow-black">
                            LOGIN
                        </button>
                        <div className="w-full tracking-normal text-center">
                            <span> Not yet registered ? </span>
                            <Link to='/register' className="text-red-600 ">
                                Sign Up Here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default Login;