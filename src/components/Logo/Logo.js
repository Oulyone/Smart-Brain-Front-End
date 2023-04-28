import React from 'react';
import Tilt from 'react-parallax-tilt';
import ai from './innovation.png';

const Logo = () => {
    return (
        <div className='ma2 mt0'>
            <Tilt className='br2 shadow-2' style={{height: '200px', width: '200px'}}>
                <div>
                    <img alt="logo" src={ai} style={{paddingTop: '25px', height: '150px', width: '150px'}}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;