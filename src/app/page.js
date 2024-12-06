// 'use client'

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const [userName, setUserName] = useState('');
//   const router = useRouter(); // Inicializa el router

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem('token');
//       const storedEmail = localStorage.getItem('email');
//       const userData = localStorage.getItem('userData');
//       console.log(userData);
      
//       if (storedToken) {
//         setUserName(storedEmail); // Si hay un email, se guarda en el estado
//       } else {
//         router.push('/login'); // Redirige a la vista de login si no hay email
//       }
//     }
//   }, [router]);

//   return (
//     <div style={styles.container}>
//       <h1>Bienvenido a la página principal</h1>
//       {userName ? (
//         <p>Hola, {userName}!</p>
//       ) : (
//         <p>No se encontró el nombre de usuario en el localStorage.</p>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f7f7f7',
//     color: '#333',
//   },
// };

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserData, getEventos } from '@/app/services/api'

export default function Home() {
  const [user, setUser] = useState(null)
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      try {

        const userData = await getUserData(token)
        setUser(userData)

        const eventosData = await getEventos("Fiesta de cumpleaños", token)
        setEventos(eventosData)

      } catch (err) {
        console.error('Error fetching user data:', err)
        localStorage.removeItem('token')
        router.push('/login')
      }finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-800">Cargando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenido, {user.firstname}</h1>
          <div className="space-y-2 text-gray-700">
            <p><strong>Nombre:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cerrar Sesión
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-900">Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-semibold mb-3">{evento.titulo}</h3>
              <p className="text-sm mb-4">{evento.direccion}</p>
              <p className="font-medium text-gray-200">Asistentes: {evento.asistentes.length}</p>
              
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-200">Lista de Asistentes:</h4>
                <ul className="list-disc list-inside text-gray-100 mt-2 space-y-3">
                  {evento.asistentes.map((asistente) => (
                    <li key={asistente.asistente.id} className="bg-gray-800 p-4 rounded-lg shadow-sm">
                      <p className="font-medium">ID: <span className="text-gray-300">{asistente.asistente.id}</span></p>
                      <p className="font-medium">Nombre: <span className="text-gray-300">{asistente.asistente.nombre}</span></p>
                      <p className="font-medium">Correo: <span className="text-gray-300">{asistente.asistente.correo}</span></p>
                      <p className="font-medium">Edad: <span className="text-gray-300">{asistente.asistente.edad}</span></p>
                    
                      {asistente.valoracion && (
                        <div className="mt-2">
                          <p className="font-medium text-gray-300">Valoración:</p>
                          <p className="text-gray-200">{asistente.valoracion.descripcion}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}