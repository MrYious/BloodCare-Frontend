import Rating from 'react-rating'
import { useState } from 'react'

const Browse = () => {

    const [rating, setRating] = useState(0)

    const users = [
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
        {name: "Juan De la Cruz"},
    ]

    return (<>
        <div className="flex items-center justify-center w-full h-full gap-5 px-4 py-6 overflow-y-hidden ">
            <div className="flex flex-col w-full h-full border-2 border-red-900 shadow-sm shadow-red-900">
                <div className="px-6 py-2 font-semibold border-b-2 border-red-900 text-md ">
                    LIST OF NEAREST DONORS
                </div>
                <div className="flex flex-wrap items-center justify-start gap-2 p-2 overflow-y-auto">
                    {
                        users.map((user, i) =>  {
                            return <div key={i} className="flex flex-col gap-1 p-3 text-sm border-2 border-black rounded-xl shadow-sm cursor-pointer w-[188px] h-54 shadow-black">
                                <div className="text-base ">{user.name}</div>
                                <div>Male | 20 yrs old</div>
                                <div><b>Type:</b> O+</div>
                                <div><b>Brgy:</b> Tondo</div>
                                <div><b>City:</b> Manila</div>
                                <div><b>Province:</b> NCR</div>
                                <div className="w-full">⭐⭐⭐⭐⭐⭐</div>
                            </div>})
                    }
                </div>
            </div>
            <form className="flex flex-col h-full border-2 border-red-900 shadow-sm w-96 shadow-black">
                <div className="py-2 font-semibold tracking-wide text-center border-b-2 border-red-900 text-md ">
                    FILTER
                </div>
                <div className="flex flex-col w-full h-full gap-1 p-2 overflow-y-auto">
                    <div className="flex flex-col gap-1 text-sm">
                        <input type='text' placeholder="Search name"  className="px-2 py-1 border-black border-[1px] bg-slate-100"/>
                    </div>
                    <div className="font-semibold ">By Location</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm">
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value='default'>
                            <option value={'default'}>Select Region</option>
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default">
                            <option value={'default'}>Select Province</option>
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default">
                            <option value={'default'}>Select City</option>
                        </select>
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default">
                            <option value={'default'}>Select Barangay</option>
                        </select>
                    </div>
                    <div className="font-semibold ">By Preference</div>
                    <div className="flex flex-col gap-1 pl-5 text-sm">
                        <div className="flex gap-2">
                            <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-1/2 bg-slate-100" value="default" >
                                <option value={'default'}>Gender</option>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                            </select>
                            <input className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-1/2 bg-slate-100" value="" placeholder="Age" />
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
                        <select className="px-2 py-1 border-[1px] border-gray-700 rounded-sm w-full bg-slate-100" value="default" >
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