import React from 'react'
import Header from './Header';
import RoutesComponent from './Routes';
import { useLocation } from 'react-router-dom';

const WebLayout = () => {
    const location = useLocation();
    const shouldShowHeader = location.pathname !== '/login';
    return (
        <>
            {shouldShowHeader && (
                <Header />
            )}
           <div className='Layout' >
           <RoutesComponent />
            
            </div> 
        </>
    )
}

export default WebLayout