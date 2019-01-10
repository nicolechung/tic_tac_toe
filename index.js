import './style.scss'

const el = document.getElementById('game-box')
el.addEventListener('click', handleClick);

const button = document.getElementById('reset')
button.addEventListener('click', reset);

let turn = 'x'
let xStyle = 'background-color: #7FDBFF'
let oStyle = 'background-color: #F012BE'
let turnStyle = xStyle

let board = [
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
  const item = event.target;
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
  }
}

function checkPlayerWon(player) {
  return checkHorizontalWins(player) || checkVerticalWins(player) || checkDiagonalWins(player)
}

function checkHorizontalWins(player) {
  const result = player.filter(item => item.y === 0).length > 2 ||
    player.filter(item => item.y === 1).length > 2 ||
    player.filter(item => item.y === 2).length > 2
  return result
}

function checkVerticalWins(player) {
  const result = player.filter(item => item.x === 0).length > 2 ||
    player.filter(item => item.x === 1).length > 2 ||
    player.filter(item => item.x === 2).length > 2
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
  let compares = player.map(item => {
    const matches = win.map(diagonal => {
      return diagonal.x == item.x && diagonal.y == item.y
    })
    if (matches.includes(true)) {
       return true
    }
    return false
  })
  return compares.filter(match => match == true).length > 2
}