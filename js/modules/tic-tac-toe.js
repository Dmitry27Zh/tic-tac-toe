import { getStringWithoutConstantCase } from '../utils/string.js'

const initTicTacToe = () => {
  const Value = {
    O: 'O',
    X: 'X',
    TEMPLATE_WINNER: '_',
    TEMPLATE_OTHER: '-',
  }

  let currentPlayerValue
  const currentCombination = new Array(9).fill(null)
  const W = Value.TEMPLATE_WINNER
  const O = Value.TEMPLATE_OTHER
  const WinCombinations = {
    ON_THE_TOP: [[W, W, W, O, O, O, O, O, O]],
    ON_THE_BOTTOM: [[O, O, O, O, O, O, W, W, W]],
    ON_THE_LEFT: [[W, O, O, W, O, O, W, O, O]],
    ON_THE_RIGHT: [[O, O, W, O, O, W, O, O, W]],
    VERTICALLY_IN_THE_MIDDLE: [[O, W, O, O, W, O, O, W, O]],
    HORIZONTALLY_IN_THE_MIDDLE: [[O, O, O, W, W, W, O, O, O]],
    DIAGONALLY: [
      [W, O, O, O, W, O, O, O, W],
      [O, O, W, O, W, O, W, O, O],
    ],
  }

  const element = document.querySelector('#ttt')

  if (!element) {
    return
  }

  const gameBoard = element.querySelector('[id="ttt-gameboard"]')
  const boxes = element.querySelectorAll('[id^="ttt-box"]')
  const infoElement = element.querySelector('#ttt-info')
  const restartBtn = element.querySelector('#ttt-restart')
  const defaultInfo = infoElement.textContent

  const initSteps = () => {
    boxes.forEach((box, index) => {
      box.addEventListener('click', () => {
        if (currentCombination[index] != null) {
          return
        }

        currentCombination[index] = currentPlayerValue
        box.textContent = currentPlayerValue

        if (playerHasWon()) {
          return
        }

        swapCurrentPlayerValue()
      })
    })
  }

  const initRestart = () => {
    restartBtn.addEventListener('click', () => {
      currentCombination.fill(null)
      infoElement.textContent = defaultInfo
      boxes.forEach((box) => (box.textContent = ''))
    })
  }

  const swapCurrentPlayerValue = () => {
    currentPlayerValue = currentPlayerValue === Value.O ? Value.X : Value.O
    gameBoard.dataset.currentPlayerValue = currentPlayerValue
  }

  swapCurrentPlayerValue()
  initSteps()
  initRestart()

  const playerHasWon = () => {
    for (let info in WinCombinations) {
      const winCombinations = WinCombinations[info]
      const hasCombination = winCombinations.some((winCombination) => {
        return winCombination.every(
          (value, index) => value === Value.TEMPLATE_OTHER || currentCombination[index] === currentPlayerValue
        )
      })

      if (hasCombination) {
        infoElement.textContent = `${currentPlayerValue} has won ${getStringWithoutConstantCase(info)}.`
      }
    }
  }
}

initTicTacToe()
