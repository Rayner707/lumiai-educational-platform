import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "./firebase"

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    throw error
  }
}

export const signOutUser = async () => {
  try {
    await signOut(auth)
    console.log("Sesión cerrada")
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
  }
}