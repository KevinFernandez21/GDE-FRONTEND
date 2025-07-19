"use client"

import { Search, Plus, Eye, Edit, Download, DollarSign, TrendingUp, BarChart3, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function ManagementModule() {
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

  return (
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
}
