"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { signOutUser } from "@/lib/firebase-auth"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useAccessibility } from "@/components/context/accessibility-context"
import ReactMarkdown from "react-markdown"
import { model } from "@/lib/gemini"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { query, where } from "firebase/firestore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Moon,
  Sun,
  Send,
  BookOpen,
  Brain,
  Accessibility,
  Volume2,
  Eye,
  User,
  TrendingUp,
  Award,
  Target,
  MessageCircle,
  GraduationCap,
  Sparkles,
  Menu,
  X,
} from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  userAnswer?: number
  isAnswered: boolean
}

export default function LumiAI() {
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente de aprendizaje con IA. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const { accessibility, setAccessibility } = useAccessibility()
  const [showProgress, setShowProgress] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const user = useCurrentUser()
  

  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  const subjects = [
    "Matemáticas",
    "Ciencias Naturales",
    "Lenguaje",
    "Historia",
    "Geografía",
    "Inglés",
    "Educación Física",
    "Arte",
  ]

  const grades = Array.from({ length: 12 }, (_, i) => `${i + 1}° Grado`)

  const normalizeSubject = (uiValue: string) => {
    const map: Record<string, string> = {
      "Matemáticas": "matematica",
      "Ciencias Naturales": "ciencias",
      "Lenguaje": "lenguaje",
      "Historia": "historia",
      "Geografía": "geografia",
      "Inglés": "ingles",
      "Educación Física": "educacion-fisica",
      "Arte": "arte",
    }
    return map[uiValue] ?? uiValue.toLowerCase()
  }

  const normalizeGrade = (uiValue: string) => {
    const match = uiValue.match(/^(\d+)/)
    if (!match) return uiValue.toLowerCase()
    const number = parseInt(match[1])
    const grades = [
      "primero", "segundo", "tercero", "cuarto",
      "quinto", "sexto", "séptimo", "octavo",
      "noveno", "décimo", "undécimo", "duodécimo",
    ]
    return grades[number - 1] ?? uiValue.toLowerCase()
  }

  function extractYouTubeUrls(text: string): string[] {
    const regex = /https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s)]+/g
    return text.match(regex) || []
  }

  const handleGenerateQuiz = async () => {
    setIsLoading(true)

    try {
      const firestoreSubject = normalizeSubject(selectedSubject)
      const firestoreGrade = normalizeGrade(selectedGrade)

      const booksQuery = query(
        collection(db, "books"),
        where("grade", "==", firestoreGrade),
        where("subject", "==", firestoreSubject)
      )
      const snapshot = await getDocs(booksQuery)
      const context = snapshot.docs
        .map((doc) => {
          const data = doc.data() as any
          return data.activities.map((a: any) => `${a.title}: ${a.text}`).join("\n")
        })
        .join("\n")

      const lastTopic = messages
        .filter((msg) => msg.isUser)
        .slice(-2)
        .map((msg) => msg.content)
        .join(" ")

      const prompt = `
Tu tarea es generar 3 preguntas de opción múltiple sobre el tema: "${lastTopic}".
Materia: ${selectedSubject}
Grado: ${selectedGrade}

Formato JSON estricto, sin ningún texto adicional:
[
  {
    "question": "¿Cuál es la capital de Bolivia?",
    "options": ["La Paz", "Santa Cruz", "Cochabamba", "Sucre"],
    "correctAnswer": 0
  },
  {
    "question": "¿Cuál es el resultado de 2 + 3?",
    "options": ["4", "5", "6", "7"],
    "correctAnswer": 1
  },
  {
    "question": "¿Qué forma tiene una pelota?",
    "options": ["Cuadrada", "Triangular", "Ovalada", "Redonda"],
    "correctAnswer": 3
  }
]

Genera preguntas reales sobre el tema y asegúrate de seguir el formato estrictamente. No escribas texto introductorio ni explicación.
`

      const result = await model.generateContent(prompt)
      const raw = await result.response.text()
      const cleanRaw = raw.replace(/^```json|```$/g, "").trim()
      console.log("🧪 Quiz generado (clean):", cleanRaw)

      try {
        const parsed = JSON.parse(cleanRaw)

        const validated = parsed.filter((q: any) =>
          typeof q.question === "string" &&
          Array.isArray(q.options) &&
          typeof q.correctAnswer === "number"
        ).map((q: any, i: number): Quiz => ({
          id: Date.now().toString() + i,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          isAnswered: false,
        }))

        if (validated.length > 0) {
          setQuizzes(validated)
        } else {
          alert("No se pudo generar el cuestionario. Intenta de nuevo.")
        }
      } catch (e) {
        console.error("❌ Error parsing quiz:", e)
        alert("Ocurrió un error al generar el cuestionario.")
      }
    } catch (err) {
      console.error("Error generando quiz:", err)
      alert("Ocurrió un error al generar el cuestionario.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
  if (!chatInput.trim()) return

  const newMessage: Message = {
    id: Date.now().toString(),
    content: chatInput,
    isUser: true,
    timestamp: new Date(),
  }

  setMessages((prev) => [...prev, newMessage])
  setChatInput("")
  setIsLoading(true)

  try {
    const firestoreSubject = normalizeSubject(selectedSubject)
    const firestoreGrade = normalizeGrade(selectedGrade)

    const booksQuery = query(
      collection(db, "books"),
      where("grade", "==", firestoreGrade),
      where("subject", "==", firestoreSubject)
    )
    const snapshot = await getDocs(booksQuery)
    const context = snapshot.docs
      .map((doc) => {
        const data = doc.data() as any
        return data.activities.map((a: any) => {
          return `Actividad: ${a.title}
        Descripción: ${a.text}
        Video: ${a.videoUrl ?? "No disponible"}`
        }).join("\n\n")
      })
      .join("\n")

    const prompt = `
    Pregunta: "${chatInput}"
    Información educativa relevante:
    ${context}

    Responde de forma clara, amigable y didáctica como si hablaras con un estudiante boliviano.
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    const aiResponse: Message = {
      id: Date.now().toString(),
      content: responseText,
      isUser: false,
      timestamp: new Date(),
    }

      setMessages((prev) => [...prev, aiResponse])
    } catch (err) {
      console.error("Error con Gemini:", err)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Lo siento, hubo un problema al generar la respuesta.",
          isUser: false,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }


  const handleQuizAnswer = (quizId: string, answerIndex: number) => {
    // In a real app, this would update the quiz state
    console.log(`Quiz ${quizId} answered with option ${answerIndex}`)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}
    >
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LumiAI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    ¡Hola, {user.displayName?.split(" ")[0]}!
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={signOutUser}
                    className="text-xs text-red-600 dark:text-red-400 px-2"
                  >
                    Cerrar sesión
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="rounded-full bg-transparent"
                  onClick={() => router.push("/login")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" onClick={toggleDarkMode} className="justify-start">
                  {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {darkMode ? "Modo Claro" : "Modo Oscuro"}
                </Button>
                {user ? (
                  <div className="flex flex-col space-y-1 px-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      ¡Hola, {user.displayName?.split(" ")[0]}!
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="justify-start text-red-600 dark:text-red-400 px-0"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        signOutUser()
                      }}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      router.push("/login")
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Educación potenciada por IA
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Aprende Más Inteligente
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              con IA
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Descubre una nueva forma de aprender con herramientas de inteligencia artificial diseñadas especialmente
            para estudiantes bolivianos. Personaliza tu educación y alcanza tu máximo potencial.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <GraduationCap className="h-5 w-5 mr-2" />
            Comenzar a Aprender
          </Button>
        </div>

        {/* Subject and Grade Selection */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Selecciona tu Materia y Grado
            </CardTitle>
            <CardDescription>Personaliza tu experiencia de aprendizaje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Materia</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Selecciona una materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grado</Label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Selecciona tu grado" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl">
                    <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                    Asistente de Aprendizaje IA
                  </CardTitle>
                  <CardDescription>Haz preguntas sobre cualquier tema escolar</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                      <Accessibility className="h-4 w-4 mr-2" />
                      Accesibilidad
                    </Button>
                  </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Modo de Accesibilidad</DialogTitle>
                      <DialogDescription>Personaliza la interfaz según tus necesidades</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <Label htmlFor="dyslexia">Fuente para dislexia</Label>
                      </div>
                      <Switch
                        id="dyslexia"
                        checked={accessibility.dyslexiaFont}
                        onCheckedChange={(checked) =>
                        setAccessibility({ dyslexiaFont: checked })

                        }
                      />
                      </div>
                      <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-blue-600" />
                        <Label htmlFor="tts">Texto a voz</Label>
                      </div>
                      <Switch
                        id="tts"
                        checked={accessibility.textToSpeech}
                        onCheckedChange={(checked) =>
                        setAccessibility({ textToSpeech: checked })
                        }
                      />
                      </div>
                      <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <Label htmlFor="sign">Avatar de lengua de señas</Label>
                      </div>
                      <Switch
                        id="sign"
                        checked={accessibility.signLanguage}
                        onCheckedChange={(checked) =>
                        setAccessibility({ signLanguage: checked })
                        }
                      />
                      </div>
                      {accessibility.signLanguage && (
                      <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div className="w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      )}
                    </div>
                    <div className="pt-4 border-t mt-4">
                      <Button
                      variant="link"
                      className="text-blue-600 text-sm font-medium"
                      onClick={() => router.push("/accessibility-mode")}
                      >
                      Ver configuración avanzada
                      </Button>
                    </div>
                    </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.isUser
                              ? "bg-blue-600 text-white"
                              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border"
                          }`}
                        >
                          <div className="prose prose-sm max-w-none dark:prose-invert space-y-2">
                            <ReactMarkdown>{message.content}</ReactMarkdown>

                            {/* Si hay un video de YouTube, mostrarlo embebido */}
                            {extractYouTubeUrls(message.content).map((url, i) => {
                              const videoId = url.includes("watch?v=")
                                ? url.split("watch?v=")[1]
                                : url.split("/").pop()
                              return (
                                <div key={i} className="w-full aspect-video">
                                  <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg"
                                  />
                                </div>
                              )
                            })}
                          </div>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border animate-pulse">
                          <p className="text-sm italic">Pensando una respuesta…</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Escribe tu pregunta aquí..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="rounded-full"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card className="mt-8 shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Cuestionarios Generados por IA
                </CardTitle>
                <div className="flex items-center justify-between">
                  <CardDescription>Practica con preguntas personalizadas</CardDescription>
                  <Button
                    variant="default"
                    className="mt-2"
                    onClick={handleGenerateQuiz}
                  >
                    Generar preguntas para practicar
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                  >
                    <a href="./quiz-results">Ver anteriores</a>
                  </Button>
                </div>

              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {quizzes.map((quiz) => (
                    <Card key={quiz.id} className="border-2 border-gray-200 dark:border-gray-700">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-4">{quiz.question}</h3>
                        <div className="grid gap-2">
                          {quiz.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="justify-start h-auto p-3 text-left bg-transparent"
                              onClick={() => handleQuizAnswer(quiz.id, index)}
                            >
                              <span className="mr-3 font-semibold text-blue-600">
                                {String.fromCharCode(65 + index)}.
                              </span>
                              {option}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Mi Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">85%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Progreso General</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Matemáticas</span>
                    <Badge variant="secondary">92%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ciencias</span>
                    <Badge variant="secondary">78%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Lenguaje</span>
                    <Badge variant="secondary">85%</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-1 text-yellow-600" />
                    Logros Recientes
                  </h4>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-start">
                      🏆 Quiz Perfecto
                    </Badge>
                    <Badge variant="outline" className="w-full justify-start">
                      📚 5 Días Seguidos
                    </Badge>
                  </div>
                </div>

                <Button className="w-full rounded-full bg-transparent" variant="outline">
                  <a href="./student-progress">Ver Progreso Completo</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
