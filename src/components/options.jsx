import React from "react"
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import { BsGenderMale, BsGenderFemale } from "react-icons/bs"
import { IoMaleFemaleOutline } from "react-icons/io5"

const categoryOptions = [
    {
        value: "all",
        label: "All categories",
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #4e6b8f",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#4e6b8f",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #4e6b8f",
        },
    },
    {
        value: "superhero",
        label: "Superhero",
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#ff4500",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
    {
        value: "historical",
        label: "Historical",
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#6b4226",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
    {
        value: "fantasy",
        label: "Fantasy",
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#663399",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
    {
        value: "creature",
        label: "Creature",
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#008080",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
    {
        value: "celebrity",
        label: "Celebrity",
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#c2a70d",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
]

const genderOptions = [
    {
        value: "all",
        label: "All genders",
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #4e6b8f",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#4e6b8f",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #4e6b8f",
        },
    },
    {
        value: "male",
        label: (
            <>
                <BsGenderMale /> Male
            </>
        ),
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#4169e1",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },

    {
        value: "female",
        label: (
            <>
                <BsGenderFemale /> Female
            </>
        ),
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#ff69b4",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
    {
        value: "unisex",
        label: (
            <>
                <IoMaleFemaleOutline /> Unisex
            </>
        ),
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundImage:
                "linear-gradient(135deg, #4169e1 25%, #ff69b4 25%, #ff69b4 50%, #4169e1 50%, #4169e1 75%, #ff69b4 75%, #ff69b4)",
            backgroundSize: "8px 8px",
            backgroundColor: "transparent",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
]

const sortOptions = [
    {
        value: "asc",
        label: (
            <>
                <AiOutlineArrowUp /> Ascending
            </>
        ),
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderBottom: "1px solid #34495e",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#4e6b8f",
            color: "#fff",
            cursor: "pointer",
            borderTop: "1px solid #34495e",
        },
    },
    {
        value: "desc",
        label: (
            <>
                <AiOutlineArrowDown /> Descending
            </>
        ),
        style: {
            backgroundColor: "#4e6b8f",
            padding: "8px 16px",
            borderTop: "1px solid #34495e",
        },
        hoverStyle: {
            padding: "8px 16px",
            backgroundColor: "#4e6b8f",
            color: "#fff",
            cursor: "pointer",
        },
    },
]

export { categoryOptions, genderOptions, sortOptions }
