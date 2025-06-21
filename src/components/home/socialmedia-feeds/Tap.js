import React from "react";
import PropTypes from "prop-types";



export default function Tab({ activeTab, label, onClick }) {
    Tab.propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    const handleClick = () => {
        onClick(label);
    };
    let className = "tab-list-item";
    return (
        <>
            <li
                className={`${className} 
        ${activeTab === label ? "tab-list-active" : ""}`}
                onClick={handleClick}
            >
                {label}
            </li>
        </>
    );
}
