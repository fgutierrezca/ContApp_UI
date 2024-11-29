'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
        const storedEmail = localStorage.getItem('email');
        setUserName(storedEmail || '');
    }
}, []);

  return (
    <div style={styles.container}>
      <h1>Bienvenido a la página principal</h1>
      {userName ? (
        <p>Hola, {userName}!</p>
      ) : (
        <p>No se encontró el nombre de usuario en el localStorage.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    color: '#333',
  },
};