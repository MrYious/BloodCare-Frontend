import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {

    const [alert, setAlert] = useState({
        message: 'Good Day',
        error: false
    });

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
                    <Link Link to={'/dashboard'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-green-700 rounded-full shadow-md w-fit shadow-black">
                        <FaHome width={20} className="my-1 text-red-50"/>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        Mark Edison
                    </Link>
                    <Link to={'/'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        Logout
                    </Link>
                </div>
            </div>
            {/* CONTENT */}
            <div className="w-full h-full px-4 py-2">
                
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