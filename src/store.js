import { configureStore } from "@reduxjs/toolkit";
import { episodeReducer } from "./store/reducer/episodeReducer";

export const store = configureStore
({
    reducer: {
        episodes: episodeReducer
    }
})