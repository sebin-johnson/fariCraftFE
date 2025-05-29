import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { toast } from 'react-toastify'
import { isAuthTokenContext } from '../Context/ContextShare'
import { useContext } from 'react'

const Auth = ({ registerPage }) => {
  const isRegisterPage = registerPage ? true : false
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  // useNavigate
  const navigate = useNavigate()
  // create state to hold  all input values
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('user enterd data')
    console.log(userData)
    const { name, email, password } = userData
    if (!name || !email || !password) {
      toast.warning("Please fill the form completely")
    } else {
      const result = await registerApi(userData)
      if (result.status === 201) {
        toast.success(`${userData.name} registerd successfully!`)
        setUserData({
          name: "",
          email: "",
          password: ""
        })
        // navigate to login page
        navigate('/login')
      } else if (result.status === 409) {
        toast.warning(`Email address Already exist, Please Login!`)
      } else {
        toast.error('Something happened!')
      }
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData
    // console.log(email, password)
    if (!email || !password) {
      toast.warning("Please fill the form completely")
    } else {
      const result = await loginApi(userData)
      console.log('Response from data')
      console.log(result)
      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user_data))
        sessionStorage.setItem("token", result.data.jwtToken)
        setIsAuthToken(true)
        toast.success("Login successfull")
        setUserData({
          email: "",
          password: ""
        })
        navigate("/")
      } else if (result.status === 404) {
        toast.error("Email or password not found!")
        setUserData({
          email: "",
          password: ""
        })
      } else {
        toast.error("Something wrong happened")
      }
    }
  }
  useEffect(() => {
    setUserData({
      name: "",
      email: "",
      password: ""
    })
  }, [registerPage])
  return (
    <>
      <div className="container-fluid mt-3 mb-3">
        <Link to={'/'} className='text-decoration-none text-white'>
          <h6 className='text-end me-4'><i className="fa-solid fa-arrow-left me-1"></i> Back to Home</h6>
        </Link>
      </div>
      <div className="container d-flex justify-content-center align-items-center mt-4 mb-4">
        <div className="row shadow rounded overflow-hidden" style={{ width: "80%", maxWidth: "1200px" }}>
          <div className="col-md-6 p-0">
            <img src="https://img.freepik.com/free-photo/fingerprint-biometric-authentication_23-2151967424.jpg" alt="Signup Visual" className="img-fluid h-100 w-100" style={{ objectFit: "cover" }} />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-4">
            <h4 className="text-center mb-2" style={{ color: "#9F70FD" }}>
              <i className="fa-brands fa-stack-overflow me-2"></i>FairCraft
            </h4>
            {
              isRegisterPage ?
                <h6 className="text-center mb-3">SignUp to your Account</h6> :
                <h6 className="text-center mb-3">Sign In to your Account</h6>
            }
            <form className="w-75">
              {
                isRegisterPage &&
                <input type="text" placeholder="Enter your name" className="form-control rounded mb-3"
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} />
              }
              <input type="email" placeholder="Enter email address" className="form-control rounded mb-3"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
              <input type="password" placeholder="Enter password" className="form-control rounded mb-3"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
              <div className="d-flex justify-content-center">
                {
                  isRegisterPage ?
                    <button className="btn btn-primary mt-2" onClick={handleRegister}>Register</button> :
                    <button className="btn btn-primary mt-2" onClick={handleLogin}>Login</button>
                }
              </div>
            </form>
            {
              isRegisterPage ?
                <Link to={'/login'} className='text-decoration-none'>
                  <p className="mt-3" style={{ fontSize: "13px" }}>
                    ALREADY A USER? <span style={{ color: "#9F70FD", cursor: "pointer" }}>LOGIN</span>
                  </p>
                </Link> :
                <Link to={'/register'} className='text-decoration-none'>
                  <p className="mt-3" style={{ fontSize: "13px" }}>
                    DON'T HAVE AN ACCOUNT? <span style={{ color: "#9F70FD", cursor: "pointer" }}>REGISTER</span>
                  </p>
                </Link>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
