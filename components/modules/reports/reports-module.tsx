"use client"

import { BarChart3, TrendingUp, DollarSign, Truck, Users, AlertTriangle, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsModule() {
  return (
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
}
