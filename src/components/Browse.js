import { useEffect, useState } from 'react'

import Rating from 'react-rating'
import axios from "axios";
import placeholder from "../assets/placeholder.jpg";
import { useOutletContext } from "react-router-dom";

const Browse = () => {

    const props = useOutletContext();
    const [allUsers, setAllUsers] = useState()
    const [selectedUser, setSelectedUser] = useState({})
    const [rating, setRating] = useState(0);

    const [showUserProfile, setShowUserProfile] = useState(false)

    var userID = JSON.parse(localStorage.getItem('userID'));

    const printStars = (num) => {
        var star = [];
        for (var i = 0; i < num; i++) {
            star.push('⭐');
        }
        return star;
    }

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setShowUserProfile(true);
    }

    const handleGetAllUsers = () => {
        var users;
        var addresses;
        axios.get(`http://localhost:5000/user/`)
        .then(function (response) {
            // SUCCESS
            console.log("Retrieve User Success", response.data);
            users = response.data;
            axios.get(`http://localhost:5000/address/`)
            .then(function (response) {
                // SUCCESS
                console.log("Retrieve Address Success", response.data);
                addresses = response.data;
                var merged = users.map( user => { return {...user, address: addresses.find(address => address.id === user.addressID)}}).filter(user => user.accountType === 'Donor' && user.id !== userID);
                console.log("Merged", merged)
                setAllUsers(merged);
            })
            .catch(function (error) {
                // FAIL
                console.log("Retrieve Address Failed", error.response.data.message)
            });
        })
        .catch(function (error) {
            // FAIL
            console.log("Retrieve User Failed", error.response.data.message)
        });
    }

    useEffect(() => {
        console.log("From Outlet", props);
        handleGetAllUsers();
    }, [])

    return (<>
        <div className="flex items-center justify-center w-full h-full gap-5 px-4 py-6 overflow-y-hidden ">
            <div className="flex flex-col w-full h-full border-2 border-red-900 shadow-sm shadow-red-900">
                {
                    !showUserProfile || !selectedUser ? <>
                        <div className="px-6 py-2 font-semibold border-b-2 border-red-900 text-md ">
                            LIST OF NEAREST DONORS
                        </div>
                        <div className="flex flex-wrap items-center justify-start gap-2 p-2 overflow-y-auto">
                            {   allUsers &&
                                allUsers.map((user, i) =>  {
                                    return <div key={i} onClick={() => {handleSelectUser(user)}} className="flex flex-col gap-1 p-3 text-sm border-2 border-black rounded-xl shadow-sm cursor-pointer w-[188px] h-[198px] max-h-[198px] shadow-black">
                                        <div className="overflow-hidden text-base whitespace-nowrap"><b>{user.lastname}</b>, {user.firstname} {user.middlename}</div>
                                        <div className='overflow-hidden whitespace-nowrap'>{user.gender} | {user.age} yrs old</div>
                                        <div><b>Type:</b> {user.bloodType}</div>
                                        <div className='overflow-hidden whitespace-nowrap'><b>Brgy:</b> Tondo</div>
                                        <div className='overflow-hidden whitespace-nowrap'><b>City:</b> Manila</div>
                                        <div className='overflow-hidden whitespace-nowrap'><b>Province:</b> NCR</div>
                                        <div className="w-full">⭐⭐⭐⭐⭐⭐</div>
                                    </div>})
                            }
                        </div>
                    </> : <>
                        <div className="flex items-center justify-between px-6 py-2 border-b-2 border-red-900 ">
                            <div className='font-semibold text-md'>
                                Donor Profile
                            </div>
                            <div className='flex gap-2'>
                                {!props.isDonor &&
                                    <button onClick={() => {}} className='flex items-center px-2 py-1 text-white bg-red-900 shadow-sm shadow-black'>
                                        REQUEST BLOOD DONATION
                                    </button>
                                }
                                <button onClick={() => {setShowUserProfile(false)}} className='flex items-center px-2 py-1 text-white bg-red-900 shadow-sm shadow-black'>
                                    BACK
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start h-full overflow-y-auto">
                            <div className='flex w-full p-2' >
                                <div className='flex w-2/3 gap-4'>
                                    <div className='flex flex-col items-end w-1/4 gap-2'>
                                        <span className='font-bold'>FULL NAME: </span>
                                        <span className='font-bold'>GENDER: </span>
                                        <span className='font-bold'>AGE: </span>
                                        <span className='font-bold'>MOBILE NO: </span>
                                        <span className='font-bold'>EMAIL: </span>
                                        <span className='font-bold'>BLOOD TYPE: </span>
                                        <span className='font-bold'>RATING: </span>
                                        <span className='font-bold'># DONATION: </span>
                                    </div>
                                    <div className='flex flex-col items-start w-3/4 gap-2'>
                                        <span>{selectedUser.lastname}, {selectedUser.firstname} {selectedUser.middlename}</span>
                                        <span>{selectedUser.gender}</span>
                                        <span>{selectedUser.age} years old</span>
                                        <span>{selectedUser.mobileNo}</span>
                                        <span>{selectedUser.email}</span>
                                        <span>{selectedUser.bloodType}</span>
                                        <span>{printStars(5)}</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center w-1/3'>
                                    <img src={placeholder} alt="profile" width={"70%"} className="border-2 border-red-900 rounded-full shadow-md shadow-red-900"/>
                                </div>
                            </div>
                            <div className='flex flex-wrap items-start justify-start w-full h-full gap-2 p-2 overflow-y-auto border-t-2 border-red-900'>
                                { false ? <>
                                    There are no reviews.
                                </> : <>
                                    <div className='flex flex-col items-center p-2 text-sm text-center w-[252px] h-[162px] bg-slate-100 gap-1 border-[2px] border-red-900 overflow-clip'>
                                        <div>⭐⭐⭐⭐⭐</div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusantium tenetur aliquam quidem aspernatur. Voluptate blanditiis reiciendis tenetur excepturi. Similique!
                                    </div>
                                    <div className='flex flex-col items-center p-2 text-sm text-center w-[252px] h-[162px] bg-slate-100 gap-1 border-[2px] border-red-900 overflow-clip'>
                                        <div>⭐⭐⭐⭐</div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusantium tenetur aliquam quidem aspernatur. Voluptate blanditiis reiciendis tenetur excepturi. Similique!
                                    </div>
                                    <div className='flex flex-col items-center p-2 text-sm text-center w-[252px] h-[162px] bg-slate-100 gap-1 border-[2px] border-red-900 overflow-clip'>
                                        <div>⭐⭐⭐⭐⭐⭐</div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusantium tenetur aliquam quidem aspernatur. Voluptate blanditiis reiciendis tenetur excepturi. Similique!
                                    </div>
                                    <div className='flex flex-col items-center p-2 text-sm text-center w-[252px] h-[162px] bg-slate-100 gap-1 border-[2px] border-red-900 overflow-clip'>
                                        <div>⭐⭐</div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusantium tenetur aliquam quidem aspernatur. Voluptate blanditiis reiciendis tenetur excepturi. Similique!
                                    </div>
                                    <div className='flex flex-col items-center p-2 text-sm text-center w-[252px] h-[162px] bg-slate-100 gap-1 border-[2px] border-red-900 overflow-clip'>
                                        <div>⭐⭐⭐⭐</div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusantium tenetur aliquam quidem aspernatur. Voluptate blanditiis reiciendis tenetur excepturi. Similique!
                                    </div>
                                    <div className='flex flex-col items-center p-2 text-sm text-center w-[252px] h-[162px] bg-slate-100 gap-1 border-[2px] border-red-900 overflow-clip'>
                                        <div>⭐⭐⭐⭐⭐⭐</div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusantium tenetur aliquam quidem aspernatur. Voluptate blanditiis reiciendis tenetur excepturi. Similique! Voluptate blanditiis reiciendis tenetur excepturi. Similique!Voluptate blanditiis reiciendis tenetur excepturi. Similique!
                                    </div>
                                </>}
                            </div>
                        </div>
                    </>
                }
            </div>
            <form className="flex flex-col h-full border-2 border-red-900 shadow-sm w-96 shadow-black">
                <div className="py-2 font-semibold tracking-wide text-center border-b-2 border-red-900 text-md ">
                    FILTER
                </div>
                <div className="flex flex-col w-full h-full gap-1 p-2 overflow-y-auto">
                    <div className="flex flex-col gap-1 text-sm">
                        <input type='text' placeholder="Search name"  className="px-2 py-1 border-black border-[1px] bg-slate-100" onChange={()=>{}}/>
                    </div>
                    <div className="font-semibold ">By Location</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm">
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value='default' onChange={()=>{}}>
                            <option value={'default'}>Select Region</option>
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default" onChange={()=>{}}>
                            <option value={'default'}>Select Province</option>
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default" onChange={()=>{}}>
                            <option value={'default'}>Select City</option>
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default" onChange={()=>{}}>
                            <option value={'default'}>Select Barangay</option>
                        </select>
                    </div>
                    <div className="font-semibold ">By Preference</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm">
                        <div className="flex gap-2">
                            <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-1/2 bg-slate-100" value="default" onChange={()=>{}}>
                                <option value={'default'}>Gender</option>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                            </select>
                            <input className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-1/2 bg-slate-100" value="" placeholder="Age"  onChange={()=>{}}/>
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
                        />
                    </div>
                    <div className="font-semibold ">By Compatibility</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm ">
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default" onChange={()=>{}}>
                            <option value={'default'}>Select Blood Type</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-2 px-1 py-1 font-semibold tracking-wide text-center text-white border-t-2 border-red-900 text-md">
                    <input type="reset" className="px-2 py-1 border-red-900 border-[1px] bg-red-900 cursor-pointer shadow-sm shadow-black" value="Reset" />
                    <input type="submit" className="px-2 py-1 border-red-900 border-[1px] font-semibold bg-red-900 cursor-pointer shadow-sm shadow-black" value="Filter Results" />
                </div>
            </form>
        </div>
    </>);
}

export default Browse;