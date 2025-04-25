import React from 'react'
import Nav from '../components/Nav'
import DocCard from '../components/DocCard'
import SpecializationImages from '../Data/SpecializationImages'
import '../customCSS/scrollbar.css';
import Footer from '../components/Footer';

const index = () => {
  return (
    <div>
      <Nav/>
      <div className='flex sm:flex-row flex-col '>
        <div className='sm:w-[50%] w-[100%]'><img src="intro.jpg" alt="Info about the page" /></div>
        <div className='sm:w-[50%] w-[100%] flex justify-between items-center  '>
        <div className=' p-10 text-lg'>
        <h3 className='text-green-500 text-4xl font-bold mb-4'>Welcome to DoctorSync!</h3>
Your Trusted Platform to Find Doctors & Book Appointments with Ease

At DoctorSync, we bring healthcare to your fingertips. Whether you're looking for a specialist, a family doctor, or need a consultation at a nearby hospital, DoctorSync is your go-to platform for finding the best healthcare providers in your area.
        </div>
        </div>
      </div>

      {/**Doctor Specalization Section **/}
      <section className=" bg-white px-10">
        <h3 className='text-green-600 font-semibold mb-4 mt-8 text-2xl'>Book an appointment for an in-clinic consultation</h3>
        <p className='mb-4 text-lg'>Find experienced doctors across all specialties</p>
        <div className='md:flex-row flex flex-col items-center space-y-8 md:justify-start md:items-center overflow-x-auto max-w-full space-x-10 hide-scrollbar '>
      {
        SpecializationImages.map((image)=>(
          <DocCard image={image} key={image.id}/>
        ))
      }
      </div>
        
      </section>


      {/**Find Doctor By hospital Section **/}
      <section>
        Will Build later
      </section>

      <section className='flex justify-center py-16 bg-gradient-to-r from-teal-400 to-blue-500'>
  <div className='text-center w-full sm:w-1/3 bg-white shadow-2xl rounded-3xl p-8 transform transition duration-300 hover:scale-105 hover:shadow-3xl'>
    <h1 className='font-bold text-3xl text-gray-800 mb-6'>
      What Users Say About Us!
    </h1>
    <p className='text-gray-600 mb-6 text-lg leading-relaxed'>
      "Using DoctorSync to book medical appointments was an effortless experience. The platform's user-friendly design made it simple to find and book appointments with doctors based on specialty, location, and availability."
    </p>
    <div className='flex justify-center mb-6'>
      <p className='text-yellow-500 text-2xl'>
        ⭐⭐⭐⭐⭐
      </p>
    </div>
    <p className='mb-4 font-semibold text-gray-800 text-lg'>Dinesh Raju, Patient</p>

  
  </div>
</section>




<Footer/>
    </div>
  )
}

export default index
