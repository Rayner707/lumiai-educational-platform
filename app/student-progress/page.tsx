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
    TrendingUp,
    Award,
    Target,
    BookOpen,
    Calendar,
    Star,
    Trophy,
    Medal,
    Zap,
    FlameIcon as Fire,
    CheckCircle,
    BarChart3,
    ActivityIcon,
    Sparkles,
    GraduationCap,
    Download,
    Share2,
    Settings,
    Eye,
    ArrowUp,
    ArrowDown,
    Minus,
} from "lucide-react"

interface SubjectProgress {
    name: string
    progress: number
    grade: string
    color: string
    icon: React.ReactNode
    weeklyHours: number
    completedLessons: number
    totalLessons: number
    lastActivity: string
    trend: "up" | "down" | "stable"
    trendValue: number
}

interface Achievement {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    category: string
    dateEarned: string
    rarity: "common" | "rare" | "epic" | "legendary"
    points: number
}

interface RecentActivity {
    id: string
    type: string
    subject: string
    description: string
    timestamp: string
    points: number
    success: boolean
}

export default function StudentProgress() {
    const [darkMode, setDarkMode] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState("month")
    const [selectedSubject, setSelectedSubject] = useState("all")

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
    }

    const subjectProgress: SubjectProgress[] = [
        {
            name: "Matemáticas",
            progress: 85,
            grade: "A",
            color: "bg-blue-500",
            icon: <Target className="h-5 w-5" />,
            weeklyHours: 8.5,
            completedLessons: 34,
            totalLessons: 40,
            lastActivity: "Hace 2 horas",
            trend: "up",
            trendValue: 12,
        },
        {
            name: "Ciencias Naturales",
            progress: 78,
            grade: "B+",
            color: "bg-green-500",
            icon: <BookOpen className="h-5 w-5" />,
            weeklyHours: 6.2,
            completedLessons: 28,
            totalLessons: 35,
            lastActivity: "Ayer",
            trend: "up",
            trendValue: 8,
        },
        {
            name: "Lenguaje",
            progress: 92,
            grade: "A+",
            color: "bg-purple-500",
            icon: <BookOpen className="h-5 w-5" />,
            weeklyHours: 7.8,
            completedLessons: 41,
            totalLessons: 45,
            lastActivity: "Hace 1 hora",
            trend: "up",
            trendValue: 5,
        },
        {
            name: "Historia",
            progress: 73,
            grade: "B",
            color: "bg-orange-500",
            icon: <BookOpen className="h-5 w-5" />,
            weeklyHours: 4.5,
            completedLessons: 22,
            totalLessons: 30,
            lastActivity: "Hace 3 días",
            trend: "stable",
            trendValue: 0,
        },
        {
            name: "Geografía",
            progress: 67,
            grade: "B-",
            color: "bg-teal-500",
            icon: <BookOpen className="h-5 w-5" />,
            weeklyHours: 3.8,
            completedLessons: 18,
            totalLessons: 27,
            lastActivity: "Hace 2 días",
            trend: "down",
            trendValue: -3,
        },
        {
            name: "Inglés",
            progress: 88,
            grade: "A",
            color: "bg-indigo-500",
            icon: <BookOpen className="h-5 w-5" />,
            weeklyHours: 5.5,
            completedLessons: 31,
            totalLessons: 35,
            lastActivity: "Hace 4 horas",
            trend: "up",
            trendValue: 15,
        },
    ]

const achievements: Achievement[] = [
    {
        id: "1",
        title: "Matemático Estrella",
        description: "Completaste 30 lecciones de matemáticas consecutivas",
        icon: <Star className="h-6 w-6" />,
        category: "Matemáticas",
        dateEarned: "2024-01-15",
        rarity: "epic",
        points: 500,
    },
    {
        id: "2",
        title: "Racha de Fuego",
        description: "7 días consecutivos de estudio",
        icon: <Fire className="h-6 w-6" />,
        category: "Constancia",
        dateEarned: "2024-01-12",
        rarity: "rare",
        points: 300,
    },
    {
        id: "3",
        title: "Científico Curioso",
        description: "Realizaste 50 experimentos virtuales",
        icon: <Zap className="h-6 w-6" />,
        category: "Ciencias",
        dateEarned: "2024-01-10",
        rarity: "rare",
        points: 350,
    },
    {
        id: "4",
        title: "Maestro de Palabras",
        description: "Vocabulario perfecto en 10 lecciones seguidas",
        icon: <Trophy className="h-6 w-6" />,
        category: "Lenguaje",
        dateEarned: "2024-01-08",
        rarity: "legendary",
        points: 750,
    },
    {
        id: "5",
        title: "Explorador del Tiempo",
        description: "Completaste toda la unidad de Historia Antigua",
        icon: <Medal className="h-6 w-6" />,
        category: "Historia",
        dateEarned: "2024-01-05",
        rarity: "common",
        points: 150,
    },
    {
        id: "6",
        title: "Políglota Junior",
        description: "Dominaste 100 palabras en inglés",
        icon: <GraduationCap className="h-6 w-6" />,
        category: "Inglés",
        dateEarned: "2024-01-03",
        rarity: "epic",
        points: 450,
    },
]

const recentActivities: RecentActivity[] = [
    {
        id: "1",
        type: "Quiz",
        subject: "Matemáticas",
        description: "Completaste el quiz de Álgebra Básica",
        timestamp: "Hace 2 horas",
        points: 85,
        success: true,
    },
    {
        id: "2",
        type: "Lección",
        subject: "Lenguaje",
        description: "Terminaste la lección de Gramática Avanzada",
        timestamp: "Hace 3 horas",
        points: 75,
        success: true,
    },
    {
        id: "3",
        type: "Práctica",
        subject: "Ciencias",
        description: "Realizaste el experimento de Fotosíntesis",
        timestamp: "Ayer",
        points: 90,
        success: true,
    },
    {
        id: "4",
        type: "Quiz",
        subject: "Historia",
        description: "Intentaste el quiz de Revolución Industrial",
        timestamp: "Hace 2 días",
        points: 45,
        success: false,
    },
    {
        id: "5",
        type: "Lección",
        subject: "Inglés",
        description: "Completaste Vocabulario: Profesiones",
        timestamp: "Hace 3 días",
        points: 80,
        success: true,
    },
]

const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case "common":
            return "bg-gray-100 text-gray-800 border-gray-300"
        case "rare":
            return "bg-blue-100 text-blue-800 border-blue-300"
        case "epic":
            return "bg-purple-100 text-purple-800 border-purple-300"
        case "legendary":
            return "bg-yellow-100 text-yellow-800 border-yellow-300"
        default:
            return "bg-gray-100 text-gray-800 border-gray-300"
    }
}

const getTrendIcon = (trend: string) => {
    switch (trend) {
        case "up":
            return <ArrowUp className="h-4 w-4 text-green-600" />
        case "down":
            return <ArrowDown className="h-4 w-4 text-red-600" />
        default:
            return <Minus className="h-4 w-4 text-gray-600" />
    }
}

const overallProgress = Math.round(
    subjectProgress.reduce((acc, subject) => acc + subject.progress, 0) / subjectProgress.length,
)
const totalPoints = achievements.reduce((acc, achievement) => acc + achievement.points, 0)
const totalHours = subjectProgress.reduce((acc, subject) => acc + subject.weeklyHours, 0)

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
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-800 dark:text-green-200 text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Progreso en tiempo real
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Tu Progreso
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Académico
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Descubre cómo has avanzado en tus estudios, celebra tus logros y encuentra áreas de mejora para seguir
            creciendo.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{overallProgress}%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Progreso General</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{achievements.length}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Logros Obtenidos</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{totalPoints.toLocaleString()}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Puntos Totales</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">{totalHours.toFixed(1)}h</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Horas Semanales</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-48 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <SelectValue placeholder="Materia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Materias</SelectItem>
              {subjectProgress.map((subject) => (
                <SelectItem key={subject.name} value={subject.name.toLowerCase()}>
                  {subject.name}
                </SelectItem>
              ))}
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
            {/* Subject Progress */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Progreso por Materias
                </CardTitle>
                <CardDescription className="text-lg">Tu rendimiento en cada área de estudio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectProgress.map((subject) => (
                    <div key={subject.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${subject.color.replace("bg-", "bg-").replace("-500", "-100")} dark:${subject.color.replace("bg-", "bg-").replace("-500", "-900/30")}`}
                          >
                            {subject.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{subject.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {subject.completedLessons}/{subject.totalLessons} lecciones • {subject.lastActivity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-lg font-bold">
                              {subject.grade}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              {getTrendIcon(subject.trend)}
                              <span
                                className={`text-sm font-medium ${
                                  subject.trend === "up"
                                    ? "text-green-600"
                                    : subject.trend === "down"
                                      ? "text-red-600"
                                      : "text-gray-600"
                                }`}
                              >
                                {subject.trend !== "stable" &&
                                  `${subject.trendValue > 0 ? "+" : ""}${subject.trendValue}%`}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{subject.weeklyHours}h/semana</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <ActivityIcon className="h-6 w-6 mr-3 text-green-600" />
                  Actividad Reciente
                </CardTitle>
                <CardDescription className="text-lg">Tus últimas actividades de aprendizaje</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                      >
                        <div
                          className={`p-2 rounded-full ${activity.success ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                        >
                          {activity.success ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{activity.description}</h4>
                            <Badge variant="outline" className="text-xs">
                              +{activity.points} pts
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Badge variant="secondary" className="text-xs">
                              {activity.type}
                            </Badge>
                            <span>•</span>
                            <span>{activity.subject}</span>
                            <span>•</span>
                            <span>{activity.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Logros Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="p-4 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getRarityColor(achievement.rarity)} border-2`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{achievement.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {achievement.category}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Sparkles className="h-3 w-3 text-yellow-600" />
                                <span className="text-xs font-medium">{achievement.points} pts</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator className="my-4" />
                <Button className="w-full rounded-full bg-transparent" variant="outline">
                  <Trophy className="h-4 w-4 mr-2" />
                  Ver Todos los Logros
                </Button>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Metas de la Semana
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estudiar 25 horas</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">18/25h</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completar 15 lecciones</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Obtener 3 logros</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">2/3</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>

                <Separator />

                <Button className="w-full rounded-full bg-transparent" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Personalizar Metas
                </Button>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-sm border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
                  <Fire className="h-5 w-5 mr-2" />
                  Racha de Estudio
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">7</div>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">días consecutivos</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  ¡Sigue así! Estás a 3 días de tu récord personal
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-800 dark:text-blue-200 text-lg font-medium mb-6">
            <Eye className="h-5 w-5 mr-2" />
            Comparte tu progreso
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">¡Celebra tus Logros!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Comparte tu progreso con familia y amigos, o programa una sesión de estudio para seguir mejorando
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Compartir Progreso
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
