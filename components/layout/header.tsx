"use client"

import { Bell, ChevronDown } from "lucide-react"
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

export default function Header() {
  const { user, logout } = useAuth()
  const { activeModule } = useApp()

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
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </Button>
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
              <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
