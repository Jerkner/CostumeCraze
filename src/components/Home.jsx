import React from "react"
import Nav from './Nav'
import Footer from './Footer'
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <main className="home">
            <Nav />
            <section className="home-section">
                <h1>You got the travel plans, we got the travel vans.</h1>
                <h2>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</h2>
                <Link to="/vans" className="find-vans-button">Find your van</Link>
            </section>
            <Footer />
        </main>
    )
}