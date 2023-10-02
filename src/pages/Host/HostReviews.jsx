import React from "react"
import { BsStarFill } from "react-icons/bs"

export default function Reviews() {
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "January 3, 2023",
            text: "Hey there, I just had to share how awesome the Viking costume is! The level of detail is seriously impressive. From the rugged leather armor to the authentic weaponry and faux fur accents – they've nailed it. Plus, it's surprisingly comfortable and easy to move in. You'll definitely turn heads wearing this!",
            id: "1"
        },
        {
            rating: 5,
            name: "Sandy",
            date: "December 12, 2022",
            text: "Hey, I wanted to tell you about the Elven Archer costume – it's truly something else. The craftsmanship and design are just beautiful. They've captured the essence of fantasy perfectly. And it fits like a dream, with every little detail taken care of. I felt like a real elven warrior, ready for an epic adventure. If you're into fantasy, this one's a winner for sure!",
            id: "2"
        }
    ]

    return (
        <section className="host-reviews">
            <div className="top-text">
                <h2>Your reviews</h2>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            <div className="reviews-content">
                <div className="rating-graph">
                    <div className="ratings">
                        <h3>5.0</h3>
                        <BsStarFill />
                        <p>overall rating</p>
                    </div>
                    <div className="rating-level">
                        <p>5 stars</p>
                        <div className="empty-bar filled-bar"></div>
                        <p className="percentage">100%</p>
                    </div>
                    <div className="rating-level">
                        <p>4 stars</p>
                        <div className="empty-bar"></div>
                        <p className="percentage">0%</p>
                    </div>
                    <div className="rating-level">
                        <p>3 stars</p>
                        <div className="empty-bar"></div>
                        <p className="percentage">0%</p>
                    </div>
                    <div className="rating-level">
                        <p>2 stars</p>
                        <div className="empty-bar"></div>
                        <p className="percentage">0%</p>
                    </div>
                    <div className="rating-level">
                        <p>1 star</p>
                        <div className="empty-bar"></div>
                        <p className="percentage">0%</p>
                    </div>
                </div>
                <div className="reviews-list">
                    <h3 className="reviews">Reviews (2)</h3>
                    {reviewsData.map((review) => (
                        <div key={review.id}>
                            <div className="review">
                                {[...Array(review.rating)].map((_, i) => (
                                    <BsStarFill
                                        className="review-star"
                                        key={i}
                                    />
                                ))}
                                <div className="info">
                                    <p className="name">{review.name}</p>
                                    <p className="date">|</p>
                                    <p className="date">{review.date}</p>
                                </div>
                                <p className="text">{review.text}</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
