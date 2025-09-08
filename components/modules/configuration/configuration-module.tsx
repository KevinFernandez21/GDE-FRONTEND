"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Users,
  Shield,
  Bell,
  FileText,
  Database,
  Upload,
  Download,
  Settings,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  Trash2,
  Edit,
  Plus,
  Eye,
  User,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ConfigurationModule() {
  const [activeTab, setActiveTab] = useState("general")
  const { user } = useAuth()

  const handleSaveConfiguration = (section: string) => {
    // Aquí iría la lógica para guardar en el backend
    toast.success(`Configuración de ${section} guardada exitosamente`)
  }

  const handleTestConnection = () => {
    // Simular prueba de conexión
    toast.loading("Probando conexión...")
    setTimeout(() => {
      toast.success("Conexión exitosa")
    }, 2000)
  }

  const handleBackup = () => {
    toast.loading("Creando respaldo...")
    setTimeout(() => {
      toast.success("Respaldo creado exitosamente")
    }, 3000)
  }

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alertas
          </TabsTrigger>
          <TabsTrigger value="datos" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Datos
          </TabsTrigger>
          <TabsTrigger value="integraciones" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Integraciones
          </TabsTrigger>
        </TabsList>

        {/* Configuración General */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Información de la Empresa
                </CardTitle>
                <CardDescription>Datos básicos de tu empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input id="company-name" defaultValue="Importadora El Mayorista" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-ruc">RUC</Label>
                  <Input id="company-ruc" defaultValue="1234567890001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Dirección</Label>
                  <Input id="company-address" defaultValue="Av. Principal 123, Guayaquil" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Teléfono</Label>
                  <Input id="company-phone" defaultValue="+593 4 123-4567" />
                </div>
                <Button className="w-full" onClick={() => handleSaveConfiguration("empresa")}>Guardar Cambios</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Configuración del Sistema
                </CardTitle>
                <CardDescription>Preferencias generales del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Oscuro</Label>
                    <p className="text-sm text-muted-foreground">Cambiar tema de la interfaz</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones de Escritorio</Label>
                    <p className="text-sm text-muted-foreground">Recibir alertas en el navegador</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Idioma del Sistema</Label>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Zona Horaria</Label>
                  <Select defaultValue="america/guayaquil">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america/guayaquil">América/Guayaquil (GMT-5)</SelectItem>
                      <SelectItem value="america/bogota">América/Bogotá (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Mi Perfil
                </CardTitle>
                <CardDescription>Información de tu cuenta de usuario</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Nombre Completo</Label>
                  <Input id="user-name" defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Correo Electrónico</Label>
                  <Input id="user-email" defaultValue={user?.email || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-role">Rol</Label>
                  <Input id="user-role" defaultValue={user?.role || ""} disabled />
                </div>
                <Button className="w-full" onClick={() => handleSaveConfiguration("perfil")}>Actualizar Perfil</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Configuración de Inventario
              </CardTitle>
              <CardDescription>Parámetros específicos para la gestión de inventario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Stock Mínimo Global (%)</Label>
                  <Input type="number" defaultValue="10" />
                  <p className="text-xs text-muted-foreground">Porcentaje para alertas de stock bajo</p>
                </div>
                <div className="space-y-2">
                  <Label>Método de Valoración</Label>
                  <Select defaultValue="promedio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promedio">Costo Promedio Ponderado</SelectItem>
                      <SelectItem value="fifo">FIFO (Primero en Entrar, Primero en Salir)</SelectItem>
                      <SelectItem value="lifo">LIFO (Último en Entrar, Primero en Salir)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Moneda Principal</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - Dólar Americano</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestión de Usuarios */}
        <TabsContent value="usuarios" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
              <p className="text-muted-foreground">Administra los usuarios del sistema y sus permisos</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Total Usuarios</p>
                    <p className="text-2xl font-bold text-blue-600">4</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Activos</p>
                    <p className="text-2xl font-bold text-green-600">4</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-800">Roles</p>
                    <p className="text-2xl font-bold text-orange-600">4</p>
                  </div>
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-800">Sesiones Activas</p>
                    <p className="text-2xl font-bold text-purple-600">2</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios del Sistema</CardTitle>
                <CardDescription>Lista de usuarios registrados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Kevin Fernandez", role: "Administrador", status: "Activo", lastLogin: "Hace 2 horas" },
                  { name: "María García", role: "Contador", status: "Activo", lastLogin: "Hace 1 día" },
                  { name: "Juan Pérez", role: "Bodega", status: "Activo", lastLogin: "Hace 3 horas" },
                  { name: "Carlos López", role: "Ventas", status: "Inactivo", lastLogin: "Hace 1 semana" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.status === "Activo" ? "default" : "secondary"}>{user.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roles y Permisos</CardTitle>
                <CardDescription>Configuración de roles del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Administrador",
                    users: 1,
                    permissions: ["Todos los módulos", "Configuración", "Usuarios"],
                    color: "bg-red-100 text-red-800",
                  },
                  {
                    name: "Contador",
                    users: 1,
                    permissions: ["Inventario", "Gestión", "Reportes"],
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    name: "Bodega",
                    users: 1,
                    permissions: ["Inventario", "Trazabilidad"],
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    name: "Ventas",
                    users: 1,
                    permissions: ["Inventario", "Reportes"],
                    color: "bg-purple-100 text-purple-800",
                  },
                ].map((role, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={role.color}>{role.name}</Badge>
                        <span className="text-sm text-muted-foreground">{role.users} usuario(s)</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Seguridad */}
        <TabsContent value="seguridad" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Políticas de Seguridad
                </CardTitle>
                <CardDescription>Configuración de seguridad del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-sm text-muted-foreground">Requerir 2FA para todos los usuarios</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bloqueo por Intentos Fallidos</Label>
                    <p className="text-sm text-muted-foreground">Bloquear cuenta después de 5 intentos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Tiempo de Sesión (minutos)</Label>
                  <Input type="number" defaultValue="480" />
                  <p className="text-xs text-muted-foreground">Tiempo antes de cerrar sesión automáticamente</p>
                </div>
                <div className="space-y-2">
                  <Label>Complejidad de Contraseña</Label>
                  <Select defaultValue="media">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja (6+ caracteres)</SelectItem>
                      <SelectItem value="media">Media (8+ caracteres, números)</SelectItem>
                      <SelectItem value="alta">Alta (12+ caracteres, símbolos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Auditoría y Logs
                </CardTitle>
                <CardDescription>Registro de actividades del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registro de Accesos</Label>
                    <p className="text-sm text-muted-foreground">Guardar historial de inicios de sesión</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registro de Cambios</Label>
                    <p className="text-sm text-muted-foreground">Auditar modificaciones de datos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Retención de Logs (días)</Label>
                  <Input type="number" defaultValue="90" />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Logs de Auditoría
                </Button>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Recomendaciones de Seguridad</AlertTitle>
            <AlertDescription>
              • Habilita la autenticación de dos factores para mayor seguridad
              <br />• Revisa regularmente los logs de acceso
              <br />• Mantén las contraseñas actualizadas cada 90 días
              <br />• Limita los permisos según el rol de cada usuario
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Notificaciones y Alertas */}
        <TabsContent value="notificaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                Configuración de Alertas
              </CardTitle>
              <CardDescription>Personaliza las notificaciones que deseas recibir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Alertas de Inventario</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Stock Bajo</Label>
                        <p className="text-sm text-muted-foreground">Cuando un producto esté por debajo del mínimo</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Stock Crítico</Label>
                        <p className="text-sm text-muted-foreground">Cuando un producto esté agotado</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Productos Vencidos</Label>
                        <p className="text-sm text-muted-foreground">Alertas de productos próximos a vencer</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Alertas Financieras</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Movimientos Contables</Label>
                        <p className="text-sm text-muted-foreground">Nuevos asientos contables registrados</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Vencimiento de Pagos</Label>
                        <p className="text-sm text-muted-foreground">Recordatorios de pagos próximos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <Label>Límites de Crédito</Label>
                        <p className="text-sm text-muted-foreground">Cuando se superen límites establecidos</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-lg">Configuración de Entrega</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Método de Notificación</Label>
                    <Select defaultValue="email">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Notificación Push</SelectItem>
                        <SelectItem value="all">Todos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Frecuencia</Label>
                    <Select defaultValue="inmediata">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inmediata">Inmediata</SelectItem>
                        <SelectItem value="diaria">Resumen Diario</SelectItem>
                        <SelectItem value="semanal">Resumen Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Horario de Envío</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestión de Datos */}
        <TabsContent value="datos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Importación de Datos
                </CardTitle>
                <CardDescription>Herramientas para cargar información masivamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <FileText className="w-5 h-5 mr-3 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium">Importar Productos</p>
                      <p className="text-xs text-muted-foreground">Cargar productos desde Excel/CSV</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium">Importar Proveedores</p>
                      <p className="text-xs text-muted-foreground">Cargar información de proveedores</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <Database className="w-5 h-5 mr-3 text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium">Importar Movimientos</p>
                      <p className="text-xs text-muted-foreground">Cargar historial de movimientos</p>
                    </div>
                  </Button>
                </div>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Formatos Soportados</AlertTitle>
                  <AlertDescription>Excel (.xlsx), CSV (.csv) con codificación UTF-8</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  Respaldo y Restauración
                </CardTitle>
                <CardDescription>Gestión de copias de seguridad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full justify-start h-12" onClick={handleBackup}>
                    <Download className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Crear Respaldo Completo</p>
                      <p className="text-xs opacity-90">Generar copia de seguridad de todos los datos</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <Calendar className="w-5 h-5 mr-3 text-orange-600" />
                    <div className="text-left">
                      <p className="font-medium">Programar Respaldos</p>
                      <p className="text-xs text-muted-foreground">Configurar respaldos automáticos</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                    <Upload className="w-5 h-5 mr-3 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium">Restaurar Base de Datos</p>
                      <p className="text-xs text-muted-foreground">Restaurar desde archivo de respaldo</p>
                    </div>
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Último Respaldo Exitoso</span>
                  </div>
                  <p className="text-xs text-green-700">05/01/2024 - 02:00 AM (Automático)</p>
                  <p className="text-xs text-green-600">Tamaño: 45.2 MB</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Mantenimiento de Base de Datos
              </CardTitle>
              <CardDescription>Herramientas de optimización y limpieza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Database className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="font-medium">Optimizar BD</span>
                  <span className="text-xs text-muted-foreground">Mejorar rendimiento</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Trash2 className="w-6 h-6 mb-2 text-red-600" />
                  <span className="font-medium">Limpiar Logs</span>
                  <span className="text-xs text-muted-foreground">Eliminar logs antiguos</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <CheckCircle className="w-6 h-6 mb-2 text-green-600" />
                  <span className="font-medium">Verificar Integridad</span>
                  <span className="text-xs text-muted-foreground">Comprobar consistencia</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integraciones */}
        <TabsContent value="integraciones" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Sistemas Contables
                </CardTitle>
                <CardDescription>Integración con software contable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">QuickBooks</p>
                      <p className="text-sm text-muted-foreground">Sincronización automática</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Desconectado</Badge>
                    <Button size="sm">Conectar</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">SAP Business One</p>
                      <p className="text-sm text-muted-foreground">ERP empresarial</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Conectado</Badge>
                    <Button size="sm" variant="outline">
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-600" />
                  E-commerce
                </CardTitle>
                <CardDescription>Integración con plataformas de venta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Shopify</p>
                      <p className="text-sm text-muted-foreground">Tienda online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Conectado</Badge>
                    <Button size="sm" variant="outline">
                      Configurar
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">WooCommerce</p>
                      <p className="text-sm text-muted-foreground">WordPress e-commerce</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Desconectado</Badge>
                    <Button size="sm">Conectar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-red-600" />
                  Facturación Electrónica
                </CardTitle>
                <CardDescription>Integración con SRI Ecuador</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">SRI - Facturación Electrónica</p>
                      <p className="text-sm text-muted-foreground">Emisión automática de facturas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Pendiente</Badge>
                    <Button size="sm">Configurar</Button>
                  </div>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Configuración Requerida</AlertTitle>
                  <AlertDescription>
                    Para habilitar la facturación electrónica, necesitas configurar tu certificado digital y ambiente de
                    pruebas del SRI.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-600" />
                  APIs Externas
                </CardTitle>
                <CardDescription>Conexiones con servicios externos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp Business API</p>
                      <p className="text-sm text-muted-foreground">Notificaciones por WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Desconectado</Badge>
                    <Button size="sm">Conectar</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">API de Proveedores</p>
                      <p className="text-sm text-muted-foreground">Actualización automática de precios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Desconectado</Badge>
                    <Button size="sm">Conectar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de API</CardTitle>
              <CardDescription>Configuración general para integraciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL Base de API</Label>
                  <Input defaultValue="https://api.importadoraelmayorista.com" />
                </div>
                <div className="space-y-2">
                  <Label>Versión de API</Label>
                  <Select defaultValue="v1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">v1.0</SelectItem>
                      <SelectItem value="v2">v2.0 (Beta)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Token de Autenticación</Label>
                <div className="flex gap-2">
                  <Input type="password" defaultValue="sk_live_..." className="flex-1" />
                  <Button variant="outline">Regenerar</Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleSaveConfiguration("API")}>Guardar Configuración</Button>
                <Button variant="outline" onClick={handleTestConnection}>Probar Conexión</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
