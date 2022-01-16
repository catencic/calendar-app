import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {LoginScreen} from '../components/auth/LoginScreen'
import {CalendarScreen} from '../components/calendar/CalendarScreen'

import { BrowserRouter,Routes, Route } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const {checking} = useSelector(state => state.auth);


        
    useEffect(() => {
        dispatch(startChecking() );
        
    }, [dispatch])

    if(checking){
        return (<h5>Espere...</h5>);
    }

    return (

    
        
        <BrowserRouter>
           <Routes>
             

              <Route path="/login" element={
                <PublicRouter>
                    <LoginScreen/>
                </PublicRouter>
              
              }/>

            <Route path="/*" element={
                <PrivateRouter>
                    <CalendarScreen/>
                </PrivateRouter>
              
              }/>
     
              {/*  <Route path="/" element={<div><h1>Home</h1></div>}/>
               <Route path="/login" element={<LoginScreen />}/>
               <Route path="/calendar" element={<CalendarScreen />}/> */}
         
           </Routes>
        </BrowserRouter>
        
    )
}
