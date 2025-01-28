import { useState, useCallback } from 'react'

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const enterFullScreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen()
      setIsFullScreen(true)
    } catch (error) {
      console.error('Error attempting to enable full-screen mode:', error)
    }
  }, [])

  const exitFullScreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
      setIsFullScreen(false)
    } catch (error) {
      console.error('Error attempting to exit full-screen mode:', error)
    }
  }, [])

  return { isFullScreen, enterFullScreen, exitFullScreen }
}

