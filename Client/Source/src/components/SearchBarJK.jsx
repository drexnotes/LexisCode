import React from "react";
import fetchByCaseExample from "../utility/api/fetchByCaseExample";
import fetchAllExample from "../utility/api/fetchAllExample";

const SearchBar = () => {
    const onSearch = () => {
        fetchByCaseExample();
    };

    const getAll = () => {
        fetchAllExample();
    };

    return (
        <React.Fragment>
            <div>
                <input 
                    type = "text"
                    placeholder = "Case Number"
                />
            </div>
            <div>
                <button onClick={onSearch}>Search JK "GET"</button>
            </div>
            <div>
                <button onClick={getAll}>Get All Examples</button>
            </div>
        </React.Fragment>
    )
}

export default SearchBar

