import React from "react"
import Nav from "./Nav"
import Footer from "./Footer"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <main className="about-main">
            <Nav />
            <section className="about-section">
                <div className="about-bg"></div>
                <div className="about-content">
                    <h1>
                        Don’t squeeze in a sedan when you could relax in a van.
                    </h1>

                    <h2>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.<br></br>
                    (Hitch costs extra 😉)
                    <br></br>
                    <br></br>
                    Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.
                    </h2>
                    <div className="rectangle">
                        <h3>Your destination is waiting.<br></br>Your van is ready.</h3>
                        <Link to="/vans" className="explore-vans-button">Explore our vans</Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}