import AxiosInstances from ".";
const signinInitiate=(data)=>{
    return AxiosInstances.post('auth/signin/initiate',data)
}

const signinVerify=(data)=>{
    return AxiosInstances.post('auth/signin/verify',data)
}


const signupInitiate=(data)=>{
    return AxiosInstances.post('auth/signup/initiate',data)
}

const signupVerify=(data)=>{
    return AxiosInstances.post('auth/signup/verify',data)
}

export {signupInitiate, signupVerify,signinInitiate,signinVerify}