// this is where search results are consumed and stored,
// the "searchReducer" is where a writen query is sent as an api request and then returned and stored in the "searchContext" to be accessed by its child elements/components nested within
import React, { createContext, useContext, useReducer } from 'react';
import ACTIONS from './ACTIONS';

const SearchContext = createContext()

export function useSearch() {
    return useContext(SearchContext)
}

// some framework to build the reducer to handle search feature
function searchReducer(query, action) {
    const payload = action.payload
    // switch (action.type)
}

export function SearchProvider({ children }) {

    const [searchState, searchDispatch] = useReducer(searchReducer, [])

    return (
        <QueryContext.Provider value = { {'searchState': searchState, 'searchDispatch': searchDispatch} }>
            { children }
        </QueryContext.Provider>
    )
}