import { Link, useNavigate } from "react-router-dom";
import {
    barangays,
    cities,
    provinces,
    regions,
} from "select-philippines-address";

import { animateScroll } from 'react-scroll'
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useState } from "react";

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();

    var scroll = animateScroll;

    const [alert, setAlert] = useState({
        message: 'Complete all the necessary fields',
        error: false
    });

    const [isDonor, setIsDonor] = useState(true);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const [address1, setAddress1] = useState('');

    const [bloodType, setBloodType] = useState('default');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [regionAddr, setRegionAddr] = useState("");
    const [provinceAddr, setProvinceAddr] = useState("");
    const [cityAddr, setCityAddr] = useState("");
    const [barangayAddr, setBarangayAddr] = useState("");

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
            setBarangay([]);
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

    const handleRegister = (e) => {
        if(!gender){
            setAlert({
                message: "Select a gender",
                error: true
            });
            scroll.scrollToTop();
        }else if(mobileNo.length < 11){
            setAlert({
                message: "Enter a valid mobile number",
                error: true
            });
            scroll.scrollToTop();
        }else if(!barangayAddr || !cityAddr || !provinceAddr || !regionAddr){
            setAlert({
                message: "Complete the address information",
                error: true
            });
            scroll.scrollToTop();
        }else if(bloodType === "default"){
            setAlert({
                message: "Select a Blood Type",
                error: true
            });
            scroll.scrollToTop();
        }else if(password !== confirmPassword){
            setAlert({
                message: "Passwords does not match",
                error: true
            });
            scroll.scrollToTop();
        }else {
            var addressID ;
            axios.post('http://localhost:5000/address/', {
                region: regionAddr,
                province: provinceAddr,
                city: cityAddr,
                barangay: barangayAddr,
                addressLine1: address1
            })
            .then(function (response) {
                // SUCCESS
                console.log("New Address Success", response.data)
                addressID = response.data.id;
                axios.post('http://localhost:5000/user/', {
                    addressID: addressID,
                    lastname: lastName,
                    firstname: firstName,
                    middlename: middleName,
                    gender: gender,
                    age: age,
                    mobileNo: mobileNo,
                    email: email,
                    profilePicture: profilePicture,
                    bloodType: bloodType,
                    password: password,
                    accountType: isDonor ? "Donor" : "Looking for Donor",
                })
                .then(function (response) {
                    // SUCCESS
                    console.log("New User Success", response.data)
                    navigate("/login")
                })
                .catch(function (error) {
                    // FAIL
                    console.log("New User Failed", error)
                    setAlert({
                        message: error.response.data.message,
                        error: true
                    });
                });
            })
            .catch(function (error) {
                // FAIL
                console.log("New Address Failed", error)
                setAlert({
                    message: error.response.data.message,
                    error: true
                });
            });
        }

        e.preventDefault();
    };

    useEffect(() => {
        region()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (<>
        <div className='flex flex-col items-center justify-start bg-gradient-to-r from-gray-200 to-gray-300'>
            {/* NAVBAR */}
            <div className="flex items-center justify-between w-full px-3 py-2 bg-gradient-to-r from-gray-200 to-gray-300">
                {/* ICON */}
                <Link to={'/'} className="flex items-center w-1/6 text-4xl font-bold text-red-900">
                    BloodCare
                </Link>
                {/* LINKS */}
                <div className="flex items-center justify-end w-5/6 h-full gap-3 ">
                    <Link to={'/login'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        Login
                    </Link>
                    <Link to={'/'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-white bg-red-900 rounded-full shadow-md w-fit shadow-black">
                        Home
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start w-3/5 h-full gap-5 px-16 py-10 my-5 border-2 border-red-900 shadow-md shadow-red-900 bg-gradient-to-r from-gray-300 to-gray-300 rounded-3xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-semibold">
                        Registration
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-3 text-lg">
                    { alert.message &&
                        <div className={`px-4 py-1 text-sm shadow-sm shadow-black text-center rounded-full font-semibold ${ alert.error ? "bg-red-400" : "bg-green-400"}`}>
                            {alert.message}
                        </div>
                    }
                    <form onSubmit={handleRegister} className="flex flex-col items-start justify-center w-full gap-3 ">
                        <div className='text-2xl font-semibold'>
                            Basic Information
                        </div>
                        <div className='flex flex-col items-start justify-center w-full gap-3 pl-5'>
                            <div className='flex items-center gap-3'>
                                <div className='mr-4'>Full Name* </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="30" size={15} value={lastName} onChange={(e)=> {setLastName(e.target.value)}} type={"text"} placeholder="Last Name" autoComplete="last name" required/>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="30" size={15} value={firstName} onChange={(e)=> {setFirstName(e.target.value)}} type={"text"} placeholder="First Name" autoComplete="first name" required/>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="15" size={10} value={middleName} onChange={(e)=> {setMiddleName(e.target.value)}} type={"text"} placeholder="Middle Name" autoComplete="middle name" required/>
                            </div>
                            <div className='flex items-center gap-4 ' onChange={(e) => {setGender(e.target.value)}}>
                                <div className='mr-9'>Gender*: </div>
                                <input type="radio" className='' value="Male" name="gender" /> Male
                                <input type="radio" className='' value="Female" name="gender" /> Female
                            </div>
                            <div className='flex items-center gap-3 '>
                                <div className='mr-16'>Age* </div>
                                <input className="w-1/4 px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="3" min={1} step={1} value={age} onChange={(e)=> {setAge(e.target.value)}} type={"number"} placeholder="" autoComplete="age" required/>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-2'>Mobile No* </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="15" size={10} value={mobileNo} onChange={(e)=> {setMobileNo(e.target.value)}} type={"text"} placeholder="09XXXXXXXX" autoComplete="mobile" required/>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-12'>Email* </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="50" size={30} value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} placeholder="youremail@provider.com" autoComplete="email" required/>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-12'>Upload Profile Picture* </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" value={profilePicture} onChange={(e)=> {setProfilePicture(e.target.value)}} type={"file"}/>
                            </div>
                        </div>
                        <div className='text-2xl font-semibold'>
                            Address Information
                        </div>
                        <div className='flex flex-col items-start justify-center w-full gap-3 pl-5'>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-9'>Region* </div>
                                <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" onChange={province} onSelect={region}>
                                    <option disabled>Select Region</option>
                                    {regionData && regionData.length > 0 && regionData.map((item) =>
                                        <option key={item.region_code} value={item.region_code}>
                                            {item.region_name}
                                        </option>)
                                    }
                                </select>
                            </div>
                            <div className='flex items-center gap-7 '>
                                <div className='mr-3'>Province* </div>
                                <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-52" onChange={city} >
                                    <option disabled>Select Province</option>
                                    {provinceData && provinceData.length > 0 && provinceData.map((item) =>
                                        <option key={item.province_code} value={item.province_code}>
                                            {item.province_name}
                                        </option>)
                                    }
                                </select>
                                <div className='mr-1'>City* </div>
                                <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" onChange={barangay} >
                                    <option disabled>Select City</option>
                                    {cityData && cityData.length > 0 && cityData.map((item) =>
                                        <option key={item.city_code} value={item.city_code}>
                                            {item.city_name}
                                        </option>)
                                    }
                                </select>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-4'>Barangay* </div>
                                <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" onChange={brgy} >
                                    <option disabled>Select Barangay</option>
                                    {barangayData && barangayData.length > 0 && barangayData.map((item) =>
                                        <option key={item.brgy_code} value={item.brgy_code}>
                                            {item.brgy_name}
                                        </option>)
                                    }
                                </select>
                            </div>
                            <p>Address Line 1*</p>
                            <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="150" size={70} value={address1} onChange={(e)=> {setAddress1(e.target.value)}} type={"text"} placeholder="House No, Building No, Street Name" autoComplete="address line 1" required/>
                            <p>Address Line 2*</p>
                            <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="150" size={70} value={barangayAddr + ", " + cityAddr + ", " + provinceAddr + ", " + regionAddr} type={"text"} disabled/>
                        </div>
                        <div className='text-2xl font-semibold'>
                            Blood Information
                        </div>
                        <div className='flex flex-col items-start justify-center w-full gap-3 pl-5'>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-16'>Blood Type* </div>
                                <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" value={bloodType} onChange={(e) => {setBloodType(e.target.value)}}>
                                    <option value={"default"} key={-1}>{"Select one"}</option>
                                    {BLOOD_TYPES.map((type, i) =>
                                        <option value={type} key={i}>{type}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='text-2xl font-semibold'>
                            Account Security
                        </div>
                        <div className='flex flex-col items-start justify-center w-full gap-3 pl-5'>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-20'>Password* </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="20" size={30} minLength={5} value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} placeholder="5 to 16 chars" autoComplete="password" required/>
                            </div>
                            <div className='flex items-center gap-4 '>
                                <div className='mr-3'>Confirm Password* </div>
                                <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-sm bg-slate-100" maxLength="20" size={30} minLength={5} value={confirmPassword} onChange={(e)=> {setConfirmPassword(e.target.value)}} type={"password"} placeholder="5 to 16 chars" autoComplete="confirm password" required/>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full gap-6 my-5 ">
                            <div className="text-2xl font-semibold">Who are you?</div>
                            <div className="flex justify-center w-full gap-12 text-xl font-bold text-center ">
                                <div onClick={() => {setIsDonor(true)}} className={`w-2/5 px-8 py-3 shadow-lg cursor-pointer rounded-2xl hover:shadow-black ${isDonor ? "bg-red-900 text-white shadow-black" : "bg-gray-400 text-gray-800" }`}>
                                    I am a <br/>BLOOD DONOR
                                </div>
                                <div onClick={() => {setIsDonor(false)}} className={`w-2/5 px-8 py-3 shadow-lg hover:shadow-black cursor-pointer rounded-2xl  ${isDonor ? "bg-gray-400 text-gray-800" : "bg-red-900 text-white shadow-black"}`}>
                                    I am LOOKING for <br/>BLOOD DONORS
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full py-4 text-xl font-bold tracking-wide text-gray-200 bg-green-900 rounded-sm shadow-md shadow-black">
                            REGISTER
                        </button>
                        <div className="w-full text-base tracking-normal text-center">
                            <span> Already registered ? </span>
                            <Link to='/login' className="text-red-600 ">
                                Just Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default Register;