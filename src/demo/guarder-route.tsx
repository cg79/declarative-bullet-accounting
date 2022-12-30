
import React, { Component, ReactNode } from 'react';
import { Navigate } from "react-router-dom";
import { store } from '../_store/store';

// const GuardedRoute = (props: any) => {
//     debugger;
//     const logged = store.get("BULLET_IO_USER");
//     if(!logged) return <Navigate to='/login' />

//     return props.renderFunc();
// };

// export default GuardedRoute;

    
const GuardedRoute1 = ({ children }: { children: ReactNode }) => {
    // debugger;
    const logged = store.get("BULLET_IO_USER");
    if(!logged) return <Navigate to='/login' />

    // return <div>asd</div>
    return  (
        <div>
            {children}
        </div>
        
    );
};

export default GuardedRoute1;


