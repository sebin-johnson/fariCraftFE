import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectsApi } from '../services/allApi'
import { useContext } from 'react'
import { isAuthTokenContext } from '../Context/ContextShare'

const Home = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  const getHomeProjects = async () => {
    const result = await getHomeProjectsApi()
    console.log(result)
    setHomeProject(result.data)
  }
  useEffect(() => {
    getHomeProjects()
  }, [])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
      setIsAuthToken(true)
    }
  }, [])
  return (
    <>
      {/* Hero Section */}
      <section className="t py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            {/* Left Side - Content */}
            <div className="col-lg-6 order-lg-1 order-2 text-lg-start text-center">
              <h1 className="display-4 fw-bold text-white mb-4">Where Innovation Takes the Spotlight</h1>
              <p className="lead text-white-50 mb-4">"Every project tells a story. Showcase yours and explore the creativity of others!"</p>
              <div className="d-flex flex-lg-row flex-column gap-3 justify-content-lg-start justify-content-center">
                {
                  isAuthToken &&
                  <a href="#explore" className="btn btn-outline-light btn-lg px-4">Explore Projects</a>
                }
                {
                  !isAuthToken ?
                    <Link to="/login" className="btn btn-primary btn-lg px-4">Get Started</Link> :
                    <Link to="/dashboard" className="btn btn-primary btn-lg px-4">Manage Projects</Link>
                }
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="col-lg-6 order-lg-2 order-1">
              <div className="overflow-hidden rounded-4 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
                  alt="Developer showcasing work"
                  className="img-fluid w-100"
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        isAuthToken &&
        <div className='container-fluid' id='explore'>
          <h3 className='text-center my-5 text-white'>EXPLORE YOUR PROJECTS</h3>
          <div className="row mb-5">
            <marquee scrollamount="15">
              <div className="row m-0 justify-content-center">
                <div className="col-12 p-0 p-md-4">
                  <div className="row g-4 justify-content-center">
                    {homeProject?.length > 0 &&
                      homeProject?.map((item) => (
                        <div key={item.id} className="col-12 col-sm-6 col-lg-4">
                          <ProjectCard item={item} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </marquee>
            <Link to={'/project'} className='text-decoration-none'>
              <h5 className='text-center my-4 text-secondary'>See more Projects</h5>
            </Link>
          </div>
        </div>
      }
    </>
  )
}

export default Home
