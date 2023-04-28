import React from 'react';

const deleteAcc = (id, onRouteChange) => {
    fetch("https://smart-brain-api-qha4.onrender.com/delete", {
        method: 'delete',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            id: id
        })
                
    })
    .then(response => response.json())
        .then(res => {
            if(res !== 'unable to delete') {
                onRouteChange('signout')
            }
        })
}

const Navigation = ({onRouteChange, isSignedIn, id}) =>  {
        if(isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                    <p onClick={() => deleteAcc(id, onRouteChange)} className='f3 link dim black underline pa3 pointer'>Delete Account</p>
                </nav>
            )
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p> 
                </nav>
            )
        }
}



        
export default Navigation;