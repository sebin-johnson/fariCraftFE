import React, { useEffect, useState } from 'react'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

const Dashboard = () => {
  const  [name, setName] = useState("")
  useEffect(() => {
    setName(JSON.parse(sessionStorage.getItem("existingUser"))?.name)
  }, [])
  return (
    <>
      <div className="container-fluid">
        <h4 className='ms-3 my-4'>WELCOME <span style={{ color: "#9F70FD" }}>{name?.toUpperCase()}</span></h4>
        <div className="row m-0">
          <div className="col-md-8">
            <MyProjects />
          </div>
          <div className="col-md-4">
            <Profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
