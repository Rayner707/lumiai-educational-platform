"use client"

import { useEffect } from "react"
import { useAccessibility } from "@/components/context/accessibility-context"

export default function BodyStyleWrapper() {
  const { accessibility } = useAccessibility()

  useEffect(() => {
    document.body.classList.toggle("font-lexend", accessibility.dyslexiaFont)
    document.body.classList.toggle("font-sans", !accessibility.dyslexiaFont)
  }, [accessibility.dyslexiaFont])

  return null
}