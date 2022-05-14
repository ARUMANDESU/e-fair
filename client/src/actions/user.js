import axios from "axios";

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

export const login = async (username, password)=>{
    return async dispatch =>{
        try{
            const response=await axios.post('http://localhost:5000/login',{
                username,
                password,
            })
            console.log(response.data);
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }


}