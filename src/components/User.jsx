import React from 'react'

const User =({name})=> {
  return (
    <div className='user-card'>
        <h4>Name: {name}</h4>
        <h5>Address: London</h5>
        <h6>Contact Us : shru@123gmail.com</h6>

    </div>
  )
}

export default User