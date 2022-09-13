const Browse = () => {

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
            <div className="flex flex-col w-full h-full border-2 border-red-900 shadow-sm rounded-t-3xl shadow-red-900">
                <div className="px-8 py-3 text-xl font-semibold">
                    LIST OF NEAREST DONORS (Under Development)
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 px-3 py-2 overflow-y-auto">
                    {
                        users.map((user, i) =>  {
                            return <div key={i} className="flex flex-col h-48 p-3 text-sm border-2 border-black rounded-lg shadow-sm cursor-pointer w-60 shadow-black">
                                <div>{user.name}</div>
                                <div>20 yrs old</div>
                                <div>Male</div>
                                <div>O+</div>
                                <div>Brgy: Tondo</div>
                                <div>City: Manila</div>
                                <div>Province: NCR</div>
                                <div>⭐⭐⭐⭐⭐⭐</div>
                            </div>})
                    }
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-3 py-4 border-2 border-red-900 shadow-sm w-96 rounded-3xl shadow-black">
                <div className="text-xl font-semibold tracking-wide text-center">
                    Filter
                </div>
                <div className="flex flex-col w-full h-full gap-2 px-3 py-1 overflow-y-auto">
                    <div className="font-semibold ">By Location</div>
                    <div className="font-semibold ">By Rating</div>
                </div>
            </div>
        </div>
    </>);
}

export default Browse;