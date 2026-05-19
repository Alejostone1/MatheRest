import React, { useState, useRef, useEffect } from 'react'
import TecladoMatematico from './TecladoMatematico'
import PreviewExpresion from './PreviewExpresion'

const EJEMPLOS = {
  derivada: [
    { label: 'x⁵',           val: 'x^5' },
    { label: '3x⁴',          val: '3*x^4' },
    { label: 'x²·eˣ',        val: 'x^2*exp(x)' },
    { label: 'sin(x²)',       val: 'sin(x^2)' },
    { label: 'sin(x)/x',     val: 'sin(x)/x' },
    { label: 'ln(x)',         val: 'ln(x)' },
    { label: 'cos(x)',        val: 'cos(x)' },
    { label: 'x³+x²',        val: 'x^3+x^2' },
  ],
  integral: [
    { label: 'x³',            val: 'x^3' },
    { label: '5',             val: '5' },
    { label: '1/x',           val: '1/x' },
    { label: 'sin(x)',        val: 'sin(x)' },
    { label: 'cos(x)',        val: 'cos(x)' },
    { label: 'eˣ',            val: 'exp(x)' },
    { label: 'x·eˣ',          val: 'x*exp(x)' },
    { label: '2x·e^(x²)',     val: '2*x*exp(x^2)' },
  ],
}

export default function EntradaExpresion({ value, onChange, operacion }) {
  const [teclado, setTeclado] = useState(false)
  const inputRef   = useRef(null)
  const cursorRef  = useRef(null)
  const ejemplos   = EJEMPLOS[operacion] || EJEMPLOS.derivada

  useEffect(() => {
    if (cursorRef.current !== null && inputRef.current) {
      const pos = cursorRef.current
      inputRef.current.setSelectionRange(pos, pos)
      inputRef.current.focus()
      cursorRef.current = null
    }
  })

  const insertar = (texto, retroceder = 0) => {
    const el    = inputRef.current
    const start = el ? (el.selectionStart ?? value.length) : value.length
    const end   = el ? (el.selectionEnd   ?? value.length) : value.length
    onChange(value.substring(0, start) + texto + value.substring(end))
    cursorRef.current = start + texto.length - retroceder
  }

  const borrar = () => {
    const el = inputRef.current
    if (!el) { onChange(value.slice(0, -1)); return }
    const { selectionStart: s, selectionEnd: e } = el
    if (s === e && s > 0) {
      onChange(value.substring(0, s - 1) + value.substring(e))
      cursorRef.current = s - 1
    } else if (s !== e) {
      onChange(value.substring(0, s) + value.substring(e))
      cursorRef.current = s
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Expresión matemática
        </p>
        <button
          type="button"
          onClick={() => setTeclado(!teclado)}
          className="btn-ghost"
          style={{ borderColor: teclado ? '#2563eb' : undefined, color: teclado ? '#60a5fa' : undefined }}
        >
          {teclado ? '⌨ Teclado activo' : '🔢 Teclado'}
        </button>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        className="input-math"
        placeholder={teclado ? 'Usa el teclado o escribe aquí...' : 'Ej: x^2*exp(x)   sin(x^2)   x^3+2*x'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoComplete="off"
        autoFocus={!teclado}
      />

      {/* Preview LaTeX */}
      <PreviewExpresion expresion={value} operacion={operacion} />

      {/* Teclado virtual */}
      {teclado && (
        <TecladoMatematico onInsertar={insertar} onBorrar={borrar} onLimpiar={() => onChange('')} />
      )}

      {/* Ejemplos */}
      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <span style={{ color: '#334155', fontSize: '0.72rem', fontWeight: 600 }}>Ejemplos:</span>
        {ejemplos.map(({ label, val }) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            style={{
              background: '#0a1628',
              border: '1px solid #1e293b',
              color: '#60a5fa',
              borderRadius: 6,
              padding: '3px 10px',
              fontSize: '0.78rem',
              cursor: 'pointer',
              fontFamily: 'monospace',
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#0f1e38'; e.currentTarget.style.borderColor = '#2563eb' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.borderColor = '#1e293b' }}
          >
            {label}
          </button>
        ))}
      </div>

      {!teclado && (
        <p style={{ marginTop: 6, color: '#334155', fontSize: '0.72rem' }}>
          Sintaxis: <code style={{ color: '#60a5fa' }}>^</code> potencias ·{' '}
          <code style={{ color: '#60a5fa' }}>*</code> multiplicar ·{' '}
          <code style={{ color: '#60a5fa' }}>sin/cos/exp/ln</code> funciones
          {' '}— o usa el <span style={{ color: '#60a5fa' }}>teclado matemático</span>
        </p>
      )}
    </div>
  )
}
