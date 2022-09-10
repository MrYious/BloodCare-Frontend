import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaHome } from "react-icons/fa";

const Dashboard = () => {

    const navigate = useNavigate();

    const [nickname, setNickname] = useState(localStorage.getItem('username'));
    const [activeState, setActiveState] = useState({
        A: true
    });

    const [alert, setAlert] = useState({
        message: 'Good Day',
        error: false
    });

    const handleLogout = () => {
        navigate("/login")
        localStorage.clear();
    }

    return (<>
        <div className='flex flex-col items-center justify-between h-screen overflow-y-hidden bg-gradient-to-r from-gray-200 to-gray-300'>
            {/* NAVBAR */}
            <div className="flex items-center justify-between w-full px-3 py-2 border-b-2 border-gray-400 bg-gradient-to-r from-gray-200 to-gray-300">
                {/* ICON */}
                <Link to={'/dashboard'} className="flex items-center w-1/6 text-4xl font-bold text-red-900">
                    BloodCare
                </Link>
                {/* LINKS */}
                <div className="flex items-center justify-end w-2/6 h-full gap-3 ">
                    <Link to={'/dashboard'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-green-700 rounded-full shadow-md w-fit shadow-black">
                        <FaHome width={20} className="my-1 text-red-50"/>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        {nickname}
                    </Link>
                    <div onClick={handleLogout} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer w-fit shadow-black">
                        Logout
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <div className="flex w-full h-full">
                <div className="flex flex-col items-center w-1/4 gap-4 p-6 ">
                    <Link to={''} onClick={() => {setActiveState({A: true})}} className={`flex items-center w-full gap-1 px-6 py-3 text-2xl font-medium text-white rounded-full  ${activeState.A ? "bg-green-900 shadow-lg shadow-black" : "bg-red-900 shadow-black shadow-md"} `}>
                        Browse
                    </Link>
                    <Link to={'requests/pending'} onClick={() => {setActiveState({B: true})}} className={`flex items-center w-full gap-1 px-6 py-3 text-2xl font-medium text-white rounded-full ${activeState.B ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                        Pending Requests
                    </Link>
                    <Link to={'requests/active'} onClick={() => {setActiveState({C: true})}} className={`flex items-center w-full gap-1 px-6 py-3 text-2xl font-medium text-white rounded-full ${activeState.C ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                        Active Requests
                    </Link>
                    <Link to={'history'} onClick={() => {setActiveState({D: true})}} className={`flex items-center w-full gap-1 px-6 py-3 text-2xl font-medium text-white  rounded-full ${activeState.D ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                        History
                    </Link>
                    <Link to={'reviews'} onClick={() => {setActiveState({E: true})}} className={`flex items-center w-full gap-1 px-6 py-3 text-2xl font-medium text-white  rounded-full ${activeState.E ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                        Reviews
                    </Link>
                </div>
                <div className="flex items-center justify-center w-3/4 p-6 bg-red-100">
                    <Outlet/>
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-16 px-4 py-1 bg-gray-400">
                <div className="w-4/12 text-lg font-semibold text-center">
                    { alert.message &&
                        <div className={`px-4 py-1 shadow-sm shadow-black text-center rounded-full w-fit ${ alert.error ? "bg-red-400" : "bg-green-400"}`}>
                            {alert.message}
                        </div>
                    }
                </div>
                <div className="w-3/12 text-lg font-semibold text-center">
                    Blood Donor Information System
                </div>
                <div className="w-4/12 text-lg font-semibold text-right">
                    September 30, 2022 | 09:23 PM
                </div>
            </div>
        </div>
    </>);
}

export default Dashboard;