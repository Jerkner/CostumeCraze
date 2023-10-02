import React, { useEffect, useState } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { getCostume } from "../../api"

export default function CostumeDetail() {
    const [costume, setCostume] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { id } = useParams()
    const location = useLocation()

    useEffect(() => {
        async function loadCostumes() {
            setLoading(true)
            try {
                const data = await getCostume(id)
                setCostume(data)
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

    const search = location.state?.search || ""
    const category = location.state?.category || "all"
    const gender = location.state?.gender || "all"

    let filtered

    if (category !== "all" && gender) {
        filtered = `${gender} ${category}`
    } else if (category !== "all") {
        filtered = category
    } else if (gender !== "all") {
        filtered = gender
    } else {
        filtered = "all"
    }

    return (
        <div className="costume-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >
                &larr; <span>Back to {filtered} costumes</span>
            </Link>

            {costume && (
                <div className="costume-detail">
                    <img
                        src={costume.imageUrl}
                        className="costume-details-img"
                    ></img>
                    <div className="costume-detail-info">
                        <h2>{costume.name}</h2>
                        <p className="costume-price">
                            <span>{costume.price}€</span>
                        </p>
                        <div className="costume-selected">
                            <i
                                className={`filter-button ${costume.category} selected`}
                            >
                                {costume.category}
                            </i>
                            <i
                                className={`filter-button ${costume.gender} selected`}
                            >
                                {costume.gender}
                            </i>
                        </div>
                        <p>{costume.description}</p>
                        <button className="link-button">
                            Rent this costume
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
