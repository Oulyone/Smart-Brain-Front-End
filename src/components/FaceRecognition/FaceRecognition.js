import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({boxes, imageUrl}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                {
                    boxes.map((box, id) => {
                        const {topRow, rightCol, bottomRow, leftCol} = box;
                        return (
                            <div 
                                key={id} 
                                className='bounding-box' 
                                style={{top:topRow, right:rightCol, bottom:bottomRow, left:leftCol}}>
                            </div>
                        );
                    })
                } 
            </div>
        </div>
    )
}

export default FaceRecognition;
