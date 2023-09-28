import React from "react"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <main className="about-main">
            <section className="about-section">
                <div className="about-bg"></div>
                <div className="about-content">
                    <h1>
                        Shine bright, ignite the night,<br></br>in costumes that
                        steal the spotlight.
                    </h1>

                    <h2>
                        Our goal is to add a splash of fun to your event with
                        our awesome costume and prop rentals. We handpick each
                        piece to make sure your vision comes together
                        effortlessly.<br></br>
                        <br></br>
                        We're just a bunch of creative folks who get a kick out
                        of helping you bring your ideas to life. Because we
                        think every occasion should have a sprinkle of magic.
                        Let's make your event unforgettable!
                    </h2>
                    <div className="rectangle">
                        <h3>
                            Step into the spotlight.<br></br>Let's get your
                            costume on!
                        </h3>
                        <Link
                            to="/costumes"
                            className="explore-costumes-btn"
                        >
                            Explore our costumes
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
