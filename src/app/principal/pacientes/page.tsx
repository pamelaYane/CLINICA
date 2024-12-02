'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Paciente {
  id: number
  nombre: string
  apellido: string
  fechaNacimiento: string
  telefono: string
  email: string
}

export default function CrudPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [nuevoPaciente, setNuevoPaciente] = useState<Omit<Paciente, 'id'>>({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    telefono: '',
    email: ''
  })

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los pacientes
    // Por ahora, usaremos datos de ejemplo
    setPacientes([
      { id: 1, nombre: 'Juan', apellido: 'Pérez', fechaNacimiento: '1990-01-01', telefono: '123456789', email: 'juan@example.com' },
      { id: 2, nombre: 'María', apellido: 'García', fechaNacimiento: '1985-05-15', telefono: '987654321', email: 'maria@example.com' },
    ])
  }, [])

  const crearPaciente = () => {
    // Aquí deberías hacer una llamada a tu API para crear el paciente
    const nuevoPacienteConId = { ...nuevoPaciente, id: pacientes.length + 1 }
    setPacientes([...pacientes, nuevoPacienteConId])
    // Reiniciar el formulario
    setNuevoPaciente({
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      telefono: '',
      email: ''
    })
  }

  const actualizarPaciente = (id: number, pacienteActualizado: Paciente) => {
    // Aquí deberías hacer una llamada a tu API para actualizar el paciente
    setPacientes(pacientes.map(paciente => paciente.id === id ? pacienteActualizado : paciente))
  }

  const eliminarPaciente = (id: number) => {
    // Aquí deberías hacer una llamada a tu API para eliminar el paciente
    setPacientes(pacientes.filter(paciente => paciente.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Pacientes</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Crear Nuevo Paciente</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Nombre"
            value={nuevoPaciente.nombre}
            onChange={(e) => setNuevoPaciente({...nuevoPaciente, nombre: e.target.value})}
          />
          <Input
            placeholder="Apellido"
            value={nuevoPaciente.apellido}
            onChange={(e) => setNuevoPaciente({...nuevoPaciente, apellido: e.target.value})}
          />
          <Input
            type="date"
            value={nuevoPaciente.fechaNacimiento}
            onChange={(e) => setNuevoPaciente({...nuevoPaciente, fechaNacimiento: e.target.value})}
          />
          <Input
            placeholder="Teléfono"
            value={nuevoPaciente.telefono}
            onChange={(e) => setNuevoPaciente({...nuevoPaciente, telefono: e.target.value})}
          />
          <Input
            type="email"
            placeholder="Email"
            value={nuevoPaciente.email}
            onChange={(e) => setNuevoPaciente({...nuevoPaciente, email: e.target.value})}
          />
          <Button onClick={crearPaciente}>Crear Paciente</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Fecha de Nacimiento</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pacientes.map((paciente) => (
            <TableRow key={paciente.id}>
              <TableCell>{paciente.id}</TableCell>
              <TableCell>{paciente.nombre}</TableCell>
              <TableCell>{paciente.apellido}</TableCell>
              <TableCell>{paciente.fechaNacimiento}</TableCell>
              <TableCell>{paciente.telefono}</TableCell>
              <TableCell>{paciente.email}</TableCell>
              <TableCell>
                <Button onClick={() => actualizarPaciente(paciente.id, {...paciente, nombre: paciente.nombre + ' (Actualizado)'})}>Actualizar</Button>
                <Button onClick={() => eliminarPaciente(paciente.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

