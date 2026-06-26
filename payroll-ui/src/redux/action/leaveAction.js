import axios from "axios";

// Prepare the header
const config = {
    headers: {
        Authorization:
            "Bearer " +
            localStorage.getItem("token")
    }
};

const getAllApi =
    "http://localhost:8080/api/leave/all";

export const getAllLeaves = () => {

    return async (dispatch) => {

        const response =
            await axios.get(
                getAllApi,
                config
            );

        let action = {
            type: "GET_ALL_LEAVES",
            payload: response.data
        };

        dispatch(action);
    };
};