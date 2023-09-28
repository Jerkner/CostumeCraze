import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({
        email: "user@costumecraze.com",
        password: "password123"
    })
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        loginUser(loginFormData)
            .then((data) => {
                setError(null)
                localStorage.setItem("loggedin", true)
                navigate(from || "/host", { replace: true })
                window.location.reload()
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {location.state?.message && (
                <h3 className="login-first">{location.state.message}</h3>
            )}
            <h1>Sign in to your account</h1>
            {error?.message && <p>{error.message}</p>}
            <form
                onSubmit={handleSubmit}
                className="login-form"
            >
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button disabled={status === "submitting"}>
                    {status === "submitting" ? "Logging in..." : "Log in"}
                </button>
            </form>
            <p>
                Don’t have an account? <span>Create one now</span>
            </p>
        </div>
    )
}
