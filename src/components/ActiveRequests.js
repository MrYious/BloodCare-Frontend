import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import Rating from 'react-rating'
import axios from "axios";
import placeholder from "../assets/placeholder.jpg";
import { useOutletContext } from "react-router-dom";

const PendingRequests = () => {

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);

    const [message, setMessage] = useState({
        rating: 0,
        comment: ''
    });

    const donorColumns = [
        {
            name: '#',
            selector: row => row.index,
            sortable: true,
            maxWidth: '50px',
        },
        {
            name: 'First Name',
            selector: row => row.user.firstname,
            sortable: true,
        },
        {
            name: 'Middle Name',
            selector: row => row.user.middlename,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.user.lastname,
            sortable: true,
        },
        {
            name: 'Blood Type',
            selector: row => row.user.bloodType,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.user.gender,
            sortable: true,
        },
        {
            name: 'Request Date',
            selector: row => row.createdAt,
            sortable: true,
            width: '130px',
		},
        {
            name: 'Status',
            sortable: true,
            cell: () => <>Ongoing</>,
            width: '200px',
		},
    ];

    const seekerColumns = [
        {
            name: '#',
            selector: row => row.index,
            sortable: true,
            maxWidth: '50px',
        },
        {
            name: 'First Name',
            selector: row => row.user.firstname,
            sortable: true,
        },
        {
            name: 'Middle Name',
            selector: row => row.user.middlename,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.user.lastname,
            sortable: true,
        },
        {
            name: 'Blood Type',
            selector: row => row.user.bloodType,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.user.gender,
            sortable: true,
        },
        {
            name: 'Request Date',
            selector: row => row.createdAt,
            sortable: true,
		},
        {
            name: 'Action',
		    cell: (row) => <div className='flex gap-1'>
                <button  onClick={()=> {
                        setSelectedRequests(row)
                        setShowModalConfirm(true)
                    }} className='p-2 my-2 font-semibold bg-green-500 shadow-sm shadow-black active:bg-green-700' type="button">
                    Confirm Donation
                </button>
                <button  onClick={()=> {
                        setSelectedRequests(row)
                        setShowModalCancel(true)
                    }} className='p-2 my-2 font-semibold bg-red-500 shadow-sm shadow-black active:bg-red-700' type="button">
                    Cancel
                </button>
            </div>,
            width: '220px',
        },
    ];

    const ExpandedComponentSeeker = ({ data }) => <div className='flex flex-col items-start justify-start gap-2 p-3 overflow-auto bg-gray-200 h-fit'>
        <div className='flex w-full gap-5'>
            <div className='w-32 h-32'>
                <img src={placeholder} alt="profile" width={"100%"} className="border-2 border-red-900 rounded-full shadow-md shadow-red-900"/>
            </div>
            <div className='flex flex-col items-start justify-center w-2/5 h-full gap-2 '>
                <div className=''>
                    <b>Type:</b> {data.user.accountType}
                </div>
                <div className=''>
                    <b>Full name:</b> {data.user.lastname}, {data.user.firstname}  {data.user.middlename}
                </div>
                <div className=''>
                    <b>Contact No:</b> {data.user.mobileNo}
                </div>
                <div className=''>
                    <b>Email:</b> {data.user.email}
                </div>
                <div className=''>
                    <b>Age:</b> {data.user.age}
                </div>
                <div className=''>
                    <b>Your Message:</b> {data.message}
                </div>
                <br/>
                <div className=''>
                    <b>Donations:</b> {data.user.donorInfo.donations}
                </div>
                <div className=''>
                    <b>Donor Rating:</b> {printStars(data.user.donorInfo.avgRating)} {data.user.donorInfo.avgRating}
                </div>
            </div>
            <div className='flex flex-col items-start justify-center w-2/5 h-full gap-2 '>
                <div className=''>
                    <b>Region:</b> {data.user.address.region}
                </div>
                <div className=''>
                    <b>Province:</b> {data.user.address.province}
                </div>
                <div className=''>
                    <b>City:</b> {data.user.address.city}
                </div>
                <div className=''>
                    <b>Barangay:</b> {data.user.address.barangay}
                </div>
                <div className=''>
                    <b>Address Line:</b> {data.user.address.addressLine1}
                </div>
            </div>
        </div>
    </div>;

    const ExpandedComponentDonor = ({ data }) => <div className='flex flex-col items-start justify-start gap-2 p-3 overflow-auto bg-gray-200 h-fit'>
        <div className='flex w-full gap-5'>
            <div className='w-32 h-32'>
                <img src={placeholder} alt="profile" width={"100%"} className="border-2 border-red-900 rounded-full shadow-md shadow-red-900"/>
            </div>
            <div className='flex flex-col items-start justify-center w-2/5 h-full gap-2 '>
                <div className=''>
                    <b>Type:</b> {data.user.accountType}
                </div>
                <div className=''>
                    <b>Full name:</b> {data.user.lastname}, {data.user.firstname}  {data.user.middlename}
                </div>
                <div className=''>
                    <b>Contact No:</b> {data.user.mobileNo}
                </div>
                <div className=''>
                    <b>Email:</b> {data.user.email}
                </div>
                <div className=''>
                    <b>Age:</b> {data.user.age}
                </div>
                <br/>
                <div className=''>
                    <b>Seeker's Message:</b> {data.message}
                </div>
            </div>
            <div className='flex flex-col items-start justify-center w-2/5 h-full gap-2 '>
                <div className=''>
                    <b>Region:</b> {data.user.address.region}
                </div>
                <div className=''>
                    <b>Province:</b> {data.user.address.province}
                </div>
                <div className=''>
                    <b>City:</b> {data.user.address.city}
                </div>
                <div className=''>
                    <b>Barangay:</b> {data.user.address.barangay}
                </div>
                <div className=''>
                    <b>Address Line:</b> {data.user.address.addressLine1}
                </div>
            </div>
        </div>
    </div>;

    const {isDonor, userData, addressData, setAlert} = useOutletContext();

    const [filterName, setFilterName] = useState('');

    const [allRequests, setAllRequests] = useState([])
    const [selectedRequests, setSelectedRequests] = useState({})

    const printStars = (num) => {
        var star = [];
        for (var i = 0; i < num; i++) {
            star.push('⭐');
        }
        return star;
    }

    const handleGetUserRequests = () => {
        axios.post(`http://localhost:5000/main/requestList`,{
            status: 'Active',
            id: userData.id,
            isDonor,
        })
        .then(function (response) {
            // SUCCESS
            console.log("Retrieve Requests Success", response.data);
            const {requests, address, allUsers, donorInfo} = response.data;
            var newUsers = allUsers.map( user => {
                delete user.password
                return {
                    ...user,
                    address: address.find(address => address.id === user.addressID),
                    donorInfo: donorInfo.find(donorInfo => donorInfo.donorID === user.id),
                }
            })
            console.log(newUsers);

            var allRequests = requests.map( (request, i) => {
                console.log(request);
                return {
                    index: i + 1,
                    ...request,
                    user: newUsers.find(x => isDonor ? request.seekerID === x.id : request.donorID === x.id),
                }
            })

            console.log(allRequests);

            setAllRequests(allRequests);
        })
        .catch(function (error) {
            // FAIL
            console.log("Retrieve Requests Failed", error.response.data.message)
        });
    }

    const handleConfirmRequest = (req) => {
        console.log('Request to Donor', req)
        axios.patch(`http://localhost:5000/main/request`,{
            id: req.id,
            data: {
                status: 'Completed',
                comment: message.comment,
                rating: message.rating,
            },
            user: selectedRequests.user
        })
        .then(function (response) {
            // SUCCESS
            console.log("Update Requests Success", response.data);
            handleGetUserRequests()
            setShowModalConfirm(false)
        })
        .catch(function (error) {
            // FAIL
            console.log("Update Requests Failed", error.response.data.message)
        });
    }

    const handleCancelRequest = (req) => {
        // console.log(req)
        axios.patch(`http://localhost:5000/main/request`,{
            id: req.id,
            data: {
                status: 'Cancelled'
            },
        })
        .then(function (response) {
            // SUCCESS
            console.log("Update Requests Success", response.data);
            handleGetUserRequests()
            setShowModalCancel(false)
        })
        .catch(function (error) {
            // FAIL
            console.log("Update Requests Failed", error.response.data.message)
        });
    }

    useEffect(() => {
        handleGetUserRequests();
    }, [])

    return (<>
        {
            showModalConfirm && <>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full bg-white bg-opacity-70">
                    <div className="flex flex-col text-center bg-white border-[1px] border-black w-[450px] h-fit drop-shadow-2xl shadow-black rounded-sm ">
                        {/* TITLE */}
                        <div className="flex items-center justify-between w-full p-2 bg-gray-200">
                            <span className="text-lg font-semibold">
                                CONCLUDE DONATION REQUEST
                            </span>
                            <svg onClick={()=>{setShowModalConfirm(false)}} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        {/* CONTENT */}
                        <div className="w-full px-2 py-5 text-left bg-gray-100 h-fit">
                            Do you want to conclude this blood donation with <b>{selectedRequests.user.firstname}</b>?
                            <div className="flex flex-col py-2">
                                <div className='flex items-center gap-2 px-2'>
                                    Rate Donor:
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
                                        initialRating={message.rating}
                                        value={message.rating}
                                        onChange={(value) => {setMessage({...message, rating: value})}}
                                    />
                                </div>
                                <textarea className="resize-none border-[1px] border-gray-800 p-1" placeholder="Leave a comment" name="comment" id="comment" value={message.comment} onChange={e => setMessage({...message , comment: e.target.value})}></textarea>
                            </div>
                        </div>
                        {/* ACTIONS */}
                        <div className="flex items-center justify-end w-full gap-2 p-2 font-semibold text-white bg-gray-200">
                            <button onClick={() => handleConfirmRequest(selectedRequests)} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black ">
                                OK
                            </button>
                            <button onClick={()=>{setShowModalConfirm(false);}} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black">
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </>
        }
        {
            showModalCancel && <>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full bg-white bg-opacity-70">
                    <div className="flex flex-col text-center bg-white border-[1px] border-black w-[450px] h-fit drop-shadow-2xl shadow-black rounded-sm ">
                        {/* TITLE */}
                        <div className="flex items-center justify-between w-full p-2 bg-gray-200">
                            <span className="text-lg font-semibold">
                                CANCEL DONATION BLOOD REQUEST
                            </span>
                            <svg onClick={()=>{setShowModalCancel(false)}} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        {/* CONTENT */}
                        <div className="w-full px-2 py-5 text-left bg-gray-100 h-fit">
                            Are you sure you want to cancel the blood donation with <b>{selectedRequests.user.firstname}</b>?
                        </div>
                        {/* ACTIONS */}
                        <div className="flex items-center justify-end w-full gap-2 p-2 font-semibold text-white bg-gray-200">
                            <button onClick={() => handleCancelRequest(selectedRequests)} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black ">
                                OK
                            </button>
                            <button onClick={()=>{setShowModalCancel(false);}} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black">
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </>
        }
        <div className="flex w-full h-full gap-5 px-4 py-6 ">
            <div className="flex flex-col w-full h-full bg-gray-200 border-2 border-red-900 shadow-sm overflow-y-none shadow-black">
                <div className='flex items-center justify-end w-full gap-5 px-2 py-2 h-fit'>
                    <div>Search by Name:</div>
                    <input type='text'  className="px-2 py-1 border-black border-[1px] bg-slate-100" value={filterName} onChange={(e)=>{setFilterName(e.target.value)}}/>
                </div>
                <div className='h-full'>
                    <DataTable
                        title={'List of Active Requests'}
                        columns={isDonor? donorColumns : seekerColumns}
                        data={allRequests.filter(request =>
                            request.user.firstname.toLowerCase().includes(filterName.toLowerCase())     ||
                            request.user.lastname.toLowerCase().includes(filterName.toLowerCase())      ||
                            request.user.middlename.toLowerCase().includes(filterName.toLowerCase())
                        ).sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)}
                        pagination
                        striped
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight='366px'
                        expandOnRowClicked
                        expandableRows
                        expandableRowsComponent={isDonor ? ExpandedComponentDonor : ExpandedComponentSeeker}
                        dense
                    />
                </div>
            </div>
        </div>
    </>);
}

export default PendingRequests;