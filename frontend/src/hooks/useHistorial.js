import { useState, useEffect } from 'react'

const MAX_HISTORIAL = 10

export function useHistorial() {
  const [historial, setHistorial] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('math_historial') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('math_historial', JSON.stringify(historial))
  }, [historial])

  const agregar = (entrada) => {
    setHistorial((prev) => {
      const nuevo = [{ ...entrada, fecha: new Date().toISOString() }, ...prev]
      return nuevo.slice(0, MAX_HISTORIAL)
    })
  }

  const limpiar = () => setHistorial([])

  return { historial, agregar, limpiar }
}
