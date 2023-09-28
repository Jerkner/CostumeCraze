import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem("loggedin")
    const location = useLocation()

    if (!isLoggedIn) {
        return (
            <Navigate
                to="/login"
                state={{ message: "You need to log in first.", from: location }}
                replace
            />
        )
    }

    return <Outlet />
}
