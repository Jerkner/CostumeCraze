import React, { useEffect, useState } from "react"
import { useParams, NavLink, Outlet, Link } from "react-router-dom"
import { getCostume } from "../../api"

export default function HostCostumeDetail() {
    const [currentCostume, setCurrentCostume] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        async function loadCostumes() {
            setLoading(true)
            try {
                const data = await getCostume(id)
                setCurrentCostume(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadCostumes()
    }, [id])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section className="host-costumes-details-section">
            <Link
                to="/host/costumes/"
                relative="path"
                className="back-button"
            >
                &larr; <span>Back to all costumes</span>
            </Link>

            <div className="host-costumes-details-container">
                <img
                    className="host-costumes-details-img"
                    src={currentCostume.imageUrl}
                />
                <div className="host-costumes-details-info">
                    <h2 className="host-costumes-details-name">
                        {currentCostume.name}
                    </h2>
                    <p className="host-costumes-details-price">
                        <span className="host-costumes-details-bold">
                            {currentCostume.price}€
                        </span>
                    </p>
                </div>
            </div>
            <div className="host-costumes-details-nav">
                <NavLink
                    className="nav-link"
                    to="."
                    end
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Details
                </NavLink>
                <NavLink
                    className="nav-link"
                    to="pricing"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Pricing
                </NavLink>
                <NavLink
                    className="nav-link"
                    to="photos"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Photos
                </NavLink>

                <Outlet context={{ currentCostume }} />
            </div>
        </section>
    )
}
