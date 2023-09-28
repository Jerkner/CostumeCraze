import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <main className="home">
            <section className="home-section">
                <h1 className="cool-heading">
                    <span className="first-line">
                        Transform Your Event with CostumeCraze:
                    </span>
                    <span className="second-line">
                        Where Imagination Meets Reality!
                    </span>
                </h1>

                <h2>
                    Step into a world of imagination with CostumeCraze. From
                    parties to productions, find the perfect attire for your
                    event. Unleash creativity and make every moment
                    extraordinary.
                </h2>
                <Link
                    to="/costumes"
                    className="find-costumes-btn"
                >
                    Find your costume
                </Link>
            </section>
        </main>
    )
}
