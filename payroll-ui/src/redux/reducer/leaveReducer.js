const initialState = {
    leaves: []
};

export const leaveReducer = (
    state = initialState,
    action
) => {

    if (action.type === "GET_ALL_LEAVES") {

        return {
            ...state,
            leaves: action.payload
        };
    }

    return state;
};