import React from "react"
import "./app.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Costumes from "./pages/Costumes/Costumes"
import CostumeDetails from "./pages/Costumes/CostumeDetails"
import HostDashboard from "./pages/Host/HostDashboard"
import HostIncome from "./pages/Host/HostIncome"
import HostReviews from "./pages/Host/HostReviews"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import HostCostumeTab from "./pages/Host/HostCostumeTab"
import HostCostumeDetails from "./pages/Host/HostCostumeDetails"
import HostCostumeInfo from "./pages/Host/HostCostumeInfo"
import HostCostumePricing from "./pages/Host/HostCostumePricing"
import HostCostumePhotos from "./pages/Host/HostCostumePhotos"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import AuthRequired from "./components/AuthRequired"
import "./server"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="about"
                        element={<About />}
                    />
                    <Route
                        path="costumes"
                        element={<Costumes />}
                    />
                    <Route
                        path="costumes/:id"
                        element={<CostumeDetails />}
                    />
                    <Route
                        path="login"
                        element={<Login />}
                    />

                    <Route element={<AuthRequired />}>
                        <Route
                            path="host"
                            element={<HostLayout />}
                        >
                            <Route
                                index
                                element={<HostDashboard />}
                            />
                            <Route
                                path="income"
                                element={<HostIncome />}
                            />
                            <Route
                                path="reviews"
                                element={<HostReviews />}
                            />
                            <Route
                                path="costumes"
                                element={<HostCostumeTab />}
                            />
                            <Route
                                path="costumes/:id"
                                element={<HostCostumeDetails />}
                            >
                                <Route
                                    index
                                    element={<HostCostumeInfo />}
                                />
                                <Route
                                    path="pricing"
                                    element={<HostCostumePricing />}
                                />
                                <Route
                                    path="photos"
                                    element={<HostCostumePhotos />}
                                />
                            </Route>
                        </Route>
                    </Route>

                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
