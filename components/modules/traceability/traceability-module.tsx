"use client"

import { Search, Plus, Eye, Edit, Download, Upload, Check, X, Save, Trash2, RowsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import BulkImportModal from "@/components/bulk-import-modal"
import BulkGuideImportModal from "@/components/bulk-guide-import-modal"
import { useState, useCallback } from "react"
import { toast } from "sonner"

export default function TraceabilityModule() {
  const [showImportModal, setShowImportModal] = useState(false)
  const [showGuideImportModal, setShowGuideImportModal] = useState(false)
  const [editingCell, setEditingCell] = useState<{rowId: number, field: string, tab: string} | null>(null)
  const [editValue, setEditValue] = useState("")
  const [selectedRows, setSelectedRows] = useState<{[key: string]: number[]}>({guias: [], kardex: []})
  const [hasChanges, setHasChanges] = useState(false)
  
  const [guiasDespacho, setGuiasDespacho] = useState([
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
  ])

  const [kardexData, setKardexData] = useState([
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
  ])

  const handleCellClick = useCallback((rowId: number, field: string, currentValue: any, tab: string) => {
    setEditingCell({ rowId, field, tab })
    setEditValue(String(currentValue))
  }, [])

  const handleCellSave = useCallback(() => {
    if (!editingCell) return
    
    if (editingCell.tab === 'guias') {
      setGuiasDespacho(prev => prev.map(item => {
        if (item.id === editingCell.rowId) {
          const updatedItem = { ...item }
          const fieldValue = field === 'productos' ? parseFloat(editValue) || 0 : editValue
          updatedItem[editingCell.field] = fieldValue
          return updatedItem
        }
        return item
      }))
    } else {
      setKardexData(prev => prev.map(item => {
        if (item.id === editingCell.rowId) {
          const updatedItem = { ...item }
          const fieldValue = ['cantidadEntrada', 'cantidadSalida', 'saldo'].includes(editingCell.field) 
                            ? parseFloat(editValue) || 0 
                            : editValue
          updatedItem[editingCell.field] = fieldValue
          return updatedItem
        }
        return item
      }))
    }
    
    setEditingCell(null)
    setEditValue("")
    setHasChanges(true)
    toast.success("Celda actualizada")
  }, [editingCell, editValue])

  const handleCellCancel = useCallback(() => {
    setEditingCell(null)
    setEditValue("")
  }, [])

  const handleSelectRow = useCallback((rowId: number, tab: string) => {
    setSelectedRows(prev => ({
      ...prev,
      [tab]: prev[tab].includes(rowId) 
        ? prev[tab].filter(id => id !== rowId)
        : [...prev[tab], rowId]
    }))
  }, [])

  const handleSelectAll = useCallback((tab: string) => {
    const data = tab === 'guias' ? guiasDespacho : kardexData
    setSelectedRows(prev => ({
      ...prev,
      [tab]: prev[tab].length === data.length 
        ? []
        : data.map(item => item.id)
    }))
  }, [guiasDespacho, kardexData])

  const renderEditableCell = useCallback((item: any, field: string, tab: string) => {
    const isEditing = editingCell?.rowId === item.id && editingCell?.field === field && editingCell?.tab === tab
    const value = item[field]
    const isSelected = selectedRows[tab]?.includes(item.id)
    
    if (isEditing) {
      if (field === 'estado' || field === 'tipoMovimiento') {
        const options = field === 'estado' 
          ? ['Pendiente', 'Despachado', 'En Tránsito', 'Entregado']
          : ['Entrada', 'Salida', 'Ajuste', 'Transferencia']
            
        return (
          <div className="flex items-center gap-1">
            <Select value={editValue} onValueChange={setEditValue}>
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="ghost" onClick={handleCellSave}>
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCellCancel}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        )
      } else {
        return (
          <div className="flex items-center gap-1">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-8 w-full min-w-[120px]"
              type={['productos', 'cantidadEntrada', 'cantidadSalida', 'saldo'].includes(field) ? 'number' : 'text'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCellSave()
                if (e.key === 'Escape') handleCellCancel()
              }}
              autoFocus
            />
            <Button size="sm" variant="ghost" onClick={handleCellSave}>
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCellCancel}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        )
      }
    }

    const cellClass = `cursor-pointer hover:bg-gray-50 p-2 rounded min-h-[32px] border border-transparent hover:border-blue-300 ${isSelected ? 'bg-blue-50' : ''}`
    
    if (field === 'estado') {
      const variant = value === "Pendiente" ? "destructive" : value === "Despachado" ? "default" : "secondary"
      return (
        <div className={cellClass} onClick={() => handleCellClick(item.id, field, value, tab)}>
          <Badge variant={variant}>{value}</Badge>
        </div>
      )
    }
    
    if (field === 'tipoMovimiento') {
      const variant = value === "Entrada" ? "default" : value === "Salida" ? "destructive" : "secondary"
      return (
        <div className={cellClass} onClick={() => handleCellClick(item.id, field, value, tab)}>
          <Badge variant={variant}>{value}</Badge>
        </div>
      )
    }

    if (field === 'codigo' || field === 'documento') {
      return (
        <div className={cellClass} onClick={() => handleCellClick(item.id, field, value, tab)}>
          <span className="font-mono">{value}</span>
        </div>
      )
    }

    return (
      <div className={cellClass} onClick={() => handleCellClick(item.id, field, value, tab)}>
        {value}
      </div>
    )
  }, [editingCell, editValue, selectedRows, handleCellClick, handleCellSave, handleCellCancel])

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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowGuideImportModal(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Importar Excel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Guía
              </Button>
            </div>
          </div>

          {/* Controles de Edición - Guías */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  checked={selectedRows.guias.length === guiasDespacho.length && guiasDespacho.length > 0}
                  onCheckedChange={() => handleSelectAll('guias')}
                />
                <span className="text-sm font-medium">
                  {selectedRows.guias.length > 0 ? `${selectedRows.guias.length} seleccionadas` : "Seleccionar todo"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {hasChanges && (
                <Button onClick={() => {setHasChanges(false); toast.success("Cambios guardados");}} size="sm" variant="default">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
              )}
            </div>
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
                    <TableHead className="w-12">Sel.</TableHead>
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
                  {guiasDespacho.map((guia) => {
                    const isSelected = selectedRows.guias?.includes(guia.id)
                    return (
                      <TableRow key={guia.id} className={isSelected ? 'bg-blue-50' : ''}>
                        <TableCell>
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => handleSelectRow(guia.id, 'guias')}
                          />
                        </TableCell>
                        <TableCell>{renderEditableCell(guia, 'codigo', 'guias')}</TableCell>
                        <TableCell>{renderEditableCell(guia, 'fecha', 'guias')}</TableCell>
                        <TableCell>{renderEditableCell(guia, 'cliente', 'guias')}</TableCell>
                        <TableCell>{renderEditableCell(guia, 'productos', 'guias')}</TableCell>
                        <TableCell>{renderEditableCell(guia, 'estado', 'guias')}</TableCell>
                        <TableCell>{renderEditableCell(guia, 'usuario', 'guias')}</TableCell>
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
                    )
                  })}
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowImportModal(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Importar Excel
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar Kardex
              </Button>
            </div>
          </div>

          {/* Controles de Edición - Kardex */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  checked={selectedRows.kardex.length === kardexData.length && kardexData.length > 0}
                  onCheckedChange={() => handleSelectAll('kardex')}
                />
                <span className="text-sm font-medium">
                  {selectedRows.kardex.length > 0 ? `${selectedRows.kardex.length} seleccionadas` : "Seleccionar todo"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {hasChanges && (
                <Button onClick={() => {setHasChanges(false); toast.success("Cambios guardados");}} size="sm" variant="default">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
              )}
            </div>
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
                    <TableHead className="w-12">Sel.</TableHead>
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
                  {kardexData.map((movement) => {
                    const isSelected = selectedRows.kardex?.includes(movement.id)
                    return (
                      <TableRow key={movement.id} className={isSelected ? 'bg-blue-50' : ''}>
                        <TableCell>
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => handleSelectRow(movement.id, 'kardex')}
                          />
                        </TableCell>
                        <TableCell>{renderEditableCell(movement, 'fecha', 'kardex')}</TableCell>
                        <TableCell>{renderEditableCell(movement, 'tipoMovimiento', 'kardex')}</TableCell>
                        <TableCell>{renderEditableCell(movement, 'documento', 'kardex')}</TableCell>
                        <TableCell>{renderEditableCell(movement, 'cantidadEntrada', 'kardex')}</TableCell>
                        <TableCell>{renderEditableCell(movement, 'cantidadSalida', 'kardex')}</TableCell>
                        <TableCell>{renderEditableCell(movement, 'saldo', 'kardex')}</TableCell>
                        <TableCell>{renderEditableCell(movement, 'usuario', 'kardex')}</TableCell>
                        <TableCell>{renderEditableCell(movement, 'observaciones', 'kardex')}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <BulkImportModal 
        isOpen={showImportModal} 
        onClose={() => setShowImportModal(false)} 
      />
      <BulkGuideImportModal 
        isOpen={showGuideImportModal} 
        onClose={() => setShowGuideImportModal(false)} 
      />
    </div>
  )
}
