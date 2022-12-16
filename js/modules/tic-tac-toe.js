import { getStringWithoutConstantCase } from '../utils/string.js'

const initTicTacToe = () => {
  const Value = {
    O: 'O',
    X: 'X',
    TEMPLATE_WINNER: '_',
    TEMPLATE_OTHER: '-',
  }

  let currentPlayerValue = Value.O
  const currentCombination = new Array(9).fill(null)
  const WinCombinations = {
    ON_THE_TOP: [`${Value.TEMPLATE_WINNER.repeat(3)}${Value.TEMPLATE_OTHER.repeat(6)}`],
    ON_THE_BOTTOM: [`${Value.TEMPLATE_OTHER.repeat(6)}${Value.TEMPLATE_WINNER.repeat(3)}`],
    ON_THE_LEFT: [`${Value.TEMPLATE_WINNER}${Value.TEMPLATE_OTHER.repeat(2)}`.repeat(3)],
    ON_THE_RIGHT: [`${Value.TEMPLATE_OTHER.repeat(2)}${Value.TEMPLATE_WINNER}`.repeat(3)],
    VERTICALLY_IN_THE_MIDDLE: [`${Value.TEMPLATE_OTHER}${Value.TEMPLATE_WINNER}${Value.TEMPLATE_OTHER}`.repeat(3)],
    HORIZONTALLY_IN_THE_MIDDLE: [
      `${Value.TEMPLATE_OTHER.repeat(3)}${Value.TEMPLATE_WINNER.repeat(3)}${Value.TEMPLATE_OTHER.repeat(3)}`,
    ],
    DIAGONALLY: [
      `${Value.TEMPLATE_WINNER}${Value.TEMPLATE_OTHER.repeat(3)}${Value.TEMPLATE_WINNER}${Value.TEMPLATE_OTHER.repeat(
        3
      )}${Value.TEMPLATE_WINNER}`,
      `${Value.TEMPLATE_OTHER.repeat(2)}${Value.TEMPLATE_WINNER}${Value.TEMPLATE_OTHER}${Value.TEMPLATE_WINNER}${
        Value.TEMPLATE_OTHER
      }${Value.TEMPLATE_WINNER}${Value.TEMPLATE_OTHER.repeat(2)}`,
    ],
  }

  const element = document.querySelector('#ttt')

  if (!element) {
    return
  }

  const infoElement = element.querySelector('#ttt-info')
  const restartBtn = element.querySelector('#ttt-restart')
  const boxes = element.querySelectorAll('[id^="ttt-box"]')
  const defaultInfo = infoElement.textContent

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

      currentPlayerValue = currentPlayerValue === Value.O ? Value.X : Value.O
    })
  })

  const playerHasWon = () => {
    for (let info in WinCombinations) {
      const winCombinations = WinCombinations[info]
      const hasCombination = winCombinations.some((winCombination) => {
        return [...winCombination].every(
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
