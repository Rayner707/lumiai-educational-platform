import { getApp } from "firebase/app"
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai"

const ai = getAI(getApp(), {
  backend: new GoogleAIBackend(),
})

export const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
})