import { createSlice, configureStore } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'elevator',
    initialState: {
        flatCoordinates: {
            x: 0,
            y: 0,
            n: 0
        },
        geographicalCoordinates: {
            latitude: 0,
            longitude: 0
        },
        height: 0
    },
    reducers: {
        setX: (state, action) => {
            state.flatCoordinates.x = action.payload
        },
        setY: (state, action) => {
            state.flatCoordinates.y = action.payload
        },
        setN: (state, action) => {
            state.flatCoordinates.n = action.payload
        },
        updateFlatCoordinates: (state) => {
            const B = state.geographicalCoordinates.latitude * Math.PI / 180
            const L = state.geographicalCoordinates.longitude
            const nz = Math.floor((6 + L) / 6)
            const l = (L - (3 + 6 * (nz - 1))) / 57.29577951
            state.flatCoordinates.x =
                6367558.4968 * B -
                Math.sin(2 * B) * (16002.89 + 66.9607 * Math.sin(B) ** 2 + 0.3515 * Math.sin(B) ** 4) +
                l ** 2 * Math.sin(2 * B) * (1594561.25 + 5336.535 * Math.sin(B) ** 2 + 26.790 * Math.sin(B) ** 4 + 0.149 * Math.sin(B) ** 6) +
                l ** 4 * Math.sin(2 * B) * (672483.4 - 811219 * Math.sin(B) ** 2 + 5420.0 * Math.sin(B) ** 4 - 16010 * Math.sin(B) ** 6) +
                l ** 8 * Math.sin(2 * B) * (109500 - 574700 * Math.sin(B) ** 2 + 863700 * Math.sin(B) ** 4 - 398600 * Math.sin(B) ** 6)
            state.flatCoordinates.y =
                (5 + 10 * nz) * 10 ** 5 +
                l * Math.cos(B) * (6378245 + 21346.1415 * Math.sin(B) ** 2 + 107.159 * Math.sin(B) ** 4 + 0.5977 * Math.sin(B) ** 6) +
                l ** 3 * Math.cos(B) * (1070204.16 - 2136526.66 * Math.sin(B) ** 2 + 17.98 * Math.sin(B) ** 4 - 11.99 * Math.sin(B) ** 6) +
                l ** 5 * Math.cos(B) * (270806 - 1523417 * Math.sin(B) ** 2 + 1327645 * Math.sin(B) ** 4 - 21701 * Math.sin(B) ** 6) +
                l ** 7 * Math.cos(B) * (79690 - 866190 * Math.sin(B) ** 2 + 1730360 * Math.sin(B) ** 4 - 945460 * Math.sin(B) ** 6)
            state.flatCoordinates.n = nz
        },
        updateGeographicalCoordinates: (state) => {},
        setLatitude: (state, action) => {
            state.geographicalCoordinates.latitude = action.payload
        },
        setLongitude: (state, action) => {
            state.geographicalCoordinates.longitude = action.payload
        },
        setHeight: (state, action) => {
            state.height = action.payload
        }
    }
})

export const {
    setX,
    setY,
    setN,
    updateFlatCoordinates,
    updateGeographicalCoordinates,
    setLatitude,
    setLongitude,
    setHeight
} = slice.actions

export const store = configureStore({
    reducer: slice.reducer
})
