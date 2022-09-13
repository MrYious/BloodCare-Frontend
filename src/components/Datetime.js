import React, { useEffect, useState } from 'react';

const Datetime = () => {

    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);

    return (
        <div>
            {dateState.toLocaleDateString('en-GB', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })}
            <span>  |  </span>
            {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
        </div>
    );
}

export default Datetime;