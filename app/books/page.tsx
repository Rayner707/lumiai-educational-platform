"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Activity {
  title: string
  description: string
  video?: string
}

interface Book {
  id: string
  grade: string
  subject: string
  unit: number
  title: string
  activities: Activity[]
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, "books"))
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[]
      setBooks(data)
    }

    fetchBooks()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-blue-600" />
        Libros Disponibles
      </h1>

      <div className="grid gap-6">
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle className="text-xl">
                {book.title} - Unidad {book.unit}
              </CardTitle>
              <CardDescription>
                <span className="font-medium">{book.grade}</span> •{" "}
                <span className="text-sm text-muted-foreground">{book.subject}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {book.activities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium text-blue-700">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <Badge variant="secondary">{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}