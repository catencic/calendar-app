import React, { useState } from 'react'
import Navbar from '../ui/Navbar'
import moment from 'moment'
import 'moment/locale/es'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';


moment.locale('es');

const localizer = momentLocalizer(moment);

//manejo del evento del calendario
const events = [{
    title: 'cumpleaños del jefe',
    start: moment().toDate(), 
    end: moment().add(2, 'hours').toDate(), 
    bgcolor: '#fafafa',
    notes: 'comprar cripa',
    user: {
        _id: '123',
        name: 'Cristian',
    }
}]

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const dispatch = useDispatch();


    const onDoubleClick = (e) => {

     
        dispatch(uiOpenModal());

    }

    const onSelectEvent = (e) => {

       
        dispatch(eventSetActive(e));
        dispatch(uiOpenModal());
    }

    const onViewChange = (e) => {
   //guardo la ultima view del calendario, y actualizo el state de la vista actual 
        setLastView(e);
        localStorage.setItem('lastView',e)
    }


    const eventStyleGetter = (event , start, end , isSelected) => {

       
        const style = {
            backgroundColor: '#367Cf7',
            borderRadius: '0px',
            opacity: 0.8 ,
            display: 'block',
            color: 'white'
            
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
           <Navbar />

           <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages= {messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick} 
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components = {{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            <CalendarModal />
        </div>
    )
}
