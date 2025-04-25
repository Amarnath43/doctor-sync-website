import React from 'react';
import Home from '../pages';
import Signin from '../pages/signin'
import SignUp from '../pages/signup'
import EmailVerify from '../pages/emailVerifyPage';
import EditProfile from '../pages/editProfile';

const routes=[
    {
        path:'/', element: <Home/>, isProtected: false
        
    },
    {
        path:'/Signin', element: <Signin/>, isProtected: false
        
    },
    {
        path:'/Signup/:role', element: <SignUp/>, isProtected: false
        
    },
    {
        path:'/Signup/:role/verify', element: <EmailVerify/>, isProtected: false
        
    },
    {
        path:'/Signin/verify', element: <EmailVerify/>, isProtected: false
        
    },
    {
        path:'/edit_profile', element: <EditProfile/>, isProtected: true
        
    },

]
export default routes;
