const setButton = document.getElementById('button-send')
const latitudeInput = document.getElementById('latitude')
const longitudeInput = document.getElementById('longitude')
const heightSpan = document.getElementById('height')

setButton.addEventListener('click', () => {
    const latitude = latitudeInput.value
    const longitude = longitudeInput.value
    window.electronAPI.setRequest({ latitude, longitude })

    setTimeout(() => {
        window.electronAPI.getResponse().then((height) => {
            heightSpan.innerText = height
        })
    }, 500)

})
