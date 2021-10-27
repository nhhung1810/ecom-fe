import { createSlice } from "@reduxjs/toolkit";

export const filterStore = createSlice({
    name : "filter",
    initialState : {
        colors : [],
        sizes : [],
        brands : [],
    },

    reducers : {
        addColorsFilter : (state, action) => {
            state.colors.push(action.payload)
        },

        removeColorsFilter : (state, action) => {
            var tmp = state.colors.findIndex(e => e === action.payload)
            state.colors.splice(tmp, 1)
        },

        addSizesFilter : (state, action) => {
            state.sizes.push(action.payload)
        },

        removeSizesFilter : (state, action) => {
            var tmp = state.sizes.findIndex(e => e === action.payload)
            state.sizes.splice(tmp, 1)
        },

        addBrandsFilter : (state, action) => {
            state.brands.push(action.payload)
        },

        removeBrandsFilter : (state, action) => {
            var tmp = state.brands.findIndex(e => e === action.payload)
            state.brands.splice(tmp, 1)
        }
    }
})

export const {
    addColorsFilter,
    removeColorsFilter,
    addSizesFilter,
    removeSizesFilter,
    addBrandsFilter,
    removeBrandsFilter,

} = filterStore.actions

export default filterStore.reducer

export const selectColorFilter = state => state.filter.colors
export const selectSizesFilter = state => state.filter.sizes
export const selectBrandsFilter = state => state.filter.brands