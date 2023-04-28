import React from 'react';

const Rank = ({amount, entries, name}) => {
    
    const calculatePeople = (amount) => {
        if (amount > 0) {
            return (
                <div className='white f3 ma2 pa3'>
                    {`There are ${amount} people in the picture.`} 
                </div>
            )
        } else {
            return (
                <div className='white f3 ma2 pa3'>
                    Please put image link
                </div>
            )
        }
    }

    return (
        <div>
            <div className='white f3'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
            {calculatePeople(amount)}
        </div>
    )
}

export default Rank;
