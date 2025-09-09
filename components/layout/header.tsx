"use client"

import { useState } from "react"
import { ChevronDown, User, Settings, LogOut, BookOpen, Code, Database, Layers, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { useApp } from "@/contexts/app-context"
import { NotificationBell } from "@/components/notifications/notification-bell"
import ProfileModal from "@/components/profile/profile-modal"

export default function Header() {
  const { user, logout } = useAuth()
  const { activeModule, setActiveModule } = useApp()
  const [showProfileModal, setShowProfileModal] = useState(false)

  const handleViewProfile = () => {
    setShowProfileModal(true)
  }

  const handleSettings = () => {
    setActiveModule("configuracion")
  }

  const handleLogout = () => {
    // Confirm logout action
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      logout()
    }
  }

  const getModuleInfo = () => {
    switch (activeModule) {
      case "dashboard":
        return { title: "Dashboard", description: "Resumen general del sistema" }
      case "inventario":
        return { title: "Gestión de Inventario", description: "Control y seguimiento de productos" }
      case "trazabilidad":
        return { title: "Trazabilidad", description: "Seguimiento de movimientos" }
      case "gestion":
        return { title: "Gestión", description: "Gestión de procesos" }
      case "reportes":
        return { title: "Reportes", description: "Análisis y reportes" }
      case "configuracion":
        return { title: "Configuración", description: "Configuración del sistema" }
      default:
        return { title: "Dashboard", description: "Resumen general del sistema" }
    }
  }

  const moduleInfo = getModuleInfo()

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{moduleInfo.title}</h2>
          <p className="text-slate-600">{moduleInfo.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {user?.name}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Ver Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
    </div>
  )
}
