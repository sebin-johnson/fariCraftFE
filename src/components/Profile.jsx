import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

const Profile = () => {
  const [open, setOpen] = useState(false);
  // create state to store profile details
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    github: "",
    linkedIn: "",
    profileImage: ""
  })
  return (
    <>
      <div className="p-4">
        <div className='d-flex mt-3'>
          <h5>MY PROFILE</h5>
          <div className='ms-auto'>
            <button className='btn btn-primary' onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}>
              {open === true ? <i className="fa-solid fa-angle-up bg-transparent"></i> : <i className="fa-solid fa-angle-down bg-transparent"></i>}
            </button>
          </div>
        </div>
        <Collapse in={open} className='mt-3'>
          <div id="example-collapse-text">
            <div className='d-flex justify-content-center align-items-center mb-3'>
              <label htmlFor="profileImg">
                <input type="file" id="profileImg" className='d-none' />
                <img src="https://m.gettywallpapers.com/wp-content/uploads/2023/10/Cartoon-Lionel-Messi-Profile-Pic-1.jpg" alt=""
                  height={200} width={200} style={{ borderRadius: "50%" }} />
              </label>
            </div>
            <div>
              <input type="text" placeholder='Github link' className='form-control rounded' />
              <input type="text" placeholder='LinkedIn link' className='form-control rounded mt-3' />
              <button className='btn btn-primary w-100 mt-3'>Update</button>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default Profile
