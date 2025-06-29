import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"

// Tipos para claridad
type Activity = {
  title: string
  text: string
  videoUrl?: string
}

type Book = {
  grade: string
  subject: string
  unit: number
  unitTitle: string
  activities: Activity[]
}

// Ejemplo de contenido (puedes expandir esto)
const books: Book[] = [
  {
    grade: "primero",
    subject: "matematica",
    unit: 1,
    unitTitle: "Formas en nuestro entorno",
    activities: [
      {
        title: "Líneas que nos rodean",
        text: "Identificar y clasificar las líneas rectas y curvas.",
        videoUrl: "https://www.youtube.com/watch?v=kR-4tyRsQ1c",
      },
      {
        title: "Figuras y formas geométricas",
        text: "Reconocer figuras básicas en nuestro entorno.",
        videoUrl: "https://www.youtube.com/watch?v=EcDFbUkyDHI",
      },
    ],
  },
]

export async function seedBooks() {
  try {
    const booksCollection = collection(db, "books")
    for (const book of books) {
      const docId = `${book.grade}-${book.subject}-unit${book.unit}`
      const bookRef = doc(booksCollection, docId)
      await setDoc(bookRef, book)
      console.log(`✅ Libro guardado: ${docId}`)
    }
  } catch (error) {
    console.error("❌ Error al guardar los libros:", error)
  }
}