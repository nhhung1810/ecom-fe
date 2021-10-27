import { createSlice } from "@reduxjs/toolkit";

export const filterStore = createSlice({
    name : "filter",
    initialState : {
        colors : [],

    },

    reducers : {
        addColorsFilter : (state, action) => {
            state.colors.push(action.payload)
        },

        removeColorsFilter : (state, action) => {
            var tmp = state.colors.findIndex(e => e === action.payload)
            state.colors.splice(tmp, 1)
        }
    }
})

export const {addColorsFilter, removeColorsFilter} = filterStore.actions

export default filterStore.reducer

export const selectColorFilter = state => state.filter.colors