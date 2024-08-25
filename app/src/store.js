import { createSlice, configureStore } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'elevator',
    initialState: {
        coordinates: {
            latitude: 0,
            longitude: 0
        },
        height: 0
    },
    reducers: {
        setLatitude: (state, action) => {
            state.coordinates.latitude = action.payload
        },
        setLongitude: (state, action) => {
            state.coordinates.longitude = action.payload
        },
        setHeight: (state, action) => {
            state.height = action.payload
        }
    }
})

export const {
    setLatitude,
    setLongitude,
    setHeight
} = slice.actions

export const store = configureStore({
    reducer: slice.reducer
})
