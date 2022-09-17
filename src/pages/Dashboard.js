import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Datetime from "../components/Datetime";
import { FaHome } from "react-icons/fa";

const Dashboard = () => {

    // TODO: CONTENT NG TABS

    const navigate = useNavigate();

    var localUserData = JSON.parse(localStorage.getItem('userData'));
    var localUserAddressData = JSON.parse(localStorage.getItem('userAddressData'));

    console.log("Main", localUserData)
    console.log("Main", localUserAddressData)

    const [nickname, setNickname] = useState(localStorage.getItem('username'));

    const [isDonor, setIsDonor] = useState(localUserData.accountType === "Donor");

    const [lastName, setLastName] = useState(localUserData.lastname);
    const [firstName, setFirstName] = useState(localUserData.firstname);
    const [middleName, setMiddleName] = useState(localUserData.middlename);
    const [gender, setGender] = useState(localUserData.gender);
    const [age, setAge] = useState(localUserData.age);
    const [mobileNo, setMobileNo] = useState(localUserData.mobileNo);
    const [email, setEmail] = useState(localUserData.email);

    const [address1, setAddress1] = useState(localUserAddressData.addressLine1);

    const [bloodType, setBloodType] = useState(localUserData.bloodType);

    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [regionAddr, setRegionAddr] = useState(localUserAddressData.region);
    const [provinceAddr, setProvinceAddr] = useState(localUserAddressData.province);
    const [cityAddr, setCityAddr] = useState(localUserAddressData.city);
    const [barangayAddr, setBarangayAddr] = useState(localUserAddressData.barangay);

    const BLOOD_TYPES = [
        "A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"
    ]

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
                {
                    isDonor ? <>
                        <Link to={''} onClick={() => {setActiveState({A: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm  ${activeState.A ? "bg-green-900 shadow-lg shadow-black" : "bg-red-900 shadow-black shadow-md"} `}>
                            Browse
                        </Link>
                        <Link to={'requests/pending'} onClick={() => {setActiveState({B: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm ${activeState.B ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            Pending Requests
                        </Link>
                        <Link to={'requests/active'} onClick={() => {setActiveState({C: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm ${activeState.C ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            Active Requests
                        </Link>
                        <Link to={'history'} onClick={() => {setActiveState({D: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white  rounded-sm ${activeState.D ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            History
                        </Link>
                        <Link to={'reviews'} onClick={() => {setActiveState({E: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white  rounded-sm ${activeState.E ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            Reviews
                        </Link>
                    </> : <>
                        <Link to={''} onClick={() => {setActiveState({A: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm  ${activeState.A ? "bg-green-900 shadow-lg shadow-black" : "bg-red-900 shadow-black shadow-md"} `}>
                            Browse
                        </Link>
                        <Link to={'requests/pending'} onClick={() => {setActiveState({B: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm ${activeState.B ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            Pending Requests
                        </Link>
                        <Link to={'requests/active'} onClick={() => {setActiveState({C: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white rounded-sm ${activeState.C ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            Active Requests
                        </Link>
                        <Link to={'history'} onClick={() => {setActiveState({D: true})}} className={`flex items-center w-full gap-1 px-6 py-2 text-lg font-medium text-white  rounded-sm ${activeState.D ? "bg-green-900 shadow-lg shadow-black " : "bg-red-900 shadow-black shadow-md"} `}>
                            History
                        </Link>
                    </>
                }
                </div>
                {/* CONTENT */}
                <div className="flex items-center justify-center w-5/6 h-full">
                    <Outlet context={{isDonor: isDonor}}/>
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

export default Dashboard;