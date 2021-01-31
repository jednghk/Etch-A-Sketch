function randInt(min, max) {
    //creates a random integer from min to max
    //used to simulate computer opponent
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function drawBlack(grid) {
    grid.style.backgroundColor = 'black'
}

function drawRainbow(grid) {
    grid.style.backgroundColor = `rgb(${randInt(0,255)},${randInt(0,255)},${randInt(0,255)})`
}

function drawGrey(grid) {
    let currentColor = grid.style.backgroundColor
    currentColor = currentColor.replace(/[^\d,]/g, '').split(','); //returns rgb values as an array e.g. rgb(255,255,255) returns [255,255,255]
    let [r,g,b] = currentColor //accesses rgb values directly
    grid.style.backgroundColor = `rgb(${r-25.5}, ${g-25.5}, ${b-25.5})`
}

function createGrids(dimensions, container, color) {
    for (let i = 0; i < dimensions**2; i++) {
        let grid = document.createElement('div')
        grid.style.cssText = 'border: 1px solid black; background-color: rgb(255,255,255);'
        if (color==='black') {
            grid.setAttribute('onmouseover', 'drawBlack(this)')
        } else if (color==='grey') {
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

function changeDimensions(color) {
    let inputDimensions = document.querySelector('input').value
    let newGridContainer = document.createElement('div')
    let oldGrid = document.querySelector('div.grid-container')
    let body = document.querySelector('body')

    if (!inputDimensions) {
        inputDimensions = numGrids
    } else if (inputDimensions < 1 || inputDimensions > 64) {
        return
    }

    newGridContainer.classList.add('grid-container')
    oldGrid.remove()
    body.appendChild(newGridContainer)


    numGrids = inputDimensions
    outlineGrids(newGridContainer)
    createGrids(numGrids, newGridContainer, color)
}



let numGrids = 64;
let gridContainer = document.querySelector('.grid-container')
let defaultColor = 'black'

outlineGrids(gridContainer)
createGrids(numGrids, gridContainer, defaultColor)
