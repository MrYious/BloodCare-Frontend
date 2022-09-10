import { FaEdit, FaHome, FaSave, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
    barangays,
    cities,
    provinces,
    regions,
} from "select-philippines-address";
import { useEffect, useState } from "react";

import placeholder from "../assets/placeholder.jpg";

const Profile = () => {

    const navigate = useNavigate();

    var localUserData = JSON.parse(localStorage.getItem('userData'));
    var localUserAddressData = JSON.parse(localStorage.getItem('userAddressData'));

    const [nickname, setNickname] = useState(localUserData.firstname);

    const [isEdit, setIsEdit] = useState(false);

    const [alert, setAlert] = useState({
        message: '',
        error: false
    });

    const [isDonor, setIsDonor] = useState(localUserData.accountType === "Donor");

    const [lastName, setLastName] = useState(localUserData.lastname);
    const [firstName, setFirstName] = useState(localUserData.firstname);
    const [middleName, setMiddleName] = useState(localUserData.middlename);
    const [gender, setGender] = useState(localUserData.gender);
    const [age, setAge] = useState(localUserData.age);
    const [mobileNo, setMobileNo] = useState(localUserData.mobileNo);
    const [email, setEmail] = useState(localUserData.email);
    const [profilePicture, setProfilePicture] = useState(localUserData.profilePicture);

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

    const region = () => {
        regions().then(response => {
            setRegion(response);
        });
    }

    const province = (e) => {
        setRegionAddr(e.target.selectedOptions[0].text);
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    const city = (e) => {
        setProvinceAddr(e.target.selectedOptions[0].text);
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

    const barangay = (e) => {
        setCityAddr(e.target.selectedOptions[0].text);
        barangays(e.target.value).then(response => {
            setBarangay(response);
        });
    }

    const brgy = (e) => {
        setBarangayAddr(e.target.selectedOptions[0].text);
    }

    const handleLogout = () => {
        navigate("/login")
        localStorage.clear();
    }

    useEffect(() => {
        region();
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userAddressData = JSON.parse(localStorage.getItem('userAddressData'));
        console.log("User data: ", userData);
        console.log("User Address data: ", userAddressData);
    }, [])

    return (<>
        <div className='flex flex-col items-center justify-between h-screen bg-gradient-to-r from-gray-200 to-gray-300'>
            {/* NAVBAR */}
            <div className="flex items-center justify-between w-full px-3 py-2 border-b-2 border-gray-400 bg-gradient-to-r from-gray-200 to-gray-300">
                {/* ICON */}
                <Link to={'/dashboard'} className="flex items-center w-1/6 text-4xl font-bold text-red-900">
                    BloodCare
                </Link>
                {/* LINKS */}
                <div className="flex items-center justify-end w-2/6 h-full gap-3 ">
                    <Link to={'/dashboard'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        <FaHome width={20} className="my-1 text-red-50"/>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-green-700 rounded-full shadow-md w-fit shadow-black">
                        {nickname}
                    </Link>
                    <div onClick={handleLogout} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer w-fit shadow-black">
                        Logout
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <div className="flex flex-col items-start justify-start w-full h-full gap-3 px-10 py-4 overflow-y-hidden">
                {/* Header */}
                <div className="flex items-center justify-between w-full px-10 py-4 border-b-4 border-red-700 gap-7">
                    <div className="text-3xl font-bold ">
                        My Profile
                    </div>
                    <div className="flex gap-2 w-fit">
                        {
                            !isEdit ? <>
                                <div onClick={() => {setIsEdit(true)}} className="flex gap-1 px-5 py-2 text-xl font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer shadow-black">
                                    <FaEdit width={20} className="my-1 text-red-50"/>
                                    Edit
                                </div>
                            </> : <>
                                <div onClick={() => {}} className="flex gap-1 px-5 py-2 text-xl font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer shadow-black">
                                    <FaSave width={20} className="my-1 text-red-50"/>
                                    Save Changes
                                </div>
                                <div onClick={() => {setIsEdit(false)}} className="flex gap-1 px-5 py-2 text-xl font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer shadow-black">
                                    <FaTimes width={20} className="my-1 text-red-50"/>
                                    Cancel
                                </div>
                            </>
                        }
                    </div>
                </div>
                {/* Scrollable Contents */}
                <form onSubmit={()=> {}} className="flex items-start justify-start w-full h-full gap-4 p-4 border-2 border-red-700 bg-red-50 rounded-xl ">
                    {/* COL1 */}
                    <div className="flex flex-col w-1/2 gap-2 h-fit">
                        <div className="flex justify-start gap-5 item-center">
                            <div className="w-48 p-2 h-fit">
                                <img src={placeholder} alt="profile" width={"100%"} className="border-2 border-red-900 rounded-full shadow-lg cursor-pointer shadow-red-900"/>
                            </div>
                            <div className="flex flex-col justify-center gap-2 ">
                                <div className="text-xl">
                                    Account Type:
                                </div>
                                <div className="text-3xl font-bold tracking-tight ">
                                    {isDonor ? "DONOR" : "LOOKING FOR DONOR"}
                                </div>
                            </div>
                        </div>
                        <div className='text-2xl font-semibold'>
                            Basic Information
                        </div>
                        <div className='flex flex-col items-start justify-center w-full gap-3 pl-5'>
                            <div className='flex items-center gap-3'>
                                <div className='mr-5 font-bold'>Full Name: </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="30" size={15} value={lastName} onChange={(e)=> {setLastName(e.target.value)}} type={"text"} placeholder="Last Name" autoComplete="last name" required disabled={!isEdit}/>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="30" size={15} value={firstName} onChange={(e)=> {setFirstName(e.target.value)}} type={"text"} placeholder="First Name" autoComplete="first name" required disabled={!isEdit}/>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="15" size={10} value={middleName} onChange={(e)=> {setMiddleName(e.target.value)}} type={"text"} placeholder="Middle Name" autoComplete="middle name" required disabled={!isEdit}/>
                            </div>
                            <div className='flex items-center gap-4 ' onChange={(e) => {setGender(e.target.value)}}>
                                <div className='font-bold mr-9'>Gender: </div>
                                <input type="radio" className='' value="Male" name="gender" checked={gender === "Male"} disabled={!isEdit}/> Male
                                <input type="radio" className='' value="Female" name="gender" checked={gender === "Female"} disabled={!isEdit}/> Female
                            </div>
                            <div className='flex items-center gap-3 '>
                                <div className='mr-16 font-bold'>Age: </div>
                                <input className="w-1/4 px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="3" min={1} step={1} value={age} onChange={(e)=> {setAge(e.target.value)}} type={"number"} placeholder="" autoComplete="age" required disabled={!isEdit}/>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-3 font-bold'>Mobile No: </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="15" size={10} value={mobileNo} onChange={(e)=> {setMobileNo(e.target.value)}} type={"text"} placeholder="09XXXXXXXX" autoComplete="mobile" required disabled={!isEdit}/>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-12 font-bold'>Email: </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="50" size={30} value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} placeholder="youremail@provider.com" autoComplete="email" required disabled={!isEdit}/>
                            </div>
                        </div>
                    </div>
                    {/* COL2 */}
                    <div className="flex flex-col w-1/2 gap-3 h-fit">
                        <div className='text-2xl font-semibold'>
                            Address Information
                        </div>
                        <div className='flex flex-col items-start justify-center w-full gap-3 pl-5'>
                            <div className='flex items-center gap-4 '>
                                <div className='font-bold mr-9'>Region: </div>
                                {
                                    !isEdit ? <>
                                        <div className="py-1">{localUserAddressData.region}</div>
                                    </> : <>
                                        <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" onChange={province} onSelect={region} disabled={!isEdit}>
                                            <option disabled>Select Region</option>
                                            {regionData && regionData.length > 0 && regionData.map((item) =>
                                                <option key={item.region_code} value={item.region_code}>
                                                    {item.region_name}
                                                </option>)
                                            }
                                        </select>
                                    </>
                                }
                            </div>
                            <div className='flex items-center gap-7 '>
                                <div className='mr-3 font-bold'>Province: </div>
                                {
                                    !isEdit ? <>
                                        <div className="py-1">{localUserAddressData.province}</div>
                                    </> : <>
                                        <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-52" onChange={city} disabled={!isEdit}>
                                            <option disabled>Select Province</option>
                                            {provinceData && provinceData.length > 0 && provinceData.map((item) =>
                                                <option key={item.province_code} value={item.province_code}>
                                                    {item.province_name}
                                                </option>)
                                            }
                                        </select>
                                    </>
                                }
                                <div className='mr-1 font-bold'>City: </div>
                                {
                                    !isEdit ? <>
                                        <div className="py-1">{localUserAddressData.city}</div>
                                    </> : <>
                                        <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" onChange={barangay} disabled={!isEdit}>
                                            <option disabled>Select City</option>
                                            {cityData && cityData.length > 0 && cityData.map((item) =>
                                                <option key={item.city_code} value={item.city_code}>
                                                    {item.city_name}
                                                </option>)
                                            }
                                        </select>
                                    </>
                                }
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-4 font-bold'>Barangay: </div>
                                {
                                    !isEdit ? <>
                                        <div className="py-1">{localUserAddressData.barangay}</div>
                                    </> : <>
                                        <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" onChange={brgy} disabled={!isEdit}>
                                            <option disabled>Select Barangay</option>
                                            {barangayData && barangayData.length > 0 && barangayData.map((item) =>
                                                <option key={item.brgy_code} value={item.brgy_code}>
                                                    {item.brgy_name}
                                                </option>)
                                            }
                                        </select>
                                    </>
                                }
                            </div>
                            <p className="font-bold ">Address Line 1:</p>
                            <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="150" size={70} value={address1} onChange={(e)=> {setAddress1(e.target.value)}} type={"text"} placeholder="House No, Building No, Street Name" autoComplete="address line 1" required disabled={!isEdit}/>
                            <p className="font-bold ">Address Line 2:</p>
                            <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="150" size={70} value={barangayAddr + ", " + cityAddr + ", " + provinceAddr + ", " + regionAddr} type={"text"} disabled/>
                        </div>
                        <div className='text-2xl font-semibold'>
                            Blood Information
                        </div>
                        <div className='flex flex-col items-start justify-center w-full gap-3 pl-5 '>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-16 font-bold'>Blood Type: </div>
                                <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" value={bloodType} onChange={(e) => {setBloodType(e.target.value)}} disabled={!isEdit}>
                                    <option value={"default"} key={-1}>{"Select one"}</option>
                                    {BLOOD_TYPES.map((type, i) =>
                                        <option value={type} key={i}>{type}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
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

export default Profile;