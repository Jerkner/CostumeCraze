import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCostumeInfo() {
    const { currentCostume } = useOutletContext()

    return (
        <section className="host-costume-details-info">
            <h1>
                <span>Name:</span> {currentCostume.name}
            </h1>
            <h1>
                <span>Description:</span> {currentCostume.description}
            </h1>
        </section>
    )
}
