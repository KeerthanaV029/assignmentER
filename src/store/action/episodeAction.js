import axios from "axios"

const api = "https://rickandmortyapi.com/api/character"

export const getAll = (currentPage) => 
    {
    return async(dispatch) => 
    {
        const response =await axios.get(api + `?page=${currentPage}` )
        let action = { type: "GET_ALL",payload: response.data}
        dispatch(action)
    }
}