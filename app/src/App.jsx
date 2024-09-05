import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setX,
    setY,
    setN,
    setLatitude,
    setLongitude,
    setHeight,
    updateGeographicalCoordinates,
    updateFlatCoordinates,
} from "./store";

export default function App() {
    const dispatch = useDispatch()
    const { height, geographicalCoordinates, flatCoordinates } = useSelector(state => state)
    const { latitude, longitude } = geographicalCoordinates
    const { x, y, n } = flatCoordinates

    const handlerButton = () => {
        window.electronAPI.setRequest({ latitude, longitude })

        setTimeout(() => {
            window.electronAPI.getResponse().then((newHeight) => {
                dispatch(setHeight(newHeight))
            })
        }, 500)
    }

    const handlerChangeX = (e) => {
        dispatch(setX(Number(e.target.value)))
        dispatch(updateGeographicalCoordinates())
    }

    const handlerChangeY = (e) => {
        dispatch(setY(Number(e.target.value)))
        dispatch(updateGeographicalCoordinates())
    }

    const handlerChangeN = (e) => {
        dispatch(setN(Number(e.target.value)))
        dispatch(updateGeographicalCoordinates())
    }

    const handlerChangeLatitude = (e) => {
        dispatch(setLatitude(Number(e.target.value)))
        dispatch(updateFlatCoordinates())
    }

    const handlerChangeLongitude = (e) => {
        dispatch(setLongitude(Number(e.target.value)))
        dispatch(updateFlatCoordinates())
    }

    return (
        <div>
            <h3>Плоские прямоугольные координаты</h3>
            <label htmlFor="x">X</label>
            <input
                type="number"
                id="x"
                value={x}
                onChange={(e) => handlerChangeX(e)}
            />
            <label htmlFor="y">Y</label>
            <input
                type="number"
                id="y"
                value={y}
                onChange={(e) => handlerChangeY(e)}
            />
            <label htmlFor="n">Zone</label>
            <input
                type="number"
                id="n"
                value={n}
                onChange={(e) => handlerChangeN(e)}
            />
            <h3>Географические координаты</h3>
            <label htmlFor="latitude">Широта</label>
            <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={(e) => handlerChangeLatitude(e)}
            />
            <label htmlFor="longitude">Долгота</label>
            <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={(e) => handlerChangeLongitude(e)}
            />
            <button id="button-send" type="button" onClick={handlerButton}>Set</button>
            <h3>Высота</h3>
            <span id="height">{height}</span>
        </div>
    )
}
