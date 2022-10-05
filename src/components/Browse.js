import {
    barangays,
    cities,
    provinces,
    regions,
} from "select-philippines-address";
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from "react-router-dom";

import Rating from 'react-rating'
import axios from "axios";
import placeholder from "../assets/placeholder.jpg";

const Browse = () => {

    // TODO
    //      SHOW NEARBY LOCATION (AUTOMATIC)

    const navigate = useNavigate();
    const {isDonor, userData, setAlert, isGuess} = useOutletContext();

    const [showDonorProfile, setShowDonorProfile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [allDonors, setAllDonors] = useState([])
    const [filteredDonors, setFilteredDonors] = useState([])
    const [selectedDonor, setSelectedDonor] = useState({})

    const [message, setMessage] = useState('')

    const [filters, setFilters] = useState({
        name: '',
        region: {},
        province: {},
        city: {},
        barangay: {},
        gender: 'default',
        age: 0,
        rating: 0,
        bloodType: 'default',
    })

    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const BLOOD_TYPES = [
        "A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"
    ]

    const region = () => {
        regions().then(response => {
            setRegion(response);
            console.log("Region ", response);
        });
    }

    const province = (e) => {
        if(e.target.value !== 'default'){
            setFilters({...filters, region: regionData[e.target.value]})
            provinces(regionData[e.target.value].region_code).then(response => {
                setProvince(response);
                console.log("Province ", response);
                setCity([]);
                setBarangay([]);
            });
        }else{
            setProvince([]);
            setCity([]);
            setBarangay([]);
            setFilters({...filters, region: {}, province: {}, city: {}, barangay: {}})
        }
    }

    const city = (e) => {
        if(e.target.value !== 'default'){
            setFilters({...filters, province: provinceData[e.target.value]})
            cities(provinceData[e.target.value].province_code).then(response => {
                setCity(response);
                console.log("City ", response);
                setBarangay([]);
            });
        }else{
            setCity([]);
            setBarangay([]);
            setFilters({...filters, province: {}, city: {}, barangay: {}})
        }
    }

    const barangay = (e) => {
        if(e.target.value !== 'default'){
            setFilters({...filters, city: cityData[e.target.value]})
            barangays(cityData[e.target.value].city_code).then(response => {
                setBarangay(response);
                console.log("Barangay ", response);
            });
        }else{
            setBarangay([]);
            setFilters({...filters, city: {}, barangay: {}})
        }
    }

    const brgy = (e) => {
        if(e.target.value !== 'default'){
            setFilters({...filters, barangay: barangayData[e.target.value]})
        }else{
            setFilters({...filters, barangay: {}})
        }
    }

    const handleFilter = (e) => {
        e.preventDefault();

        var filtered = allDonors;
        console.log("ALL DONORS", filtered)

        if(filters.name){
            filtered = filtered.filter(donor =>
                donor.firstname.toLowerCase().includes(filters.name.toLowerCase()) ||
                donor.lastname.toLowerCase().includes(filters.name.toLowerCase()) ||
                donor.middlename.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if(filters.gender !== 'default'){
            filtered = filtered.filter(donor =>
                donor.gender === filters.gender
            );
        }
        if(filters.age){
            filtered = filtered.filter(donor =>
                donor.age === filters.age
            );
        }
        if(filters.rating){
            filtered = filtered.filter(donor =>
                donor.donorInfo.avgRating === filters.rating
            );
        }
        if(filters.bloodType !== 'default'){
            filtered = filtered.filter(donor =>
                donor.bloodType === filters.bloodType
            );
        }
        if(filters.region.region_name){
            console.log(filters.region);
            filtered = filtered.filter(donor =>
                donor.address.region === filters.region.region_name
            );
        }
        if(filters.province.province_name){
            filtered = filtered.filter(donor =>
                donor.address.province === filters.province.province_name
            );
        }
        if(filters.city.city_name){
            filtered = filtered.filter(donor =>
                donor.address.city === filters.city.city_name
            );
        }
        if(filters.barangay.brgy_name){
            filtered = filtered.filter(donor =>
                donor.address.barangay === filters.barangay.brgy_name
            );
        }

        setFilteredDonors(filtered);
        setShowDonorProfile(false);
        console.log("FILTERED", filtered);
    }

    const resetFilter = () => {
        setFilters({
            name: '',
            region: {},
            province: {},
            city: {},
            barangay: {},
            gender: 'default',
            age: 0,
            rating: 0,
            bloodType: 'default',
        });
        setRegion([]);
        setProvince([]);
        setCity([]);
        setBarangay([]);
        region();
        setFilteredDonors(allDonors);
        setShowDonorProfile(false);
    }

    const printStars = (num) => {
        var star = [];
        for (var i = 0; i < num; i++) {
            star.push('⭐');
        }
        return star;
    }

    const handleSelectUser = (user) => {
        setSelectedDonor(user);
        console.log("Selected Donor: " +  user.firstname, user );
        setShowDonorProfile(true);
    }

    const handleGetAllDonors = () => {
        axios.get(`http://localhost:5000/main/donors`)
        .then(function (response) {
            // SUCCESS
            // console.log("Retrieve Donors Success", response.data);
            const {user, address, donorInfo, requests} = response.data;
            var ALLDONORS = user.map( user => {
                return {
                    ...user,
                    address: address.find(address => address.id === user.addressID),
                    donorInfo: donorInfo.find(donorInfo => donorInfo.donorID === user.id),
                    requests: requests.filter(req => req.donorID === user.id)
                }
            })

            setAllDonors(ALLDONORS);
            setFilteredDonors(ALLDONORS);
            // console.log("All Donors ", ALLDONORS)
        })
        .catch(function (error) {
            // FAIL
            console.log("Retrieve Donors Failed", error.response.data.message)
        });
    }

    const handleRequestBloodDonation = () => {
        setShowModal(true);
    }

    const handleConfirmRequest = () => {
        axios.post('http://localhost:5000/main/request', {
            donorID: selectedDonor.id,
            message: message,
            seekerID: userData.id,
        })
        .then(function (response) {
            // SUCCESS
            setAlert({
                message: 'Request was submitted',
                error: false
            });
            setShowModal(false);
        })
        .catch(function (error) {
            // FAIL
            setAlert({
                message: error.response.data.message,
                error: true
            });
            setShowModal(false);
        });
    }

    useEffect(() => {
        handleGetAllDonors();
        region();
    }, [])

    useEffect(() => {
        console.table(filters);
    }, [filters])

    useEffect(() => {
        setAlert({
            message: 'Have a great day!',
            error: false
        });
    }, [showDonorProfile])

    useEffect(() => {
        setMessage('')
    }, [showModal])

    return (<>
        {
            showModal && <>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full bg-white bg-opacity-70">
                    <div className="flex flex-col text-center bg-white border-[1px] border-black w-[450px] h-fit drop-shadow-2xl shadow-black rounded-sm ">
                        {/* TITLE */}
                        <div className="flex items-center justify-between w-full p-2 bg-gray-200">
                            <span className="text-lg font-semibold">
                                CONFIRM BLOOD DONATION REQUEST
                            </span>
                            <svg onClick={()=>{setShowModal(false)}} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        {/* CONTENT */}
                        <div className="flex flex-col w-full gap-4 px-2 py-5 text-left bg-gray-100 h-fit">
                            <div>Are you sure you want to request blood from <b>{selectedDonor.firstname}</b>?</div>
                            <div className="flex flex-col ">
                                <textarea className="resize-none border-[1px] border-gray-800 p-1" placeholder="Enter a message to donor" name="message" id="message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                            </div>
                        </div>
                        {/* ACTIONS */}
                        <div className="flex items-center justify-end w-full gap-2 p-2 font-semibold text-white bg-gray-200">
                            <button onClick={handleConfirmRequest} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black ">
                                OK
                            </button>
                            <button onClick={()=>{setShowModal(false);}} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black">
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </>
        }
        <div className="flex items-center justify-center w-full h-full gap-5 px-4 py-6 overflow-y-hidden ">
            {/* COLUMN 1 */}
            <div className="flex flex-col w-full h-full bg-gray-200 border-2 border-red-900 shadow-sm shadow-red-900">
                {
                    !showDonorProfile || !selectedDonor ?
                    <>
                        <div className="px-6 py-2 font-semibold border-b-2 border-red-900 text-md ">
                            LIST OF NEAREST DONORS
                        </div>
                        <div className="flex flex-wrap items-center justify-start gap-2 p-2 overflow-y-auto">
                            {   filteredDonors &&
                                filteredDonors.map((donor, i) =>  {
                                    return <div key={i} onClick={() => {handleSelectUser(donor)}}
                                        className="flex flex-col justify-start items-start gap-2 p-3 text-sm border-[1px] border-black rounded-md overflow-hidden shadow-sm cursor-pointer w-[188px] h-fit shadow-black"
                                    >
                                        <div className="w-full overflow-hidden text-base text-ellipsis whitespace-nowrap">
                                            <b>{donor.lastname}</b>, {donor.firstname}
                                        </div>
                                        <div className='flex w-full gap-2 overflow-hidden text-xs'>
                                            <div className='flex flex-col gap-1 text-right'>
                                                <b>Sex:</b>
                                                <b>Age:</b>
                                                <b>Type:</b>
                                                <b>Brgy:</b>
                                                <b>City:</b>
                                                <b>Province:</b>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <div className='text-ellipsis whitespace-nowrap'>{donor.gender}</div>
                                                <div className='text-ellipsis whitespace-nowrap'>{donor.age}</div>
                                                <div className='text-ellipsis whitespace-nowrap'>{donor.bloodType}</div>
                                                <div className='text-ellipsis whitespace-nowrap'>{donor.address.barangay}</div>
                                                <div className='text-ellipsis whitespace-nowrap'>{donor.address.city}</div>
                                                <div className='text-ellipsis whitespace-nowrap'>{donor.address.province}</div>
                                            </div>
                                        </div>
                                        <div className="w-full text-left">
                                            <Rating
                                                emptySymbol={
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 12 12" fill="currentColor">
                                                        <path d="M 5.586 0.95 C 5.82 0.225 6.836 0.225 7.069 0.95 L 7.904 3.539 C 8.008 3.863 8.307 4.082 8.644 4.082 L 11.343 4.082 C 12.099 4.082 12.412 5.058 11.802 5.506 L 9.619 7.106 C 9.345 7.306 9.23 7.662 9.335 7.986 L 10.169 10.576 C 10.403 11.3 9.581 11.904 8.969 11.455 L 6.786 9.855 C 6.513 9.655 6.142 9.655 5.869 9.855 L 3.687 11.455 C 3.075 11.904 2.254 11.3 2.487 10.576 L 3.321 7.986 C 3.425 7.662 3.311 7.306 3.037 7.106 L 0.855 5.507 C 0.244 5.059 0.559 4.083 1.313 4.083 L 4.012 4.083 C 4.349 4.083 4.649 3.864 4.753 3.54 L 5.587 0.95 L 5.586 0.95 Z"></path>
                                                    </svg>
                                                }
                                                fullSymbol={
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" viewBox="0 0 12 12" fill="currentColor">
                                                        <path d="M 5.586 0.95 C 5.82 0.225 6.836 0.225 7.069 0.95 L 7.904 3.539 C 8.008 3.863 8.307 4.082 8.644 4.082 L 11.343 4.082 C 12.099 4.082 12.412 5.058 11.802 5.506 L 9.619 7.106 C 9.345 7.306 9.23 7.662 9.335 7.986 L 10.169 10.576 C 10.403 11.3 9.581 11.904 8.969 11.455 L 6.786 9.855 C 6.513 9.655 6.142 9.655 5.869 9.855 L 3.687 11.455 C 3.075 11.904 2.254 11.3 2.487 10.576 L 3.321 7.986 C 3.425 7.662 3.311 7.306 3.037 7.106 L 0.855 5.507 C 0.244 5.059 0.559 4.083 1.313 4.083 L 4.012 4.083 C 4.349 4.083 4.649 3.864 4.753 3.54 L 5.587 0.95 L 5.586 0.95 Z"></path>
                                                    </svg>
                                                }
                                                initialRating={donor.donorInfo.avgRating}
                                                readonly
                                            />
                                        </div>
                                    </div>})
                            }
                        </div>
                    </> :
                    <>
                        <div className="flex items-center justify-between px-6 py-2 border-b-2 border-red-900">
                            <div className='font-semibold text-md'>
                                DONOR PROFILE
                            </div>
                            <div className='flex gap-2'>
                                {!isDonor &&
                                    <button onClick={handleRequestBloodDonation} className='flex items-center px-2 py-1 text-white bg-red-900 shadow-sm shadow-black'>
                                        REQUEST BLOOD
                                    </button>
                                }
                                {isGuess && <>
                                    <button onClick={()=> {navigate("/login")}} className='flex items-center px-2 py-1 text-white bg-green-700 shadow-sm shadow-black'>
                                        LOGIN TO REQUEST BLOOD
                                    </button>
                                </>}
                                <button onClick={() => {setShowDonorProfile(false)}} className='flex items-center px-2 py-1 text-white bg-red-900 shadow-sm shadow-black'>
                                    BACK
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start h-full overflow-y-auto ">
                            <div className='flex w-full p-2' >
                                <div className='flex w-[70%] gap-4  '>
                                    <div className='flex flex-col items-end w-[30%] gap-2'>
                                        <span className='font-bold tracking-tighter'>FULL NAME: </span>
                                        <span className='font-bold tracking-tighter'>GENDER: </span>
                                        <span className='font-bold tracking-tighter'>AGE: </span>
                                        <span className='font-bold tracking-tighter'>MOBILE NO: </span>
                                        <span className='font-bold tracking-tighter'>EMAIL: </span>
                                        <span className='font-bold tracking-tighter'>BLOOD TYPE: </span>
                                        <span className='font-bold tracking-tighter'>ADDRESS LINE 1: </span>
                                        <span className='font-bold tracking-tighter'>ADDRESS LINE 2: </span>
                                    </div>
                                    <div className='flex flex-col items-start w-full gap-2'>
                                        <div>{selectedDonor.lastname}, {selectedDonor.firstname} {selectedDonor.middlename}</div>
                                        <div>{selectedDonor.gender}</div>
                                        <div>{selectedDonor.age} years old</div>
                                        <div>{selectedDonor.mobileNo}</div>
                                        <div>{selectedDonor.email}</div>
                                        <div>{selectedDonor.bloodType}</div>
                                        <div>{selectedDonor.address.addressLine1}</div>
                                        <div>{selectedDonor.address.barangay}, {selectedDonor.address.city}, {selectedDonor.address.province}, </div>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-start w-[30%] '>
                                    <div className='flex items-center justify-center w-full h-3/5'>
                                        <img src={placeholder} alt="profile" width={"50%"} className="border-2 border-red-900 rounded-full shadow-md shadow-red-900"/>
                                    </div>
                                    <div className='flex items-end justify-end w-full h-2/5'>
                                        <div className='flex items-start w-full gap-2 '>
                                            <div className='flex flex-col items-end w-1/2 gap-2 '>
                                                <span className='font-bold tracking-tighter'># DONATIONS: </span>
                                                <span className='font-bold tracking-tighter'>AVG RATING: </span>
                                            </div>
                                            <div className='flex flex-col items-start w-1/2 gap-2'>
                                                <div>{selectedDonor.donorInfo.donations}</div>
                                                <div>{printStars(selectedDonor.donorInfo.avgRating)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-wrap items-start justify-start w-full h-full gap-2 p-2 overflow-y-auto border-t-2 border-red-900'>
                                { !selectedDonor.requests.length ? <>
                                    <div className='flex items-center justify-center w-full h-full '>
                                        There are no reviews.
                                    </div>
                                </> : <>
                                    {
                                        selectedDonor.requests.filter((req) => req.comment || req.rating ).map( (req, i) => {
                                            return <>
                                                <div key={i} className='flex flex-col items-center justify-center p-2 text-sm text-center w-[252px] h-[162px] bg-slate-100 gap-1 border-[2px] border-red-900 overflow-clip'>
                                                    <div>{printStars(req.rating)}</div>
                                                    {req.comment}
                                                </div>
                                            </>
                                        })
                                    }
                                </>}
                            </div>
                        </div>
                    </>
                }
            </div>
            {/* COLUMN 2 */}
            <div className="flex flex-col h-full bg-gray-200 border-2 border-red-900 shadow-sm w-96 shadow-black">
                <div className="py-2 font-semibold tracking-wide text-center border-b-2 border-red-900 text-md ">
                    FILTER
                </div>
                <div className="flex flex-col w-full h-full gap-1 p-2 overflow-y-auto">
                    <div className="flex flex-col gap-1 text-sm">
                        <input type='text' placeholder="Search name"  className="px-2 py-1 border-black border-[1px] bg-slate-100" value={filters.name} onChange={(e)=>{setFilters({...filters, name: e.target.value})}}/>
                    </div>
                    <div className="font-semibold ">By Location</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm">
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" onChange={province}>
                            <option value={'default'}>Select Region</option>
                            {regionData && regionData.length > 0 && regionData.map((item, i) =>
                                <option key={item.region_code} value={i}>
                                    {item.region_name}
                                </option>)
                            }
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" onChange={city}>
                            <option value={'default'}>Select Province</option>
                            {provinceData && provinceData.length > 0 && provinceData.map((item, i) =>
                                <option key={item.province_code} value={i}>
                                    {item.province_name}
                                </option>)
                            }
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" onChange={barangay}>
                            <option value={'default'}>Select City</option>
                            {cityData && cityData.length > 0 && cityData.map((item, i) =>
                                <option key={item.city_code} value={i}>
                                    {item.city_name}
                                </option>)
                            }
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" onChange={brgy}>
                            <option value={'default'}>Select Barangay</option>
                            {barangayData && barangayData.length > 0 && barangayData.map((item, i) =>
                                <option key={item.brgy_code} value={i}>
                                    {item.brgy_name}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="font-semibold ">By Preference</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm">
                        <div className="flex gap-2">
                            <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-1/2 bg-slate-100" value={filters.gender} onChange={(e)=>{setFilters({...filters, gender: e.target.value})}}>
                                <option value={'default'}>Gender</option>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                            </select>
                            <input className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-1/2 bg-slate-100" value={filters.age} placeholder="Age" type={'number'} min={0} max={100}  onChange={(e)=>{setFilters({...filters, age: e.target.value ? parseInt(e.target.value): 0})}}/>
                        </div>
                    </div>
                    <div className="font-semibold ">By Rating</div>
                    <div className="pl-5 text-sm h-fit">
                        <Rating
                            emptySymbol={
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-7 w-7" viewBox="0 0 12 12" fill="currentColor">
                                    <path d="M 5.586 0.95 C 5.82 0.225 6.836 0.225 7.069 0.95 L 7.904 3.539 C 8.008 3.863 8.307 4.082 8.644 4.082 L 11.343 4.082 C 12.099 4.082 12.412 5.058 11.802 5.506 L 9.619 7.106 C 9.345 7.306 9.23 7.662 9.335 7.986 L 10.169 10.576 C 10.403 11.3 9.581 11.904 8.969 11.455 L 6.786 9.855 C 6.513 9.655 6.142 9.655 5.869 9.855 L 3.687 11.455 C 3.075 11.904 2.254 11.3 2.487 10.576 L 3.321 7.986 C 3.425 7.662 3.311 7.306 3.037 7.106 L 0.855 5.507 C 0.244 5.059 0.559 4.083 1.313 4.083 L 4.012 4.083 C 4.349 4.083 4.649 3.864 4.753 3.54 L 5.587 0.95 L 5.586 0.95 Z"></path>
                                </svg>
                            }
                            fullSymbol={
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 h-7 w-7" viewBox="0 0 12 12" fill="currentColor">
                                    <path d="M 5.586 0.95 C 5.82 0.225 6.836 0.225 7.069 0.95 L 7.904 3.539 C 8.008 3.863 8.307 4.082 8.644 4.082 L 11.343 4.082 C 12.099 4.082 12.412 5.058 11.802 5.506 L 9.619 7.106 C 9.345 7.306 9.23 7.662 9.335 7.986 L 10.169 10.576 C 10.403 11.3 9.581 11.904 8.969 11.455 L 6.786 9.855 C 6.513 9.655 6.142 9.655 5.869 9.855 L 3.687 11.455 C 3.075 11.904 2.254 11.3 2.487 10.576 L 3.321 7.986 C 3.425 7.662 3.311 7.306 3.037 7.106 L 0.855 5.507 C 0.244 5.059 0.559 4.083 1.313 4.083 L 4.012 4.083 C 4.349 4.083 4.649 3.864 4.753 3.54 L 5.587 0.95 L 5.586 0.95 Z"></path>
                                </svg>
                            }
                            initialRating={filters.rating}
                            value={filters.rating}
                            onChange={(value) => {setFilters({...filters, rating: value})}}
                        />
                    </div>
                    <div className="font-semibold ">By Compatibility</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm ">
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value={filters.bloodType} onChange={(e)=>{setFilters({...filters, bloodType: e.target.value})}}>
                            <option value={'default'} key={-1}>Select Blood Type</option>
                            {BLOOD_TYPES.map((type, i) =>
                                <option value={type} key={i}>{type}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-2 px-1 py-1 font-semibold tracking-wide text-center text-white border-t-2 border-red-900 text-md">
                    <input type="reset" onClick={resetFilter} className="px-2 py-1 border-red-900 border-[1px] bg-red-900 cursor-pointer shadow-sm shadow-black" value="Reset" />
                    <input type="submit" onClick={handleFilter}  className="px-2 py-1 border-red-900 border-[1px] font-semibold bg-red-900 cursor-pointer shadow-sm shadow-black" value="Filter Results" />
                </div>
            </div>
        </div>
    </>);
}

export default Browse;