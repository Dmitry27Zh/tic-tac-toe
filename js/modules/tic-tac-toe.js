const initTicTacToe = () => {
  const Value = {
    O: 'O',
    X: 'X',
  }

  let currentPlayerValue = Value.O
  const combinations = new Array(9).fill(null)

  const element = document.querySelector('#ttt')

  if (!element) {
    return
  }

  const info = element.querySelector('#ttt-info')
  const restartBtn = element.querySelector('#ttt-restart')
  const boxes = element.querySelectorAll('[id^="ttt-box"]')
  const defaultInfo = info.textContent

  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      if (combinations[index] != null) {
        return
      }

      combinations[index] = currentPlayerValue
      box.textContent = currentPlayerValue

      if (playerHasWon()) {
        info.textContent = `${currentPlayerValue} has won!`
        return
      }

      currentPlayerValue = currentPlayerValue === Value.O ? Value.X : Value.O
    })
  })

  const playerHasWon = () => {}
}

initTicTacToe()
