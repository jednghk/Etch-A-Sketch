function randInt(min, max) {
    //used to produce randomized RGB values
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function drawBlack(grid) {
    grid.style.backgroundColor = 'black'
    defaultColor = 'black'
}

function drawRainbow(grid) {
    grid.style.backgroundColor = `rgb(${randInt(0,255)},${randInt(0,255)},${randInt(0,255)})`
    defaultColor = 'rainbow'
}

function drawGrey(grid) {
    let gridColor = grid.style.backgroundColor
    gridColor = gridColor.replace(/[^\d,]/g, '').split(',');
    //returns rgb values as an array e.g. rgb(255,255,255) returns [255,255,255]
    let [r,g,b] = gridColor
    grid.style.backgroundColor = `rgb(${r-25.5}, ${g-25.5}, ${b-25.5})`
    defaultColor = 'grey'
}

function createGrids(dimensions, container, selectedColor) {
    for (let i = 0; i < dimensions**2; i++) { //adds dimension**2 grids into the container
        let grid = document.createElement('div')
        grid.style.cssText = 'border: 1px solid black; background-color: rgb(255,255,255);'
        if (selectedColor==='black') {
            grid.setAttribute('onmouseover', 'drawBlack(this)')
        } else if (selectedColor==='grey') {
            grid.setAttribute('onmouseover', 'drawGrey(this)')
        } else {
            grid.setAttribute('onmouseover', 'drawRainbow(this)')
        }
        container.appendChild(grid)
    };
}

function outlineGrids(container) {
    container.style.gridTemplateRows = `repeat(${numGrids}, 1fr)`
    container.style.gridTemplateColumns = `repeat(${numGrids}, 1fr)`
}

function changeDimensions(selectedColor) { //called when dimensions are changed/clear button pressed
    let inputDimensions = document.querySelector('input').value
    let newGridContainer = document.createElement('div')
    let oldGrid = document.querySelector('div.grid-container')
    let body = document.querySelector('body')
    let clearButton = document.querySelector('#clearButton')

    if (!inputDimensions) {
        inputDimensions = numGrids
    } else if (inputDimensions < 1 || inputDimensions > 64) {
        return
    }

    newGridContainer.classList.add('grid-container')
    oldGrid.remove()
    body.insertBefore(newGridContainer, clearButton)


    numGrids = inputDimensions
    outlineGrids(newGridContainer)
    createGrids(numGrids, newGridContainer, selectedColor)
}

let numGrids = 64;
let gridContainer = document.querySelector('.grid-container')
let defaultColor = 'black'

outlineGrids(gridContainer)
createGrids(numGrids, gridContainer, defaultColor)
