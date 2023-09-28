import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostCostumes } from "../../api"

export default function Dashboard() {
    const [costumes, setCostumes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        setLoading(true)
        getHostCostumes()
            .then((data) => setCostumes(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, [])

    function renderCostumeElements(costumes) {
        const hostCostumesEls = costumes.map((costume) => (
            <div
                className="host-costume-single"
                key={costume.id}
            >
                <img
                    src={costume.imageUrl}
                    alt={`Photo of ${costume.name}`}
                />
                <div className="host-costume-info">
                    <h3>{costume.name}</h3>
                    <p>{costume.price}€</p>
                </div>
                <Link to={`costumes/${costume.id}`}>View</Link>
            </div>
        ))

        return (
            <div className="host-costumes-list">
                <section className="host-costumes">{hostCostumesEls}</section>
            </div>
        )
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    return (
        <section className="host-dashboard-section">
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>
                        Income last <span>30 days</span>
                    </p>
                    <h2>2,260€</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>

                <p>
                    <BsStarFill className="star" />
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-costumes">
                <div className="top">
                    <h2>Your listed costumes</h2>
                    <Link to="costumes">View all</Link>
                </div>
                {loading && !costumes ? (
                    <h1>Loading...</h1>
                ) : (
                    <>{renderCostumeElements(costumes)}</>
                )}
            </section>
        </section>
    )
}
