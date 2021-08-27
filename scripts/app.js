function init() {

  // layout elements
  const gamePlayer = document.querySelector('#game-player')
  const grid = document.querySelector('.grid')
  const startMenu = document.querySelector('#start-menu')
  const startButton = document.querySelector('#start-button')

  // grid variables
  const width = 10
  const cells = []
  const cellCount = width * width


  // enemy variables
  const enemyClassName = 'enemy'
  const enemyStartingPosition = 0
  // let enemyCurrentPosition = enemyStartingPosition

  //character variables
  const charClassName = 'character'
  const charStartingPosition = (width * width) - parseFloat(width / 2)
  let charCurrentPosition = charStartingPosition

  //execution

  //function to create grid
  function createGrid(){
    startMenu.style.display = 'none'
    gamePlayer.style.display = 'initial'
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i //remove this at end to make cells have no number
      cell.setAttribute('class','cell')
      grid.appendChild(cell)
      cells.push(cell)
    }
    //calling function to add character on grid
    addCharacter(charStartingPosition)
    
    // need to add enemies here - or should I wait for initial keypress?
    //calling function to add enemy on grid
    addEnemy(enemyStartingPosition)
  }

  //function to add character to cell
  function addCharacter(cellPosition){
    cells[cellPosition].classList.add(charClassName)
  }
  //function to remove character from cell
  function removeCharacter(position){
    cells[position].classList.remove(charClassName)
  }

  //add enemy
  function addEnemy(cellPosition){
    cells[cellPosition].classList.add(enemyClassName)
  }
  // //remove enemy
  // function removeEnemy(position){
  //   cells[position].classList.remove(enemyClassName)
  // }

  //user key input function - move character left right and shoot
  function handleKeyDown (event){
    removeCharacter(charCurrentPosition)
    console.log(event.code)

    const key = event.code
    const right = 'ArrowRight'
    const left = 'ArrowLeft'
    const space = 'Space'

    if (key === right && charCurrentPosition % width !== width - 1){
      charCurrentPosition++
    } else if (key === left && charCurrentPosition % width !== 0){
      charCurrentPosition--
    } else if (key === space){
      console.log('I am shooting!')
    }
    
    addCharacter(charCurrentPosition)
  }
  //creates grid and adds character
  startButton.addEventListener('click', createGrid)
  //handles keydown of character and moves character to desired place
  document.addEventListener('keydown', handleKeyDown)

}
window.addEventListener('DOMContentLoaded', init)