import React from "react"

const DashedLine = () => {
    return (
        <svg
            className="dashed-line"
            height="1"
            width="100%"
        >
            <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="black"
                strokeWidth="1"
                strokeDasharray="10 10"
            />
        </svg>
    )
}

export default DashedLine
