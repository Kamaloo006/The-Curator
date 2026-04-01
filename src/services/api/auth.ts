import axios from "axios";


const API = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const register = (data:FormData) => {
    return API.post('/register' , data, {
        headers: {"Content-Type":"multipart/form-data"}
    });
}


export const login = (data: {email:string, password:string}) => {
    return API.post('/login', data);
}

export const logout = (token: string) => {
    return API.post('/logout', {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}