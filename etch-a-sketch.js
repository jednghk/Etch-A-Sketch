//goal: create x number of divs and change style accordingly
function draw(grid) {
    grid.style.backgroundColor = 'black'
}

let numGrids = 64;
let gridContainer = document.querySelector('.grid-container')

gridContainer.style.gridTemplateRows = `repeat(${numGrids}, 1fr)`
gridContainer.style.gridTemplateColumns = `repeat(${numGrids}, 1fr)`

for (let i = 0; i < 64**2; i++) {
    let grid = document.createElement('div')
    grid.style.cssText = 'border: 1px solid black'
    grid.setAttribute('onmouseover', 'draw(this)')
    gridContainer.appendChild(grid)
};