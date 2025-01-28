import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({onSearch}) => {
    const [term, setTerm] = useState("");

    const search = () => {
        onSearch(term);
    }

    const handleTermChange = (event) => {
        const newTerm = event.target.value;
        setTerm(newTerm);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            search();
        }
    };

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, or Artist" onChange={handleTermChange} onKeyDown={handleKeyPress} />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
};

export default SearchBar;
