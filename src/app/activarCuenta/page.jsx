'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCodeActivation, activacionCuenta } from '../services/api'

export default function ActivarCuenta(){

    const [ disabled, setDisabled ] = useState(false)
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('')
    const router = useRouter()
    const [error, setError] = useState('')

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedEmail = localStorage.getItem('email');
            setEmail(storedEmail || '');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setDisabled(true)

        try {
            const data = await activacionCuenta(code)

            if (!data || Object.keys(data).length === 0) {
                setError('Código no encontrado');
                setDisabled(false);
                return;
            }

            router.push('/login')
        } catch (err) {
            setError(err.message || 'Error al verificar el codigo')
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Ingresa tu código de activación
                        </h1>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                            El código fue enviado al correo {email}
                        </p>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <input 
                                    type="text" 
                                    name="code" 
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-center text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                />
                            </div>
                            <button disabled={disabled} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-600">
                                { !disabled ? 'Enviar código' : 'Verificando código...' }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}