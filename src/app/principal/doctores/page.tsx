'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Doctor {
  id: number
  nombre: string
  apellido: string
  especialidad: string
  telefono: string
  email: string
}

export default function CrudDoctores() {
  const [doctores, setDoctores] = useState<Doctor[]>([])
  const [nuevoDoctor, setNuevoDoctor] = useState<Omit<Doctor, 'id'>>({
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    email: ''
  })

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los doctores
    // Por ahora, usaremos datos de ejemplo
    setDoctores([
      { id: 1, nombre: 'Carlos', apellido: 'Rodríguez', especialidad: 'Cardiología', telefono: '123456789', email: 'carlos@example.com' },
      { id: 2, nombre: 'Ana', apellido: 'Martínez', especialidad: 'Pediatría', telefono: '987654321', email: 'ana@example.com' },
    ])
  }, [])

  const crearDoctor = () => {
    // Aquí deberías hacer una llamada a tu API para crear el doctor
    const nuevoDoctorConId = { ...nuevoDoctor, id: doctores.length + 1 }
    setDoctores([...doctores, nuevoDoctorConId])
    // Reiniciar el formulario
    setNuevoDoctor({
      nombre: '',
      apellido: '',
      especialidad: '',
      telefono: '',
      email: ''
    })
  }

  const actualizarDoctor = (id: number, doctorActualizado: Doctor) => {
    // Aquí deberías hacer una llamada a tu API para actualizar el doctor
    setDoctores(doctores.map(doctor => doctor.id === id ? doctorActualizado : doctor))
  }

  const eliminarDoctor = (id: number) => {
    // Aquí deberías hacer una llamada a tu API para eliminar el doctor
    setDoctores(doctores.filter(doctor => doctor.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Doctores</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Crear Nuevo Doctor</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Nombre"
            value={nuevoDoctor.nombre}
            onChange={(e) => setNuevoDoctor({...nuevoDoctor, nombre: e.target.value})}
          />
          <Input
            placeholder="Apellido"
            value={nuevoDoctor.apellido}
            onChange={(e) => setNuevoDoctor({...nuevoDoctor, apellido: e.target.value})}
          />
          <Input
            placeholder="Especialidad"
            value={nuevoDoctor.especialidad}
            onChange={(e) => setNuevoDoctor({...nuevoDoctor, especialidad: e.target.value})}
          />
          <Input
            placeholder="Teléfono"
            value={nuevoDoctor.telefono}
            onChange={(e) => setNuevoDoctor({...nuevoDoctor, telefono: e.target.value})}
          />
          <Input
            type="email"
            placeholder="Email"
            value={nuevoDoctor.email}
            onChange={(e) => setNuevoDoctor({...nuevoDoctor, email: e.target.value})}
          />
          <Button onClick={crearDoctor}>Crear Doctor</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Especialidad</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctores.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.id}</TableCell>
              <TableCell>{doctor.nombre}</TableCell>
              <TableCell>{doctor.apellido}</TableCell>
              <TableCell>{doctor.especialidad}</TableCell>
              <TableCell>{doctor.telefono}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>
                <Button onClick={() => actualizarDoctor(doctor.id, {...doctor, nombre: doctor.nombre + ' (Actualizado)'})}>Actualizar</Button>
                <Button onClick={() => eliminarDoctor(doctor.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

