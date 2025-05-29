import React, { useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseUrl } from '../services/baseUrl';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../Context/ContextShare';

const EditProject = ({ project }) => {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("");
    const handleClose = () => {
        setShow(false)
        resetForm()
    }
    const handleShow = () => setShow(true);
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
    console.log(project)
    const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        githubLink: project.github,
        websiteLink: project.website,
        overview: project.overview,
        projectImage: ""
    })
    const handleUpdate = async () => {
        console.log(projectDetails)
        const { id, title, language, githubLink, websiteLink, overview, projectImage } = projectDetails
        if (!title || !language || !githubLink || !websiteLink || !overview) {
            toast.warning("Please fill the form completely")
        } else {
            // send data to backend
            // here we have to send a file, so instead of sending as object, we are passing data as formdata
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("githubLink", githubLink)
            reqBody.append("websiteLink", websiteLink)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)
            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProjectApi(id, reqBody, reqHeader)
                if (result.status === 201) {
                    setEditProjectResponse(result.data)
                    toast.success(`${title} updated successfully`)
                    handleClose()
                } else {
                    toast.error('Something happened!')
                }
            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProjectApi(id, reqBody, reqHeader)
                if (result.status === 201) {
                    setEditProjectResponse(result.data)
                    toast.success(`${title} updated successfully`)
                } else {
                    toast.error('Something happened!')
                }
            }
            setShow(false)
        }
    }
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    const resetForm = () => {
        setProjectDetails({
            id: project._id,
            title: project.title,
            language: project.language,
            githubLink: project.github,
            websiteLink: project.website,
            overview: project.overview,
            projectImage: ""
        })
        setPreview("")
    }
    return (
        <>
            <i className="fa-solid fa-pen-to-square bg-primary fs-5 ms-3" style={{ cursor: "pointer" }} onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose} className='bg-transparent' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row m-0">
                        <div className="col-md-6">
                            <label htmlFor="projectImg">
                                <input type="file" id='projectImg' className='d-none'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview : `${baseUrl}/uploads/${project?.projectImage}`} className='w-75 mt-3 mb-3' alt="" />
                            </label>
                        </div>
                        <div className="col-md-6">
                            <div className='mt-2'>
                                <input type="text" placeholder='Project title' className='form-control rounded' value={projectDetails?.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                                <input type="text" placeholder='Technologies used' className='form-control rounded mt-3' value={projectDetails?.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                                <input type="text" placeholder='Github link' className='form-control rounded mt-3' value={projectDetails?.githubLink} onChange={(e) => setProjectDetails({ ...projectDetails, githubLink: e.target.value })} />
                                <input type="text" placeholder='Website link' className='form-control rounded mt-3' value={projectDetails?.websiteLink} onChange={(e) => setProjectDetails({ ...projectDetails, websiteLink: e.target.value })} />
                            </div>
                            <div className="mt-3">
                                <textarea className='form-control rounded' rows={3} placeholder='Overview' value={projectDetails?.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-black'>
                    <Button variant="secondary" onClick={handleClose}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update Project
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProject
