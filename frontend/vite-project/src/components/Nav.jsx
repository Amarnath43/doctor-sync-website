import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useUserStore from '../store/user';
import { Button, Dropdown, Menu } from 'antd';
import { removeToken } from '../helper';

const Nav = () => {
  const navigate = useNavigate();
  const signInBtnClick = () => navigate("/signin")
  const [isMenuButtonOpen, setIsMenuButtonOpen] = useState(false);
  const onSignUpBtnClick = () => navigate(`/signup/patient`)
  const signUpDoctorBtnClick = () => navigate(`/signup/doctor`)

  const { user, setUser } = useUserStore();
  console.log("Navbar User State:", user);
  const onLogoutBtnClick=()=>{
    removeToken();
    setUser(null);

}

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink to="edit_profile">View/update Profile</NavLink>
      </Menu.Item>
      <Menu.Item key="2" >
      <NavLink>My appointments</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
      <NavLink>Payment History</NavLink>
      </Menu.Item>
      <Menu.Item key="4" onClick={onLogoutBtnClick}>
      <NavLink>Logout</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='bg-white'>
      <div className='relative px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='flex justify-between'>
          <div>
            <NavLink className="flex items-center">
              <span className='text-green-700 text-2xl font-bold'>DoctorSync</span>
            </NavLink>
          </div>


          {

            (!user) ? (<div className='space-x-8 items-center hidden lg:flex '>
              <button className='text-lg font-semibold bg-green-700 text-white px-5 py-2 rounded-md'
                onClick={() => signUpDoctorBtnClick()}

              >Register as Doctor</button>
              <button className='text-lg font-semibold  text-green-600 px-5 py-2 rounded-md'
                onClick={signInBtnClick}
              >Sign in</button>
              <button className='text-lg font-semibold bg-green-700 text-white px-5 py-2 rounded-md' onClick={onSignUpBtnClick}>Sign up</button>
            </div>) : (<Dropdown dropdownRender={() => menu} trigger={["hover"]}>
              <button className='bg-green-600 rounded-4xl px-4 py-2'><span className='font-bold'>{user.name.charAt(0).toUpperCase()}</span></button>
            </Dropdown>)


          }
          {

        (!user)&& (<div className='lg:hidden flex items-center'>

            <button onClick={() => setIsMenuButtonOpen(!isMenuButtonOpen)}><span className='text-2xl'>&#9776;</span></button>
          </div>)
}

          {/*when isMobileOpen is true(user not logged in) */}
          {
            isMenuButtonOpen && (
              <div className='absolute top-16 left-0 bg-white shadow-lg p-4 space-y-4 z-10 lg:hidden w-full'>
                <button className=' h-12 px-6 text-white border-green-500 bg-green-600 font-bold rounded w-full' onClick={() => signUpDoctorBtnClick()}>Register as Doctor</button>
                <button className=' h-12 px-6 text-green-500 border-green-500 font-bold rounded w-full' onClick={signInBtnClick}>Sign In</button>
                <button className=' h-12 px-6 text-white border-green-500 bg-green-600 font-bold rounded w-full' onClick={onSignUpBtnClick}>Sign Up</button>
              </div>
            )
          }





        </div>
      </div>
    </div>
  )
}

export default Nav
