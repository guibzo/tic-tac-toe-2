import { useState } from 'react'

const possibleWinCombinations = [
  [1, 5, 9],
  [3, 5, 7],
  [4, 5, 6],
  [1, 4, 7],
  [7, 8, 9],
  [1, 2, 3],
  [3, 6, 9],
]

type SelectedPosition = {
  player: 'x' | 'o'
  position: number
}

export const App = () => {
  const [selectedPositions, setSelectedPositions] = useState<SelectedPosition[]>([])
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [gameWinner, setGameWinner] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState<'x' | 'o'>(() => {
    return Math.random() > 0.5 ? 'x' : 'o'
  })

  console.log(selectedPositions)

  const checkForWin = () => {
    for (const combination of possibleWinCombinations) {
      const [a, b, c] = combination

      const matchPlays = () => {
        const play1 = selectedPositions.find((play) => play.position === a)
        const play2 = selectedPositions.find((play) => play.position === b)
        const play3 = selectedPositions.find((play) => play.position === c)

        if (play1 && play2 && play3) {
          return true
        }
      }

      selectedPositions.map((play) => {
        if (play.player === 'x' && matchPlays() === true) {
          setGameWinner('x')
          setIsGameFinished(true)
          return
        }

        if (play.player === 'o' && matchPlays() === true) {
          setGameWinner('o')
          setIsGameFinished(true)
          return
        }
      })
    }
  }

  return (
    <main className='bg-zinc-950 antialiased text-zinc-100 w-full min-h-screen flex items-center justify-center p-5'>
      <div className='size-96 grid grid-cols-3 grid-rows-3 gap-2'>
        {Array.from({ length: 9 }).map((_, i) => {
          const currentPlayDetails = selectedPositions.find((play) => play.position === i + 1)

          return (
            <button
              key={i}
              className='border border-zinc-300 relative disabled:opacity-30 disabled:hover:cursor-not-allowed'
              disabled={isGameFinished}
              onClick={() => {
                const isGameOver = checkForWin()
                if (isGameOver) {
                  return setIsGameFinished(true)
                }

                setSelectedPositions([
                  ...selectedPositions,
                  {
                    player: currentPlayer,
                    position: i + 1,
                  },
                ])

                setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
              }}
            >
              {currentPlayDetails && (
                <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl'>
                  {currentPlayDetails.player.toUpperCase()}
                </span>
              )}
            </button>
          )
        })}
        Vencedor: {gameWinner}
      </div>
    </main>
  )
}
