"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, DollarSign, Truck, Users, AlertTriangle, Download, Calendar, X, Eye, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReportsModule() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const inventoryReportData = [
    {
      categoria: "Electrónicos",
      productos: 45,
      valorTotal: "$128,500.00",
      stockDisponible: 312,
      stockBajo: 8,
      rotacion: "Alta"
    },
    {
      categoria: "Accesorios",
      productos: 23,
      valorTotal: "$15,750.00",
      stockDisponible: 187,
      stockBajo: 3,
      rotacion: "Media"
    },
    {
      categoria: "Oficina",
      productos: 31,
      valorTotal: "$22,890.00",
      stockDisponible: 156,
      stockBajo: 12,
      rotacion: "Baja"
    },
    {
      categoria: "Herramientas",
      productos: 18,
      valorTotal: "$8,340.00",
      stockDisponible: 89,
      stockBajo: 5,
      rotacion: "Media"
    }
  ]

  const rotacionReportData = [
    {
      producto: "Laptop Dell Inspiron",
      codigo: "PRD001",
      rotacion: 12.5,
      ventasUltimoMes: 25,
      stockPromedio: 48,
      clasificacion: "Rápida"
    },
    {
      producto: "Mouse Logitech MX",
      codigo: "PRD002",
      rotacion: 8.3,
      ventasUltimoMes: 42,
      stockPromedio: 125,
      clasificacion: "Rápida"
    },
    {
      producto: 'Monitor Samsung 24"',
      codigo: "PRD003",
      rotacion: 2.1,
      ventasUltimoMes: 8,
      stockPromedio: 15,
      clasificacion: "Lenta"
    },
    {
      producto: "Teclado Mecánico",
      codigo: "PRD004",
      rotacion: 6.8,
      ventasUltimoMes: 18,
      stockPromedio: 32,
      clasificacion: "Media"
    }
  ]

  const valoracionReportData = [
    {
      categoria: "Electrónicos",
      cantidadProductos: 312,
      valorTotal: "$128,500.00",
      porcentajeTotal: "68.5%",
      variacionMes: "+5.2%"
    },
    {
      categoria: "Accesorios",
      cantidadProductos: 187,
      valorTotal: "$15,750.00",
      porcentajeTotal: "8.4%",
      variacionMes: "-2.1%"
    },
    {
      categoria: "Oficina",
      cantidadProductos: 156,
      valorTotal: "$22,890.00",
      porcentajeTotal: "12.2%",
      variacionMes: "+1.8%"
    },
    {
      categoria: "Herramientas",
      cantidadProductos: 89,
      valorTotal: "$8,340.00",
      porcentajeTotal: "4.4%",
      variacionMes: "+0.5%"
    }
  ]

  const equilibriumData = [
    { unidades: 0, costoFijo: 25000, costoVariable: 0, costoTotal: 25000, ingresos: 0, utilidad: -25000 },
    { unidades: 100, costoFijo: 25000, costoVariable: 3500, costoTotal: 28500, ingresos: 8000, utilidad: -20500 },
    { unidades: 200, costoFijo: 25000, costoVariable: 7000, costoTotal: 32000, ingresos: 16000, utilidad: -16000 },
    { unidades: 300, costoFijo: 25000, costoVariable: 10500, costoTotal: 35500, ingresos: 24000, utilidad: -11500 },
    { unidades: 400, costoFijo: 25000, costoVariable: 14000, costoTotal: 39000, ingresos: 32000, utilidad: -7000 },
    { unidades: 500, costoFijo: 25000, costoVariable: 17500, costoTotal: 42500, ingresos: 40000, utilidad: -2500 },
    { unidades: 556, costoFijo: 25000, costoVariable: 19460, costoTotal: 44460, ingresos: 44480, utilidad: 20 },
    { unidades: 600, costoFijo: 25000, costoVariable: 21000, costoTotal: 46000, ingresos: 48000, utilidad: 2000 },
    { unidades: 700, costoFijo: 25000, costoVariable: 24500, costoTotal: 49500, ingresos: 56000, utilidad: 6500 },
    { unidades: 800, costoFijo: 25000, costoVariable: 28000, costoTotal: 53000, ingresos: 64000, utilidad: 11000 },
    { unidades: 900, costoFijo: 25000, costoVariable: 31500, costoTotal: 56500, ingresos: 72000, utilidad: 15500 },
    { unidades: 1000, costoFijo: 25000, costoVariable: 35000, costoTotal: 60000, ingresos: 80000, utilidad: 20000 }
  ]

  const productAnalysisData = [
    { 
      producto: "Laptop Dell Inspiron", 
      precioVenta: 850, 
      costoVariable: 620, 
      margenContribucion: 230,
      puntoEquilibrio: 109,
      ventasActuales: 145,
      margenSeguridad: "33%"
    },
    { 
      producto: "Mouse Logitech MX", 
      precioVenta: 65, 
      costoVariable: 38, 
      margenContribucion: 27,
      puntoEquilibrio: 926,
      ventasActuales: 1250,
      margenSeguridad: "26%"
    },
    { 
      producto: 'Monitor Samsung 24"', 
      precioVenta: 280, 
      costoVariable: 195, 
      margenContribucion: 85,
      puntoEquilibrio: 294,
      ventasActuales: 180,
      margenSeguridad: "-39%"
    }
  ]

  const categoryBreakEvenData = [
    { name: 'Electrónicos', value: 68.5, color: '#3B82F6' },
    { name: 'Oficina', value: 12.2, color: '#10B981' },
    { name: 'Accesorios', value: 8.4, color: '#F59E0B' },
    { name: 'Herramientas', value: 4.4, color: '#EF4444' },
    { name: 'Otros', value: 6.5, color: '#8B5CF6' }
  ]

  const estadoResultadosData = {
    periodo: "Enero - Diciembre 2024",
    ingresos: {
      ventasNetas: 485200,
      otrosIngresos: 12300,
      totalIngresos: 497500
    },
    costos: {
      costoVentas: 291120,
      utilidadBruta: 206380,
      margenBruto: 41.5
    },
    gastosOperativos: {
      gastosVentas: 68400,
      gastosAdministrativos: 45200,
      gastosGenerales: 22800,
      totalGastosOperativos: 136400,
      utilidadOperativa: 69980,
      margenOperativo: 14.1
    },
    gastosFinancieros: {
      interesesPagados: 8500,
      comisiones: 2100,
      totalGastosFinancieros: 10600
    },
    resultadoFinal: {
      utilidadAntesImpuestos: 59380,
      impuestos: 11876,
      utilidadNeta: 47504,
      margenNeto: 9.5
    }
  }

  const monthlyTrendData = [
    { mes: 'Ene', ventas: 38500, costos: 23100, utilidad: 15400, gastos: 11200 },
    { mes: 'Feb', ventas: 41200, costos: 24720, utilidad: 16480, gastos: 11800 },
    { mes: 'Mar', ventas: 45800, costos: 27480, utilidad: 18320, gastos: 12100 },
    { mes: 'Abr', ventas: 42300, costos: 25380, utilidad: 16920, gastos: 11900 },
    { mes: 'May', ventas: 47600, costos: 28560, utilidad: 19040, gastos: 12300 },
    { mes: 'Jun', ventas: 39900, costos: 23940, utilidad: 15960, gastos: 11600 },
    { mes: 'Jul', ventas: 44200, costos: 26520, utilidad: 17680, gastos: 12000 },
    { mes: 'Ago', ventas: 46800, costos: 28080, utilidad: 18720, gastos: 12200 },
    { mes: 'Sep', ventas: 43700, costos: 26220, utilidad: 17480, gastos: 11950 },
    { mes: 'Oct', ventas: 48200, costos: 28920, utilidad: 19280, gastos: 12400 },
    { mes: 'Nov', ventas: 45300, costos: 27180, utilidad: 18120, gastos: 12150 },
    { mes: 'Dic', ventas: 51700, costos: 31020, utilidad: 20680, gastos: 12800 }
  ]

  const kpiData = {
    rentabilidad: {
      roi: 15.8,
      roe: 22.3,
      roa: 12.1,
      ebitda: 89500
    },
    liquidez: {
      razonCorriente: 2.3,
      pruebaAcida: 1.8,
      capitalTrabajo: 125000
    },
    actividad: {
      rotacionInventario: 8.2,
      rotacionCartera: 12.5,
      cicloConversion: 45
    },
    endeudamiento: {
      razonDeuda: 0.35,
      cobertura: 8.2,
      apalancamiento: 1.54
    }
  }

  const renderReportModal = () => {
    if (!selectedReport) return null

    let reportContent = null
    let reportTitle = ""

    switch (selectedReport) {
      case "inventario":
        reportTitle = "Reporte de Inventarios"
        reportContent = (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total de Productos</h3>
                <p className="text-2xl font-bold text-blue-600">117</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Valor Total</h3>
                <p className="text-2xl font-bold text-green-600">$175,480.00</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Stock Disponible</TableHead>
                  <TableHead>Stock Bajo</TableHead>
                  <TableHead>Rotación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryReportData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.categoria}</TableCell>
                    <TableCell>{item.productos}</TableCell>
                    <TableCell>{item.valorTotal}</TableCell>
                    <TableCell>{item.stockDisponible}</TableCell>
                    <TableCell>
                      <Badge variant={item.stockBajo > 10 ? "destructive" : "secondary"}>
                        {item.stockBajo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        item.rotacion === "Alta" ? "default" : 
                        item.rotacion === "Media" ? "secondary" : "outline"
                      }>
                        {item.rotacion}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
        break

      case "rotacion":
        reportTitle = "Rotación de Inventarios"
        reportContent = (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Rotación Rápida</h3>
                <p className="text-2xl font-bold text-green-600">2 productos</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800">Rotación Media</h3>
                <p className="text-2xl font-bold text-yellow-600">1 producto</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">Rotación Lenta</h3>
                <p className="text-2xl font-bold text-red-600">1 producto</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Rotación Anual</TableHead>
                  <TableHead>Ventas Último Mes</TableHead>
                  <TableHead>Stock Promedio</TableHead>
                  <TableHead>Clasificación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rotacionReportData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.producto}</TableCell>
                    <TableCell className="font-mono">{item.codigo}</TableCell>
                    <TableCell>{item.rotacion}x</TableCell>
                    <TableCell>{item.ventasUltimoMes}</TableCell>
                    <TableCell>{item.stockPromedio}</TableCell>
                    <TableCell>
                      <Badge variant={
                        item.clasificacion === "Rápida" ? "default" : 
                        item.clasificacion === "Media" ? "secondary" : "destructive"
                      }>
                        {item.clasificacion}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
        break

      case "valorizacion":
        reportTitle = "Valorización de Inventario"
        reportContent = (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Valor Total Inventario</h3>
                <p className="text-2xl font-bold text-purple-600">$175,480.00</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Variación del Mes</h3>
                <p className="text-2xl font-bold text-green-600">+4.2%</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cantidad Productos</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>% del Total</TableHead>
                  <TableHead>Variación Mes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valoracionReportData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.categoria}</TableCell>
                    <TableCell>{item.cantidadProductos}</TableCell>
                    <TableCell>{item.valorTotal}</TableCell>
                    <TableCell>{item.porcentajeTotal}</TableCell>
                    <TableCell>
                      <Badge variant={item.variacionMes.startsWith('+') ? "default" : "destructive"}>
                        {item.variacionMes}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
        break

      case "equilibrio":
        reportTitle = "Análisis de Punto de Equilibrio"
        reportContent = (
          <div className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Punto de Equilibrio</h3>
                <p className="text-2xl font-bold text-blue-600">556 unidades</p>
                <p className="text-sm text-blue-600">$44,480 en ventas</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Margen de Contribución</h3>
                <p className="text-2xl font-bold text-green-600">56.25%</p>
                <p className="text-sm text-green-600">$45 por unidad</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Costos Fijos</h3>
                <p className="text-2xl font-bold text-purple-600">$25,000</p>
                <p className="text-sm text-purple-600">Mensual</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800">Margen de Seguridad</h3>
                <p className="text-2xl font-bold text-orange-600">44%</p>
                <p className="text-sm text-orange-600">244 unidades</p>
              </div>
            </div>

            {/* Gráfica principal de punto de equilibrio */}
            <Card>
              <CardHeader>
                <CardTitle>Análisis Gráfico de Punto de Equilibrio</CardTitle>
                <CardDescription>Relación entre costos, ingresos y utilidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer>
                    <LineChart data={equilibriumData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="unidades" 
                        label={{ value: 'Unidades Vendidas', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        label={{ value: 'Importe ($)', angle: -90, position: 'insideLeft' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value: any, name: string) => {
                          const formattedValue = `$${Number(value).toLocaleString()}`
                          const labels: { [key: string]: string } = {
                            costoTotal: 'Costo Total',
                            ingresos: 'Ingresos Totales',
                            utilidad: 'Utilidad'
                          }
                          return [formattedValue, labels[name] || name]
                        }}
                        labelFormatter={(label) => `Unidades: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="costoTotal" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        name="Costo Total"
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ingresos" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        name="Ingresos Totales"
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="utilidad" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Utilidad"
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Análisis por producto */}
            <Card>
              <CardHeader>
                <CardTitle>Análisis por Producto</CardTitle>
                <CardDescription>Punto de equilibrio individual por producto</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio Venta</TableHead>
                      <TableHead>Costo Variable</TableHead>
                      <TableHead>Margen Contribución</TableHead>
                      <TableHead>Punto Equilibrio</TableHead>
                      <TableHead>Ventas Actuales</TableHead>
                      <TableHead>Margen Seguridad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productAnalysisData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.producto}</TableCell>
                        <TableCell>${item.precioVenta}</TableCell>
                        <TableCell>${item.costoVariable}</TableCell>
                        <TableCell>${item.margenContribucion}</TableCell>
                        <TableCell className="font-bold">{item.puntoEquilibrio} unidades</TableCell>
                        <TableCell>{item.ventasActuales} unidades</TableCell>
                        <TableCell>
                          <Badge variant={
                            item.margenSeguridad.startsWith('-') ? "destructive" : 
                            parseInt(item.margenSeguridad) > 30 ? "default" : "secondary"
                          }>
                            {item.margenSeguridad}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Gráficas adicionales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de barras - Margen de contribución por producto */}
              <Card>
                <CardHeader>
                  <CardTitle>Margen de Contribución por Producto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: '250px' }}>
                    <ResponsiveContainer>
                      <BarChart data={productAnalysisData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="producto" 
                          angle={-45}
                          textAnchor="end"
                          height={100}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip formatter={(value: any) => [`$${value}`, 'Margen de Contribución']} />
                        <Bar dataKey="margenContribucion" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico circular - Distribución por categoría */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Ventas por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: '250px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={categoryBreakEvenData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {categoryBreakEvenData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value}%`, 'Participación']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Análisis de sensibilidad */}
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Sensibilidad</CardTitle>
                <CardDescription>Impacto de cambios en variables clave</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Escenario Optimista (+20% ventas)</h4>
                    <p className="text-sm text-yellow-700">Punto de equilibrio: <strong>463 unidades</strong></p>
                    <p className="text-sm text-yellow-700">Utilidad proyectada: <strong>$28,400</strong></p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Escenario Base (actual)</h4>
                    <p className="text-sm text-blue-700">Punto de equilibrio: <strong>556 unidades</strong></p>
                    <p className="text-sm text-blue-700">Utilidad proyectada: <strong>$20,000</strong></p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Escenario Pesimista (-20% ventas)</h4>
                    <p className="text-sm text-red-700">Punto de equilibrio: <strong>695 unidades</strong></p>
                    <p className="text-sm text-red-700">Utilidad proyectada: <strong>$8,200</strong></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
        break

      case "estado-resultados":
        reportTitle = "Estado de Resultados"
        reportContent = (
          <div className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Ingresos Totales</h3>
                <p className="text-2xl font-bold text-green-600">${estadoResultadosData.ingresos.totalIngresos.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Utilidad Bruta</h3>
                <p className="text-2xl font-bold text-blue-600">${estadoResultadosData.costos.utilidadBruta.toLocaleString()}</p>
                <p className="text-sm text-blue-600">{estadoResultadosData.costos.margenBruto}% margen</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Utilidad Operativa</h3>
                <p className="text-2xl font-bold text-purple-600">${estadoResultadosData.gastosOperativos.utilidadOperativa.toLocaleString()}</p>
                <p className="text-sm text-purple-600">{estadoResultadosData.gastosOperativos.margenOperativo}% margen</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800">Utilidad Neta</h3>
                <p className="text-2xl font-bold text-orange-600">${estadoResultadosData.resultadoFinal.utilidadNeta.toLocaleString()}</p>
                <p className="text-sm text-orange-600">{estadoResultadosData.resultadoFinal.margenNeto}% margen</p>
              </div>
            </div>

            {/* Estado de Resultados Formal */}
            <Card>
              <CardHeader>
                <CardTitle>Estado de Resultados - {estadoResultadosData.periodo}</CardTitle>
                <CardDescription>Análisis detallado de ingresos, costos y gastos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>INGRESOS OPERACIONALES</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span>Ventas Netas</span>
                      <span>${estadoResultadosData.ingresos.ventasNetas.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span>Otros Ingresos</span>
                      <span>${estadoResultadosData.ingresos.otrosIngresos.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total Ingresos</span>
                      <span>${estadoResultadosData.ingresos.totalIngresos.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-b pb-3">
                    <div className="flex justify-between">
                      <span>(-) Costo de Ventas</span>
                      <span className="text-red-600">$({estadoResultadosData.costos.costoVentas.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between font-bold text-green-600">
                      <span>UTILIDAD BRUTA</span>
                      <span>${estadoResultadosData.costos.utilidadBruta.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-b pb-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span>GASTOS OPERACIONALES</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span>Gastos de Ventas</span>
                      <span className="text-red-600">$({estadoResultadosData.gastosOperativos.gastosVentas.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span>Gastos Administrativos</span>
                      <span className="text-red-600">$({estadoResultadosData.gastosOperativos.gastosAdministrativos.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span>Gastos Generales</span>
                      <span className="text-red-600">$({estadoResultadosData.gastosOperativos.gastosGenerales.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-600">
                      <span>UTILIDAD OPERACIONAL</span>
                      <span>${estadoResultadosData.gastosOperativos.utilidadOperativa.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-b pb-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span>GASTOS FINANCIEROS</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span>Intereses Pagados</span>
                      <span className="text-red-600">$({estadoResultadosData.gastosFinancieros.interesesPagados.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span>Comisiones Bancarias</span>
                      <span className="text-red-600">$({estadoResultadosData.gastosFinancieros.comisiones.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>UTILIDAD ANTES DE IMPUESTOS</span>
                      <span>${estadoResultadosData.resultadoFinal.utilidadAntesImpuestos.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <span>(-) Impuestos</span>
                      <span className="text-red-600">$({estadoResultadosData.resultadoFinal.impuestos.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-green-600 bg-green-50 p-2 rounded">
                      <span>UTILIDAD NETA</span>
                      <span>${estadoResultadosData.resultadoFinal.utilidadNeta.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráfica de tendencias mensuales */}
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Mensual</CardTitle>
                <CardDescription>Evolución de ventas, costos y utilidad durante el año</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '400px' }}>
                  <ResponsiveContainer>
                    <LineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="ventas" stroke="#3B82F6" strokeWidth={3} name="Ventas" />
                      <Line type="monotone" dataKey="costos" stroke="#EF4444" strokeWidth={3} name="Costos" />
                      <Line type="monotone" dataKey="utilidad" stroke="#10B981" strokeWidth={3} name="Utilidad" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Análisis de márgenes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estructura de Costos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: '250px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Costo de Ventas', value: estadoResultadosData.costos.costoVentas, color: '#EF4444' },
                            { name: 'Gastos Operativos', value: estadoResultadosData.gastosOperativos.totalGastosOperativos, color: '#F59E0B' },
                            { name: 'Gastos Financieros', value: estadoResultadosData.gastosFinancieros.totalGastosFinancieros, color: '#8B5CF6' },
                            { name: 'Utilidad Neta', value: estadoResultadosData.resultadoFinal.utilidadNeta, color: '#10B981' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {[
                            { color: '#EF4444' }, { color: '#F59E0B' }, 
                            { color: '#8B5CF6' }, { color: '#10B981' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Indicadores de Rentabilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Margen Bruto</span>
                      <Badge variant="default">{estadoResultadosData.costos.margenBruto}%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Margen Operativo</span>
                      <Badge variant="secondary">{estadoResultadosData.gastosOperativos.margenOperativo}%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Margen Neto</span>
                      <Badge variant="outline">{estadoResultadosData.resultadoFinal.margenNeto}%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">EBITDA</span>
                      <span className="font-bold text-green-600">${kpiData.rentabilidad.ebitda.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
        break

      case "reporte-general":
        reportTitle = "Reporte General Ejecutivo"
        reportContent = (
          <div className="space-y-6">
            {/* Dashboard Executive Summary */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 text-sm">Ventas Totales</h4>
                <p className="text-xl font-bold text-green-600">${estadoResultadosData.ingresos.totalIngresos.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 text-sm">Utilidad Neta</h4>
                <p className="text-xl font-bold text-blue-600">${estadoResultadosData.resultadoFinal.utilidadNeta.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 text-sm">ROI</h4>
                <p className="text-xl font-bold text-purple-600">{kpiData.rentabilidad.roi}%</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 text-sm">Inventario</h4>
                <p className="text-xl font-bold text-orange-600">117 productos</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 text-sm">Punto Equilibrio</h4>
                <p className="text-xl font-bold text-red-600">556 unid.</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-800 text-sm">Rotación Inv.</h4>
                <p className="text-xl font-bold text-indigo-600">{kpiData.actividad.rotacionInventario}x</p>
              </div>
            </div>

            {/* Análisis Financiero Integral */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Desempeño</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      <LineChart data={monthlyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']} />
                        <Legend />
                        <Line type="monotone" dataKey="ventas" stroke="#3B82F6" strokeWidth={2} name="Ventas" />
                        <Line type="monotone" dataKey="utilidad" stroke="#10B981" strokeWidth={2} name="Utilidad" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Inventario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={categoryBreakEvenData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {categoryBreakEvenData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value}%`, 'Participación']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Indicadores Clave de Rendimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Indicadores Clave de Rendimiento (KPIs)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">Rentabilidad</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">ROI</span>
                        <Badge variant="default">{kpiData.rentabilidad.roi}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ROE</span>
                        <Badge variant="default">{kpiData.rentabilidad.roe}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ROA</span>
                        <Badge variant="default">{kpiData.rentabilidad.roa}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700">Liquidez</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">R. Corriente</span>
                        <Badge variant="secondary">{kpiData.liquidez.razonCorriente}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Prueba Ácida</span>
                        <Badge variant="secondary">{kpiData.liquidez.pruebaAcida}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Capital Trabajo</span>
                        <span className="text-sm font-medium">${(kpiData.liquidez.capitalTrabajo/1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-purple-700">Actividad</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Rot. Inventario</span>
                        <Badge variant="outline">{kpiData.actividad.rotacionInventario}x</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Rot. Cartera</span>
                        <Badge variant="outline">{kpiData.actividad.rotacionCartera}x</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Ciclo Conversión</span>
                        <span className="text-sm font-medium">{kpiData.actividad.cicloConversion} días</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-orange-700">Endeudamiento</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Razón Deuda</span>
                        <Badge variant="destructive">{(kpiData.endeudamiento.razonDeuda * 100).toFixed(1)}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cobertura Int.</span>
                        <Badge variant="default">{kpiData.endeudamiento.cobertura}x</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Apalancamiento</span>
                        <span className="text-sm font-medium">{kpiData.endeudamiento.apalancamiento}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Análisis de Inventario Resumido */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Por Categoría</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Categoría</TableHead>
                          <TableHead>Productos</TableHead>
                          <TableHead>Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inventoryReportData.slice(0, 3).map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.categoria}</TableCell>
                            <TableCell>{item.productos}</TableCell>
                            <TableCell>{item.valorTotal}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Top Productos por Margen</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead>Margen</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productAnalysisData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-sm">{item.producto.substring(0, 15)}...</TableCell>
                            <TableCell>${item.margenContribucion}</TableCell>
                            <TableCell>
                              <Badge variant={item.margenSeguridad.startsWith('-') ? "destructive" : "default"}>
                                {item.margenSeguridad}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recomendaciones Estratégicas */}
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones Estratégicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🎯 Oportunidades</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• ROI del 15.8% superó objetivo (12%)</li>
                      <li>• Margen bruto saludable (41.5%)</li>
                      <li>• Buena rotación de inventario (8.2x)</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Areas de Atención</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Monitor Samsung en punto crítico</li>
                      <li>• Optimizar gastos administrativos</li>
                      <li>• Mejorar ciclo de conversión (45 días)</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📈 Acciones Recomendadas</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Aumentar ventas de productos alta rotación</li>
                      <li>• Revisar precios productos baja rotación</li>
                      <li>• Negociar mejores términos proveedores</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
        break

      default:
        reportContent = <div className="text-center py-8">Reporte en desarrollo...</div>
        break
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-auto w-full mx-4">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold">{reportTitle}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 text-sm text-gray-500">
              Generado el: {new Date().toLocaleDateString('es-ES')} a las {new Date().toLocaleTimeString('es-ES')}
            </div>
            {reportContent}
          </div>
        </div>
      </div>
    )
  }
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
            <Button className="w-full" onClick={() => setSelectedReport("inventario")}>
              Generar Reporte
            </Button>
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
            <Button className="w-full" onClick={() => setSelectedReport("rotacion")}>
              Generar Reporte
            </Button>
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
            <Button className="w-full" onClick={() => setSelectedReport("valorizacion")}>
              Generar Reporte
            </Button>
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
              <DollarSign className="w-5 h-5 text-green-600" />
              Estado de Resultados
            </CardTitle>
            <CardDescription>Estado financiero completo con análisis de rentabilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => setSelectedReport("estado-resultados")}>
              Generar Reporte
            </Button>
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
              <Target className="w-5 h-5 text-blue-600" />
              Punto de Equilibrio
            </CardTitle>
            <CardDescription>Análisis de costos, ingresos y punto de equilibrio</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => setSelectedReport("equilibrio")}>
              Generar Reporte
            </Button>
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
          
          <div className="border-t pt-4 mt-4">
            <Button 
              className="w-full" 
              variant="default"
              size="lg"
              onClick={() => setSelectedReport("reporte-general")}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Generar Reporte General Ejecutivo
            </Button>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Reporte completo con todos los indicadores y análisis financiero
            </p>
          </div>
        </CardContent>
      </Card>
      
      {renderReportModal()}
    </div>
  )
}
