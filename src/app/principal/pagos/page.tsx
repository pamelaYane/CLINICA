'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Pago {
  id: number
  citaId: number
  monto: number
  metodoPago: string
  estado: 'pendiente' | 'completado' | 'cancelado'
  fechaPago: string
}

export default function CrudPagos() {
  const [pagos, setPagos] = useState<Pago[]>([])
  const [nuevoPago, setNuevoPago] = useState<Omit<Pago, 'id'>>({
    citaId: 0,
    monto: 0,
    metodoPago: 'efectivo',
    estado: 'pendiente',
    fechaPago: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los pagos
    setPagos([
      { 
        id: 1, 
        citaId: 1, 
        monto: 50, 
        metodoPago: 'efectivo', 
        estado: 'completado', 
        fechaPago: '2024-01-15' 
      },
      { 
        id: 2, 
        citaId: 2, 
        monto: 80, 
        metodoPago: 'tarjeta', 
        estado: 'pendiente', 
        fechaPago: '2024-01-16' 
      },
    ])
  }, [])

  const crearPago = () => {
    const nuevoPagoConId = { ...nuevoPago, id: pagos.length + 1 }
    setPagos([...pagos, nuevoPagoConId])
    setNuevoPago({
      citaId: 0,
      monto: 0,
      metodoPago: 'efectivo',
      estado: 'pendiente',
      fechaPago: new Date().toISOString().split('T')[0]
    })
  }

  const actualizarPago = (id: number, pagoActualizado: Pago) => {
    setPagos(pagos.map(pago => pago.id === id ? pagoActualizado : pago))
  }

  const eliminarPago = (id: number) => {
    setPagos(pagos.filter(pago => pago.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Pagos</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Registrar Nuevo Pago</h2>
        <div className="grid gap-4 max-w-xl">
          <Input
            type="number"
            placeholder="ID de la Cita"
            value={nuevoPago.citaId}
            onChange={(e) => setNuevoPago({...nuevoPago, citaId: parseInt(e.target.value)})}
          />
          <Input
            type="number"
            placeholder="Monto"
            value={nuevoPago.monto}
            onChange={(e) => setNuevoPago({...nuevoPago, monto: parseFloat(e.target.value)})}
          />
          <Select
            value={nuevoPago.metodoPago}
            onValueChange={(value) => setNuevoPago({...nuevoPago, metodoPago: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Método de Pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efectivo">Efectivo</SelectItem>
              <SelectItem value="tarjeta">Tarjeta</SelectItem>
              <SelectItem value="transferencia">Transferencia</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={nuevoPago.fechaPago}
            onChange={(e) => setNuevoPago({...nuevoPago, fechaPago: e.target.value})}
          />
          <Button onClick={crearPago}>Registrar Pago</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cita ID</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagos.map((pago) => (
            <TableRow key={pago.id}>
              <TableCell>{pago.id}</TableCell>
              <TableCell>{pago.citaId}</TableCell>
              <TableCell>${pago.monto}</TableCell>
              <TableCell>{pago.metodoPago}</TableCell>
              <TableCell>{pago.estado}</TableCell>
              <TableCell>{pago.fechaPago}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => actualizarPago(pago.id, {...pago, estado: 'completado'})}
                    variant={pago.estado === 'completado' ? 'outline' : 'default'}
                  >
                    Completar
                  </Button>
                  <Button variant="destructive" onClick={() => eliminarPago(pago.id)}>
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

