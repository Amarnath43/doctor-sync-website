import AxiosInstances from '.';


const getUserById=async()=>{
    return await AxiosInstances.get('/user');
}

const updateUser=async(data)=>{
    return await AxiosInstances.post('/user/edit_profile', data)
}

const userAPI={getUserById, updateUser};

export default userAPI;