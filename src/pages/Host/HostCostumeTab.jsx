import React, { useEffect, useState, Loading } from "react"
import { Link } from "react-router-dom"
import { getCostumes } from "../../api"

export default function HostCostumeTab() {
    const [costumes, setCostumes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadCostumes() {
            setLoading(true)
            try {
                const data = await getCostumes()
                setCostumes(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadCostumes()
    }, [])
    const hostCostumes = costumes.map((costume) => (
        <section
            className="host-costume-tab"
            key={costume.id}
        >
            <div className="host-costume-single">
                <img
                    src={costume.imageUrl}
                    alt={`Photo of ${costume.name}`}
                />
                <div className="host-costume-info">
                    <h3>{costume.name}</h3>
                    <p className="host-costume-price">{costume.price}€</p>
                </div>
                <Link to={costume.id}>View</Link>
            </div>
        </section>
    ))

    return (
        <section className="host-costumes-section">
            <h2>Your listed costumes:</h2>
            <div className="host-costumes">{hostCostumes}</div>
        </section>
    )
}
