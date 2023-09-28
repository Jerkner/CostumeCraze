import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getCostumes } from "../../api"

export default function Costumes() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [costumes, setCostumes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const categoryFilter = searchParams.get("category")
    const genderFilter = searchParams.get("gender")

    useEffect(() => {
        async function loadCostumes() {
            setLoading(true)
            try {
                const data = await getCostumes()
                setCostumes(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadCostumes()
    }, [])

    function handleFilterChange(key, value) {
        setSearchParams((prevParams) => {
            if (value === null) {
                prevParams.delete(key)
            } else if (prevParams.get(key) === value) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    const displayedCostumes = costumes.filter((costume) => {
        if (categoryFilter && genderFilter) {
            return (
                costume.category === categoryFilter &&
                (costume.gender === genderFilter || costume.gender === "unisex")
            )
        } else if (categoryFilter) {
            return costume.category === categoryFilter
        } else if (genderFilter) {
            return (
                costume.gender === genderFilter || costume.gender === "unisex"
            )
        }
        return true // If no filters are applied, return all costumes
    })

    const costumeElements = displayedCostumes.map((costume) => (
        <div
            key={costume.id}
            className="costume-tile"
        >
            <Link
                to={costume.id}
                state={{
                    search: `?${searchParams.toString()}`,
                    category: categoryFilter,
                    gender: genderFilter
                }}
            >
                <img src={costume.imageUrl} />

                <div className="costume-info">
                    <h3>{costume.name}</h3>
                    <p>{costume.price}€</p>
                </div>
                <div className="costume-selected">
                    <i
                        className={`costume-category ${costume.category} selected`}
                    >
                        {costume.category}
                    </i>
                    <i className={`costume-gender ${costume.gender} selected`}>
                        {costume.gender}
                    </i>
                </div>
            </Link>
        </div>
    ))

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <div className="costume-list-container">
            <h1>Explore our costume options</h1>
            <div className="costume-list-filter-buttons">
                <div className="category-filter">
                    <h3>Categories:</h3>
                    <div className="buttons-container">
                        <button
                            onClick={() =>
                                handleFilterChange("category", "superhero")
                            }
                            className={`costume-category superhero 
                    ${categoryFilter === "superhero" ? "selected" : ""}`}
                        >
                            Superheroes
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "historical")
                            }
                            className={`costume-category historical 
                    ${categoryFilter === "historical" ? "selected" : ""}`}
                        >
                            Historical
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "fantasy")
                            }
                            className={`costume-category fantasy 
                    ${categoryFilter === "fantasy" ? "selected" : ""}`}
                        >
                            Fantasy
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "creature")
                            }
                            className={`costume-category creature 
                    ${categoryFilter === "creature" ? "selected" : ""}`}
                        >
                            Creatures
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "celebrity")
                            }
                            className={`costume-category celebrity 
                    ${categoryFilter === "celebrity" ? "selected" : ""}`}
                        >
                            Celebrities
                        </button>
                        {categoryFilter ? (
                            <button
                                onClick={() => {
                                    handleFilterChange("category", null)
                                }}
                                className="clear-filters"
                            >
                                All categories
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="gender-filter">
                    <h3>Genders:</h3>
                    <div className="buttons-container">
                        <button
                            onClick={() => handleFilterChange("gender", "male")}
                            className={`costume-gender male
                    ${genderFilter === "male" ? "selected" : ""}`}
                        >
                            Male
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("gender", "female")
                            }
                            className={`costume-gender female
                    ${genderFilter === "female" ? "selected" : ""}`}
                        >
                            Female
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("gender", "unisex")
                            }
                            className={`costume-gender unisex
                    ${genderFilter === "unisex" ? "selected" : ""}`}
                        >
                            Unisex
                        </button>
                        {genderFilter ? (
                            <button
                                onClick={() => {
                                    handleFilterChange("gender", null)
                                }}
                                className="clear-filters"
                            >
                                All genders
                            </button>
                        ) : null}
                    </div>
                </div>
                {categoryFilter || genderFilter ? (
                    <button
                        onClick={() => {
                            handleFilterChange("category", null)
                            handleFilterChange("gender", null)
                        }}
                        className="clear-filters"
                    >
                        Clear filters
                    </button>
                ) : null}
            </div>
            {costumeElements.length > 0 ? (
                <div className="costume-list">{costumeElements}</div>
            ) : (
                <div className="no-costumes">No costumes match this filter</div>
            )}{" "}
        </div>
    )
}
