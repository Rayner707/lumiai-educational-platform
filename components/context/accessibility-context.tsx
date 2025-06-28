"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface AccessibilityState {
  dyslexiaFont: boolean
  textToSpeech: boolean
  signLanguage: boolean
}

interface AccessibilityContextProps {
  accessibility: AccessibilityState
  setAccessibility: (newState: Partial<AccessibilityState>) => void
}

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined)

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [accessibility, setAccessibilityState] = useState<AccessibilityState>({
    dyslexiaFont: false,
    textToSpeech: false,
    signLanguage: false,
  })

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