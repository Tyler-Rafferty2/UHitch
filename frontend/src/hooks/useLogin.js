import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
    
        try {
          const response = await fetch('https://www.uhitch.live:5000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
    
          const json = await response.json()
    
          if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            throw new Error(json.error) // Explicitly throw the error here
          }
    
          localStorage.setItem('user', JSON.stringify(json))
          dispatch({ type: 'LOGIN', payload: json })
          setIsLoading(false)
        } catch (err) {
          setIsLoading(false)
          setError(err.message)
          throw err // Re-throw error to propagate it up to sign.js
        }
      }
    
      return { login, isLoading, error }
}
