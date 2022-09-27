import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import axios from "axios";
import placeholder from "../assets/placeholder.jpg";
import { useOutletContext } from "react-router-dom";

const History = () => {

    const columns = [
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
            name: 'Request Date',
            selector: row => row.createdAt,
            sortable: true,
		},
        {
            name: 'Completion Date',
            selector: row => row.updatedAt,
            sortable: true,
		},
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
		},
    ];

    const ExpandedComponentSeeker = ({ data }) => <div className='flex items-start justify-start gap-4 p-3 overflow-auto bg-red-200 h-fit'>
        <div className='w-32 h-32'>
            <img src={placeholder} alt="profile" width={"100%"} className="border-2 border-red-900 rounded-full shadow-md shadow-red-900"/>
        </div>
        <div className='flex flex-col items-start justify-center w-1/3 h-full gap-2 '>
            <div className=''>
                <b>Type:</b> {data.user.accountType}
            </div>
            <div className=''>
                <b>Full name:</b> {data.user.lastname}, {data.user.firstname}  {data.user.middlename}
            </div>
            <div className=''>
                <b>Blood Type:</b> {data.user.bloodType}
            </div>
            <div className=''>
                <b>Gender:</b> {data.user.gender}
            </div>
            <div className=''>
                <b>Age:</b> {data.user.age}
            </div>
            <div className=''>
                <b>Donations:</b> {data.user.donorInfo.donations}
            </div>
            <div className=''>
                <b>Rating:</b> {data.user.donorInfo.avgRating}
            </div>
        </div>
        <div className='flex flex-col items-start justify-center w-1/2 h-full gap-2 '>
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
    </div>;

    const ExpandedComponentDonor = ({ data }) => <div className='flex items-start justify-start gap-4 p-3 overflow-auto bg-red-200 h-fit'>
        <div className='w-32 h-32'>
            <img src={placeholder} alt="profile" width={"100%"} className="border-2 border-red-900 rounded-full shadow-md shadow-red-900"/>
        </div>
        <div className='flex flex-col items-start justify-center w-1/3 h-full gap-2 '>
            <div className=''>
                <b>Type:</b> {data.user.accountType}
            </div>
            <div className=''>
                <b>Full name:</b> {data.user.lastname}, {data.user.firstname}  {data.user.middlename}
            </div>
            <div className=''>
                <b>Blood Type:</b> {data.user.bloodType}
            </div>
            <div className=''>
                <b>Gender:</b> {data.user.gender}
            </div>
            <div className=''>
                <b>Age:</b> {data.user.age}
            </div>
        </div>
        <div className='flex flex-col items-start justify-center w-1/2 h-full gap-2 '>
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
    </div>;

    const {isDonor, userData, addressData, setAlert} = useOutletContext();

    const [filterName, setFilterName] = useState('');

    const [allRequests, setAllRequests] = useState([])

    const handleGetUserRequests = () => {
        axios.post(`http://localhost:5000/main/requestList`,{
            status: ['Declined', 'Cancelled', 'Completed'],
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

    useEffect(() => {
        handleGetUserRequests();
    }, [])

    return (<>
        <div className="flex w-full h-full gap-5 px-4 py-6 ">
            <div className="flex flex-col w-full h-full bg-gray-200 border-2 border-red-900 shadow-sm overflow-y-none shadow-black">
                <div className='flex items-center justify-end w-full gap-5 px-2 py-2 h-fit'>
                    <div>Search by Name:</div>
                    <input type='text'  className="px-2 py-1 border-black border-[1px] bg-slate-100" value={filterName} onChange={(e)=>{setFilterName(e.target.value)}}/>
                </div>
                <div className='h-full'>
                    <DataTable
                        title={'List of Closed Requests'}
                        columns={columns}
                        data={allRequests.filter(request =>
                            request.user.firstname.toLowerCase().includes(filterName.toLowerCase())     ||
                            request.user.lastname.toLowerCase().includes(filterName.toLowerCase())      ||
                            request.user.middlename.toLowerCase().includes(filterName.toLowerCase())
                        )}
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

export default History;