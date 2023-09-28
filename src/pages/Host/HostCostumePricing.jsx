import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCostumePricing() {
    const { currentCostume } = useOutletContext()

    return (
        <section className="host-pricing">
            <h1>{parseFloat(currentCostume.price).toFixed(2)}€</h1>
        </section>
    )
}
