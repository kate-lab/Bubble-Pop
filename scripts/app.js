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

  // grid enemy variables 
  const stopPoint = (width * 9) + 9
  const downLeftArray = [width,width * 3,width * 5,width * 7]
  const downRightArray = [width - 1,(width * 3) - 1,(width * 5) - 1,(width * 7) - 1,(width * 9) - 1]
  const rightArray = [0,1,2,20,21,22,40,41,42,60,61,62,80,81,82]
  const leftArray = [17,18,19,37,38,39,57,58,59,77,78,79]

  //on page button variables
  const right = document.querySelector('#right-button')
  const left = document.querySelector('#left-button')
  const space = document.querySelector('#space-button')

  //score variables
  const scoreHolder = document.getElementById('point-container')
  let currentScore = 0
  scoreHolder.innerText = currentScore
  // const userTopScore = localStorage.getItem() // for each score in score[] parsefloat(score)

  //user variables
  const inputUserName = document.getElementById('name')
  
  //lives variables
  const livesHolder = document.getElementById('lives-container')
  let currentLives = 3 //change to let when you add takeLife() function
  livesHolder.innerText = currentLives

  // enemy variables
  const enemyClassName = 'enemy'
  let enemies = []
  const enemyStartingPosition = 0
  const enemiesArrayLength = parseInt(width * 0.7)
  const enemyRightValue = enemies[enemies.length - 1]
  const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]
  
  //enemy bullet variables
  const enemyBulletClassName = 'enemyBullet'

  //character variables
  let chosenCharClass = ''
  const charStartingPosition = (width * width) - parseFloat(width / 2)
  let charCurrentPosition = charStartingPosition
  
  //character selector variables
  const selectCharMenu = document.querySelector('#character-select')
  
  //character bullet variables
  const charBulletClassName = 'charBullet'

  //function to update image container with selected class and add corresponding character to grid
  function updateChar(event){
    chosenCharClass = event.target.value
    if (chosenCharClass === 'triangle'){
      document.getElementById('character-img').src = 'assets/images/characters/triangle.png'
    } else if (chosenCharClass === 'circle'){
      document.getElementById('character-img').src = 'assets/images/characters/circle.png'
    } else if (chosenCharClass === 'square'){
      document.getElementById('character-img').src = 'assets/images/characters/square.png'
    }
    
    // start button enabler based on selection
    if (inputUserName.value !== '' || chosenCharClass !== ''){
      startButton.disabled = false
    } else {
      startButton.disabled = true
    }
  }

  //execution

  //storing user details

  function storeUserDetails(){
    //stores username
    localStorage.setItem('name', inputUserName.value)
    //adds user name to current-user span
    const currentUserName = localStorage.getItem('name')
    document.querySelector('#current-user').innerHTML = currentUserName
  }

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
    
    //calling function to add enemies on grid and make it start moving after timeout delay
    const enemiesAction = setTimeout(()=>{

      // add starting Enemies
      
      for (let cellIndex = enemyStartingPosition; cellIndex < enemiesArrayLength; cellIndex++) {
        cells[cellIndex].classList.add(enemyClassName)
        enemies.push(cellIndex)
      }

      console.log(enemies)
      console.log(cells)
      
      // autoMoveEnemy
      const autoMoveEnemies = setInterval(()=>{

        const enemyRightValue = enemies[enemies.length - 1]
        
        //code to run whilst enemies have not reached the stop point at bottom of page
        if (rightArray.includes(enemies[0])) {
          moveEnemyRight()
          console.log(enemies)
        }
        if (downRightArray.includes(enemyRightValue) || downLeftArray.includes(enemies[0])){
          console.log(enemies)
          moveEnemyDown()
          console.log(enemies)
        }
        if (leftArray.includes(enemyRightValue)){
          moveEnemyLeft()
          console.log(enemies)
        }
        if (enemies.includes(stopPoint)){
          console.log('you are dead!')
          removeAllLives()
          removeCharacter(charCurrentPosition)
          cells.forEach((cell)=>{
            cell.classList.remove('enemy')
          })
          clearTimeout(enemiesAction)
          clearInterval(autoMoveEnemies)
          gameOver()// why is it jumping straight to this?!
        }
        

        // //enemy auto shoot starts 0.5 seconds after enemies appear
        // setTimeout(()=>{
        //   // function to get random integer with min and max values (for enemy who will be shooting)
        //   function getRandomInteger(min, max) {
        //     return Math.floor(Math.random() * (max - min + 1) ) + min
        //   }
        //   //call function to shoot bullet at random intervals
        //   setInterval(()=>{
        //     // shootEnemyBullet()
        //     console.log('enemy shoots')
        //   }, getRandomInteger(1000, 2000))
          
        //   //function to shoot bullet from random enemy
        //   function shootEnemyBullet(){
        //     //variables that show position of bullet in cell below enemy
        //     const enemyBulletStartingPosition = randomEnemy + 10
        //     let enemyBulletCurrentPosition = enemyBulletStartingPosition
        //     // function to add bullet in this place
        //     addEnemyBullet(enemyBulletStartingPosition)
        // //   }
        // }, 500)

        
          
        
        
        
      },100)

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

    //add enemy

    function addEnemy(positions){
      cells[positions].classList.add(enemyClassName)
    }
    //remove enemy
    function removeEnemy(position){
      cells[position].classList.remove(enemyClassName)
    }
    // remove all current enemies

    // add all current enemies

    
    // function to move whole enemies array 1 cell to right
    function moveEnemyRight(){

      //remove enemy classes from initial position - by removing all from entire grid
      cells.forEach((cell)=>{
        cell.classList.remove('enemy')
      })
      
      //create new enemies array with values that are all forward 1 place
      enemies = enemies.map(enemy => (enemy + 1))

      //add enemy class name into positions defined by new enemies class array
      for (let cellIndex = enemies[0]; cellIndex < enemies[0] + enemiesArrayLength; cellIndex++) {
        cells[cellIndex].classList.add(enemyClassName)
      }
    }

    function moveEnemyDown(){
      //remove enemy classes from initial position - by removing all from entire grid
      cells.forEach((cell)=>{
        cell.classList.remove('enemy')
      })
      
      //create new enemies array with values that are all down 10 places from current position
      enemies = enemies.map(enemy => (enemy + 10))
      
      //add enemy class name into positions defined by new enemies class array
      for (let cellIndex = enemies[0]; cellIndex < enemies[0] + enemiesArrayLength; cellIndex++) {
        cells[cellIndex].classList.add(enemyClassName)
      }
    }

    function moveEnemyLeft(){
      //remove enemy classes from initial position - by removing all from entire grid
      cells.forEach((cell)=>{
        cell.classList.remove('enemy')
      })
      
      //create new enemies array with values that are all - 1 places from current position
      enemies = enemies.map(enemy => (enemy - 1))
      
      //add enemy class name into positions defined by new enemies class array
      for (let cellIndex = enemies[0]; cellIndex < enemies[0] + enemiesArrayLength; cellIndex++) {
        cells[cellIndex].classList.add(enemyClassName)
        //enemies.push(cellIndex) - don't need this?
      }
    }
    //CHARACTER


    //function to add character to cell
    function addCharacter(cellPosition){
      cells[cellPosition].classList.add(chosenCharClass)
    }
    //function to remove character from cell
    function removeCharacter(position){
      cells[position].classList.remove(chosenCharClass)
    }

    //add character's bullet
    function addCharBullet(cellPosition){
      cells[cellPosition].classList.add(charBulletClassName)
    }
    //remove character's bullet (use this when running setinterval to auto move bullet)
    function removeCharBullet(position){
      cells[position].classList.remove(charBulletClassName)
    }

    function addPoints(){
      scoreHolder.innerText = currentScore += 100
    }

    function removeLife(){
      livesHolder.innerText = currentLives -= 1
    }

    function removeAllLives(){
      livesHolder.innerText = 0
    }

    //function that shoots character bullet
    function shootCharBullet(){
      //variables that show position of bullet in cell above char
      const charBulletStartingPosition = charCurrentPosition - 10
      let charBulletCurrentPosition = charBulletStartingPosition

      // function to add bullet in this place
      addCharBullet(charBulletStartingPosition)


      // can I use? charBulletCurrentPosition.classList.contains(enemyClassName)
      //function to begin automatic movement of bullet & define outcomes if bullet hits enemy or bullet goes past grid
      const moveBullet = setInterval(()=>{
        if (enemies.includes(charBulletCurrentPosition)) { 
          // if bullet and enemy are in same position, remove both!
          removeCharBullet(charBulletCurrentPosition)
          const currentEnemyIndex = charBulletCurrentPosition
          enemies.splice(1, currentEnemyIndex)
          console.log('Popped!')
          addPoints()
          clearInterval(moveBullet)
        } else if (!enemies.includescharBulletCurrentPosition && charBulletCurrentPosition >= 10) { //if the bullet is not in the same position the enemy, move upwards
          removeCharBullet(charBulletCurrentPosition)
          charBulletCurrentPosition -= 10
          addCharBullet(charBulletCurrentPosition)
        } else { //if bullet gets to end of grid, remove and clear interval
          console.log('bullet wasted!')
          removeEnemy(charBulletCurrentPosition)
          const currentEnemyIndex = charBulletCurrentPosition
          enemies.splice(1, currentEnemyIndex)
          removeCharBullet(charBulletCurrentPosition)
          clearInterval(moveBullet)
        } 
        // do i need to set a new else statement for when there are no enemies left?
      }, 100)
    }
    

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

    //user click button on page function

    // left
    function handleLeftClick (event){
      //ensures img is also included in click
      const leftArrow = document.querySelector('#left-arrow')
      removeCharacter(charCurrentPosition)
      if (event.target === left && charCurrentPosition % width !== 0){
        charCurrentPosition--
      } else if (event.target === leftArrow && charCurrentPosition % width !== 0){
        charCurrentPosition--
      } 
      addCharacter(charCurrentPosition)
    }

    //right
    function handleRightClick (event){
      //ensures img is also included in click
      const rightArrow = document.querySelector('#right-arrow')
      removeCharacter(charCurrentPosition)
      if (event.target === right && charCurrentPosition % width !== width - 1){
        charCurrentPosition++
      } else if (event.target === rightArrow && charCurrentPosition % width !== width - 1){
        charCurrentPosition++
      } 
      addCharacter(charCurrentPosition)
    }

    //space
    function handleSpaceClick (event){
      removeCharacter(charCurrentPosition)
      if (event.target === space){
        console.log('I am shooting!')
        shootCharBullet()
      }  
      addCharacter(charCurrentPosition)
    }

    // when char has 0 lives, display window alert with final score and offer option to play again
    function gameOver(){
      const finalScore = currentScore
      //save finalScore to local storage with inputUserName
      reloader()
      function reloader(){
        if (confirm(`Suds! You lost the game.\nYour score was ${finalScore}\nPlay again?`)){
          window.location.reload()
        }
        return false
      }
      
    }

    

    //EVENT LISTENERS WHEN GRID IS INITIALISED

    //handles keydown of character and moves character to desired place
    document.addEventListener('keydown', handleKeyDown)

    //handles on page buttons to move character and shoot
    document.addEventListener('click', handleLeftClick)
    document.addEventListener('click', handleRightClick)
    document.addEventListener('click', handleSpaceClick)


  }

  //EVENT LISTENERS AFTER INIT

  //changes character picture on change of selector options
  selectCharMenu.addEventListener('change', updateChar)

  //saves username on startbutton click
  startButton.addEventListener('click', storeUserDetails)

  //creates grid and adds character
  startButton.addEventListener('click', createGrid)



}
window.addEventListener('DOMContentLoaded', init)