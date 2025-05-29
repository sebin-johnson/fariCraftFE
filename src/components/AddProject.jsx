import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../Context/ContextShare';

const AddProject = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        githubLink: "",
        websiteLink: "",
        overview: "",
        projectImage: ""
    })
    const handleClear = () => {
        setPreview("")
        setProjectDetails({
            title: "",
            language: "",
            githubLink: "",
            websiteLink: "",
            overview: "",
            projectImage: ""
        })
    }
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    // import states created inside context api 
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, [])
    const addProject = async () => {
        // console.log(projectDetails)
        // handleClose()
        const { title, language, githubLink, websiteLink, overview, projectImage } = projectDetails
        if (!title || !language || !githubLink || !websiteLink || !overview || !projectImage) {
            toast.warning("Please fill the form completely")
        } else {
            // send data to backend
            // here we have to send a file, so instead of sending as object, we are passing data as FormFata
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("githubLink", githubLink)
            reqBody.append("websiteLink", websiteLink)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result = await addProjectApi(reqBody, reqHeader)
            if (result.status === 201) {
                setAddProjectResponse(result.data)
                console.log(result)
                toast.success(result.data)
                handleClose()
                handleClear()
            } else if (result.status === 406) {
                toast.warning(`${title} already exist, Please add a new project!`)
            } else {
                toast.error("Something happened!")
            }
        }
    }
    return (
        <>
            <button className="btn btn-primary mt-2" onClick={handleShow}>Add a Project</button>
            <Modal show={show} onHide={handleClose} className='bg-transparent' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row m-0">
                        <div className="col-md-6">
                            <label htmlFor="projectImg">
                                <input type="file" id='projectImg' className='d-none'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                                />
                                <img src={preview ? preview : 'https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png'} className='w-75 mt-3 mb-3' alt="" />
                            </label>
                        </div>
                        <div className="col-md-6">
                            <div className='mt-2'>
                                <input type="text" placeholder='Project title' className='form-control rounded'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                                    value={projectDetails.title} />
                                <input type="text" placeholder='Technologies used' className='form-control rounded mt-3'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                                    value={projectDetails.language} />
                                <input type="text" placeholder='Github link' className='form-control rounded mt-3'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, githubLink: e.target.value })}
                                    value={projectDetails.githubLink} />
                                <input type="text" placeholder='Website link' className='form-control rounded mt-3'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, websiteLink: e.target.value })}
                                    value={projectDetails.websiteLink} />
                            </div>
                            <div className="mt-3">
                                <textarea name="" id="" className='form-control rounded' rows={3} placeholder='Overview'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                                    value={projectDetails.overview}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-black'>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={addProject}>
                        Add Project
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProject
