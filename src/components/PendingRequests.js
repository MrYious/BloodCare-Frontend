import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import axios from "axios";
import placeholder from "../assets/placeholder.jpg";
import { useOutletContext } from "react-router-dom";

const PendingRequests = () => {

    const [showModalAccept, setShowModalAccept] = useState(false);
    const [showModalDecline, setShowModalDecline] = useState(false);

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
            name: 'Action',
		    cell: (row) => <div className='flex gap-1'>
                <button  onClick={() => {
                        setSelectedRequests(row)
                        setShowModalAccept(true)
                    }} className='p-2 my-2 font-semibold bg-green-500 shadow-sm shadow-black active:bg-green-700' type="button"
                >
                    Accept
                </button>
                <button  onClick={() => {
                        setSelectedRequests(row)
                        setShowModalDecline(true)
                    }} className='p-2 my-2 font-semibold bg-red-500 shadow-sm shadow-black active:bg-red-700' type="button">
                    Decline
                </button>
            </div>,
            width: '170px',
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
            sortable: true,
            cell: () => <>Waiting for Donor's response</>,
            width: '200px',
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

    const [allRequests, setAllRequests] = useState([]);

    const [selectedRequests, setSelectedRequests] = useState({});

    const printStars = (num) => {
        var star = [];
        for (var i = 0; i < num; i++) {
            star.push('???');
        }
        return star;
    }

    const handleGetUserRequests = () => {
        axios.post(`http://localhost:5000/main/requestList`,{
            status: 'Pending',
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

    const handleAcceptRequest = (req) => {
        // console.log(req)
        axios.patch(`http://localhost:5000/main/request`,{
            id: req.id,
            data: {
                status: 'Active'
            },
        })
        .then(function (response) {
            // SUCCESS
            console.log("Update Requests Success", response.data);
            handleGetUserRequests()
            setShowModalAccept(false);
        })
        .catch(function (error) {
            // FAIL
            console.log("Update Requests Failed", error.response.data.message)
        });
    }

    const handleDeclineRequest = (req) => {
        // console.log(req)
        axios.patch(`http://localhost:5000/main/request`,{
            id: req.id,
            data: {
                status: 'Declined'
            },
        })
        .then(function (response) {
            // SUCCESS
            console.log("Update Requests Success", response.data);
            handleGetUserRequests()
            setShowModalDecline(false);
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
            showModalAccept && <>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full bg-white bg-opacity-70">
                    <div className="flex flex-col text-center bg-white border-[1px] border-black w-[450px] h-fit drop-shadow-2xl shadow-black rounded-sm ">
                        {/* TITLE */}
                        <div className="flex items-center justify-between w-full p-2 bg-gray-200">
                            <span className="text-lg font-semibold">
                                CONFIRM ACCEPT DONATION REQUEST
                            </span>
                            <svg onClick={()=>{setShowModalAccept(false)}} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        {/* CONTENT */}
                        <div className="w-full px-2 py-5 text-left bg-gray-100 h-fit">
                            Are you sure you want to accept the blood donation request of <b>{selectedRequests.user.firstname}</b>?
                        </div>
                        {/* ACTIONS */}
                        <div className="flex items-center justify-end w-full gap-2 p-2 font-semibold text-white bg-gray-200">
                            <button onClick={() => handleAcceptRequest(selectedRequests)} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black ">
                                OK
                            </button>
                            <button onClick={()=>{setShowModalAccept(false);}} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black">
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            </>
        }
        {
            showModalDecline && <>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full bg-white bg-opacity-70">
                    <div className="flex flex-col text-center bg-white border-[1px] border-black w-[450px] h-fit drop-shadow-2xl shadow-black rounded-sm ">
                        {/* TITLE */}
                        <div className="flex items-center justify-between w-full p-2 bg-gray-200">
                            <span className="text-lg font-semibold">
                                CONFIRM DECLINE DONATION REQUEST
                            </span>
                            <svg onClick={()=>{setShowModalDecline(false)}} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        {/* CONTENT */}
                        <div className="w-full px-2 py-5 text-left bg-gray-100 h-fit">
                            Are you sure you want to decline the blood donation request of <b>{selectedRequests.user.firstname}</b>?
                        </div>
                        {/* ACTIONS */}
                        <div className="flex items-center justify-end w-full gap-2 p-2 font-semibold text-white bg-gray-200">
                            <button onClick={() => handleDeclineRequest(selectedRequests)} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black ">
                                OK
                            </button>
                            <button onClick={()=>{setShowModalDecline(false);}} className="px-3 py-1 border-red-900 border-[1px] bg-red-900 shadow-sm shadow-black">
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
                        title={'List of Pending Requests'}
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