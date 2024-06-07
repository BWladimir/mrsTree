import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import mdsTreeReducer from "./reducers/mdsTree/mds.reducer"

const rootReducers = combineReducers({
    "mdsTree": mdsTreeReducer
})

export const setUpStore = () => {
    return configureStore({
        reducer: rootReducers,
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']