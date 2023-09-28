import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCostumePhotos() {
    const { currentCostume } = useOutletContext()

    return (
        <section className="host-costume-photos">
            <img
                src={currentCostume.imageUrl}
                alt={`Photo of ${currentCostume.name}`}
            ></img>
        </section>
    )
}
