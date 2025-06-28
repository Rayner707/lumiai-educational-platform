"use client"

import { useState } from "react"
import { useAccessibility } from "@/components/context/accessibility-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Eye,
  User,
  Accessibility,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Heart,
  CheckCircle,
} from "lucide-react"

export default function AccessibilityMode() {
  const { accessibility, setAccessibility, resetAccessibility } = useAccessibility()
  const dyslexiaFont = accessibility.dyslexiaFont
  const textToSpeech = accessibility.textToSpeech
  const signLanguage = accessibility.signLanguage
  const [fontSize, setFontSize] = useState(16)
  const [isReading, setIsReading] = useState(false)
  const [selectedText, setSelectedText] = useState("")

  const handleFontSizeIncrease = () => {
    if (fontSize < 24) setFontSize(fontSize + 2)
  }

  const handleFontSizeDecrease = () => {
    if (fontSize > 12) setFontSize(fontSize - 2)
  }

  const handleTextToSpeech = () => {
    setIsReading(!isReading)
    if (!isReading) {
      // Simulate TTS activation
      setSelectedText("Modo de accesibilidad activado. Puedes seleccionar cualquier texto para escucharlo.")
    }
  }

  const fontClass = dyslexiaFont ? "font-lexend" : "font-sans"
  const { toast } = useToast()

  const handleSave = () => {
    toast({
        title: "Configuración guardada",
        description: "Tus preferencias de accesibilidad han sido almacenadas correctamente.",
    })
  }

  const handleReset = () => {
    resetAccessibility()
    toast({
        title: "Configuración restablecida",
        description: "Tus preferencias de accesibilidad han sido devueltas a su estado original.",
    })
  }

  const router = useRouter()

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 ${fontClass}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Custom font styles */}
      <style jsx global>{`
        .font-lexend {
          font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: 0.05em;
          line-height: 1.6;
        }
        
        .dyslexia-friendly {
          font-weight: 500;
          word-spacing: 0.2em;
          line-height: 1.8;
        }
        
        .avatar-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          position: relative;
          overflow: hidden;
        }
        
        .avatar-placeholder {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          animation: gentle-pulse 3s ease-in-out infinite;
        }
        
        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        .accessibility-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .accessibility-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="rounded-full bg-white/80 backdrop-blur-sm border-2 hover:bg-white"
            >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-lg font-semibold">Volver</span>
          </Button>

          <Badge variant="secondary" className="px-4 py-2 text-lg font-medium bg-blue-100 text-blue-800">
            <Accessibility className="h-5 w-5 mr-2" />
            Modo Activo
          </Badge>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-800 dark:text-green-200 text-lg font-medium mb-6">
            <Heart className="h-5 w-5 mr-2" />
            Diseñado para ti
          </div>
          <h1
            className={`text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 ${dyslexiaFont ? "dyslexia-friendly" : ""}`}
          >
            Modo de
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Accesibilidad
            </span>
          </h1>
          <p
            className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${dyslexiaFont ? "dyslexia-friendly" : ""}`}
          >
            Personaliza tu experiencia de aprendizaje para que sea cómoda y efectiva para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Dyslexia-Friendly Font */}
            <Card className="accessibility-card shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <Eye className="h-6 w-6 mr-3 text-purple-600" />
                  Fuente Amigable
                </CardTitle>
                <CardDescription className="text-lg">
                  Activa una fuente especial diseñada para facilitar la lectura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Label htmlFor="dyslexia-font" className="text-lg font-medium">
                      Fuente Lexend
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mejora la velocidad de lectura hasta un 25%
                    </p>
                  </div>
                  <Switch
                    id="dyslexia-font"
                    checked={dyslexiaFont}
                    onCheckedChange={(checked) => setAccessibility({ dyslexiaFont: checked })}
                  />
                </div>

                {dyslexiaFont && (
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      ¡Fuente activada! Ahora el texto es más fácil de leer.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Font Size Controls */}
            <Card className="accessibility-card shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <Settings className="h-6 w-6 mr-3 text-blue-600" />
                  Tamaño de Texto
                </CardTitle>
                <CardDescription className="text-lg">Ajusta el tamaño del texto según tu preferencia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleFontSizeDecrease}
                    disabled={fontSize <= 12}
                    className="rounded-full w-16 h-16 bg-transparent"
                  >
                    <Minus className="h-6 w-6" />
                  </Button>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{fontSize}px</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tamaño actual</p>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleFontSizeIncrease}
                    disabled={fontSize >= 24}
                    className="rounded-full w-16 h-16"
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className={`text-center ${dyslexiaFont ? "dyslexia-friendly" : ""}`}>
                    Texto de ejemplo para ver el tamaño actual
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Text-to-Speech */}
            <Card className="accessibility-card shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <Volume2 className="h-6 w-6 mr-3 text-green-600" />
                  Texto a Voz
                </CardTitle>
                <CardDescription className="text-lg">Escucha cualquier texto seleccionado en voz alta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={handleTextToSpeech}
                    size="lg"
                    className={`w-full rounded-full text-lg font-semibold py-6 ${
                      textToSpeech ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    {isReading ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pausar Lectura
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        {textToSpeech ? "Reanudar Lectura" : "Activar Lectura"}
                      </>
                    )}
                  </Button>

                  {selectedText && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">Texto seleccionado:</p>
                      <p className={`text-sm ${dyslexiaFont ? "dyslexia-friendly" : ""}`}>"{selectedText}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Sign Language Avatar */}
            <Card className="accessibility-card shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <User className="h-6 w-6 mr-3 text-indigo-600" />
                  Intérprete de Señas
                </CardTitle>
                <CardDescription className="text-lg">
                  Avatar virtual para interpretación en lengua de señas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="avatar-container">
                  <div className="avatar-placeholder">
                    <User className="h-16 w-16 text-white" />
                  </div>

                  {/* Floating elements for visual interest */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-4 w-1 h-1 bg-white/50 rounded-full animate-ping"></div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sign-language" className="text-lg font-medium">
                      Activar Intérprete
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interpretación visual de contenido</p>
                  </div>
                  <Switch
                    id="sign-language"
                    checked={signLanguage}
                    onCheckedChange={(checked) => setAccessibility({ signLanguage: checked })}
                  />
                </div>

                {signLanguage && (
                  <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                    <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                      Intérprete activado. El avatar interpretará el contenido seleccionado.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="accessibility-card shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <RotateCcw className="h-6 w-6 mr-3 text-orange-600" />
                  Acciones Rápidas
                </CardTitle>
                <CardDescription className="text-lg">Controles rápidos para una mejor experiencia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full text-lg py-6 bg-transparent"
                    >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Restablecer Configuración
                </Button>

                <Button variant="outline" size="lg" className="w-full rounded-full text-lg py-6 bg-transparent">
                  <VolumeX className="h-5 w-5 mr-2" />
                  Silenciar Todo
                </Button>

                <Separator />

                <div className="text-center space-y-2">
                  <p className={`text-lg font-medium ${dyslexiaFont ? "dyslexia-friendly" : ""}`}>¿Necesitas ayuda?</p>
                  <a href="./contact-us">
                    <Button variant="link" className="text-blue-600 text-lg">
                      Contactar Soporte
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-12 text-center">
          <Button
            onClick={handleSave}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full px-12 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CheckCircle className="h-6 w-6 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  )
}
