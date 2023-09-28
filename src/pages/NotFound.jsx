import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <section className="not-found-container">
            <h1 style={{ textAlign: "center" }}>
                Sorry, the page you were looking for was not found.
            </h1>
            <Link
                to="/"
                className="not-found-btn"
            >
                Return to home
            </Link>
        </section>
    )
}
