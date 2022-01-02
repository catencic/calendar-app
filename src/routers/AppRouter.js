import React from 'react'
import {LoginScreen} from '../components/auth/LoginScreen'
import {CalendarScreen} from '../components/calendar/CalendarScreen'

import { BrowserRouter,Routes, Route,Navigate } from "react-router-dom";

export const AppRouter = () => {
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
