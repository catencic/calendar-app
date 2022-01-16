import moment from 'moment'

import { types } from "../types/types";


const initialState = {

    events: [
        {
        id: new Date().getTime(),    
        title: 'cumpleaños del jefe',
        start: moment().toDate(), 
        end: moment().add(2, 'hours').toDate(), 
        notes: 'comprar cripa',
        user: {
            _id: '123',
            name: 'Cristian',
        }
    }

    ],
    activeEvents: null
};

export const calendarReducer= (state = initialState, action) =>{

    switch (action.type) {
        
        case types.eventSetActive:
            return {
                ...state,
               
                activeEvents: action.payload,
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }    
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvents: null
            } 
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id)? action.payload : e
                )
            }  
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvents.id)
                ),
                activeEvents: null
            }         
            
           
    
        default:
            return state;
    }
}