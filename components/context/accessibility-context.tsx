"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"

interface AccessibilityState {
  dyslexiaFont: boolean
  textToSpeech: boolean
  signLanguage: boolean
}

interface AccessibilityContextProps {
  accessibility: AccessibilityState
  setAccessibility: (newState: Partial<AccessibilityState>) => void
}

const DEFAULT_STATE: AccessibilityState = {
  dyslexiaFont: false,
  textToSpeech: false,
  signLanguage: false
}

const STORAGE_KEY = "lumiai-accessibility"

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined)

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [accessibility, setAccessibilityState] = useState<AccessibilityState>(DEFAULT_STATE)

  // Leer configuración del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAccessibilityState((prev) => ({ ...prev, ...parsed }))
      } catch (err) {
        console.warn("Accesibilidad: error al leer desde localStorage", err)
      }
    }
  }, [])

  // Guardar configuración en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accessibility))
  }, [accessibility])

  const setAccessibility = (newState: Partial<AccessibilityState>) => {
    setAccessibilityState((prev) => ({ ...prev, ...newState }))
  }

  return (
    <AccessibilityContext.Provider value={{ accessibility, setAccessibility }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}