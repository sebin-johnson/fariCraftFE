import { baseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"

// register user
export const registerApi = async (userdata) => {
    return await commonApi("POST", `${baseUrl}/user/register`, userdata, "")
}

// login user
export const loginApi = async (data) => {
    return await commonApi("POST", `${baseUrl}/user/login`, data, "")
}

// add project
export const addProjectApi = async (data, reqHeader) => {
    return await commonApi("POST", `${baseUrl}/project/add`, data, reqHeader)
}

// get home projects
export const getHomeProjectsApi = async () => {
    return await commonApi("GET", `${baseUrl}/project/homeprojects`, "", "")
}

// get all projects
export const getAllProjectsApi = async (searchKey, reqHeader) => {
    return await commonApi("GET", `${baseUrl}/project/allprojects?search=${searchKey}`, "", reqHeader)
}

// get user projects
export const getUserProjectsApi = async (reqHeader) => {
    return await commonApi("GET", `${baseUrl}/project/userprojects`, "", reqHeader)
}

// update project
export const updateProjectApi = async (projectId, reqBody, reqHeader) => {
    return await commonApi("PUT", `${baseUrl}/project/edit/${projectId}`, reqBody, reqHeader)
}

// delete a project
export const deleteProjectApi = async (project_id, reqHeader) => {
    return await commonApi("DELETE", `${baseUrl}/project/delete/${project_id}`, {}, reqHeader)
}