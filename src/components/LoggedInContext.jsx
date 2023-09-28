import React, { createContext, useState } from "react"

const LoggedInContext = createContext()

export const LoggedInProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("loggedin") === "true"
    )

    const login = () => {
        localStorage.setItem("loggedin", "true")
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem("loggedin")
        setIsLoggedIn(false)
    }

    return (
        <LoggedInContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </LoggedInContext.Provider>
    )
}

export default LoggedInContext
