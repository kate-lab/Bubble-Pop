# Space Invaders plan

![space invaders plan](/plan/Wireframe.png)

## MVP
* The player should be able to clear at least one wave of aliens
* The player's score should be displayed at the end of the game

## I would like
* different types of "aliens" with different score values
* boss alien that is made up of several cells - how do I ensure that any cell will activate killBoss function and get rid of whole boss
* "level up" progress bar
* start page with start button and choose a character - can I use select?
* power up objects and number of lives

## Suggested enhancements
* Responsive design
* Each wave gets more difficult
* Persistent leaderboard using `localStorage`

---
## HTML PLAN FOR GAME PAGE
_body_ :
 body is flex and column,
3 sections inside body: header, grid, footer bar (including score)

_header_ :
 header contains H1

_grid_ :
 grid section display: grid container with cells appended within javscript

_footer_:
 score-container contains score(with current score span) or progress bar (made up of 2 elements - empty bar and full bar)

_not visible in main game_ :
 * audio div
 * starter page HTML - Play button, select character, name submit and button.

---
## Javascript plan
_build grid_:
* use for loop to build grid - append child within grid

_enemies move automatically across and then down_: 
* use set interval to set "speed" of movement 
* set interval as a const which gets smaller when levelUp happens
* square to "front" of direction of each enemy colour will take enemy class - so +1, +1, +1, +1 and then +6(maybe!) to move whole row onto next row
* enemy behind removed
* need addAlien and removeAlien functions

_character changes direction when player presses key_:
* eventListener ('keydown', handleKey)
* function handleKeyPress(event){ left and right movement and then "attack" function}
* +1 is right, -1 is left, +10 is down, -10 is up

_power up objects appear / disappear in random places_:
* random number generator = math.floor(math.random) * number of squares
* find node list of all squares
* apply class of correct powerup to random square
* both obj will have background colour or image background
* correct obj class square will display correct answer to inner HTML
* incorrect obj class square will display incorrect answer to inner HTML

_score displayed on page and updated_:
* let currentScore = 0
* getHit = currentScore -10 and lives -1 -> getHit function if enemyBullet[i] === character[i]
* makeKill = currentScore +10 makeKill function if characterBullet[i] === enemy[i]
* update currentscore in score section.

_lives and power up_:
* let lives = 3 - needs to be displayed somewhere!!! can I display as numberof icons like hearts?
* const powerUp = lives + 1

_score shown on progress bar_:
* if current score > 0 show progress bar as score% of holder. 
* Will make score bar worth 100 points and progress bar will only increase and decrease in multiples of 10.

_new level_:
* at if (score % 100 === 0) points ->
* reset progress bar width to 0
* change color (new level)
* change speed interval for automated movement of aliens

_game over_
* game over when lives = 0
* window confirm showing score and then return to start [age]