import React from 'react'

function ContactUs() {
  return (
    <div className='bg-white rounded w-6/12 m-auto  text-center '>
      <h1 className='text-xl font-bold '>ContactUs</h1>
       <hr/>
       <div  className='p-4'>

        <label>Name:</label>
        <input type="text" placeholder='Name' className='m-2 p-2 border border-black ' />
       </div>
       <div>
        <label>Message:</label>
        <input type="text" placeholder='Message' className='m-2 p-2 border border-black ' />
       </div>
       <div>
        <button className='m-2 p-2 border border-black rounded bg-gray'>Submit </button>
       </div>
      </div>
  )
}

export default ContactUs