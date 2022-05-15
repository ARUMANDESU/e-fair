import axios from "axios";
import {setUser} from "../reducers/userReducer";

export const registration = async (username, email, password)=>{
    try{
        const response=await axios.post('http://localhost:5000/register',{
            username,
            email,
            password,
        })
        alert(response.data.message)
    }
    catch (e) {
        alert(e.response.data.message)
    }

}

export const login = (username, password)=>{
    return async dispatch =>{
        try{
            const response=await axios.post('http://localhost:5000/login',{
                username,
                password,
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data);
        }
        catch (e) {
            alert(e)
        }
    }


}

export const auth = ()=>{
    return async dispatch =>{
        try{
            const response=await axios.get('http://localhost:5000/auth',{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        }
        catch (e) {
            console.log(e)
        }
    }


}