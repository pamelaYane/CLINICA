'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface HorarioDisponible {
  id: number
  doctorId: number
  dia: string
  horaInicio: string
  horaFin: string
  estado: 'disponible' | 'ocupado' | 'bloqueado'
}

export default function CrudHorarios() {
  const [horarios, setHorarios] = useState<HorarioDisponible[]>([])
  const [nuevoHorario, setNuevoHorario] = useState<Omit<HorarioDisponible, 'id'>>({
    doctorId: 0,
    dia: '',
    horaInicio: '',
    horaFin: '',
    estado: 'disponible'
  })

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los horarios
    setHorarios([
      { 
        id: 1, 
        doctorId: 1, 
        dia: '2024-01-15', 
        horaInicio: '09:00', 
        horaFin: '13:00', 
        estado: 'disponible' 
      },
      { 
        id: 2, 
        doctorId: 2, 
        dia: '2024-01-15', 
        horaInicio: '14:00', 
        horaFin: '18:00', 
        estado: 'ocupado' 
      },
    ])
  }, [])

  const crearHorario = () => {
    const nuevoHorarioConId = { ...nuevoHorario, id: horarios.length + 1 }
    setHorarios([...horarios, nuevoHorarioConId])
    setNuevoHorario({
      doctorId: 0,
      dia: '',
      horaInicio: '',
      horaFin: '',
      estado: 'disponible'
    })
  }

  const actualizarHorario = (id: number, horarioActualizado: HorarioDisponible) => {
    setHorarios(horarios.map(horario => horario.id === id ? horarioActualizado : horario))
  }

  const eliminarHorario = (id: number) => {
    setHorarios(horarios.filter(horario => horario.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Horarios Disponibles</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Crear Nuevo Horario</h2>
        <div className="grid gap-4 max-w-xl">
          <Input
            type="number"
            placeholder="ID del Doctor"
            value={nuevoHorario.doctorId}
            onChange={(e) => setNuevoHorario({...nuevoHorario, doctorId: parseInt(e.target.value)})}
          />
          <Input
            type="date"
            value={nuevoHorario.dia}
            onChange={(e) => setNuevoHorario({...nuevoHorario, dia: e.target.value})}
          />
          <Input
            type="time"
            placeholder="Hora de Inicio"
            value={nuevoHorario.horaInicio}
            onChange={(e) => setNuevoHorario({...nuevoHorario, horaInicio: e.target.value})}
          />
          <Input
            type="time"
            placeholder="Hora de Fin"
            value={nuevoHorario.horaFin}
            onChange={(e) => setNuevoHorario({...nuevoHorario, horaFin: e.target.value})}
          />
          <Select
            value={nuevoHorario.estado}
            onValueChange={(value: 'disponible' | 'ocupado' | 'bloqueado') => 
              setNuevoHorario({...nuevoHorario, estado: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disponible">Disponible</SelectItem>
              <SelectItem value="ocupado">Ocupado</SelectItem>
              <SelectItem value="bloqueado">Bloqueado</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={crearHorario}>Crear Horario</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Doctor ID</TableHead>
            <TableHead>Día</TableHead>
            <TableHead>Hora Inicio</TableHead>
            <TableHead>Hora Fin</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {horarios.map((horario) => (
            <TableRow key={horario.id}>
              <TableCell>{horario.id}</TableCell>
              <TableCell>{horario.doctorId}</TableCell>
              <TableCell>{horario.dia}</TableCell>
              <TableCell>{horario.horaInicio}</TableCell>
              <TableCell>{horario.horaFin}</TableCell>
              <TableCell>{horario.estado}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => actualizarHorario(horario.id, 
                      {...horario, estado: horario.estado === 'disponible' ? 'ocupado' : 'disponible'}
                    )}
                  >
                    Cambiar Estado
                  </Button>
                  <Button variant="destructive" onClick={() => eliminarHorario(horario.id)}>
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

