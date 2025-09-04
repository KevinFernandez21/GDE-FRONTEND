"use client"

import { useState, useCallback, useMemo } from "react"
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Package, AlertTriangle, Truck, Save, X, Check, RowsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import BulkImportModal from "@/components/bulk-import-modal"
import { toast } from "sonner"

export default function InventoryModule() {
  // Datos de ejemplo para el inventario
  const initialInventoryData = [
    {
      id: 1,
      sku: "LDI-001",
      nombre: "Laptop Dell Inspiron",
      categoria: "Electrónicos",
      precio: 850.0,
      cantidad: 45,
    },
    {
      id: 2,
      sku: "MLX-002", 
      nombre: "Mouse Logitech MX",
      categoria: "Accesorios",
      precio: 65.0,
      cantidad: 120,
    },
    {
      id: 3,
      sku: "MSM-003",
      nombre: 'Monitor Samsung 24"',
      categoria: "Electrónicos", 
      precio: 280.0,
      cantidad: 8,
    },
    {
      id: 4,
      sku: "TCL-004",
      nombre: "Teclado Mecánico RGB",
      categoria: "Accesorios",
      precio: 120.0,
      cantidad: 25,
    },
    {
      id: 5,
      sku: "WCH-005", 
      nombre: "Webcam HD 1080p",
      categoria: "Electrónicos",
      precio: 45.0,
      cantidad: 15,
    },
  ]

  const [showImportModal, setShowImportModal] = useState(false)
  const [editingCell, setEditingCell] = useState<{rowId: number, field: string} | null>(null)
  const [editValue, setEditValue] = useState("")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [inventoryItems, setInventoryItems] = useState(initialInventoryData)
  const [hasChanges, setHasChanges] = useState(false)
  const [isExcelMode, setIsExcelMode] = useState(false)

  const stockMetrics = useMemo(() => {
    const totalItems = inventoryItems.reduce((sum, item) => sum + item.cantidad, 0)
    const lowStock = inventoryItems.filter(item => item.cantidad < 10).length
    const categories = [...new Set(inventoryItems.map(item => item.categoria))].length
    
    return {
      totalItems,
      lowStock, 
      categories,
    }
  }, [inventoryItems])

  const handleCellClick = useCallback((rowId: number, field: string, currentValue: any) => {
    if (!isExcelMode) return
    setEditingCell({ rowId, field })
    setEditValue(String(currentValue))
  }, [isExcelMode])

  const handleCellSave = useCallback(() => {
    if (!editingCell) return
    
    setInventoryItems(prev => prev.map(item => {
      if (item.id === editingCell.rowId) {
        const updatedItem = { ...item }
        const fieldValue = editingCell.field === 'precio' || editingCell.field === 'cantidad'
                          ? parseFloat(editValue) || 0
                          : editValue
        updatedItem[editingCell.field] = fieldValue
        return updatedItem
      }
      return item
    }))
    
    setEditingCell(null)
    setEditValue("")
    setHasChanges(true)
    toast.success("Celda actualizada")
  }, [editingCell, editValue])

  const handleCellCancel = useCallback(() => {
    setEditingCell(null)
    setEditValue("")
  }, [])

  const handleAddRow = useCallback(() => {
    const newId = Math.max(...inventoryItems.map(item => item.id)) + 1
    const newItem = {
      id: newId,
      sku: `SKU-${String(newId).padStart(3, '0')}`,
      nombre: "Nuevo Producto",
      categoria: "Sin Categoría",
      precio: 0,
      cantidad: 0,
    }
    setInventoryItems(prev => [...prev, newItem])
    setHasChanges(true)
    toast.success("Nueva fila agregada")
  }, [inventoryItems])

  const handleDeleteRows = useCallback(() => {
    if (selectedRows.length === 0) return
    setInventoryItems(prev => prev.filter(item => !selectedRows.includes(item.id)))
    setSelectedRows([])
    setHasChanges(true)
    toast.success(`${selectedRows.length} filas eliminadas`)
  }, [selectedRows])

  const handleSaveChanges = useCallback(async () => {
    // Aquí se integraría con el backend
    try {
      // Simular llamada API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setHasChanges(false)
      toast.success("Cambios guardados exitosamente")
    } catch (error) {
      toast.error("Error al guardar los cambios")
    }
  }, [])

  const handleSelectRow = useCallback((rowId: number) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    )
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectedRows(prev => 
      prev.length === inventoryItems.length 
        ? []
        : inventoryItems.map(item => item.id)
    )
  }, [inventoryItems])

  const renderEditableCell = useCallback((item: any, field: string) => {
    const isEditing = editingCell?.rowId === item.id && editingCell?.field === field
    const value = item[field]
    const isSelected = selectedRows.includes(item.id)
    
    if (isEditing) {
      if (field === 'categoria') {
        return (
          <div className="flex items-center gap-1">
            <Select value={editValue} onValueChange={setEditValue}>
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electrónicos">Electrónicos</SelectItem>
                <SelectItem value="Accesorios">Accesorios</SelectItem>
                <SelectItem value="Oficina">Oficina</SelectItem>
                <SelectItem value="Hogar">Hogar</SelectItem>
                <SelectItem value="Deportes">Deportes</SelectItem>
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
              type={field === 'precio' || field === 'cantidad' ? 'number' : 'text'}
              step={field === 'precio' ? '0.01' : '1'}
              min={field === 'precio' || field === 'cantidad' ? '0' : undefined}
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

    const cellClass = `cursor-pointer hover:bg-gray-50 p-2 rounded min-h-[32px] ${isSelected ? 'bg-blue-50' : ''} ${isExcelMode ? 'border border-transparent hover:border-blue-300' : ''}`
    
    if (field === 'cantidad') {
      const variant = value < 10 ? "destructive" : value < 20 ? "secondary" : "default"
      return (
        <div className={cellClass} onClick={() => handleCellClick(item.id, field, value)}>
          <Badge variant={variant}>{value}</Badge>
        </div>
      )
    }
    
    if (field === 'precio') {
      return (
        <div className={cellClass} onClick={() => handleCellClick(item.id, field, value)}>
          <span className="font-bold text-green-600">${value.toLocaleString()}</span>
        </div>
      )
    }

    if (field === 'categoria') {
      return (
        <div className={cellClass} onClick={() => handleCellClick(item.id, field, value)}>
          <Badge variant="outline">{value}</Badge>
        </div>
      )
    }

    return (
      <div className={cellClass} onClick={() => handleCellClick(item.id, field, value)}>
        {field === 'sku' ? (
          <span className="font-mono text-blue-600">{value}</span>
        ) : field === 'nombre' ? (
          <span className="font-medium">{value}</span>
        ) : (
          value
        )}
      </div>
    )
  }, [editingCell, editValue, selectedRows, isExcelMode, handleCellClick, handleCellSave, handleCellCancel])

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
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronicos">Electrónicos</SelectItem>
              <SelectItem value="accesorios">Accesorios</SelectItem>
              <SelectItem value="oficina">Oficina</SelectItem>
              <SelectItem value="hogar">Hogar</SelectItem>
              <SelectItem value="deportes">Deportes</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Más Filtros
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isExcelMode ? "default" : "outline"} 
            onClick={() => setIsExcelMode(!isExcelMode)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {isExcelMode ? "Salir Modo Excel" : "Modo Excel"}
          </Button>
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

      {/* Controles del Modo Excel */}
      {isExcelMode && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={selectedRows.length === inventoryItems.length && inventoryItems.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                {selectedRows.length > 0 ? `${selectedRows.length} seleccionadas` : "Seleccionar todo"}
              </span>
            </div>
            {selectedRows.length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleDeleteRows}>
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Seleccionadas
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddRow} size="sm">
              <RowsIcon className="w-4 h-4 mr-2" />
              Agregar Fila
            </Button>
            {hasChanges && (
              <Button onClick={handleSaveChanges} size="sm" variant="default">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Métricas de Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Total Items</p>
                <p className="text-2xl font-bold text-green-600">{stockMetrics.totalItems}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Stock Bajo</p>
                <p className="text-2xl font-bold text-red-600">{stockMetrics.lowStock}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Categorías</p>
                <p className="text-2xl font-bold text-blue-600">{stockMetrics.categories}</p>
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
                  {isExcelMode && <TableHead className="w-12">Sel.</TableHead>}
                  <TableHead>ID</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Cantidad</TableHead>
                  {!isExcelMode && <TableHead>Acciones</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => {
                  const isSelected = selectedRows.includes(item.id)
                  return (
                    <TableRow key={item.id} className={isSelected && isExcelMode ? 'bg-blue-50' : ''}>
                      {isExcelMode && (
                        <TableCell>
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => handleSelectRow(item.id)}
                          />
                        </TableCell>
                      )}
                      <TableCell className="font-semibold">{item.id}</TableCell>
                      <TableCell>{renderEditableCell(item, 'sku')}</TableCell>
                      <TableCell>{renderEditableCell(item, 'nombre')}</TableCell>
                      <TableCell>{renderEditableCell(item, 'categoria')}</TableCell>
                      <TableCell>{renderEditableCell(item, 'precio')}</TableCell>
                      <TableCell>{renderEditableCell(item, 'cantidad')}</TableCell>
                      {!isExcelMode && (
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
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <BulkImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />
    </div>
  )
}
