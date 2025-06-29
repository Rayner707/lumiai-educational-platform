"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Moon,
    Sun,
    User,
    Brain,
    Menu,
    X,
    Target,
    BookOpen,
    Clock,
    TrendingUp,
    TrendingDown,
    Lightbulb,
    ArrowRight,
    BarChart3,
    PieChart,
    Calendar,
    Star,
    AlertCircle,
    ThumbsUp,
    Zap,
    BookMarked,
    PlayCircle,
    FileText,
    Sparkles,
    ChevronRight,
    Trophy,
    RefreshCw,
    Download,
    Share2,
} from "lucide-react"

interface QuizResult {
    id: string
    title: string
    subject: string
    score: number
    maxScore: number
    percentage: number
    timeSpent: number
    completedAt: string
    difficulty: "Fácil" | "Medio" | "Difícil"
    topics: string[]
    correctAnswers: number
    totalQuestions: number
    status: "excellent" | "good" | "needs_improvement" | "poor"
}

interface TopicAnalysis {
    topic: string
    subject: string
    correctAnswers: number
    totalQuestions: number
    percentage: number
    trend: "improving" | "stable" | "declining"
    lastAttempt: string
}

interface Recommendation {
    id: string
    type: "study" | "practice" | "review" | "challenge"
    priority: "high" | "medium" | "low"
    title: string
    description: string
    subject: string
    estimatedTime: string
    difficulty: string
    icon: React.ReactNode
    action: string
    resources: string[]
}

export default function QuizResults() {
    const [darkMode, setDarkMode] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState("all")
    const [selectedPeriod, setSelectedPeriod] = useState("month")

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
    }

    const quizResults: QuizResult[] = [
    {
        id: "1",
        title: "Álgebra Básica - Ecuaciones Lineales",
        subject: "Matemáticas",
        score: 85,
        maxScore: 100,
        percentage: 85,
        timeSpent: 25,
        completedAt: "2024-01-15T10:30:00",
        difficulty: "Medio",
        topics: ["Ecuaciones lineales", "Despeje de variables", "Sistemas de ecuaciones"],
        correctAnswers: 17,
        totalQuestions: 20,
        status: "good",
    },
    {
        id: "2",
        title: "Fotosíntesis y Respiración Celular",
        subject: "Ciencias Naturales",
        score: 92,
        maxScore: 100,
        percentage: 92,
        timeSpent: 18,
        completedAt: "2024-01-14T15:45:00",
        difficulty: "Medio",
        topics: ["Fotosíntesis", "Respiración celular", "Ciclo del carbono"],
        correctAnswers: 23,
        totalQuestions: 25,
        status: "excellent",
    },
    {
        id: "3",
        title: "Gramática: Tiempos Verbales",
        subject: "Lenguaje",
        score: 78,
        maxScore: 100,
        percentage: 78,
        timeSpent: 22,
        completedAt: "2024-01-13T09:15:00",
        difficulty: "Fácil",
        topics: ["Presente", "Pasado", "Futuro", "Condicional"],
        correctAnswers: 14,
        totalQuestions: 18,
        status: "good",
    },
    {
        id: "4",
        title: "Revolución Industrial",
        subject: "Historia",
        score: 65,
        maxScore: 100,
        percentage: 65,
        timeSpent: 30,
        completedAt: "2024-01-12T14:20:00",
        difficulty: "Difícil",
        topics: ["Causas", "Consecuencias", "Inventos", "Cambios sociales"],
        correctAnswers: 13,
        totalQuestions: 20,
        status: "needs_improvement",
    },
    {
        id: "5",
        title: "Geografía de Bolivia",
        subject: "Geografía",
        score: 88,
        maxScore: 100,
        percentage: 88,
        timeSpent: 20,
        completedAt: "2024-01-11T11:00:00",
        difficulty: "Fácil",
        topics: ["Departamentos", "Capitales", "Relieve", "Clima"],
        correctAnswers: 22,
        totalQuestions: 25,
        status: "excellent",
    },
    {
        id: "6",
        title: "Present Perfect Tense",
        subject: "Inglés",
        score: 72,
        maxScore: 100,
        percentage: 72,
        timeSpent: 28,
        completedAt: "2024-01-10T16:30:00",
        difficulty: "Medio",
        topics: ["Present Perfect", "Past Participle", "Time expressions"],
        correctAnswers: 18,
        totalQuestions: 25,
        status: "good",
    },
]

    const topicAnalysis: TopicAnalysis[] = [
    {
        topic: "Ecuaciones lineales",
        subject: "Matemáticas",
        correctAnswers: 45,
        totalQuestions: 52,
        percentage: 87,
        trend: "improving",
        lastAttempt: "Hace 1 día",
    },
    {
        topic: "Fotosíntesis",
        subject: "Ciencias Naturales",
        correctAnswers: 38,
        totalQuestions: 40,
        percentage: 95,
        trend: "stable",
        lastAttempt: "Hace 2 días",
    },
    {
        topic: "Tiempos verbales",
        subject: "Lenguaje",
        correctAnswers: 32,
        totalQuestions: 45,
        percentage: 71,
        trend: "declining",
        lastAttempt: "Hace 3 días",
    },
    {
        topic: "Revolución Industrial",
        subject: "Historia",
        correctAnswers: 28,
        totalQuestions: 45,
        percentage: 62,
        trend: "declining",
        lastAttempt: "Hace 4 días",
    },
    {
        topic: "Present Perfect",
        subject: "Inglés",
        correctAnswers: 35,
        totalQuestions: 48,
        percentage: 73,
        trend: "improving",
        lastAttempt: "Hace 5 días",
    },
]

const recommendations: Recommendation[] = [
    {
        id: "1",
        type: "study",
        priority: "high",
        title: "Reforzar Historia: Revolución Industrial",
        description:
            "Tu rendimiento en Historia ha bajado. Te recomiendo revisar los conceptos clave de la Revolución Industrial y practicar con ejercicios adicionales.",
        subject: "Historia",
        estimatedTime: "45 min",
        difficulty: "Medio",
        icon: <BookOpen className="h-5 w-5" />,
        action: "Estudiar Ahora",
        resources: ["Video explicativo", "Resumen interactivo", "Línea de tiempo"],
    },
    {
        id: "2",
        type: "practice",
        priority: "high",
        title: "Practicar Tiempos Verbales en Lenguaje",
        description:
            "Has mostrado dificultades con los tiempos verbales. Practica con ejercicios específicos para mejorar tu comprensión.",
        subject: "Lenguaje",
        estimatedTime: "30 min",
        difficulty: "Fácil",
        icon: <Target className="h-5 w-5" />,
        action: "Practicar",
        resources: ["Ejercicios interactivos", "Conjugador de verbos", "Quiz de práctica"],
    },
    {
        id: "3",
        type: "challenge",
        priority: "medium",
        title: "Desafío: Matemáticas Avanzadas",
        description:
            "¡Excelente trabajo en Álgebra! Estás listo para enfrentar problemas más complejos y avanzar al siguiente nivel.",
        subject: "Matemáticas",
        estimatedTime: "60 min",
        difficulty: "Difícil",
        icon: <Trophy className="h-5 w-5" />,
        action: "Aceptar Desafío",
        resources: ["Problemas avanzados", "Competencia matemática", "Certificación"],
    },
    {
        id: "4",
        type: "review",
        priority: "medium",
        title: "Repasar Present Perfect en Inglés",
        description:
            "Tu comprensión del Present Perfect está mejorando. Un repaso rápido te ayudará a consolidar el conocimiento.",
        subject: "Inglés",
        estimatedTime: "20 min",
        difficulty: "Fácil",
        icon: <RefreshCw className="h-5 w-5" />,
        action: "Repasar",
        resources: ["Gramática interactiva", "Ejemplos prácticos", "Audio pronunciación"],
    },
    {
        id: "5",
        type: "study",
        priority: "low",
        title: "Explorar Temas Avanzados de Ciencias",
        description:
            "Tu rendimiento en Ciencias es excelente. Te sugerimos explorar temas más avanzados como biología molecular.",
        subject: "Ciencias Naturales",
        estimatedTime: "40 min",
        difficulty: "Difícil",
        icon: <Zap className="h-5 w-5" />,
        action: "Explorar",
        resources: ["Laboratorio virtual", "Simulaciones", "Documentales"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-300"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "needs_improvement":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "poor":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent":
        return "Excelente"
      case "good":
        return "Bueno"
      case "needs_improvement":
        return "Mejorar"
      case "poor":
        return "Deficiente"
      default:
        return "N/A"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Target className="h-4 w-4 text-gray-600" />
    }
  }

  const averageScore = Math.round(quizResults.reduce((acc, quiz) => acc + quiz.percentage, 0) / quizResults.length)
  const totalQuizzes = quizResults.length
  const excellentQuizzes = quizResults.filter((quiz) => quiz.status === "excellent").length
  const totalTimeSpent = quizResults.reduce((acc, quiz) => acc + quiz.timeSpent, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <a href="./">LumiAI</a>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="outline" className="rounded-full bg-transparent">
                <User className="h-4 w-4 mr-2" />
                María González
              </Button>
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
                <Button variant="outline" className="justify-start bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  María González
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-800 dark:text-purple-200 text-sm font-medium mb-6">
            <BarChart3 className="h-4 w-4 mr-2" />
            Análisis detallado de rendimiento
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Resultados de
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quizzes
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Analiza tu rendimiento en los quizzes, identifica áreas de mejora y recibe recomendaciones personalizadas
            para optimizar tu aprendizaje.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{averageScore}%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Promedio General</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{totalQuizzes}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Completados</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{excellentQuizzes}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resultados Excelentes</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">{totalTimeSpent}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Minutos Totales</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-48 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <SelectValue placeholder="Materia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Materias</SelectItem>
              <SelectItem value="matemáticas">Matemáticas</SelectItem>
              <SelectItem value="ciencias">Ciencias Naturales</SelectItem>
              <SelectItem value="lenguaje">Lenguaje</SelectItem>
              <SelectItem value="historia">Historia</SelectItem>
              <SelectItem value="geografía">Geografía</SelectItem>
              <SelectItem value="inglés">Inglés</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-48 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quiz Results */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <PieChart className="h-6 w-6 mr-3 text-blue-600" />
                  Historial de Quizzes
                </CardTitle>
                <CardDescription className="text-lg">
                  Resultados detallados de tus evaluaciones recientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quizResults.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <Badge variant="outline">{quiz.subject}</Badge>
                            <Badge variant="outline">{quiz.difficulty}</Badge>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {quiz.timeSpent} min
                            </span>
                            <span>{new Date(quiz.completedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold mb-1">
                            {quiz.score}/{quiz.maxScore}
                          </div>
                          <Badge className={`${getStatusColor(quiz.status)} border-2`}>
                            {getStatusText(quiz.status)}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span className="font-medium">{quiz.percentage}%</span>
                        </div>
                        <Progress value={quiz.percentage} className="h-3" />

                        <div className="flex items-center justify-between text-sm">
                          <span>Respuestas correctas</span>
                          <span className="font-medium">
                            {quiz.correctAnswers}/{quiz.totalQuestions}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {quiz.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topic Analysis */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Target className="h-6 w-6 mr-3 text-green-600" />
                  Análisis por Temas
                </CardTitle>
                <CardDescription className="text-lg">Tu rendimiento en diferentes temas y conceptos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topicAnalysis.map((topic, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold">{topic.topic}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {topic.subject} • {topic.lastAttempt}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex items-center space-x-3">
                          <div>
                            <div className="text-lg font-bold">{topic.percentage}%</div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {topic.correctAnswers}/{topic.totalQuestions}
                            </p>
                          </div>
                          {getTrendIcon(topic.trend)}
                        </div>
                      </div>
                      <Progress value={topic.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                  Recomendaciones IA
                </CardTitle>
                <CardDescription>Sugerencias personalizadas para mejorar</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-4 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">{rec.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">{rec.title}</h4>
                              <Badge className={`${getPriorityColor(rec.priority)} text-xs border-2`}>
                                {rec.priority === "high" ? "Alta" : rec.priority === "medium" ? "Media" : "Baja"}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                              <span>{rec.estimatedTime}</span>
                              <span>{rec.difficulty}</span>
                            </div>
                            <div className="space-y-2">
                              <Button size="sm" className="w-full rounded-full text-xs">
                                {rec.action}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                              <div className="flex flex-wrap gap-1">
                                {rec.resources.map((resource, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {resource}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
                  <Star className="h-5 w-5 mr-2" />
                  Resumen de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Fortalezas</span>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Ciencias, Matemáticas</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Áreas de mejora</span>
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-orange-600">Historia, Lenguaje</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">B+</div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Calificación Promedio</p>
                  </div>

                  <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Reporte Completo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 backdrop-blur-sm border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
                  <ChevronRight className="h-5 w-5 mr-2" />
                  Próximos Pasos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <BookMarked className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Estudiar Historia</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Revolución Industrial</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <PlayCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Practicar Lenguaje</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Tiempos verbales</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Desafío Matemáticas</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Nivel avanzado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-800 dark:text-purple-200 text-lg font-medium mb-6">
            <Sparkles className="h-5 w-5 mr-2" />
            Sigue mejorando con IA
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">¡Continúa tu Progreso!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Usa nuestras recomendaciones personalizadas para seguir mejorando y alcanzar tus metas académicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold"
            >
              <Target className="h-5 w-5 mr-2" />
              Seguir Recomendaciones
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-3 text-lg font-semibold bg-transparent">
              <Calendar className="h-5 w-5 mr-2" />
              Programar Estudio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
