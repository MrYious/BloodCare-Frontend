import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Datetime from "../components/Datetime";
import { FaHome } from "react-icons/fa";

const Dashboard = () => {

    const navigate = useNavigate();
    let location = useLocation();

    const isDonor = localStorage.getItem('type') === "Donor";
    const nickname = localStorage.getItem('username');

    const [localUserData, setLocalUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    const [localAddressData, setLocalAddressData] = useState(JSON.parse(localStorage.getItem('addressData')));
    // const [localDonorInfoData, setLocalDonorInfoData] = useState(isDonor === "Donor" ? JSON.parse(localStorage.getItem('donorInfoData')) : {} );

    console.log("Dashboard", localUserData)
    console.log("Dashboard", localAddressData)
    // console.log("Dashboard", localDonorInfoData)

    const [activeState, setActiveState] = useState({
        A: true
    });

    const [alert, setAlert] = useState({
        message: 'Have a great day!',
        error: false
    });

    const handleLogout = () => {
        navigate("/login")
        localStorage.clear();
    }

    useEffect(() => {
        setAlert({
            message: 'Have a great day!',
            error: false
        });
        console.log(location);
    }, [location]);

    if(!localStorage.getItem('loggedIn')){
        return <Navigate to="/" replace />
    }else{
        return (<>
            <div className='flex flex-col h-screen bg-gradient-to-r from-gray-200 to-gray-300'>
                {/* NAVBAR */}
                <div className="flex items-center justify-between w-full px-3 py-2 border-b-2 border-red-900 select-none h-fit bg-gradient-to-r from-gray-200 to-gray-300">
                    {/* ICON */}
                    <Link to={'/dashboard'} className="flex items-center w-1/6 text-4xl font-bold text-red-900">
                        BloodCare
                    </Link>
                    {/* LINKS */}
                    <div className="flex items-center justify-end w-2/6 h-full gap-3 ">
                        <Link to={'/dashboard'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-green-700 rounded-md shadow-md w-fit shadow-black">
                            <FaHome width={22} className="my-1 text-red-50"/>
                        </Link>
                        <Link to={'/profile'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-md shadow-md w-fit shadow-black">
                            {nickname}
                        </Link>
                        <div onClick={handleLogout} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-md shadow-md cursor-pointer w-fit shadow-black">
                            Logout
                        </div>
                    </div>
                </div>
                {/* CONTENT */}
                <div className="flex items-center justify-center w-full h-full overflow-auto">
                    {/* SIDEBAR */}
                    <div className="flex flex-col items-center w-1/6 h-full gap-4 px-4 py-6 select-none">
                        <Link to={''} onClick={() => {setActiveState({A: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm  ${activeState.A ? "bg-green-900 shadow-lg shadow-black" : "bg-red-900 shadow-black shadow-md"} `}>
                            Home
                        </Link>
                        <Link to={'browse'} onClick={() => {setActiveState({B: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm  ${activeState.B ? "bg-green-900 shadow-lg shadow-black" : "bg-red-900 shadow-black shadow-md"} `}>
                            Browse
                        </Link>
                        <Link to={'requests/pending'} onClick={() => {setActiveState({C: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm ${activeState.C ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            Pending Requests
                        </Link>
                        <Link to={'requests/active'} onClick={() => {setActiveState({D: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm ${activeState.D ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            Active Requests
                        </Link>
                        <Link to={'history'} onClick={() => {setActiveState({E: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white  rounded-sm ${activeState.E ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            History
                        </Link>
                    </div>
                    {/* CONTENT */}
                    <div className="flex items-center justify-center w-5/6 h-full">
                        <Outlet context={{
                            isDonor: isDonor,
                            userData: localUserData,
                            addressData: localAddressData,
                            setAlert
                        }}/>
                    </div>
                </div>
                {/* STATUSBAR */}
                <div className="flex items-center justify-between w-full h-16 px-4 py-1 bg-gray-400 select-none">
                    <div className="w-4/12 font-semibold text-center text-md">
                        { alert.message &&
                            <div className={`px-4 py-1 shadow-sm shadow-black text-center rounded-full w-fit ${ alert.error ? "bg-red-400" : "bg-green-400"}`}>
                                {alert.message}
                            </div>
                        }
                    </div>
                    <div className="w-3/12 font-semibold text-center text-md">
                        Blood Donor Information System
                    </div>
                    <div className="w-4/12 font-semibold text-right text-md">
                        <Datetime />
                    </div>
                </div>
            </div>
        </>);
    }
}

export default Dashboard;