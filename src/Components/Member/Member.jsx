import React from 'react'

import './Member.css'

export const Member = ({ image, name, description }) => {

    return (
        <div className='member-profile' >
            <div className='memberImage-container' style={{ backgroundImage: `url(${image})` }}>
            </div>
            <div className='memberDiscription-container' >
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}
