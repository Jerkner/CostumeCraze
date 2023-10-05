import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Select from "react-select"
import { getCostumes } from "../../api"
import {
    categoryOptions,
    genderOptions,
    sortOptions,
} from "../../components/options"

export default function Costumes() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortOrder, setSortOrder] = useState("asc")
    const [costumes, setCostumes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const categoryFilter = searchParams.get("category")
    const genderFilter = searchParams.get("gender")
    const sortDirection = searchParams.get("sortOrder")

    const [selectedSortOption, setSelectedSortOption] = useState(
        sortOptions.find((option) => option.value === sortDirection) ||
            sortOptions[0]
    )

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

    function handleSort(option) {
        setSearchParams((prevParams) => {
            prevParams.set("sortOrder", option.value)
            return prevParams
        })
        setSelectedSortOption(option)
        setSortOrder(option.value)
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
                    gender: genderFilter,
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
                        <Select
                            inputMode="none"
                            placeholder="All categories"
                            options={categoryOptions}
                            isSearchable={false}
                            value={categoryOptions.find(
                                (option) => option.value === categoryFilter
                            )}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#4e6b8f",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: "#fff",
                                    whiteSpace: "nowrap",
                                    width: "180px",
                                }),
                                control: (baseStyles, { selectProps }) => {
                                    const selectedOption = categoryOptions.find(
                                        (option) =>
                                            option.value ===
                                            (selectProps.value
                                                ? selectProps.value.value
                                                : null)
                                    )

                                    return {
                                        ...baseStyles,
                                        backgroundColor: selectedOption
                                            ? selectedOption.hoverStyle
                                                  .backgroundColor
                                            : "#4e6b8f",
                                        border: "none",
                                        width: "180px",
                                        whiteSpace: "nowrap",
                                        cursor: "pointer",
                                    }
                                },
                                option: (provided) => ({
                                    ...provided,
                                    borderTop: "1px solid #34495e",
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: "#fff",
                                    border: "none",
                                }),
                            }}
                            components={{
                                Option: (props) => {
                                    const { label, value, innerProps } = props
                                    const option = categoryOptions.find(
                                        (option) => option.value === value
                                    )

                                    return (
                                        <div
                                            {...innerProps}
                                            style={
                                                props.isFocused
                                                    ? option.hoverStyle
                                                    : option.style
                                            }
                                        >
                                            {label}
                                        </div>
                                    )
                                },
                            }}
                            onChange={(selectedOption) => {
                                if (
                                    selectedOption &&
                                    selectedOption.value === "all"
                                ) {
                                    handleFilterChange("category", null)
                                } else {
                                    handleFilterChange(
                                        "category",
                                        selectedOption
                                            ? selectedOption.value
                                            : null
                                    )
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="filter">
                    <h3>Genders:</h3>
                    <div className="buttons-container">
                        <Select
                            placeholder="All genders"
                            options={genderOptions}
                            isSearchable={false}
                            value={genderOptions.find(
                                (option) => option.value === genderFilter
                            )}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#4e6b8f",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: "#fff",
                                    whiteSpace: "nowrap",
                                }),
                                control: (baseStyles, { selectProps }) => {
                                    const selectedOption = genderOptions.find(
                                        (option) =>
                                            option.value ===
                                            (selectProps.value
                                                ? selectProps.value.value
                                                : null)
                                    )

                                    const hoverStyle =
                                        selectedOption &&
                                        selectedOption.hoverStyle

                                    return {
                                        ...baseStyles,
                                        ...hoverStyle,
                                        backgroundColor: hoverStyle
                                            ? hoverStyle.backgroundColor
                                            : selectedOption
                                            ? selectedOption.style
                                                  .backgroundColor
                                            : "#4e6b8f",
                                        border: "none",
                                        width: "180px",
                                        whiteSpace: "nowrap",
                                        cursor: "pointer",
                                        padding: "0",
                                    }
                                },

                                option: (provided) => ({
                                    ...provided,
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: "#fff",
                                    border: "none",
                                }),
                            }}
                            components={{
                                Option: (props) => {
                                    const { label, value, innerProps } = props
                                    const option = genderOptions.find(
                                        (option) => option.value === value
                                    )

                                    return (
                                        <div
                                            {...innerProps}
                                            style={
                                                props.isFocused
                                                    ? option.hoverStyle
                                                    : option.style
                                            }
                                        >
                                            {label}
                                        </div>
                                    )
                                },
                            }}
                            onChange={(selectedOption) => {
                                if (
                                    selectedOption &&
                                    selectedOption.value === "all"
                                ) {
                                    handleFilterChange("gender", null)
                                } else {
                                    handleFilterChange(
                                        "gender",
                                        selectedOption
                                            ? selectedOption.value
                                            : null
                                    )
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="filter">
                    <h3>Sort by:</h3>
                    <div className="buttons-container">
                        <Select
                            placeholder="Sort price:"
                            options={sortOptions}
                            isSearchable={false}
                            value={sortOptions.find(
                                (option) => option.value === genderFilter
                            )}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#4e6b8f",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: "#fff",
                                    whiteSpace: "nowrap",
                                }),
                                control: (baseStyles, { selectProps }) => {
                                    const selectedOption = sortOptions.find(
                                        (option) =>
                                            option.value ===
                                            (selectProps.value
                                                ? selectProps.value.value
                                                : null)
                                    )

                                    const hoverStyle =
                                        selectedOption &&
                                        selectedOption.hoverStyle

                                    return {
                                        ...baseStyles,
                                        ...hoverStyle,
                                        backgroundColor: hoverStyle
                                            ? hoverStyle.backgroundColor
                                            : selectedOption
                                            ? selectedOption.style
                                                  .backgroundColor
                                            : "#4e6b8f",
                                        border: "none",
                                        width: "180px",
                                        whiteSpace: "nowrap",
                                        cursor: "pointer",
                                        padding: "0",
                                    }
                                },

                                option: (provided) => ({
                                    ...provided,
                                    borderTop: "1px solid #34495e",
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: "#fff",
                                    border: "none",
                                }),
                            }}
                            components={{
                                Option: (props) => {
                                    const { label, value, innerProps } = props
                                    const option = sortOptions.find(
                                        (option) => option.value === value
                                    )

                                    return (
                                        <div
                                            {...innerProps}
                                            style={
                                                props.isFocused
                                                    ? option.hoverStyle
                                                    : option.style
                                            }
                                        >
                                            {label}
                                        </div>
                                    )
                                },
                            }}
                            onChange={handleSort}
                        />
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
