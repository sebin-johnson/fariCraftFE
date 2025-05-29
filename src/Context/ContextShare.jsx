import React, { createContext, useState } from 'react'

// create  context
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

const ContextShare = ({ children }) => {
    // children is a predefined props used to share data b/w all components
    // create a state, that state is we are sharing b/w components
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, setEditProjectResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(false)
    return (
        <>
            <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
                    <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                        {children}
                </isAuthTokenContext.Provider>
            </editProjectResponseContext.Provider>
        </addProjectResponseContext.Provider >
        </>
    )
}

export default ContextShare
