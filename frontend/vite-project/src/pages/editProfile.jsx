import React from 'react';
import Nav from '../components/Nav';
import { useForm } from 'react-hook-form';
import userAPI from '../apiManager/user';
import { useState } from 'react';

const EditProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading]=useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    
  
    // Prepare the data object (formData)
    const formData = new FormData();
  
    // Basic info
    formData.append('name', data.name);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('gender', data.gender);
    formData.append('dob', data.dob);
    formData.append('bloodGroup', data.bloodGroup);
    formData.append('language', data.language);
    formData.append('extraPhoneNumber', data.extraPhoneNumber);
  
    // Address (nested object)
    const address = {
      houseNo: data.address?.houseNo || '',
      colony: data.address?.colony || '',
      city: data.address?.city || '',
      state: data.address?.state || '',
      pincode: data.address?.pincode || ''
    };
  
    // Send address as a JSON string
    formData.append('address', JSON.stringify(address));
  
    // **Manually handle the file input (Profile Image)**
    if (data.profileImage && data.profileImage[0]) {
      formData.append('profileImage', data.profileImage[0]);  // Append the selected file to FormData
    }
  
    // Log formData to check values for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log(typeof formData.address);
  
    // Send the formData to the backend API
    const response = await userAPI.updateUser(formData);
    setLoading(false);
  };
  
  


  return (
    <div>
      <Nav />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-gray-100'>
          <div className='mx-5'>
            <div className='flex justify-between items-center'>
              <div className='font-bold'>Accounts</div>
              <button className='bg-[#14ADDB] px-3 py-1 rounded font-bold text-white' type='submit'>{loading?"loading..":"Save Changes"}</button>
            </div>
            <hr />

            {/* Profile Photo */}
            <div>
              <label>Profile Photo</label>
              <div className='flex gap-5'>
                <div className='w-[100px] h-[100px] bg-red-600 rounded-full flex justify-center items-center font-bold text-4xl'>
                  <span>A</span>
                </div>
                <div>
                  <div>Pick a photo from your computer</div>
                  <input type="file" accept="image/*" name="profileImage" 
                    {...register('profileImage')} />
                </div>
              </div>
            </div>

            <div>
              <div>Name</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1' {...register('name')} />
            </div>

            <hr />

            {/* Contact */}
            <div>
              <div>Phone number</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1'
                {...register('phoneNumber', {
                  pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
                })} />
              {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

           

              <div>Gender</div>
              <select className='border border-black w-[250px] px-2 py-1' {...register('gender')}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>

              <div>Date of birth</div>
              <input type="date" className='border-black border w-[250px] px-2 py-1' {...register('dob')} />

              <div>Blood Group</div>
              <select className='border border-black w-[250px] px-2 py-1' {...register('bloodGroup')}>
                <option value="">Select</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O-">O-</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <hr />

            {/* Address */}
            <div>
              <h6>Address</h6>

              <div>House No./Street</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1' {...register('address.houseNo')} />

              <div>Colony / Locality</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1' {...register('address.colony')} />

              <div>City</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1' {...register('address.city')} />

              <div>State</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1' {...register('address.state')} />

              <div>Pincode</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1'
                {...register('address.pincode', {
                  pattern: { value: /^[0-9]{6}$/, message: 'Pincode must be a 6-digit number' }
                })} />
              {errors.address?.pincode && <p>{errors.address.pincode.message}</p>}
            </div>

            <hr />

            {/* Other */}
            <div>
              <h6>Other Information</h6>

              <div>Extra Phone Number</div>
              <input type="text" className='border-black border w-[250px] px-2 py-1'
                {...register('extraPhoneNumber', {
                  pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
                })} />
              {errors.extraPhoneNumber && <p>{errors.extraPhoneNumber.message}</p>}

              <div>Language</div>
              <select className='border border-black w-[250px] px-2 py-1' {...register('language')}>
                <option value="">Select</option>
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
