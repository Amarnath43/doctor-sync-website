import axios from "axios"
import toast from 'react-hot-toast'

import { USER_STORE_PERSIST } from "../const/doctor"
import {BASE_URL} from '../const/env.const';
import { getToken, removeToken } from "../helper";


console.log("🌐 Backend URL is:", BASE_URL);
const AxiosInstances = axios.create({
    baseURL: BASE_URL
});



AxiosInstances.interceptors.request.use((config)=>
{
    const token=getToken();
    token &&(config.headers.Authorization=`Bearer ${token}`)
    return config;
})

//when response is sent from server, first it will come to interceptor if incase response is successful then  it will return the response as it is and if response is unsuccessful then it will throw the error that it is received

AxiosInstances.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.data.success==="false")
        {
            const message=error.response.data.message;
            message?toast.error(message):toast.error("Something went wrong");
            if(error.response.status===401)
            {
                removeToken();
                sessionStorage.removeItem(USER_STORE_PERSIST);
                window.location.href="/signin";
            }

        }
        else{
            toast.error("something went wrong again")
        }
        throw error;
    }
);

export default AxiosInstances;