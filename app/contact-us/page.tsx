"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Moon,
  Sun,
  User,
  Brain,
  Menu,
  X,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  HelpCircle,
  Send,
  MapPin,
  Globe,
  Settings,
  AlertTriangle,
  Heart,
  Headphones,
  FileText,
  Lock,
  Eye,
  UserCheck,
  Calendar,
  Accessibility,
  Link,
} from "lucide-react"

export default function ContactUs() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", contactForm)
  }

  const handleInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  const faqData = [
    {
      question: "¿Cómo funciona el control parental en LumiAI?",
      answer:
        "Los padres pueden crear cuentas supervisoras que les permiten monitorear el progreso de sus hijos, establecer límites de tiempo de uso, revisar las conversaciones con la IA, y recibir reportes semanales de actividad. También pueden bloquear ciertos temas o configurar filtros de contenido apropiados para la edad.",
    },
    {
      question: "¿Es seguro que mi hijo use LumiAI?",
      answer:
        "Absolutamente. LumiAI está diseñado específicamente para estudiantes con múltiples capas de seguridad: filtros de contenido apropiado para la edad, moderación automática de conversaciones, encriptación de datos, y cumplimiento con regulaciones de privacidad infantil. Todos los datos se almacenan de forma segura y nunca se comparten con terceros.",
    },
    {
      question: "¿Qué materias y grados están disponibles?",
      answer:
        "LumiAI cubre todas las materias del currículo boliviano desde 1° hasta 12° grado, incluyendo Matemáticas, Ciencias Naturales, Lenguaje, Historia, Geografía, Inglés, Educación Física y Arte. El contenido está alineado con los estándares educativos del Ministerio de Educación de Bolivia.",
    },
    {
      question: "¿Cómo puedo monitorear el progreso de mi hijo?",
      answer:
        "A través del panel de control parental, puedes ver estadísticas detalladas del tiempo de estudio, materias practicadas, puntuaciones en cuestionarios, logros obtenidos, y áreas que necesitan más atención. También recibes reportes semanales por email con resúmenes del progreso.",
    },
    {
      question: "¿Qué hago si mi hijo encuentra contenido inapropiado?",
      answer:
        "Puedes reportar cualquier contenido inapropiado inmediatamente a través del botón de reporte en la plataforma o contactándonos directamente. Investigamos todos los reportes en menos de 24 horas y tomamos medidas correctivas inmediatas. También puedes ajustar los filtros de contenido desde el panel parental.",
    },
    {
      question: "¿LumiAI funciona sin conexión a internet?",
      answer:
        "Algunas funciones básicas como revisar progreso guardado y acceder a contenido descargado previamente están disponibles sin conexión. Sin embargo, las funciones de IA, cuestionarios en tiempo real, y sincronización de progreso requieren conexión a internet.",
    },
    {
      question: "¿Cuánto cuesta usar LumiAI?",
      answer:
        "LumiAI ofrece un plan gratuito con funciones básicas y planes premium con características avanzadas. Los planes familiares incluyen múltiples cuentas de estudiantes con un solo panel de control parental. Consulta nuestra página de precios para más detalles.",
    },
    {
      question: "¿Cómo puedo cancelar mi suscripción?",
      answer:
        "Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta o contactándonos directamente. No hay penalizaciones por cancelación y mantienes acceso hasta el final de tu período de facturación actual.",
    },
  ]

  const supportCategories = [
    { value: "technical", label: "Soporte Técnico" },
    { value: "parental", label: "Control Parental" },
    { value: "billing", label: "Facturación" },
    { value: "content", label: "Contenido Educativo" },
    { value: "accessibility", label: "Accesibilidad" },
    { value: "other", label: "Otro" },
  ]

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
                <a href="./accessibility-mode">LumiAI</a>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="outline" className="rounded-full bg-transparent">
                <User className="h-4 w-4 mr-2" />
                Iniciar Sesión
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
                  Iniciar Sesión
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
            <Headphones className="h-4 w-4 mr-2" />
            Soporte 24/7 disponible
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Necesitas Ayuda?
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Estamos Aquí
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Nuestro equipo de soporte está dedicado a ayudarte a aprovechar al máximo LumiAI. Encuentra respuestas
            rápidas o contáctanos directamente.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chat en Vivo</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Respuesta inmediata de nuestros expertos</p>
              <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">Iniciar Chat</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">soporte@lumiai.bo</p>
              <Button variant="outline" className="w-full rounded-full bg-transparent">
                Enviar Email
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">+591 2 123-4567</p>
              <Button variant="outline" className="w-full rounded-full bg-transparent">
                Llamar Ahora
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Send className="h-6 w-6 mr-3 text-blue-600" />
                  Envíanos un Mensaje
                </CardTitle>
                <CardDescription className="text-lg">
                  Completa el formulario y te responderemos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input
                        id="name"
                        placeholder="Tu nombre"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select
                        value={contactForm.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto</Label>
                      <Input
                        id="subject"
                        placeholder="Breve descripción del tema"
                        value={contactForm.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe tu consulta o problema en detalle..."
                      value={contactForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="rounded-lg min-h-32"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Parental Controls Section */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Shield className="h-6 w-6 mr-3 text-green-600" />
                  Control Parental
                </CardTitle>
                <CardDescription className="text-lg">
                  Herramientas para que los padres supervisen y guíen el aprendizaje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <Eye className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Monitoreo de Actividad</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Ve qué materias estudia tu hijo, tiempo dedicado y progreso en tiempo real
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Límites de Tiempo</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Establece horarios de estudio y descanso para un uso equilibrado
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <Lock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Filtros de Contenido</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Controla qué temas y tipos de contenido puede acceder tu hijo
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Reportes Semanales</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Recibe resúmenes detallados del progreso y áreas de mejora
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Alertas Inteligentes</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Notificaciones sobre dificultades o logros importantes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                        <UserCheck className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Múltiples Perfiles</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Gestiona varios hijos desde una sola cuenta parental
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="text-center">
                  <Button size="lg" className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8">
                    <Settings className="h-5 w-5 mr-2" />
                    Configurar Control Parental
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Hours */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Lunes - Viernes</span>
                  <Badge variant="secondary">8:00 - 20:00</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sábados</span>
                  <Badge variant="secondary">9:00 - 17:00</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Domingos</span>
                  <Badge variant="outline">Cerrado</Badge>
                </div>
                <Separator />
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">En línea ahora</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">soporte@lumiai.bo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">+591 2 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Av. Arce 2345, La Paz, Bolivia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Sitio Web</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">www.lumiai.bo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="shadow-lg border-0 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-red-800 dark:text-red-200">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Contacto de Emergencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  Para problemas urgentes de seguridad o contenido inapropiado:
                </p>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Línea de Emergencia
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <HelpCircle className="h-6 w-6 mr-3 text-orange-600" />
              Preguntas Frecuentes
            </CardTitle>
            <CardDescription className="text-lg">
              Encuentra respuestas rápidas a las consultas más comunes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-800 dark:text-blue-200 text-lg font-medium mb-6">
            <Heart className="h-5 w-5 mr-2" />
            Tu éxito es nuestra prioridad
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">¿Aún tienes dudas?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a aprovechar al máximo LumiAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Iniciar Chat Ahora
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-3 text-lg font-semibold bg-transparent">
              <Calendar className="h-5 w-5 mr-2" />
              Agendar Llamada
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
