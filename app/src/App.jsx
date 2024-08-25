import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLatitude, setLongitude, setHeight } from "./store";

export default function App() {
    const dispatch = useDispatch()
    const { height, coordinates } = useSelector(state => state)
    const { latitude, longitude } = coordinates

    const handlerButton = () => {
        window.electronAPI.setRequest({ latitude, longitude })

        setTimeout(() => {
            window.electronAPI.getResponse().then((newHeight) => {
                dispatch(setHeight(newHeight))
            })
        }, 500)
    }

    const handlerChangeLatitude = (e) => {
        dispatch(setLatitude(e.target.value))
    }

    const handlerChangeLongitude = (e) => {
        dispatch(setLongitude(e.target.value))
    }

    return (
        <div>
            <h3>Координаты</h3>
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
