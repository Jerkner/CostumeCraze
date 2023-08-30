import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


export default function() {
    return (
        <nav>
            <Link to="/" className="title-link">#VANLIFE</Link>
            <Link to="/about" className="about-link">About</Link>
            <Link to="/vans" className="vans-link">Vans</Link>
        </nav>
    )
}