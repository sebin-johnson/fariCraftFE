import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsApi } from '../services/allApi'
import { Link } from 'react-router-dom'

const Project = () => {
  const [allProjects, setAllProjects] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [isToken, setIsToken] = useState()
  const getAllProjects = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      const header = {
        "Content-Type": "application-json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectsApi(searchKey, header)
      console.log(result)
      setAllProjects(result.data)
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsToken(true)
    }
  })
  useEffect(() => {
    getAllProjects()
  }, [searchKey])
  return (
    <>
      {
        isToken ?
          <div>
            <div className="container-fluid">
              <h3 className='text-center mt-3 mb-3' style={{ color: "#9F70FD" }}>EXPLORE PROJECTS</h3>
            </div>
            <div className="row my-4 m-0">
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex justify-content-center">
                <input type="text" className='form-control rounded bg-transparent text-white' placeholder='Search By Technologies'
                  onChange={(e) => setSearchKey(e.target.value)} />
                <i className="fa-solid fa-magnifying-glass bg-transparent" style={{ marginLeft: "-30px", marginTop: "11px", color: "#9F70FD" }}></i>
              </div>
              <div className='row m-0 mt-3'>
                <div className='col-12 p-2 p-md-5'>
                  <div className='row g-4 justify-content-center'>
                    {allProjects?.length > 0 ?
                      allProjects?.map((item) => (
                        <div key={item.id} className='col-12 col-sm-6 col-lg-4'>
                          <ProjectCard item={item} />
                        </div>
                      )) :
                      <p>No projects found</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <div className="container mt-4 mb-4">
            <p className="text-muted mb-3">Nothing to display</p>
            <div className="d-flex justify-content-end">
              <Link to="/login" className="btn btn-primary">Please Login</Link>
            </div>
          </div>
      }

    </>
  )
}

export default Project
