'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Cita {
  id: number
  pacienteId: number
  doctorId: number
  fecha: string
  hora: string
  servicioId: number
  estado: 'programada' | 'completada' | 'cancelada'
}

export default function CrudCitas() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [nuevaCita, setNuevaCita] = useState<Omit<Cita, 'id'>>({
    pacienteId: 0,
    doctorId: 0,
    fecha: '',
    hora: '',
    servicioId: 0,
    estado: 'programada'
  })

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener las citas
    // Por ahora, usaremos datos de ejemplo
    setCitas([
      { id: 1, pacienteId: 1, doctorId: 1, fecha: '2023-06-01', hora: '10:00', servicioId: 1, estado: 'programada' },
      { id: 2, pacienteId: 2, doctorId: 2, fecha: '2023-06-02', hora: '11:00', servicioId: 2, estado: 'completada' },
    ])
  }, [])

  const crearCita = () => {
    // Aquí deberías hacer una llamada a tu API para crear la cita
    const nuevaCitaConId = { ...nuevaCita, id: citas.length + 1 }
    setCitas([...citas, nuevaCitaConId])
    // Reiniciar el formulario
    setNuevaCita({
      pacienteId: 0,
      doctorId: 0,
      fecha: '',
      hora: '',
      servicioId: 0,
      estado: 'programada'
    })
  }

  const actualizarCita = (id: number, citaActualizada: Cita) => {
    // Aquí deberías hacer una llamada a tu API para actualizar la cita
    setCitas(citas.map(cita => cita.id === id ? citaActualizada : cita))
  }

  const eliminarCita = (id: number) => {
    // Aquí deberías hacer una llamada a tu API para eliminar la cita
    setCitas(citas.filter(cita => cita.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Citas</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Crear Nueva Cita</h2>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="ID del Paciente"
            value={nuevaCita.pacienteId}
            onChange={(e) => setNuevaCita({...nuevaCita, pacienteId: parseInt(e.target.value)})}
          />
          <Input
            type="number"
            placeholder="ID del Doctor"
            value={nuevaCita.doctorId}
            onChange={(e) => setNuevaCita({...nuevaCita, doctorId: parseInt(e.target.value)})}
          />
          <Input
            type="date"
            value={nuevaCita.fecha}
            onChange={(e) => setNuevaCita({...nuevaCita, fecha: e.target.value})}
          />
          <Input
            type="time"
            value={nuevaCita.hora}
            onChange={(e) => setNuevaCita({...nuevaCita, hora: e.target.value})}
          />
          <Input
            type="number"
            placeholder="ID del Servicio"
            value={nuevaCita.servicioId}
            onChange={(e) => setNuevaCita({...nuevaCita, servicioId: parseInt(e.target.value)})}
          />
          <Button onClick={crearCita}>Crear Cita</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Paciente ID</TableHead>
            <TableHead>Doctor ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Servicio ID</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {citas.map((cita) => (
            <TableRow key={cita.id}>
              <TableCell>{cita.id}</TableCell>
              <TableCell>{cita.pacienteId}</TableCell>
              <TableCell>{cita.doctorId}</TableCell>
              <TableCell>{cita.fecha}</TableCell>
              <TableCell>{cita.hora}</TableCell>
              <TableCell>{cita.servicioId}</TableCell>
              <TableCell>{cita.estado}</TableCell>
              <TableCell>
                <Button onClick={() => actualizarCita(cita.id, {...cita, estado: 'completada'})}>Completar</Button>
                <Button onClick={() => eliminarCita(cita.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
