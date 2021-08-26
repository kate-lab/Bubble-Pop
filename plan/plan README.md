# SNAKE

## Overview
This version of snake will incorporate a quiz element. Players will have to choose the correct answer in order to win points. If they choose the wrong answer, points will be deducted. If they hit the edge of the grid, game  will be over.

![snake plan](/plan/Wireframe.png)

## MVP
* snake moves "forward" automatically in whichever direction it's facing
* snake changes direction (rotate 90deg) when player presses key
* eatable objects appear / disappear in random places
* score displayed on page and updated
* when head touches correct object: add unit to snake tail, remove food object, add to total score, speed up (or this could happen on new level?)
* choice of two eatable objects: one "correct" and one "incorrect". Must be able to show number.
* +points if correct and -points if incorrect
* game over when snake hits edge of grid - either window confirm or changes to game over page with button to play again

## Would like
* start page with button that then opens up main game
* progress bar that adds score and "levels up"/changes colour when score meets certain numbers
* snake "head" to be an image

## Suggested enhancements
* Responsive design
* Multi-player mode
* High score table - could be added to start/play again page?

---
## HTML PLAN
_body_ :
 body is flex and column,
3 sections inside body: header, question & grid

_header_ :
 header contains H1 and score-container,
score-container contains score(with current score span) and progress bar (made up of 2 elements - empty bar and full bar)

_question section_ :
 question section contains question text

_grid_ :
 grid section display: flex made up of large number of square divs wrapped

_not visible in main game_ :
 * audio div
 * starter page HTML - Play button, instructions div, leaderboard in div, name submit and button.

---
## Javascript plan
_snake moves "forward" automatically in whichever direction it's facing_: 
* use set interval to set "speed" - 
* set interval as a const which gets smaller when levelUp happens
* square to "front" of direction of snake will colour/become the head
* last square in snake is cleared as it "moves"

_snake changes direction when player presses key_:
* eventListener ('left arrow press', turnAnticlockwise) > activates function to turn -90 deg
* eventListener ('right arrow press', turnClockwise) > activates function to turn 90 deg
* or ... better to do key up/down/right/left and "move" snake to next square? +1 is right, -1 is left, +10 is down, -10 is up

_eatable objects appear / disappear in random places_:
* random number generator = math.floor(math.random) * number of squares
* find node list of all squares
* apply class of correct obj/ incorrect obj to random square
* both obj will have background colour or image background
* correct obj class square will display correct answer to inner HTML
* incorrect obj class square will display incorrect answer to inner HTML

_score displayed on page and updated_:
* let currentScore = 0
* const incorrectScore = -10
* const correctScore = 10
* update currentscore in header section if click is on current obj class of incorrect/correct by adding incorrect or correct to current score.(might need to make a function and event listener for correct and incorrect)

_score shown on progress bar_:
* if current score > 0 show progress bar as score% of holder. 
* Will make score bar worth 100 points and progress bar will only increase and decrease in multiples of 10.

_new level_:
* at if (score % 100 === 0) points ->
* reset progress bar width to 0
* change color (new level)
* change speed interval for automated forward movement of snake

_when head touches correct object_:
* add unit to snake tail
* remove both food objects (clear classes from all divs?), 
* add to total score,

_game over_
* game over when snake hits edge of grid - need to investigate how do I do this?
* either window confirm or changes to game over page with button to play again