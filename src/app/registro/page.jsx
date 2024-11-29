'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '../services/api'
import { validatePassword, validateName, validateEmail } from '../utils/validations'

export default function Registro() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [ disabled, setDisabled ] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setDisabled(true)

        // Validaciones
        const passwordError = validatePassword(password)
        const firstnameError = validateName(firstname)
        const lastnameError = validateName(lastname)
        const emailError = validateEmail(email)

        if (passwordError || firstnameError || lastnameError || emailError) {
            setError(passwordError || firstnameError || lastnameError || emailError)
            setDisabled(false)
            return
        }

        try {
            await registerUser({ email, password, firstname, lastname });
            router.push('/login');
        } catch (err) {
            setDisabled(false)
            if (err.status === 400) {
                setError('El usuario ya existe');
            } else if (err.status === 422) {
                setError('Los datos no cumplen con las reglas de validación');
            } else {
                setError(err.message || 'Error en el registro');
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Haz tu registro
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Correo
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@company.com" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Primer nombre
                                </label>
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    id="firstname" 
                                    placeholder="tu nombre" 
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Primer nombre
                                </label>
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    id="lastname" 
                                    placeholder="tu apellido" 
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                />
                            </div>
                            <button disabled={disabled} onClick={handleSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-600">
                                { !disabled ? 'Registrarse' : 'Registrando...' }
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inicia sesión</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}