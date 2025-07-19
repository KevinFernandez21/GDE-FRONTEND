"use client"

import { Package, AlertTriangle, Truck, DollarSign, RotateCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardModule() {
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

  return (
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
}
