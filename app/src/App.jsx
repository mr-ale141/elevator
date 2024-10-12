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
    setDbLoaded,
} from "./store";

export default function App() {
    const dispatch = useDispatch()
    const {
        height,
        geographicalCoordinates,
        flatCoordinates,
        isDbLoaded
    } = useSelector(state => state)
    const { latitude, longitude } = geographicalCoordinates
    const { x, y, n } = flatCoordinates

    const handlerUpdateHigh = () => {
        let request = new XMLHttpRequest()
        const url = 'http://127.0.0.1:8080'
        const data = `${latitude} ${longitude}`

        request.open('POST', url, true)
        request.setRequestHeader('Content-Type', '')
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                dispatch(setHeight(Number(request.responseText)))
            }
        }
        request.send(data)
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

    const handlerLoadDb = (e) => {
        const parentBlock = e.target.parentNode

        parentBlock.removeChild(e.target)
        let p = document.createElement("p")
        p.innerText = 'Загрузка базы, ждите ...'
        const child = parentBlock.appendChild(p)

        window.electronAPI.loadDataBase()
        window.electronAPI.waitLoaded()
            .then((result) => {
                parentBlock.removeChild(p)
                parentBlock.appendChild(e.target)
                if (result) dispatch(setDbLoaded())
            })
    }

    const parentStyle = {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: "10px",
    }

    const itemStyle = {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: "5px",
        minWidth: "250px"
    }

    const blockInputStyle = {
        display: "flex",
        flexDirection: "column",
        margin: "5px",
        width: "240px"
    }

    const labelStyle = {
        margin: "2px",
    }

    const inputStyle = {
        margin: "2px",
    }

    if (isDbLoaded)
        return (
            <div style={parentStyle}>
                <div style={itemStyle}>
                    <h3>Плоские прямоугольные</h3>
                    <div style={blockInputStyle}>
                        <label style={labelStyle} htmlFor="x">X</label>
                        <input
                            style={inputStyle}
                            type="number"
                            id="x"
                            value={x}
                            onChange={(e) => handlerChangeX(e)}
                        />
                    </div>
                    <div style={blockInputStyle}>
                        <label style={labelStyle} htmlFor="y">Y</label>
                        <input
                            style={inputStyle}
                            type="number"
                            id="y"
                            value={y}
                            onChange={(e) => handlerChangeY(e)}
                        />
                    </div>
                    <div style={blockInputStyle}>
                        <label style={labelStyle} htmlFor="n">Zone</label>
                        <input
                            style={inputStyle}
                            type="number"
                            id="n"
                            value={n}
                            onChange={(e) => handlerChangeN(e)}
                        />
                    </div>
                </div>
                <div style={itemStyle}>
                    <h3>Географические</h3>
                    <div style={blockInputStyle}>
                        <label style={labelStyle} htmlFor="latitude">Широта</label>
                        <input
                            style={inputStyle}
                            type="number"
                            id="latitude"
                            value={latitude}
                            onChange={(e) => handlerChangeLatitude(e)}
                        />
                    </div>
                    <div style={blockInputStyle}>
                        <label style={labelStyle} htmlFor="longitude">Долгота</label>
                        <input
                            style={inputStyle}
                            type="number"
                            id="longitude"
                            value={longitude}
                            onChange={(e) => handlerChangeLongitude(e)}
                        />
                    </div>
                </div>
                <div style={itemStyle}>
                    <h3>{`Высота = ${height || 'нет данных'}`}</h3>
                    <button id="button-send" type="button" onClick={handlerUpdateHigh}>Вычислить</button>
                </div>

            </div>
        )
    else
        return (
            <div>
                <h3>Отсутствует база данных высот</h3>
                <button id="button-send" type="button" onClick={handlerLoadDb}>Загрузить</button>
            </div>
        )
}
