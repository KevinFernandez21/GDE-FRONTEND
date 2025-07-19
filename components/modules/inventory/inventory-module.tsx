"use client"

import { useState } from "react"
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Package, AlertTriangle, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BulkImportModal from "@/components/bulk-import-modal"

export default function InventoryModule() {
  const [showImportModal, setShowImportModal] = useState(false)

  const stockMetrics = {
    disponible: 1250,
    comprometido: 340,
    transito: 180,
  }

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

  return (
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
          <CardTitle>Inventario de Productos</CardTitle>
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

      <BulkImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />
    </div>
  )
}
