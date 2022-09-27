import { FaEdit, FaHome, FaSave, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
    barangays,
    cities,
    provinces,
    regions,
} from "select-philippines-address";
import { useEffect, useState } from "react";

import Datetime from "../components/Datetime";
import axios from "axios";
import placeholder from "../assets/placeholder.jpg";

const Profile = () => {

    const navigate = useNavigate();

    const isDonor = localStorage.getItem('type') === "Donor";

    const [isEdit, setIsEdit] = useState(false);
    const [nickname, setNickname] = useState(localStorage.getItem('username'));

    const [localUserData, setLocalUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    const [localAddressData, setLocalAddressData] = useState(JSON.parse(localStorage.getItem('addressData')));

    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const BLOOD_TYPES = [
        "A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"
    ]

    const [alert, setAlert] = useState({
        message: '',
        error: false
    });

    useEffect(() => {
        region();
        const userData = JSON.parse(localStorage.getItem('userData'));
        const addressData = JSON.parse(localStorage.getItem('addressData'));
        console.log("User data: ", userData);
        console.log("Address data: ", addressData);
    }, [])

    const stateReset = () => {
        setNickname(localStorage.getItem('username'));
        setLocalUserData(JSON.parse(localStorage.getItem('userData')));
        setLocalAddressData(JSON.parse(localStorage.getItem('addressData')));
    }

    const onSelectFile = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const image = URL.createObjectURL(selectedFilesArray[0]);
        setLocalUserData({...localUserData, profilePicture: image});

        console.log("Image ", image);
        console.log("Type ", typeof(image));
    }

    const region = () => {
        regions().then(response => {
            setRegion(response);
        });
    }

    const province = (e) => {
        setLocalAddressData({...localAddressData, region: e.target.selectedOptions[0].text});
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    const city = (e) => {
        setLocalAddressData({...localAddressData, province: e.target.selectedOptions[0].text});
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

    const barangay = (e) => {
        setLocalAddressData({...localAddressData, city: e.target.selectedOptions[0].text});
        barangays(e.target.value).then(response => {
            setBarangay(response);
        });
    }

    const brgy = (e) => {
        setLocalAddressData({...localAddressData, barangay: e.target.selectedOptions[0].text});
    }

    const handleSaveChanges = (e) => {
        if(localUserData.mobileNo.length < 11){
            setAlert({
                message: "Enter a valid mobile number",
                error: true
            });
        }else if(!localAddressData.barangay || !localAddressData.city || !localAddressData.province || !localAddressData.region){
            setAlert({
                message: "Complete the address information",
                error: true
            });
        }else if(localUserData.bloodType === "default"){
            setAlert({
                message: "Select a Blood Type",
                error: true
            });
        }else {
            axios.patch(`http://localhost:5000/main/updateProfile`, {
                user: localUserData,
                address: localAddressData
            })
            .then(function (response) {
                // SUCCESS
                localStorage.setItem('username', localUserData.firstname);
                localStorage.setItem('userData', JSON.stringify(localUserData));
                localStorage.setItem('addressData', JSON.stringify(localAddressData));
                console.log("Update User Profile Success", response.data)
                stateReset();
                setIsEdit(false);
                setAlert({
                    message: "Profile is updated",
                    error: false
                });
            })
            .catch(function (error) {
                // FAIL
                console.log("Update User Profile Failed", error)
                setAlert({
                    message: error.response.data.message,
                    error: true
                });
            });
        }

        e.preventDefault();
    };

    const handleLogout = () => {
        navigate("/login")
        localStorage.clear();
    }

    return (<>
        <div className='flex flex-col items-center justify-between h-screen bg-gradient-to-r from-gray-200 to-gray-300'>
            {/* NAVBAR */}
            <div className="flex items-center justify-between w-full px-3 py-2 border-b-2 border-red-900 select-none bg-gradient-to-r from-gray-200 to-gray-300">
                {/* ICON */}
                <Link to={'/dashboard'} className="flex items-center w-1/6 text-4xl font-bold text-red-900">
                    BloodCare
                </Link>
                {/* LINKS */}
                <div className="flex items-center justify-end w-2/6 h-full gap-3 ">
                    <Link to={'/dashboard'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-md shadow-md w-fit shadow-black">
                        <FaHome width={20} className="my-1 text-red-50"/>
                    </Link>
                    <Link to={'/profile'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-green-700 rounded-md shadow-md w-fit shadow-black">
                        {nickname}
                    </Link>
                    <div onClick={handleLogout} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-md shadow-md cursor-pointer w-fit shadow-black">
                        Logout
                    </div>
                </div>
            </div>
            {/* CONTENT */}
            <div className="flex flex-col items-start justify-start w-full h-full px-10 overflow-y-hidden">
                {/* Header */}
                <div className="flex items-center justify-between w-full px-5 py-5 border-b-4 border-red-700 select-none h-fit gap-7">
                    <div className="text-3xl font-bold ">
                        My Profile
                    </div>
                    <div className="flex gap-2 w-fit">
                        {
                            !isEdit ? <>
                                <div onClick={() => {
                                    setIsEdit(true)
                                    setAlert({
                                        message: '',
                                        error: true
                                    });
                                }} className="flex items-center justify-center gap-1 px-4 py-1 text-lg font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer shadow-black">
                                    <FaEdit width={20} className="my-1 text-red-50"/>
                                    Edit
                                </div>
                            </> : <>
                                <div onClick={handleSaveChanges} className="flex items-center justify-center gap-1 px-4 py-1 text-lg font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer shadow-black">
                                    <FaSave width={20} className="my-1 text-red-50"/>
                                    Save Changes
                                </div>
                                <div onClick={() => {
                                    setIsEdit(false)
                                    stateReset()
                                }} className="flex items-center justify-center gap-1 px-4 py-1 text-lg font-medium text-white bg-red-900 rounded-full shadow-md cursor-pointer shadow-black">
                                    <FaTimes width={20} className="my-1 text-red-50"/>
                                    Cancel
                                </div>
                            </>
                        }
                    </div>
                </div>
                <form onSubmit={()=> {}} className="flex items-start justify-start w-full h-full gap-4 py-7">
                    {/* COL1 */}
                    <div className="flex flex-col w-1/2 h-full gap-2">
                        <div className="flex justify-start gap-5 item-center">
                            <label className="w-40 p-2 h-fit">
                                <img src={localUserData.profilePicture ? localUserData.profilePicture : placeholder} alt="profile" width={"100%"} className="border-2 border-red-900 rounded-full shadow-lg cursor-pointer shadow-red-900"/>
                                <input
                                    type="file"
                                    name="images"
                                    onChange={onSelectFile}
                                    accept="image/png, image/jpeg, image/jpg"
                                    className="hidden"
                                />
                            </label>
                            <div className="flex flex-col justify-center gap-2 ">
                                <div className="text-md">
                                    Account Type:
                                </div>
                                <div className="text-xl font-bold tracking-tight ">
                                    {isDonor ? "DONOR" : "LOOKING FOR DONOR"}
                                </div>
                            </div>
                        </div>
                        <div className='text-xl font-semibold'>
                            Basic Information
                        </div>
                        <div className='flex w-full h-full gap-1 pl-7 '>
                            <div className="flex flex-col justify-between gap-2 ">
                                <div className='mr-5 font-bold'>Full Name: </div>
                                <div className='font-bold mr-9'>Gender: </div>
                                <div className='mr-16 font-bold'>Age: </div>
                                <div className='mr-3 font-bold'>Mobile No: </div>
                                <div className='mr-12 font-bold'>Email: </div>
                            </div>
                            <div className="flex flex-col justify-between gap-2">
                                <div className='flex items-center gap-3'>
                                    {
                                        isEdit ? <>
                                            <input className="px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="30" size={15} value={localUserData.lastname} onChange={(e)=> {setLocalUserData({...localUserData, lastname:  e.target.value})}} type={"text"} placeholder="Last Name" autoComplete="last name" required disabled={!isEdit}/>
                                            <input className="px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="30" size={15} value={localUserData.firstname} onChange={(e)=> {setLocalUserData({...localUserData, firstname:  e.target.value})}} type={"text"} placeholder="First Name" autoComplete="first name" required disabled={!isEdit}/>
                                            <input className="px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="15" size={10} value={localUserData.middlename} onChange={(e)=> {setLocalUserData({...localUserData, middlename:  e.target.value})}} type={"text"} placeholder="Middle Name" autoComplete="middle name" required disabled={!isEdit}/>
                                        </> : <>
                                            {localUserData.lastname}, {localUserData.firstname} {localUserData.middlename}
                                        </>
                                    }
                                </div>
                                <div className='flex items-center gap-4 ' onChange={(e) => {setLocalUserData({...localUserData, gender:  e.target.value})}}>
                                    {
                                        isEdit ? <>
                                            <input type="radio" className='' value="Male" name="gender" checked={localUserData.gender === "Male"} disabled={!isEdit}/> Male
                                            <input type="radio" className='' value="Female" name="gender" checked={localUserData.gender === "Female"} disabled={!isEdit}/> Female
                                        </> : <>
                                            {localUserData.gender}
                                        </>
                                    }
                                </div>
                                <div className='flex items-center gap-3 '>
                                    {
                                        isEdit ? <>
                                            <input className="w-1/4 px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="3" min={1} step={1} value={localUserData.age} onChange={(e)=> {setLocalUserData({...localUserData, age:  e.target.value})}} type={"number"} placeholder="" autoComplete="age" required disabled={!isEdit}/>
                                        </> : <>
                                            {localUserData.age}
                                        </>
                                    }
                                </div>
                                <div className='flex items-center gap-4 '>
                                    {
                                        isEdit ? <>
                                            <input className="px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="15" size={10} value={localUserData.mobileNo} onChange={(e)=> {setLocalUserData({...localUserData, mobileNo:  e.target.value})}} type={"text"} placeholder="09XXXXXXXX" autoComplete="mobile" required disabled={!isEdit}/>
                                        </> : <>
                                            {localUserData.mobileNo}
                                        </>
                                    }
                                </div>
                                <div className='flex items-center gap-4 '>
                                    {
                                        isEdit ? <>
                                            <input className="px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="50" size={30} value={localUserData.email} onChange={(e)=> {setLocalUserData({...localUserData, email:  e.target.value})}} type={"email"} placeholder="youremail@provider.com" autoComplete="email" required disabled={!isEdit}/>
                                        </> : <>
                                            {localUserData.email}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* COL2 */}
                    <div className="flex flex-col w-1/2 h-full gap-2 ">
                        <div className='text-xl font-semibold'>
                            Address Information
                        </div>
                        <div className='flex w-full gap-2 h-4/6 pl-7 '>
                            <div className="flex flex-col justify-between w-1/4">
                                <div className='font-bold'>Region: </div>
                                <div className='font-bold'>Province: </div>
                                <div className='font-bold'>City: </div>
                                <div className='font-bold'>Barangay: </div>
                                <div className='font-bold'>Address Line 1: </div>
                                <div className='font-bold'>Address Line 2: </div>
                            </div>
                            <div className="flex flex-col justify-between w-3/4 gap-2 ">
                                <div className='flex items-center gap-3 '>
                                    {
                                        !isEdit ? <>
                                            <div className="py-1">{localAddressData.region}</div>
                                        </> : <>
                                            <select className="px-2 border-[1px] border-gray-700 rounded-sm w-4/5 bg-slate-100" onChange={province} onSelect={region} disabled={!isEdit}>
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
                                <div className='flex items-center gap-3 '>
                                    {
                                        !isEdit ? <>
                                            <div className="py-1">{localAddressData.province}</div>
                                        </> : <>
                                            <select className="px-2 border-[1px] border-gray-700 rounded-sm w-2/5 bg-slate-100" onChange={city} disabled={!isEdit}>
                                                <option disabled>Select Province</option>
                                                {provinceData && provinceData.length > 0 && provinceData.map((item) =>
                                                    <option key={item.province_code} value={item.province_code}>
                                                        {item.province_name}
                                                    </option>)
                                                }
                                            </select>
                                        </>
                                    }
                                </div>
                                <div className='flex items-center gap-3 '>
                                    {
                                        !isEdit ? <>
                                            <div className="py-1">{localAddressData.city}</div>
                                        </> : <>
                                            <select className="px-2 border-[1px] border-gray-700 rounded-sm w-2/5 bg-slate-100" onChange={barangay} disabled={!isEdit}>
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
                                <div className='flex items-center gap-3 '>
                                    {
                                        !isEdit ? <>
                                            <div className="py-1">{localAddressData.barangay}</div>
                                        </> : <>
                                            <select className="px-2 border-[1px] border-gray-700 rounded-sm w-2/5 bg-slate-100" onChange={brgy} disabled={!isEdit}>
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
                                <div className='flex items-center gap-3 '>
                                    {
                                        !isEdit ? <>
                                            <div className="py-1">{localAddressData.addressLine1}</div>
                                        </> : <>
                                            <input className="px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100 w-4/5 " maxLength="150" size={70} value={localAddressData.addressLine1} onChange={(e)=> {setLocalAddressData({...localAddressData, addressLine1: e.target.value})}} type={"text"} placeholder="Room No, House No, Building, Street Name" autoComplete="address line 1" required disabled={!isEdit}/>
                                        </>
                                    }
                                </div>
                                <div className='flex items-center gap-3 '>
                                    {
                                        !isEdit ? <>
                                            <div className="py-1">{localAddressData.barangay + ", " + localAddressData.city + ", " + localAddressData.province + ", " + localAddressData.region}</div>
                                        </> : <>
                                            <input className="px-2 border-[1px] border-gray-700 border-solid rounded-sm bg-slate-100  w-4/5" maxLength="150" size={70} value={localAddressData.barangay + ", " + localAddressData.city + ", " + localAddressData.province + ", " + localAddressData.region} type={"text"} disabled/>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='text-xl font-semibold'>
                            Blood Information
                        </div>
                        <div className='flex w-full gap-2 pl-7 '>
                            <div className="flex flex-col justify-between w-1/4">
                                <div className='font-bold'>Blood Type: </div>
                            </div>
                            <div className="flex flex-col justify-between w-3/4">
                                <div className='flex items-center '>
                                    {
                                        !isEdit ? <>
                                            <div className="py-1">{localUserData.bloodType}</div>
                                        </> : <>
                                            <select className="px-2 border-[1px] border-gray-700 w-1/5 bg-slate-100" value={localUserData.bloodType} onChange={(e) => {setLocalUserData({...localUserData, bloodType: e.target.value})}} disabled={!isEdit}>
                                                <option value={"default"} key={-1}>{"Select one"}</option>
                                                {BLOOD_TYPES.map((type, i) =>
                                                    <option value={type} key={i}>{type}</option>
                                                )}
                                            </select>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
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

export default Profile;