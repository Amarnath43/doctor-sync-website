import {TOKEN} from '../const/doctor'

const getToken = () => {
    return localStorage.getItem(TOKEN); 
};

const setToken = (data) => {
    localStorage.setItem(TOKEN, data);
};

const removeToken = () => {
    localStorage.removeItem(TOKEN);
};


export {getToken, setToken, removeToken}

