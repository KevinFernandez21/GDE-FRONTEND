"use client"

import { useState } from "react"
import {
  BarChart3,
  Package,
  TrendingUp,
  AlertTriangle,
  Users,
  FileText,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Bell,
  Settings,
  LogOut,
  Home,
  Truck,
  RotateCcw,
  ChevronDown,
  Calendar,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import BulkImportModal from "@/components/bulk-import-modal" // Importar el nuevo componente

export default function InventoryManagementSystem() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const [userRole] = useState("admin") // admin, contador, bodega, ventas
  const [showImportModal, setShowImportModal] = useState(false) // Estado para controlar el modal

  const stockMetrics = {
    disponible: 1250,
    comprometido: 340,
    transito: 180,
    total: 1770,
  }

  const criticalProducts = [
    { id: 1, name: "Producto A", stock: 5, minStock: 10, status: "critical" },
    { id: 2, name: "Producto B", stock: 8, minStock: 15, status: "low" },
    { id: 3, name: "Producto C", stock: 2, minStock: 20, status: "critical" },
  ]

  const recentMovements = [
    {
      id: 1,
      date: "2024-01-05",
      type: "Entrada",
      product: "Producto X",
      quantity: 100,
      document: "FC-001",
      user: "Juan Pérez",
    },
    {
      id: 2,
      date: "2024-01-05",
      type: "Salida",
      product: "Producto Y",
      quantity: -50,
      document: "GD-002",
      user: "María García",
    },
    {
      id: 3,
      date: "2024-01-04",
      type: "Ajuste",
      product: "Producto Z",
      quantity: 25,
      document: "AJ-003",
      user: "Carlos López",
    },
  ]

  const inventoryData = [
    {
      id: 1,
      codigo: "PRD001",
      producto: "Laptop Dell Inspiron",
      familia: "Electrónicos",
      subcategoria: "Computadoras",
      proveedor: "Dell Inc",
      marca: "Dell",
      stockDisponible: 45,
      stockComprometido: 12,
      stockTransito: 8,
      ubicacion: "A-01-15",
      ultimaActualizacion: "2024-01-05 14:30",
      precio: 850.0,
      estado: "Activo",
    },
    {
      id: 2,
      codigo: "PRD002",
      producto: "Mouse Logitech MX",
      familia: "Accesorios",
      subcategoria: "Periféricos",
      proveedor: "Logitech",
      marca: "Logitech",
      stockDisponible: 120,
      stockComprometido: 25,
      stockTransito: 0,
      ubicacion: "B-02-08",
      ultimaActualizacion: "2024-01-05 12:15",
      precio: 65.0,
      estado: "Activo",
    },
    {
      id: 3,
      codigo: "PRD003",
      producto: 'Monitor Samsung 24"',
      familia: "Electrónicos",
      subcategoria: "Monitores",
      proveedor: "Samsung",
      marca: "Samsung",
      stockDisponible: 8,
      stockComprometido: 15,
      stockTransito: 20,
      ubicacion: "A-03-22",
      ultimaActualizacion: "2024-01-05 09:45",
      precio: 280.0,
      estado: "Bajo Stock",
    },
  ]

  const guiasDespacho = [
    {
      id: 1,
      codigo: "GD-2024-001",
      fecha: "2024-01-05",
      cliente: "Empresa ABC",
      estado: "Pendiente",
      usuario: "Juan Pérez",
      productos: 5,
    },
    {
      id: 2,
      codigo: "GD-2024-002",
      fecha: "2024-01-04",
      cliente: "Comercial XYZ",
      estado: "Despachado",
      usuario: "María García",
      productos: 3,
    },
    {
      id: 3,
      codigo: "GD-2024-003",
      fecha: "2024-01-04",
      cliente: "Distribuidora 123",
      estado: "En Tránsito",
      usuario: "Carlos López",
      productos: 8,
    },
  ]

  const kardexData = [
    {
      id: 1,
      fecha: "2024-01-05",
      tipoMovimiento: "Entrada",
      documento: "FC-001",
      cantidadEntrada: 100,
      cantidadSalida: 0,
      saldo: 345,
      usuario: "Juan Pérez",
      observaciones: "Compra a proveedor principal",
    },
    {
      id: 2,
      fecha: "2024-01-04",
      tipoMovimiento: "Salida",
      documento: "GD-002",
      cantidadEntrada: 0,
      cantidadSalida: 50,
      saldo: 245,
      usuario: "María García",
      observaciones: "Venta a cliente corporativo",
    },
    {
      id: 3,
      fecha: "2024-01-03",
      tipoMovimiento: "Ajuste",
      documento: "AJ-003",
      cantidadEntrada: 25,
      cantidadSalida: 0,
      saldo: 295,
      usuario: "Carlos López",
      observaciones: "Ajuste por inventario físico",
    },
  ]

  const financialData = {
    costos: [
      {
        id: 1,
        fecha: "2024-01-05",
        categoria: "Costo de Ventas",
        subcategoria: "Mercadería",
        descripcion: "Compra productos electrónicos",
        monto: 15000,
        proveedor: "Dell Inc",
        documento: "FC-001",
        estado: "Aprobado",
      },
      {
        id: 2,
        fecha: "2024-01-04",
        categoria: "Gastos Operativos",
        subcategoria: "Transporte",
        descripcion: "Flete mercadería importada",
        monto: 2500,
        proveedor: "Transportes ABC",
        documento: "FC-002",
        estado: "Pendiente",
      },
    ],
    gastos: [
      {
        id: 1,
        fecha: "2024-01-05",
        categoria: "Gastos Administrativos",
        subcategoria: "Servicios Básicos",
        descripcion: "Electricidad oficina principal",
        monto: 450,
        proveedor: "Empresa Eléctrica",
        documento: "FC-003",
        estado: "Pagado",
      },
      {
        id: 2,
        fecha: "2024-01-04",
        categoria: "Gastos de Ventas",
        subcategoria: "Marketing",
        descripcion: "Publicidad digital",
        monto: 1200,
        proveedor: "Agencia Digital",
        documento: "FC-004",
        estado: "Aprobado",
      },
    ],
    capital: [
      {
        id: 1,
        fecha: "2024-01-01",
        tipo: "Aporte de Capital",
        descripcion: "Aporte inicial socio A",
        monto: 50000,
        origen: "Socio A",
        documento: "AC-001",
        estado: "Registrado",
      },
      {
        id: 2,
        fecha: "2024-01-15",
        tipo: "Préstamo Bancario",
        descripcion: "Préstamo para capital de trabajo",
        monto: 25000,
        origen: "Banco Nacional",
        documento: "PB-001",
        estado: "Activo",
      },
    ],
  }

  const kpiFinancieros = {
    totalCostos: 17500,
    totalGastos: 1650,
    totalCapital: 75000,
    utilidadBruta: 45000,
    margenBruto: 72.0,
    rotacionInventario: 4.2,
  }

  const configuracionSistema = {
    usuarios: [
      {
        id: 1,
        nombre: "Kevin Fernandez",
        email: "kfernan@espol.edu.ec",
        rol: "Administrador",
        estado: "Activo",
        ultimoAcceso: "2024-01-05 14:30",
        permisos: ["inventario", "reportes", "configuracion", "gestion"],
      },
      {
        id: 2,
        nombre: "María García",
        email: "mgarcia@empresa.com",
        rol: "Contador",
        estado: "Activo",
        ultimoAcceso: "2024-01-05 12:15",
        permisos: ["inventario", "reportes", "gestion"],
      },
      {
        id: 3,
        nombre: "Juan Pérez",
        email: "jperez@empresa.com",
        rol: "Bodega",
        estado: "Activo",
        ultimoAcceso: "2024-01-05 10:45",
        permisos: ["inventario", "trazabilidad"],
      },
    ],
    roles: [
      {
        id: 1,
        nombre: "Administrador",
        descripcion: "Acceso completo al sistema",
        permisos: ["inventario", "trazabilidad", "gestion", "reportes", "configuracion"],
        usuarios: 1,
      },
      {
        id: 2,
        nombre: "Contador",
        descripcion: "Acceso a módulos financieros y reportes",
        permisos: ["inventario", "gestion", "reportes"],
        usuarios: 1,
      },
      {
        id: 3,
        nombre: "Bodega",
        descripcion: "Acceso a inventario y trazabilidad",
        permisos: ["inventario", "trazabilidad"],
        usuarios: 2,
      },
      {
        id: 4,
        nombre: "Ventas",
        descripcion: "Acceso a inventario y reportes de ventas",
        permisos: ["inventario", "reportes"],
        usuarios: 0,
      },
    ],
    notificaciones: {
      stockBajo: true,
      movimientosContables: true,
      vencimientoPagos: true,
      nuevosUsuarios: false,
      respaldoAutomatico: true,
    },
  }

  const Sidebar = () => (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">IMPORTADORA</h1>
            <p className="text-sm text-slate-300">EL MAYORISTA</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {[
            { id: "dashboard", icon: Home, label: "Dashboard", active: true },
            { id: "inventario", icon: Package, label: "Inventario" },
            { id: "trazabilidad", icon: Truck, label: "Trazabilidad" },
            { id: "gestion", icon: RotateCcw, label: "Gestión" },
            { id: "reportes", icon: FileText, label: "Reportes" },
            { id: "configuracion", icon: Settings, label: "Configuración" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeModule === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {activeModule === item.id && <div className="w-2 h-2 bg-white rounded-full ml-auto" />}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>KF</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Kevin Fernandez</p>
            <p className="text-xs text-slate-400">Administrador</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-slate-300 hover:text-white">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )

  const Header = () => (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {activeModule === "dashboard" && "Dashboard"}
            {activeModule === "inventario" && "Gestión de Inventario"}
            {activeModule === "trazabilidad" && "Trazabilidad"}
            {activeModule === "gestion" && "Gestión"}
            {activeModule === "reportes" && "Reportes"}
            {activeModule === "configuracion" && "Configuración"}
          </h2>
          <p className="text-slate-600">
            {activeModule === "dashboard" && "Resumen general del sistema"}
            {activeModule === "inventario" && "Control y seguimiento de productos"}
            {activeModule === "trazabilidad" && "Seguimiento de movimientos"}
            {activeModule === "gestion" && "Gestión de procesos"}
            {activeModule === "reportes" && "Análisis y reportes"}
            {activeModule === "configuracion" && "Configuración del sistema"}
          </p>
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
                  <AvatarFallback>KF</AvatarFallback>
                </Avatar>
                Kevin Fernandez
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )

  const DashboardContent = () => (
    <div className="p-6 space-y-6">
      {/* Alertas Críticas */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Productos con Stock Crítico</AlertTitle>
        <AlertDescription className="text-red-700">
          Hay 3 productos con stock por debajo del mínimo requerido. Revisar inmediatamente.
        </AlertDescription>
      </Alert>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Disponible</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stockMetrics.disponible.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            <Progress value={70} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Comprometido</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stockMetrics.comprometido.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% desde la semana pasada</p>
            <Progress value={30} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Tránsito</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stockMetrics.transito.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Llegada estimada: 3-5 días</p>
            <Progress value={15} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$2.4M</div>
            <p className="text-xs text-muted-foreground">Valorización actual del inventario</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productos Críticos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Productos con Stock Crítico
            </CardTitle>
            <CardDescription>Productos que requieren reposición inmediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock actual: {product.stock} | Mínimo: {product.minStock}
                    </p>
                  </div>
                  <Badge variant={product.status === "critical" ? "destructive" : "secondary"}>
                    {product.status === "critical" ? "Crítico" : "Bajo"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Movimientos Recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              Movimientos Recientes
            </CardTitle>
            <CardDescription>Últimas transacciones registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{movement.product}</p>
                    <p className="text-sm text-muted-foreground">
                      {movement.type} - {movement.document} - {movement.user}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${movement.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                      {movement.quantity > 0 ? "+" : ""}
                      {movement.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">{movement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const InventarioContent = () => (
    <div className="p-6 space-y-6">
      {/* Filtros y Acciones */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Buscar productos..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por familia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronicos">Electrónicos</SelectItem>
              <SelectItem value="accesorios">Accesorios</SelectItem>
              <SelectItem value="oficina">Oficina</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Más Filtros
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setShowImportModal(true)}>
            {" "}
            {/* Modificado para abrir el modal */}
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Métricas de Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Disponible</p>
                <p className="text-2xl font-bold text-green-600">{stockMetrics.disponible}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Comprometido</p>
                <p className="text-2xl font-bold text-red-600">{stockMetrics.comprometido}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">En Tránsito</p>
                <p className="text-2xl font-bold text-blue-600">{stockMetrics.transito}</p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Productos */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Próximos a Agotarse</CardTitle>
          <CardDescription>Lista de productos con stock disponible y su información detallada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Familia</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Stock Disponible</TableHead>
                  <TableHead>Stock Comprometido</TableHead>
                  <TableHead>En Tránsito</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.codigo}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.producto}</p>
                        <p className="text-sm text-muted-foreground">{item.marca}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{item.familia}</p>
                        <p className="text-sm text-muted-foreground">{item.subcategoria}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item.proveedor}</TableCell>
                    <TableCell>
                      <Badge variant={item.stockDisponible < 20 ? "destructive" : "default"}>
                        {item.stockDisponible}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.stockComprometido}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.stockTransito}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{item.ubicacion}</TableCell>
                    <TableCell>
                      <Badge variant={item.estado === "Activo" ? "default" : "destructive"}>{item.estado}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const TrazabilidadContent = () => (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="guias" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guias">Guías de Despacho</TabsTrigger>
          <TabsTrigger value="kardex">Kardex</TabsTrigger>
        </TabsList>

        <TabsContent value="guias" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar guías..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="despachado">Despachado</SelectItem>
                  <SelectItem value="transito">En Tránsito</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Guía
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estado de Guías de Despacho</CardTitle>
              <CardDescription>Últimas guías registradas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código Guía</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Usuario Responsable</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guiasDespacho.map((guia) => (
                    <TableRow key={guia.id}>
                      <TableCell className="font-mono">{guia.codigo}</TableCell>
                      <TableCell>{guia.fecha}</TableCell>
                      <TableCell>{guia.cliente}</TableCell>
                      <TableCell>{guia.productos} items</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            guia.estado === "Pendiente"
                              ? "destructive"
                              : guia.estado === "Despachado"
                                ? "default"
                                : guia.estado === "En Tránsito"
                                  ? "secondary"
                                  : "default"
                          }
                        >
                          {guia.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{guia.usuario}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kardex" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar movimientos..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de movimiento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="salida">Salida</SelectItem>
                  <SelectItem value="ajuste">Ajuste</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input type="date" className="w-[150px]" />
                <Input type="date" className="w-[150px]" />
              </div>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Kardex
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kardex - Historial de Movimientos</CardTitle>
              <CardDescription>Registro detallado de todos los movimientos de inventario</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo Movimiento</TableHead>
                    <TableHead>Documento Ref.</TableHead>
                    <TableHead>Cantidad Entrada</TableHead>
                    <TableHead>Cantidad Salida</TableHead>
                    <TableHead>Saldo</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Observaciones</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kardexData.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>{movement.fecha}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            movement.tipoMovimiento === "Entrada"
                              ? "default"
                              : movement.tipoMovimiento === "Salida"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {movement.tipoMovimiento}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{movement.documento}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {movement.cantidadEntrada > 0 ? `+${movement.cantidadEntrada}` : "-"}
                      </TableCell>
                      <TableCell className="text-red-600 font-medium">
                        {movement.cantidadSalida > 0 ? `-${movement.cantidadSalida}` : "-"}
                      </TableCell>
                      <TableCell className="font-bold">{movement.saldo}</TableCell>
                      <TableCell>{movement.usuario}</TableCell>
                      <TableCell className="max-w-xs truncate">{movement.observaciones}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const ReportesContent = () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Reporte de Inventarios
            </CardTitle>
            <CardDescription>Estado actual del inventario por categorías</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generar Reporte</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Rotación de Inventarios
            </CardTitle>
            <CardDescription>Análisis de rotación y productos de alta/baja rotación</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generar Reporte</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              Valorización
            </CardTitle>
            <CardDescription>Valor del inventario y análisis financiero</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generar Reporte</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-600" />
              Movimientos
            </CardTitle>
            <CardDescription>Historial detallado de entradas y salidas</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generar Reporte</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Proveedores
            </CardTitle>
            <CardDescription>Análisis de compras por proveedor</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generar Reporte</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Stock Crítico
            </CardTitle>
            <CardDescription>Productos con stock bajo o crítico</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generar Reporte</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reportes Personalizados</CardTitle>
          <CardDescription>Crea reportes personalizados con filtros avanzados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inventario">Inventario</SelectItem>
                <SelectItem value="movimientos">Movimientos</SelectItem>
                <SelectItem value="financiero">Financiero</SelectItem>
                <SelectItem value="auditoria">Auditoría</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input type="date" placeholder="Fecha inicio" />
              <Input type="date" placeholder="Fecha fin" />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Generar Reporte Personalizado
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Programar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const GestionContent = () => (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="costos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="costos">Costos</TabsTrigger>
          <TabsTrigger value="gastos">Gastos</TabsTrigger>
          <TabsTrigger value="capital">Capital</TabsTrigger>
          <TabsTrigger value="kpis">KPIs Financieros</TabsTrigger>
        </TabsList>

        <TabsContent value="costos" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar costos..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="costo-ventas">Costo de Ventas</SelectItem>
                  <SelectItem value="gastos-operativos">Gastos Operativos</SelectItem>
                  <SelectItem value="gastos-financieros">Gastos Financieros</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input type="date" className="w-[150px]" />
                <Input type="date" className="w-[150px]" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Importar Excel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Costo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-800">Total Costos</p>
                    <p className="text-2xl font-bold text-red-600">${kpiFinancieros.totalCostos.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Costo Promedio Ponderado</p>
                    <p className="text-2xl font-bold text-blue-600">$14.50</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Margen Bruto</p>
                    <p className="text-2xl font-bold text-green-600">{kpiFinancieros.margenBruto}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registro de Costos</CardTitle>
              <CardDescription>Gestión detallada de costos de la empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Subcategoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.costos.map((costo) => (
                    <TableRow key={costo.id}>
                      <TableCell>{costo.fecha}</TableCell>
                      <TableCell>{costo.categoria}</TableCell>
                      <TableCell>{costo.subcategoria}</TableCell>
                      <TableCell>{costo.descripcion}</TableCell>
                      <TableCell className="font-bold">${costo.monto.toLocaleString()}</TableCell>
                      <TableCell>{costo.proveedor}</TableCell>
                      <TableCell className="font-mono">{costo.documento}</TableCell>
                      <TableCell>
                        <Badge variant={costo.estado === "Aprobado" ? "default" : "secondary"}>{costo.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gastos" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar gastos..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de Gasto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrativos">Gastos Administrativos</SelectItem>
                  <SelectItem value="ventas">Gastos de Ventas</SelectItem>
                  <SelectItem value="generales">Gastos Generales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Importar Excel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Gasto
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registro de Gastos</CardTitle>
              <CardDescription>Control de gastos operativos, administrativos y de ventas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Subcategoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.gastos.map((gasto) => (
                    <TableRow key={gasto.id}>
                      <TableCell>{gasto.fecha}</TableCell>
                      <TableCell>{gasto.categoria}</TableCell>
                      <TableCell>{gasto.subcategoria}</TableCell>
                      <TableCell>{gasto.descripcion}</TableCell>
                      <TableCell className="font-bold">${gasto.monto.toLocaleString()}</TableCell>
                      <TableCell>{gasto.proveedor}</TableCell>
                      <TableCell>
                        <Badge variant={gasto.estado === "Pagado" ? "default" : "secondary"}>{gasto.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h3 className="text-lg font-semibold">Control de Capital y Financiamiento</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar Balance
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Movimiento
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Capital</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Capital Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${kpiFinancieros.totalCapital.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Aportes de Socios</span>
                  <span className="text-xl font-bold text-blue-600">$50,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Préstamos Activos</span>
                  <span className="text-xl font-bold text-orange-600">$25,000</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impacto en Balance General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Activos Totales</span>
                    <span className="font-bold">$125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pasivos Totales</span>
                    <span className="font-bold">$50,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Patrimonio</span>
                    <span className="font-bold text-green-600">$75,000</span>
                  </div>
                </div>
                <Progress value={60} className="mt-4" />
                <p className="text-sm text-muted-foreground">Ratio de Endeudamiento: 40%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Movimientos de Capital</CardTitle>
              <CardDescription>Registro de aportes, préstamos y financiamiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.capital.map((capital) => (
                    <TableRow key={capital.id}>
                      <TableCell>{capital.fecha}</TableCell>
                      <TableCell>
                        <Badge variant={capital.tipo === "Aporte de Capital" ? "default" : "secondary"}>
                          {capital.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{capital.descripcion}</TableCell>
                      <TableCell className="font-bold">${capital.monto.toLocaleString()}</TableCell>
                      <TableCell>{capital.origen}</TableCell>
                      <TableCell className="font-mono">{capital.documento}</TableCell>
                      <TableCell>
                        <Badge variant="default">{capital.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Utilidad Bruta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${kpiFinancieros.utilidadBruta.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Ventas - Costo de Ventas</p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Margen Bruto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">{kpiFinancieros.margenBruto}%</div>
                <p className="text-sm text-muted-foreground">Utilidad Bruta / Ventas</p>
                <Progress value={kpiFinancieros.margenBruto} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                  Rotación Inventario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">{kpiFinancieros.rotacionInventario}x</div>
                <p className="text-sm text-muted-foreground">Veces por año</p>
                <Progress value={42} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Resultados Simplificado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Ventas Totales</span>
                  <span className="font-bold text-green-600">$62,500</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Costo de Ventas</span>
                  <span className="font-bold text-red-600">-$17,500</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Utilidad Bruta</span>
                  <span className="font-bold text-blue-600">$45,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Gastos Operativos</span>
                  <span className="font-bold text-orange-600">-$1,650</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <span className="font-bold">Utilidad Neta</span>
                  <span className="font-bold text-purple-600 text-xl">$43,350</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Costos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Costo de Ventas</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Gastos Administrativos</span>
                    <span>2.6%</span>
                  </div>
                  <Progress value={2.6} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Utilidad Neta</span>
                    <span>69.4%</span>
                  </div>
                  <Progress value={69.4} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  const ConfiguracionContent = () => (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar usuarios..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="contador">Contador</SelectItem>
                  <SelectItem value="bodega">Bodega</SelectItem>
                  <SelectItem value="ventas">Ventas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administrar usuarios del sistema y sus permisos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Permisos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configuracionSistema.usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {usuario.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{usuario.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        <Badge variant="default">{usuario.rol}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={usuario.estado === "Activo" ? "default" : "secondary"}>{usuario.estado}</Badge>
                      </TableCell>
                      <TableCell>{usuario.ultimoAcceso}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {usuario.permisos.slice(0, 2).map((permiso) => (
                            <Badge key={permiso} variant="outline" className="text-xs">
                              {permiso}
                            </Badge>
                          ))}
                          {usuario.permisos.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{usuario.permisos.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Configuración de Roles y Permisos</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Rol
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configuracionSistema.roles.map((rol) => (
              <Card key={rol.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rol.nombre}</CardTitle>
                    <Badge variant="secondary">{rol.usuarios} usuarios</Badge>
                  </div>
                  <CardDescription>{rol.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Permisos asignados:</p>
                    <div className="flex flex-wrap gap-2">
                      {rol.permisos.map((permiso) => (
                        <Badge key={permiso} variant="outline">
                          {permiso}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Usuarios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura qué notificaciones deseas recibir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(configuracionSistema.notificaciones).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      {key === "stockBajo" && "Alertas de Stock Bajo"}
                      {key === "movimientosContables" && "Movimientos Contables"}
                      {key === "vencimientoPagos" && "Vencimiento de Pagos"}
                      {key === "nuevosUsuarios" && "Nuevos Usuarios"}
                      {key === "respaldoAutomatico" && "Respaldo Automático"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {key === "stockBajo" && "Recibir alertas cuando los productos tengan stock crítico"}
                      {key === "movimientosContables" && "Notificaciones de nuevos asientos contables"}
                      {key === "vencimientoPagos" && "Recordatorios de pagos próximos a vencer"}
                      {key === "nuevosUsuarios" && "Notificaciones cuando se registren nuevos usuarios"}
                      {key === "respaldoAutomatico" && "Confirmaciones de respaldos automáticos"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={value ? "default" : "secondary"}>{value ? "Activo" : "Inactivo"}</Badge>
                    <Button variant="outline" size="sm">
                      {value ? "Desactivar" : "Activar"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reportes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalización de Reportes</CardTitle>
              <CardDescription>Configura los reportes según tus necesidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Campos a Mostrar en Inventario</h4>
                  <div className="space-y-2">
                    {["Código", "Producto", "Familia", "Stock Disponible", "Ubicación", "Precio"].map((campo) => (
                      <div key={campo} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <label className="text-sm">{campo}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Orden de Columnas</h4>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Ordenar por..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="codigo">Código</SelectItem>
                        <SelectItem value="producto">Producto</SelectItem>
                        <SelectItem value="stock">Stock</SelectItem>
                        <SelectItem value="fecha">Fecha</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Dirección..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascendente</SelectItem>
                        <SelectItem value="desc">Descendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Fórmulas de Cálculo Personalizadas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Margen de Ganancia</label>
                    <Input placeholder="(Precio Venta - Costo) / Precio Venta * 100" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rotación de Inventario</label>
                    <Input placeholder="Costo de Ventas / Inventario Promedio" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Guardar Configuración</Button>
                <Button variant="outline">Restaurar Predeterminados</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-blue-600" />
                  Importación de Datos
                </CardTitle>
                <CardDescription>Carga masiva de información desde archivos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Importar Productos (Excel/CSV)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Importar Costos y Gastos
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Importar Proveedores
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Importar Movimientos
                  </Button>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Siempre revisa la previsualización antes de confirmar la importación.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  Gestión de Base de Datos
                </CardTitle>
                <CardDescription>Mantenimiento y respaldo del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Crear Respaldo Completo
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Programar Respaldos
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restaurar Base de Datos
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Optimizar Base de Datos
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Último respaldo:</strong> 05/01/2024 - 02:00 AM
                  </p>
                  <p className="text-sm text-green-600">Estado: Exitoso</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                Integración con Sistemas Externos
              </CardTitle>
              <CardDescription>Conecta con otros sistemas empresariales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Sistema Bancario</h4>
                    <Badge variant="secondary">Desconectado</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sincronización automática de movimientos bancarios
                  </p>
                  <Button size="sm" className="w-full">
                    Configurar
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Sistema de Ventas</h4>
                    <Badge variant="default">Conectado</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Integración con plataforma de e-commerce</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Configurar
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Facturación Electrónica</h4>
                    <Badge variant="secondary">Pendiente</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Conexión con SRI para facturación automática</p>
                  <Button size="sm" className="w-full">
                    Configurar
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">API de Proveedores</h4>
                    <Badge variant="secondary">Desconectado</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Actualización automática de precios y stock</p>
                  <Button size="sm" className="w-full">
                    Configurar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardContent />
      case "inventario":
        return <InventarioContent />
      case "trazabilidad":
        return <TrazabilidadContent />
      case "gestion":
        return <GestionContent />
      case "reportes":
        return <ReportesContent />
      case "configuracion":
        return <ConfiguracionContent />
      default:
        return (
          <div className="p-6 flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo en Desarrollo</h3>
              <p className="text-gray-600">Esta sección estará disponible próximamente.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
      <BulkImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />
    </div>
  )
}
