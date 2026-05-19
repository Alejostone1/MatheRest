import { useState } from 'react'
import toast from 'react-hot-toast'
import { resolverExpresion } from '../servicios/api'

export function useResolver() {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [resultado, setResultado] = useState(null)

  const resolver = async ({ expresion, operacion }) => {
    if (!expresion.trim()) {
      toast.error('Ingresa una expresión matemática')
      return
    }
    setCargando(true)
    setError(null)
    setResultado(null)

    try {
      const data = await resolverExpresion({ expresion, operacion })
      setResultado(data)
      toast.success('¡Resuelto exitosamente!')
    } catch (err) {
      const msg =
        err.response?.data?.detalle ||
        err.response?.data?.error ||
        'Error al conectar con el servidor'
      setError(msg)
      toast.error(msg)
    } finally {
      setCargando(false)
    }
  }

  return { resolver, cargando, error, resultado }
}
