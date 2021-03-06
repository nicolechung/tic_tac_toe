import './style.scss'

const el = document.getElementById('game-box')
el.addEventListener('click', handleClick);

const button = document.getElementById('reset')
button.addEventListener('click', reset);

let turn = 'x'
let xStyle = 'background-color: #7FDBFF'
let oStyle = 'background-color: #F012BE'
let turnStyle = xStyle

const WIN_LENGTH = 2
let board

function reset() {
  board = [
    {x:0, y: 0},
    {x:1, y: 0},
    {x:2, y: 0},
    {x:0, y: 1},
    {x:1, y: 1},
    {x:2, y: 1},
    {x:0, y: 2},
    {x:1, y: 2},
    {x:2, y: 2},
  ]

  const divs = document.getElementsByClassName('box');
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i]
    div.innerHTML = ''
    div.style = ''
  }

  const el = document.getElementById('won-message')
  el.innerHTML = 'Start! (click)'

  const wonBox = document.getElementById('won')
  wonBox.classList.remove("bounceIn")
}

function toggleTurn() {
  if (turn === 'x'){
    turn = 'o'
    turnStyle = oStyle
  } else {
    turn = 'x'
    turnStyle = xStyle
  }
}


function handleClick(event) {
  const box = event.target.dataset.box

  if (score(turn, box)) {
    const list = document.querySelectorAll(`[data-box='${box}']`)
    const domElement = list[0]
    domElement.style = turnStyle
    domElement.innerHTML = turn
    toggleTurn()
    calculateScore()
  }
}

function score(turn, box) {
  const boxToScore = parseInt(box, 10) - 1
  if (!board[boxToScore].turn) {
    board[boxToScore]= {
    ...board[boxToScore],
    turn: turn
    }
    return true
  } else {
    alert('this box is taken')
    return false
  }

}

function calculateScore() {
  const x = board.filter(item => item.turn === 'x')
  const o = board.filter(item => item.turn === 'o')
  const xWon = checkPlayerWon(x)
  const oWon = checkPlayerWon(o)
  if (xWon || oWon) {
    let winner = ''
    if (xWon) {
      winner = 'x'
    } else {
      winner = 'o'
    }
    const el = document.getElementById('won-message')
    el.innerHTML = winner + ' has won'
    const wonBox = document.getElementById('won')
    wonBox.classList.add("bounceIn")
    setTimeout(reset, 2000)
  }
}

function checkPlayerWon(player) {
  return checkStraightWins(player, 'x') || checkStraightWins(player, 'y') || checkDiagonalWins(player)
}

function checkStraightWins(player, xy) {
  const result = player.filter(item => item[xy] === 0).length > WIN_LENGTH ||
    player.filter(item => item[xy] === 1).length > WIN_LENGTH ||
    player.filter(item => item[xy] === WIN_LENGTH).length > WIN_LENGTH
  return result
}

function checkDiagonalWins(player) {
  const diagonal1 = [
    {
      x:0, y:0
    },
    {
      x:1, y:1
    },
    {
      x:2, y:2
    },
  ]

  const diagonal2 = [
    {
      x:2, y:0
    },
    {
      x:1, y:1
    },
    {
      x:0, y:2
    },
  ]
  const diagonal1Compare = arrayCompare(player, diagonal1)
  const diagonal2Compare = arrayCompare(player, diagonal2)
  const result = diagonal1Compare || diagonal2Compare

  return result
}



function arrayCompare(player, win) {
  const filtered = player.filter(player_item => {
    return win.filter(win_item => {
      return player_item.x == win_item.x && player_item.y == win_item.y
    }).length > 0
  })
  return filtered.length > WIN_LENGTH
}

/* start game by resetting / initializing the board */
reset()