import React, { useContext, useEffect, useState } from 'react';
import AddProject from './AddProject';
import { Link } from 'react-router-dom';
import EditProject from './EditProject';
import { deleteProjectApi, getUserProjectsApi } from '../services/allApi';
import { addProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare';
import { toast } from 'react-toastify';

const MyProjects = () => {
    const [userProjects, setUserProjects] = useState([])
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
    const getUserProjects = async () => {
        const token = sessionStorage.getItem("token")
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserProjectsApi(header)
        console.log(result.data)
        setUserProjects(result.data)
    }
    useEffect(() => {
        getUserProjects()
    }, [addProjectResponse, editProjectResponse])
    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const res = await deleteProjectApi(id, reqHeader)
        if (res.status === 201) {
            toast.success(`${res.data.title} deleted successfully`)
            getUserProjects()
        } else {
            toast.error("Something happened!")
        }
    }
    return (
        <>
            <div className="rounded p-4 mb-4 text-white">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 me-auto" style={{ color: "#9F70FD" }}>MY PROJECTS</h5>
                    <AddProject />
                </div>
                {
                    userProjects?.length > 0 ?
                        userProjects.map((item) => (
                            <div className='p-3 mt-3 rounded d-flex bg-primary'>
                                <h6 className='bg-transparent text-white'>{item.title}</h6>
                                <div className='d-flex ms-auto align-items-center bg-primary'>
                                    <Link to={item.github} target='_blank' className='bg-primary'>
                                        <i className="fa-brands fa-github bg-primary fs-5"></i>
                                    </Link>
                                    <Link to={item.website} target='_blank' className='bg-primary'>
                                        <i className="fa-solid fa-link ms-3 bg-primary fs-5"></i>
                                    </Link>
                                    <Link className='bg-primary'>
                                        <i className="fa-solid fa-trash ms-3 bg-primary fs-6" onClick={() => handleDelete(item._id)}></i>
                                    </Link>
                                    <EditProject project={item} />
                                </div>
                            </div>
                        )) :
                        <p className="text-muted mb-3">No projects uploaded yet</p>
                }
            </div>
        </>
    );
};

export default MyProjects;
