import React, { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("loggedin") === "true"
    )

    const activeStyles = {
        fontWeight: "bold",
        textUnderlineOffset: "0.25em",
        textDecoration: "underline 2.5px",
        color: "#161616"
    }

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedin") === "true"
        setIsLoggedIn(loggedIn)
    }, [])

    function logOut() {
        localStorage.removeItem("loggedin")
        setIsLoggedIn(false)
    }

    return (
        <nav className="header">
            <Link
                to="/"
                className="title-link"
            >
                <img
                    className="main-logo"
                    src="/assets/Specl145.png"
                />
                #CostumeCraze
            </Link>
            <div className="nav-links">
                <NavLink
                    to="/host"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav-link"
                >
                    User
                </NavLink>
                <NavLink
                    to="about"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav-link"
                >
                    About
                </NavLink>
                <NavLink
                    to="costumes"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav-link"
                >
                    Costumes
                </NavLink>
                {isLoggedIn ? (
                    <NavLink
                        onClick={() => logOut()}
                        to="login"
                        className="nav-link log-in nowrap"
                    >
                        Log out
                    </NavLink>
                ) : (
                    <NavLink
                        to="login"
                        className="nav-link log-in nowrap"
                        style={({ isActive }) =>
                            isActive ? activeStyles : null
                        }
                    >
                        Log in
                    </NavLink>
                )}
            </div>
        </nav>
    )
}
