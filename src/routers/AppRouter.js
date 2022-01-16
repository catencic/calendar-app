import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {LoginScreen} from '../components/auth/LoginScreen'
import {CalendarScreen} from '../components/calendar/CalendarScreen'

import { BrowserRouter,Routes, Route,Navigate } from "react-router-dom";
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking() );
        
    }, [dispatch])

    return (

    
        
        <BrowserRouter>
           <Routes>
             
              
     
               <Route path="/" element={<div><h1>Home</h1></div>}/>
               <Route path="/login" element={<LoginScreen />}/>
               <Route path="/calendar" element={<CalendarScreen />}/>
         
           </Routes>
        </BrowserRouter>
        
    )
}
