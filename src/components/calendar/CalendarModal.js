import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import {uiCloseModal} from '../../actions/ui';
import {  eventClearActiveEvent, eventStartNew, eventStarUpdate } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

  const now = moment().minutes(0).second(0).add(1, 'hours');

  const nowMore = now.clone().add(1, 'hours');

  const initEvents = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowMore.toDate()
}

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowMore.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvents} = useSelector(state => state.calendar);

   
    

    const [formValues, setFormValues] = useState(initEvents);

     const {title, notes , start, end} = formValues;

     useEffect(() => {
        
        if(activeEvents){
            setFormValues(activeEvents);
        }else{
            setFormValues(initEvents);
        }
         
     }, [activeEvents, setFormValues]);


     const handleInputChange = ({target}) => {
        
            setFormValues({
                ...formValues,
                [target.name]: target.value
            });
     }

     const handleSubmitForm =(e)=>{
           e.preventDefault();
           
           
           const momentStart = moment(start);
           const momentEnd = moment(end);

           if(momentStart.isSameOrAfter(momentEnd)){
               Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
           }

           if(title.trim().length < 2){
               return setTitleValid(false);
           }
            //si el evento activo no es null es porque estoy editando un evento
            // si es null es porque estoy creando un evento
           if(activeEvents){
               dispatch(eventStarUpdate(formValues));
           }else{

               dispatch(eventStartNew(formValues));
           }


           setTitleValid(true);
           dispatch(uiCloseModal());
          

     }

   const handleStartDateChange = (e) => {
        setDateStart(e);   
        setFormValues({
            ...formValues,
            start: e
        })
       
   }

   const handleEndDateChange = (e) => {
    setDateEnd(e);  
    setFormValues({
        ...formValues,
        end: e
    }) 
   
}


    const closeModal = () => {
        
        dispatch(uiCloseModal());
        setFormValues(initEvents);
        dispatch(eventClearActiveEvent());
    }

    return (
        <Modal
        isOpen={modalOpen}
       // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
       
      >
               <h1> { (activeEvents)? 'Editar evento': 'Nuevo evento'}</h1>
<hr />
<form 
 className="container"
 onSubmit={handleSubmitForm}     
>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
            <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart }
            className="form-control"
            />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
            <DateTimePicker
                onChange={handleEndDateChange}
                value={dateEnd }
                minDate={dateStart}
                className="form-control"
            />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
          </Modal>
    )
}
