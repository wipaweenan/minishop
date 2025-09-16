"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  })

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("minishop-user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setState({ user, isLoading: false })
      } catch (error) {
        console.error("Failed to load user from localStorage:", error)
        setState({ user: null, isLoading: false })
      }
    } else {
      setState({ user: null, isLoading: false })
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo
    if (email && password.length >= 6) {
      const user: User = {
        id: "1",
        email,
        name: email.split("@")[0],
      }

      setState({ user, isLoading: false })
      localStorage.setItem("minishop-user", JSON.stringify(user))
      return true
    }

    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo
    if (email && password.length >= 6 && name) {
      const user: User = {
        id: "1",
        email,
        name,
      }

      setState({ user, isLoading: false })
      localStorage.setItem("minishop-user", JSON.stringify(user))
      return true
    }

    return false
  }

  const logout = () => {
    setState({ user: null, isLoading: false })
    localStorage.removeItem("minishop-user")
  }

  return <AuthContext.Provider value={{ ...state, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
