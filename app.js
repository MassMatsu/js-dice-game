const score1 = document.getElementById('score--0')
const score2 = document.getElementById('score--1')
const currentScore1 = document.getElementById('current--0')
const currentScore2 = document.getElementById('current--1')
const dice = document.querySelector('.dice')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

const players = [...document.querySelectorAll('.player')]
const scores = [score1, score2]
const currentScores = [currentScore1, currentScore2]

let activePlayer = 0
let diceNum = null
let currentScore = 0
let score = [0, 0]

function reset() {
  activePlayer = 0
  currentScore = 0
  score = [0, 0]
  scores.forEach((score) => score.textContent = 0)
  currentScores.forEach((currentScore) => currentScore.textContent = 0)
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1
    players[0].classList.remove('player--active')
    players[1].classList.add('player--active')
  } else {
    activePlayer = 0
    players[1].classList.remove('player--active')
    players[0].classList.add('player--active')
  }
} 

function rollDice() {
  diceNum = Math.floor(Math.random() * 6) + 1 
  dice.src = `./images/dice-${diceNum}.png`
}

function displayCurrent() {
  if (diceNum === 1) {
    currentScore = 0
    currentScores[activePlayer].textContent = currentScore
    switchPlayer()
    return
  }
  currentScore += diceNum
  currentScores[activePlayer].textContent = currentScore
}

function displayScore() {
  score[activePlayer] += currentScore
  scores[activePlayer].textContent = score[activePlayer]
  currentScore = 0
  currentScores[activePlayer].textContent = currentScore
  if (score[activePlayer] >= 50) {
    openModal()
  }
}

function openModal() {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

// NEW GAME button
document.querySelector('.btn--new').addEventListener('click', () => {
  reset()
})

// ROLL DICE button
document.querySelector('.btn--roll').addEventListener('click', () => {
  rollDice()
  displayCurrent()
})

// HOLD SCORE button
document.querySelector('.btn--hold').addEventListener('click', () => {
  displayScore()
  switchPlayer()
})


// close modal
document.querySelector('.modal-close').addEventListener('click', () => {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
})