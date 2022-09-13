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
            <div className="flex flex-col w-full h-full border-2 border-red-900 shadow-sm rounded-3xl shadow-red-900">
                <div className="px-8 py-3 text-xl font-semibold">
                    LIST OF DONORS
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 px-6 py-4 overflow-y-auto bg-slate-200">
                    {
                        users.map((user, i) =>  {return <div key={i} className="flex flex-col w-56 h-40 p-3 text-sm border-2 border-black rounded-lg shadow-sm cursor-pointer shadow-black">
                            <div>{user.name}</div>
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