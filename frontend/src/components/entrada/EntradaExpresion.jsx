import React, { useState, useRef, useEffect } from 'react'
import TecladoMatematico from './TecladoMatematico'
import PreviewExpresion from './PreviewExpresion'

const EJEMPLOS = {
  derivada: [
    { label: 'x⁵',         val: 'x^5' },
    { label: 'x²·eˣ',      val: 'x^2*exp(x)' },
    { label: 'sin(x²)',     val: 'sin(x^2)' },
    { label: 'sin(x)/x',   val: 'sin(x)/x' },
    { label: 'ln(x)',       val: 'ln(x)' },
    { label: 'x³+x²',      val: 'x^3+x^2' },
  ],
  integral: [
    { label: 'x³',          val: 'x^3' },
    { label: '1/x',         val: '1/x' },
    { label: 'sin(x)',      val: 'sin(x)' },
    { label: 'x·eˣ',        val: 'x*exp(x)' },
    { label: '2x·e^(x²)',   val: '2*x*exp(x^2)' },
    { label: 'cos(x)',      val: 'cos(x)' },
  ],
}

export default function EntradaExpresion({ value, onChange, operacion }) {
  const [teclado, setTeclado] = useState(false)
  const inputRef = useRef(null)
  const cursorRef = useRef(null)
  const ejemplos = EJEMPLOS[operacion] || EJEMPLOS.derivada

  // Restaurar posición del cursor tras cada render causado por inserción
  useEffect(() => {
    if (cursorRef.current !== null && inputRef.current) {
      const pos = cursorRef.current
      inputRef.current.setSelectionRange(pos, pos)
      inputRef.current.focus()
      cursorRef.current = null
    }
  })

  const insertar = (texto, retroceder = 0) => {
    const el = inputRef.current
    const start = el ? (el.selectionStart ?? value.length) : value.length
    const end   = el ? (el.selectionEnd   ?? value.length) : value.length
    const nuevo = value.substring(0, start) + texto + value.substring(end)
    onChange(nuevo)
    cursorRef.current = start + texto.length - retroceder
  }

  const borrar = () => {
    const el = inputRef.current
    if (!el) { onChange(value.slice(0, -1)); return }
    const start = el.selectionStart
    const end   = el.selectionEnd
    if (start === end && start > 0) {
      onChange(value.substring(0, start - 1) + value.substring(end))
      cursorRef.current = start - 1
    } else if (start !== end) {
      onChange(value.substring(0, start) + value.substring(end))
      cursorRef.current = start
    }
  }

  return (
    <div className="mb-4">
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-2">
        <label className="text-white/80 text-sm font-medium">
          Expresión matemática
        </label>
        <button
          type="button"
          onClick={() => setTeclado(!teclado)}
          className={`badge cursor-pointer text-xs transition-all ${
            teclado
              ? 'bg-blue-500/40 text-blue-200 border border-blue-400/40'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
        >
          {teclado ? '⌨️ Teclado activo' : '🔢 Teclado matemático'}
        </button>
      </div>

      {/* Campo de texto */}
      <input
        ref={inputRef}
        type="text"
        className="input-math"
        placeholder={teclado ? 'Usa el teclado de abajo o escribe...' : 'Ej: x^2*exp(x)  |  sin(x^2)  |  x^3+x^2'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoComplete="off"
        autoFocus={!teclado}
      />

      {/* Vista previa LaTeX */}
      <PreviewExpresion expresion={value} operacion={operacion} />

      {/* Teclado virtual */}
      {teclado && (
        <TecladoMatematico
          onInsertar={insertar}
          onBorrar={borrar}
          onLimpiar={() => onChange('')}
        />
      )}

      {/* Ejemplos rápidos */}
      <div className="mt-2 flex flex-wrap gap-2 items-center">
        <span className="text-white/40 text-xs">Ejemplos:</span>
        {ejemplos.map(({ label, val }) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className="badge bg-blue-500/15 text-blue-300 hover:bg-blue-500/35 cursor-pointer transition-colors border border-blue-500/20"
          >
            {label}
          </button>
        ))}
      </div>

      {!teclado && (
        <p className="mt-1.5 text-white/35 text-xs">
          Tip: usa <code className="text-blue-300">^</code> para potencias,{' '}
          <code className="text-blue-300">*</code> para multiplicar,{' '}
          <code className="text-blue-300">sin/cos/exp/ln</code> para funciones —
          o activa el <span className="text-blue-300">teclado matemático</span> arriba.
        </p>
      )}
    </div>
  )
}
