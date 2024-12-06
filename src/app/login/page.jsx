'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '../services/api'
import { validatePassword, validateEmail } from '../utils/validations'

export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLogin(true)

        const passwordError = validatePassword(password)
        const emailError = validateEmail(email)

        if (passwordError || emailError) {
            setError(passwordError || emailError)
            setIsLogin(false)
            return
        }

        try {
            const data = await loginUser({ email, password });
            console.log(data);
        
            // Validar que userData exista antes de acceder a sus propiedades
            if (!data.userData || Object.keys(data.userData).length === 0) {
                throw new Error("No se encontró información del usuario");
            }
        
            localStorage.setItem('email', email);

            // Si el usuario no está activo, redirigir a activarCuenta
            if (!data.userData.Active) {
                router.push('/activarCuenta');
                return; // Evitar que se ejecute el resto del código
            }
        
            // Si está activo, guardar el token y redirigir
            localStorage.setItem('token', data.idToken);
            router.push('/');
        } catch (err) {
            setError(err.message || 'Error en el inicio de sesión');
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Inicia sesión en tu cuenta
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
                            <button onClick={handleSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-600">
                                { isLogin ? 'Iniciando Sesión...' : 'Iniciar Sesión' }
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                ¿No tienes una cuenta? <a href="/registro" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Regístrate</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}