import moment from 'moment'

import { types } from "../types/types";


const initialState = {

    events: [
        {
        title: 'cumpleaños del jefe',
        start: moment().toDate(), 
        end: moment().add(2, 'hours').toDate(), 
        bgcolor: '#fafafa',
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
            
           
    
        default:
            return state;
    }
}