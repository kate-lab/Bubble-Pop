function init() {

  // layout elements
  const gamePlayer = document.querySelector('#game-player')
  const grid = document.querySelector('.grid')
  const startMenu = document.querySelector('#start-menu')
  const startButton = document.querySelector('#start-button')
  const startCounter = document.querySelector('#start-count')


  // grid variables
  const width = 10
  const cells = []
  const cellCount = width * width


  // enemy variables
  const enemyClassName = 'enemy'
  const enemyStartingPosition = 0
  let enemyCurrentPosition = enemyStartingPosition

  //enemy bullet variables

  //character variables
  const charClassName = 'character'
  const triangleClassName = 'triangle'
  const circleClassName = 'circle'
  const squareClassName = 'square'
  const charStartingPosition = (width * width) - parseFloat(width / 2)
  let charCurrentPosition = charStartingPosition

  //character bullet variables
  const charBulletClassName = 'charBullet'


  //execution

  //LAYOUT SET UP

  //function to create grid
  function createGrid(){
    startMenu.style.display = 'none'
    gamePlayer.style.display = 'initial'
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.setAttribute('class','cell')
      grid.appendChild(cell)
      cells.push(cell)
    }
    //calling function to add character on grid
    addCharacter(charStartingPosition)
    
    //calling function to add enemy on grid after timeout delay
    setTimeout(()=>{
      addEnemy(enemyStartingPosition)
    }, 4000)

    //start countdown to gameplay
    const startCount = startCounter.innerHTML = 3
    setInterval(()=>{
      if (startCounter.innerHTML > 1){
        startCounter.innerHTML--
      } else {
        startCounter.innerHTML = 'pop!'
        setTimeout(()=>{
          startCounter.style.display = 'none'
          clearInterval(startCount)
        }, 1000)
      }
    }, 1000)
  }

  //CHARACTER


  //function to add character to cell
  function addCharacter(cellPosition){
    cells[cellPosition].classList.add(charClassName)
  }
  //function to remove character from cell
  function removeCharacter(position){
    cells[position].classList.remove(charClassName)
  }

  //add character's bullet
  function addCharBullet(cellPosition){
    cells[cellPosition].classList.add(charBulletClassName)
  }
  //remove character's bullet (use this when running setinterval to auto move bullet)
  function removeCharBullet(position){
    cells[position].classList.remove(charBulletClassName)
  }

  //function that shoots character bullet
  function shootCharBullet(){
    //variables that show position of bullet in cell above char
    const charBulletStartingPosition = charCurrentPosition - 10
    let charBulletCurrentPosition = charBulletStartingPosition

    // function to add bullet in this place
    addCharBullet(charBulletStartingPosition)

    //function to begin automatic movement of bullet & define outcomes if bullet hits enemy or bullet goes past grid
    const moveBullet = setInterval(()=>{
      if (charBulletCurrentPosition === charCurrentPosition - (cellCount - width)){ //if bullet gets to end of grid, remove and clear interval
        removeEnemy(charBulletCurrentPosition)
        removeCharBullet(charBulletCurrentPosition)
        clearInterval(moveBullet)
      } else if (charBulletCurrentPosition !== enemyCurrentPosition) { //if the bullet is not in the same position the enemy, move upwards
        removeCharBullet(charBulletCurrentPosition)
        charBulletCurrentPosition -= 10
        addCharBullet(charBulletCurrentPosition)
      } else if (charBulletCurrentPosition === enemyCurrentPosition) {  // if bullet and enemy are in same position, remove both!
        removeEnemy(enemyCurrentPosition)
        removeCharBullet(charBulletCurrentPosition)
        clearInterval(moveBullet)
      } // do i need to set a new else statement for when there are no enemies left?
    }, 100)
  }



  

  //ENEMIES

  //add enemy
  function addEnemy(cellPosition){
    cells[cellPosition].classList.add(enemyClassName)
  }
  //remove enemy
  function removeEnemy(position){
    cells[position].classList.remove(enemyClassName)
  }


  // USER INPUT - CHARACTER CHOICE



  // USER INPUT - GAMEPLAY

  //user key input function - move character left right and shoot
  function handleKeyDown (event){
    removeCharacter(charCurrentPosition)

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
      shootCharBullet()
    }
    
    addCharacter(charCurrentPosition)
  }

  
  //EVENT LISTENERS


  //creates grid and adds character
  startButton.addEventListener('click', createGrid)
  //handles keydown of character and moves character to desired place
  document.addEventListener('keydown', handleKeyDown)

}
window.addEventListener('DOMContentLoaded', init)