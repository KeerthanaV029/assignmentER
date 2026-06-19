
const initialState = {episodes:[],totalPages:0}
export const episodeReducer = (state = initialState,action) => 
{
    if(action.type === "GET_ALL") 
        {
        return {...state,
            episodes: action.payload.results,
            totalPages: action.payload.info.pages
        }
    }
    return state
}