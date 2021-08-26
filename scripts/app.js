function init() {


  // element
  const gamePlayer = document.querySelector('#game-player')
  const grid = document.querySelector('.grid')
  const startMenu = document.querySelector('#start-menu')

  // const startingPosition = 0
  //button
  const startButton = document.querySelector('#start-button')
  //variables

  const width = 10
  const cells = []
  const cellCount = width * width

  // const className = 'goose'

  //execution

  //create grid
  function createGrid(){
    startMenu.style.display = 'none'
    gamePlayer.style.display = 'initial'
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      cell.setAttribute('class','cell')
      grid.appendChild(cell)
      cells.push(cell)
    }

  }

  startButton.addEventListener('click', createGrid)

}
window.addEventListener('DOMContentLoaded', init)