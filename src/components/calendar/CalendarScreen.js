import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Navbar'
import moment from 'moment'
import 'moment/locale/es'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);

//manejo del evento del calendario


export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const dispatch = useDispatch();
    const {events , activeEvents} = useSelector(state => state.calendar);
    const {uid } = useSelector(state => state.auth);


    useEffect(() => {
    
        dispatch(eventStartLoading());
        
    }, [dispatch])


    const onDoubleClick = (e) => {

     
        dispatch(uiOpenModal());

    }

    const onSelectEvent = (e) => {

        
        dispatch(eventSetActive(e));
       
      
    }

    const onViewChange = (e) => {
   //guardo la ultima view del calendario, y actualizo el state de la vista actual 
        setLastView(e);
        localStorage.setItem('lastView',e)
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }


    const eventStyleGetter = (event , start, end , isSelected) => {

       
        const style = {
            backgroundColor: (uid === event.user._id) ?  '#367Cf7' : '#465660',
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
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
                components = {{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            {
                 activeEvents  && <DeleteEventFab />
            }
             
            <CalendarModal />
        </div>
    )
}
