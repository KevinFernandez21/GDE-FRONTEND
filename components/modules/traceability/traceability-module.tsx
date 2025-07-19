"use client"

import { Search, Plus, Eye, Edit, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TraceabilityModule() {
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

  return (
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
}
