import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getCostumes } from "../../api"
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import { BsGenderMale, BsGenderFemale } from "react-icons/bs"
import { IoMaleFemaleOutline } from "react-icons/io5"

export default function Costumes() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortOrder, setSortOrder] = useState("asc")
    const [costumes, setCostumes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const categoryFilter = searchParams.get("category")
    const genderFilter = searchParams.get("gender")
    const sortDirection = searchParams.get("sortOrder")

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

        const sortOrderParam = searchParams.get("sortOrder")
        if (sortOrderParam) {
            setSortOrder(sortOrderParam)
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

    function handleSortAsc() {
        setSearchParams((prevParams) => {
            prevParams.set("sortOrder", "asc")
            return prevParams
        })
        setSortOrder("asc")
    }

    function handleSortDesc() {
        setSearchParams((prevParams) => {
            prevParams.set("sortOrder", "desc")
            return prevParams
        })
        setSortOrder("desc")
    }

    const displayedCostumes = [...costumes]
        .filter((costume) => {
            if (categoryFilter && genderFilter) {
                return (
                    costume.category === categoryFilter &&
                    (costume.gender === genderFilter ||
                        costume.gender === "unisex")
                )
            } else if (categoryFilter) {
                return costume.category === categoryFilter
            } else if (genderFilter) {
                return (
                    costume.gender === genderFilter ||
                    costume.gender === "unisex"
                )
            }
            return true
        })
        .sort((a, b) => {
            const priceA = parseFloat(a.price)
            const priceB = parseFloat(b.price)

            if (sortOrder === "asc") {
                return priceA - priceB
            } else {
                return priceB - priceA
            }
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
                <img
                    src={costume.imageUrl}
                    alt={`Photo of ${costume.name}`}
                />

                <div className="costume-info">
                    <h3>{costume.name}</h3>
                    <p>{costume.price}€</p>
                </div>
                <div className="costume-selected">
                    <i className={`filter-button ${costume.category} selected`}>
                        {costume.category}
                    </i>
                    <i className={`filter-button ${costume.gender} selected`}>
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
            <div className="filter-buttons">
                <div className="filter">
                    <h3>Categories:</h3>
                    <div className="buttons-container">
                        <button
                            onClick={() =>
                                handleFilterChange("category", "superhero")
                            }
                            className={`filter-button superhero 
                    ${categoryFilter === "superhero" ? "selected" : ""}`}
                        >
                            Superheroes
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "historical")
                            }
                            className={`filter-button historical 
                    ${categoryFilter === "historical" ? "selected" : ""}`}
                        >
                            Historical
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "fantasy")
                            }
                            className={`filter-button fantasy 
                    ${categoryFilter === "fantasy" ? "selected" : ""}`}
                        >
                            Fantasy
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "creature")
                            }
                            className={`filter-button creature 
                    ${categoryFilter === "creature" ? "selected" : ""}`}
                        >
                            Creatures
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("category", "celebrity")
                            }
                            className={`filter-button celebrity 
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
                <div className="filter">
                    <h3>Genders:</h3>
                    <div className="buttons-container">
                        <button
                            onClick={() => handleFilterChange("gender", "male")}
                            className={`filter-button male
                    ${genderFilter === "male" ? "selected" : ""}`}
                        >
                            Male
                            <BsGenderMale />
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("gender", "female")
                            }
                            className={`filter-button female
                    ${genderFilter === "female" ? "selected" : ""}`}
                        >
                            Female
                            <BsGenderFemale />
                        </button>
                        <button
                            onClick={() =>
                                handleFilterChange("gender", "unisex")
                            }
                            className={`filter-button unisex
                    ${genderFilter === "unisex" ? "selected" : ""}`}
                        >
                            Unisex
                            <IoMaleFemaleOutline />
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

                <div className="filter">
                    <h3>Sort Price:</h3>
                    <div className="buttons-container">
                        <button
                            className={`filter-button sort ${
                                sortDirection === "asc" ? "selected" : ""
                            }`}
                            onClick={() => handleSortAsc()}
                        >
                            <AiOutlineArrowUp /> Ascending <AiOutlineArrowUp />
                        </button>
                        <button
                            className={`filter-button sort ${
                                sortDirection === "desc" ? "selected" : ""
                            }`}
                            onClick={() => handleSortDesc()}
                        >
                            <AiOutlineArrowDown />
                            Descending
                            <AiOutlineArrowDown />
                        </button>
                        {categoryFilter || genderFilter ? (
                            <button
                                onClick={() => {
                                    handleFilterChange("category", null)
                                    handleFilterChange("gender", null)
                                }}
                                className="clear-filters"
                            >
                                Clear all filters
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
            {costumeElements.length > 0 ? (
                <div className="costume-list">{costumeElements}</div>
            ) : (
                <div className="no-costumes">No costumes match this filter</div>
            )}{" "}
        </div>
    )
}
