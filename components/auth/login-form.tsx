"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Package, AlertCircle, User, Lock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface LoginFormProps {
  onLogin: () => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  // Usuarios predefinidos del sistema
  const users = [
    {
      id: "1",
      username: "admin",
      password: "admin",
      role: "admin",
      name: "Kevin Fernandez",
      email: "kfernan@espol.edu.ec",
      permissions: ["inventario", "trazabilidad", "gestion", "reportes", "configuracion"],
    },
    {
      id: "2",
      username: "contador",
      password: "contador123",
      role: "contador",
      name: "María García",
      email: "mgarcia@empresa.com",
      permissions: ["inventario", "gestion", "reportes"],
    },
    {
      id: "3",
      username: "bodega",
      password: "bodega123",
      role: "bodega",
      name: "Juan Pérez",
      email: "jperez@empresa.com",
      permissions: ["inventario", "trazabilidad"],
    },
    {
      id: "4",
      username: "ventas",
      password: "ventas123",
      role: "ventas",
      name: "Carlos López",
      email: "clopez@empresa.com",
      permissions: ["inventario", "reportes"],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simular delay de autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Validar credenciales
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      // Login exitoso
      login(user)
      onLogin()
    } else {
      // Credenciales incorrectas
      setError("Usuario o contraseña incorrectos")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (demoUser: string) => {
    const user = users.find((u) => u.username === demoUser)
    if (user) {
      setUsername(user.username)
      setPassword(user.password)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo y Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">IMPORTADORA</h1>
            <p className="text-blue-200 text-lg">EL MAYORISTA</p>
            <p className="text-slate-300 text-sm mt-2">Sistema de Gestión de Inventario</p>
          </div>
        </div>

        {/* Formulario de Login */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-slate-600">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700 font-medium">
                  Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Verificando...
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            {/* Usuarios de Demostración */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600 text-center mb-3">Usuarios de demostración:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("admin")}
                  className="text-xs bg-blue-50 border-blue-200 hover:bg-blue-100"
                >
                  <User className="w-3 h-3 mr-1" />
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("contador")}
                  className="text-xs bg-green-50 border-green-200 hover:bg-green-100"
                >
                  <User className="w-3 h-3 mr-1" />
                  Contador
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("bodega")}
                  className="text-xs bg-orange-50 border-orange-200 hover:bg-orange-100"
                >
                  <User className="w-3 h-3 mr-1" />
                  Bodega
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("ventas")}
                  className="text-xs bg-purple-50 border-purple-200 hover:bg-purple-100"
                >
                  <User className="w-3 h-3 mr-1" />
                  Ventas
                </Button>
              </div>
            </div>

            {/* Información de Credenciales */}
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600">
              <p className="font-medium mb-1">Credenciales por defecto:</p>
              <p>
                • Admin: usuario: <code className="bg-white px-1 rounded">admin</code> / contraseña:{" "}
                <code className="bg-white px-1 rounded">admin</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2024 Importadora El Mayorista. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
