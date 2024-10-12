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
        height: 0,
        isDbLoaded: false,
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
            const n = Math.floor((6 + L) / 6)
            const l = (L - (3 + 6 * (n - 1))) / 57.29577951
            state.flatCoordinates.x = 6367558.4968 * B - Math.sin(2*B)*(16002.8900 + 66.9607 * Math.sin(B)**2 + 0.3515 * Math.sin(B)**4 -
                l**2*(1594561.25 + 5336.535 * Math.sin(B)**2 + 26.790 * Math.sin(B)**4 + 0.149 * Math.sin(B)**6 +
                l**2*(672483.4 - 811219.9 * Math.sin(B)**2 + 5420.0 * Math.sin(B)**4 - 10.6 * Math.sin(B)**6 +
                l**2*(278194.0 - 830174.0 * Math.sin(B)**2 + 572434.0 * Math.sin(B)**4 - 16010.0 * Math.sin(B)**6 +
                l**2*(109500.0 - 574700.0 * Math.sin(B)**2 + 863700.0 * Math.sin(B)**4 - 398600.0 * Math.sin(B)**6)))))
            state.flatCoordinates.y = 500000.0 + l * Math.cos(B) * (6378245.0 + 21346.1415 * Math.sin(B)**2 + 107.1590 * Math.sin(B)**4 + 0.5977 * Math.sin(B)**6 +
                l**2*(1070204.16 - 2136826.66 * Math.sin(B)**2 + 17.98 * Math.sin(B)**4 - 11.99 * Math.sin(B)**6 +
                l**2*(270806.0 - 1523417.0 * Math.sin(B)**2 + 1327645.0 * Math.sin(B)**4 - 21701.0 * Math.sin(B)**6 +
                l**2*(79690.0 - 866190.0 * Math.sin(B)**2 + 1730360.0 * Math.sin(B)**4 - 945460.0 * Math.sin(B)**6))))
            state.flatCoordinates.n = n
        },
        updateGeographicalCoordinates: (state) => {
            const x = state.flatCoordinates.x
            const y = state.flatCoordinates.y
            const n = state.flatCoordinates.n
            const beta = x / 6367558.4968
            const B0 = beta + Math.sin(2*beta)*(0.00252588685 - 0.00001491860*Math.sin(beta)**2 + 0.00000011904*Math.sin(beta)**4)
            const z0 = (y - 500000) / (6378245 * Math.cos(B0))
            const deltaB = -1*z0**2*Math.sin(2*B0)*(0.251684631 - 0.003369263*Math.sin(B0)**2 + 0.00001127*Math.sin(B0)**4 -
                z0**2*(0.10500614 - 0.04559916*Math.sin(B0)**2 + 0.00228901*Math.sin(B0)**4 - 0.00002987*Math.sin(B0)**6 -
                z0**2*(0.042858 - 0.025318*Math.sin(B0)**2 + 0.014346*Math.sin(B0)**4 - 0.001264*Math.sin(B0)**6 -
                z0**2*(0.01672 - 0.00630*Math.sin(B0)**2 + 0.01188*Math.sin(B0)**4 - 0.00328*Math.sin(B0)**6))))
            const l = z0*(1 - 0.0033467108*Math.sin(B0)**2 - 0.0000056002*Math.sin(B0)**4 - 0.0000000187*Math.sin(B0)**6 -
                z0**2*(0.16778975 + 0.16273586*Math.sin(B0)**2 - 0.00052490*Math.sin(B0)**4 - 0.00000846*Math.sin(B0)**6 -
                z0**2*(0.0420025 + 0.1487407*Math.sin(B0)**2 + 0.0059420*Math.sin(B0)**4 - 0.0000150*Math.sin(B0)**6 -
                z0**2*(0.01225 + 0.09477*Math.sin(B0)**2 + 0.03282*Math.sin(B0)**4 - 0.00034*Math.sin(B0)**6 -
                z0**2*(0.0038 + 0.0524*Math.sin(B0)**2 + 0.0482*Math.sin(B0)**4 - 0.0032*Math.sin(B0)**6)))))
            state.geographicalCoordinates.latitude = (B0 + deltaB) * 180 / Math.PI
            state.geographicalCoordinates.longitude = (6 * (n - 0.5) / 57.29577951 + l) * 180 / Math.PI
        },
        setLatitude: (state, action) => {
            state.geographicalCoordinates.latitude = action.payload
        },
        setLongitude: (state, action) => {
            state.geographicalCoordinates.longitude = action.payload
        },
        setHeight: (state, action) => {
            state.height = action.payload
        },
        setDbLoaded: (state) => {
            state.isDbLoaded = true
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
    setHeight,
    setDbLoaded
} = slice.actions

export const store = configureStore({
    reducer: slice.reducer
})
