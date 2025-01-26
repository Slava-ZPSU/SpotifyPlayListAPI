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

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, or Artist" onChange={handleTermChange}/>
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
};

export default SearchBar;
