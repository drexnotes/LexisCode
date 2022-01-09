const initialState = {
    data: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH":
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};