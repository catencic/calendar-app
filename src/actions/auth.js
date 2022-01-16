import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";


 export const startLogin = (email , password) => {
     return  async (dispatch) => {
         
        const resp  = await fetchSinToken('auth', {email, password} , 'POST');
        const body = await resp.json();
       
        if(body.ok){
            localStorage.setItem('token' , body.token); // guardo el token en el localStorage
            localStorage.setItem('token-init-date' , new Date().getTime() ); //la hora inical del token

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }) )
        }else{
            Swal.fire('Error', body.msg , 'error');
        }
     }
 }


 const login = (user) =>({

    type: types.authLogin,
    payload: user

 });


 export const startRegister = (name , email , password)=>{

 
    return async(dispatch )=>{

        const resp  = await fetchSinToken('auth/new', {name , email, password} , 'POST');
        const body = await resp.json();


        if(body.ok){
            localStorage.setItem('token' , body.token); // guardo el token en el localStorage
            localStorage.setItem('token-init-date' , new Date().getTime() ); //la hora inical del token

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }) )
        }else{
            Swal.fire('Error', body.msg , 'error');
        }


    }


 }

