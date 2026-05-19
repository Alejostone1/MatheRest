import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { resolverExpresion } from '../servicios/api'

export function useResolver() {
  const [cargando,  setCargando]  = useState(false)
  const [error,     setError]     = useState(null)
  const [resultado, setResultado] = useState(null)
  const [mensaje,   setMensaje]   = useState('')   // mensaje de espera
  const timerRef = useRef(null)

  const resolver = async ({ expresion, operacion }) => {
    if (!expresion.trim()) {
      toast.error('Ingresa una expresión matemática')
      return
    }

    setCargando(true)
    setError(null)
    setResultado(null)
    setMensaje('Calculando...')

    // Si tarda más de 4 s, avisamos que el servidor está despertando
    timerRef.current = setTimeout(() => {
      setMensaje('El servidor está despertando (plan gratuito). Espera hasta 60 s…')
      toast.loading('Despertando servidor...', { id: 'wake', duration: 60000 })
    }, 4000)

    try {
      const data = await resolverExpresion({ expresion, operacion })
      setResultado(data)
      toast.dismiss('wake')
      toast.success('¡Resuelto!')
    } catch (err) {
      toast.dismiss('wake')
      const msg =
        err.code === 'ECONNABORTED'
          ? 'Tiempo de espera agotado. El servidor tardó más de 70 s. Inténtalo de nuevo.'
          : err.response?.data?.detalle ||
            err.response?.data?.error ||
            'Error al conectar con el servidor'
      setError(msg)
      toast.error(msg, { duration: 6000 })
    } finally {
      clearTimeout(timerRef.current)
      setCargando(false)
      setMensaje('')
    }
  }

  return { resolver, cargando, error, resultado, mensaje }
}
