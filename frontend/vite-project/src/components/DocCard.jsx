import React from 'react'

const DocCard = ({image}) => {
  return (

    <div className='w-[250px] h-[250px] flex-shrink-0 object-cover'>
      <img src={image.specialization} alt="" className='rounded-3xl'/>
      
    </div>
  )
}

export default DocCard
