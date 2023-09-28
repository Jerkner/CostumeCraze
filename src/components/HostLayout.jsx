import React from "react"
import { Outlet, NavLink } from "react-router-dom"

export default function HostLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textUnderlineOffset: "0.25em",
        textDecoration: "underline 2.5px",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-layout-nav">
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav-link"
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="income"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav-link"
                >
                    Income
                </NavLink>
                <NavLink
                    to="costumes"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav-link"
                >
                    Costumes
                </NavLink>
                <NavLink
                    to="reviews"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav-link"
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}
