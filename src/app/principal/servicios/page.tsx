'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Servicio {
  id: number
  nombre: string
  descripcion: string
  duracion: number // en minutos
  precio: number
}

export default function CrudServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [nuevoServicio, setNuevoServicio] = useState<Omit<Servicio, 'id'>>({
    nombre: '',
    descripcion: '',
    duracion: 30,
    precio: 0
  })

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los servicios
    setServicios([
      { id: 1, nombre: 'Consulta General', descripcion: 'Consulta médica general', duracion: 30, precio: 50 },
      { id: 2, nombre: 'Consulta Especializada', descripcion: 'Consulta con especialista', duracion: 45, precio: 80 },
    ])
  }, [])

  const crearServicio = () => {
    const nuevoServicioConId = { ...nuevoServicio, id: servicios.length + 1 }
    setServicios([...servicios, nuevoServicioConId])
    setNuevoServicio({
      nombre: '',
      descripcion: '',
      duracion: 30,
      precio: 0
    })
  }

  const actualizarServicio = (id: number, servicioActualizado: Servicio) => {
    setServicios(servicios.map(servicio => servicio.id === id ? servicioActualizado : servicio))
  }

  const eliminarServicio = (id: number) => {
    setServicios(servicios.filter(servicio => servicio.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Servicios</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Crear Nuevo Servicio</h2>
        <div className="grid gap-4 max-w-xl">
          <Input
            placeholder="Nombre del Servicio"
            value={nuevoServicio.nombre}
            onChange={(e) => setNuevoServicio({...nuevoServicio, nombre: e.target.value})}
          />
          <Textarea
            placeholder="Descripción"
            value={nuevoServicio.descripcion}
            onChange={(e) => setNuevoServicio({...nuevoServicio, descripcion: e.target.value})}
          />
          <Input
            type="number"
            placeholder="Duración (minutos)"
            value={nuevoServicio.duracion}
            onChange={(e) => setNuevoServicio({...nuevoServicio, duracion: parseInt(e.target.value)})}
          />
          <Input
            type="number"
            placeholder="Precio"
            value={nuevoServicio.precio}
            onChange={(e) => setNuevoServicio({...nuevoServicio, precio: parseFloat(e.target.value)})}
          />
          <Button onClick={crearServicio}>Crear Servicio</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Duración (min)</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicios.map((servicio) => (
            <TableRow key={servicio.id}>
              <TableCell>{servicio.id}</TableCell>
              <TableCell>{servicio.nombre}</TableCell>
              <TableCell>{servicio.descripcion}</TableCell>
              <TableCell>{servicio.duracion}</TableCell>
              <TableCell>${servicio.precio}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button onClick={() => actualizarServicio(servicio.id, {...servicio, precio: servicio.precio + 10})}>
                    Actualizar
                  </Button>
                  <Button variant="destructive" onClick={() => eliminarServicio(servicio.id)}>
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

