import React, { useState, useRef, useEffect } from 'react'
import TecladoMatematico from './TecladoMatematico'
import PreviewExpresion from './PreviewExpresion'

const EJEMPLOS = {
  derivada: [
    { label: 'x⁵',        val: 'x^5' },
    { label: '3x⁴',       val: '3*x^4' },
    { label: 'x²·eˣ',     val: 'x^2*exp(x)' },
    { label: 'sin(x²)',   val: 'sin(x^2)' },
    { label: 'sin(x)/x',  val: 'sin(x)/x' },
    { label: 'ln(x)',     val: 'ln(x)' },
    { label: 'cos(x)',    val: 'cos(x)' },
    { label: 'x³+x²',    val: 'x^3+x^2' },
  ],
  integral: [
    { label: 'x³',        val: 'x^3' },
    { label: '5',         val: '5' },
    { label: '1/x',       val: '1/x' },
    { label: 'sin(x)',    val: 'sin(x)' },
    { label: 'cos(x)',    val: 'cos(x)' },
    { label: 'eˣ',        val: 'exp(x)' },
    { label: 'x·eˣ',      val: 'x*exp(x)' },
    { label: '2x·e^x²',  val: '2*x*exp(x^2)' },
  ],
  integral_definida: [
    { label: 'x²',        val: 'x^2' },
    { label: 'x³',        val: 'x^3' },
    { label: 'sin(x)',    val: 'sin(x)' },
    { label: 'cos(x)',    val: 'cos(x)' },
    { label: 'eˣ',        val: 'exp(x)' },
    { label: '1/x',       val: '1/x' },
    { label: 'x·eˣ',      val: 'x*exp(x)' },
    { label: 'sqrt(x)',   val: 'sqrt(x)' },
  ],
  integral_doble: [
    { label: 'x+y',       val: 'x+y' },
    { label: 'x*y',       val: 'x*y' },
    { label: 'x²+y²',    val: 'x^2+y^2' },
    { label: 'x·y²',     val: 'x*y^2' },
    { label: 'sin(x+y)',  val: 'sin(x+y)' },
    { label: '2xy',       val: '2*x*y' },
  ],
}

const HINT_SINTAXIS = {
  derivada:          '^ potencias · * multiplicar · sin/cos/exp/ln funciones',
  integral:          '^ potencias · * multiplicar · sin/cos/exp/ln funciones',
  integral_definida: 'Ingresa la expresión, luego define los límites a y b',
  integral_doble:    'Usa x e y como variables. Define los cuatro límites de integración',
}

function BoundInput({ label, value, onChange, placeholder }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', color: '#64748b', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        style={{
          width: '100%', background: '#fff', border: '1.5px solid #cbd5e1',
          borderRadius: 8, padding: '8px 12px', color: '#0f172a',
          fontFamily: 'Consolas, monospace', fontSize: '0.9rem',
          outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
        onBlur={e => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

export default function EntradaExpresion({ value, onChange, operacion, limites, onLimitesChange }) {
  const [teclado, setTeclado] = useState(false)
  const inputRef  = useRef(null)
  const cursorRef = useRef(null)
  const ejemplos  = EJEMPLOS[operacion] || EJEMPLOS.derivada

  const esDefinida = operacion === 'integral_definida'
  const esDoble    = operacion === 'integral_doble'
  const tieneLimites = esDefinida || esDoble

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
    <div style={{ marginBottom: 18 }}>

      {/* Cabecera */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
          Expresión matemática
        </p>
        <button
          type="button"
          onClick={() => setTeclado(!teclado)}
          className="btn-ghost"
          style={teclado ? { borderColor: '#2563eb', color: '#2563eb', background: '#eff6ff' } : {}}
        >
          {teclado ? '⌨ Teclado activo' : '🔢 Teclado'}
        </button>
      </div>

      {/* Campo de texto */}
      <input
        ref={inputRef}
        type="text"
        className="input-math"
        placeholder={
          esDoble
            ? 'Ej: x+y   x^2+y^2   x*y'
            : teclado
              ? 'Usa el teclado o escribe aquí...'
              : 'Ej: x^2*exp(x)   sin(x^2)   x^3+2*x'
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoComplete="off"
        autoFocus={!teclado}
      />

      {/* Campos de límites */}
      {tieneLimites && (
        <div style={{ marginTop: 10 }}>
          <p style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            {esDoble ? 'Límites de integración' : 'Límites de integración'}
          </p>

          {/* Límites en x (ambas operaciones) */}
          <div style={{ marginBottom: esDoble ? 8 : 0 }}>
            {esDoble && (
              <p style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.04em' }}>
                Variable x (integral exterior)
              </p>
            )}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <BoundInput
                label={esDoble ? 'a (x min)' : 'a — Límite inferior'}
                value={limites.inf}
                onChange={v => onLimitesChange({ ...limites, inf: v })}
                placeholder="0"
              />
              <div style={{ paddingBottom: 10, color: '#94a3b8', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>→</div>
              <BoundInput
                label={esDoble ? 'b (x max)' : 'b — Límite superior'}
                value={limites.sup}
                onChange={v => onLimitesChange({ ...limites, sup: v })}
                placeholder="1"
              />
            </div>
          </div>

          {/* Límites en y (solo doble) */}
          {esDoble && (
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.04em' }}>
                Variable y (integral interior)
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                <BoundInput
                  label="c (y min)"
                  value={limites.infY}
                  onChange={v => onLimitesChange({ ...limites, infY: v })}
                  placeholder="0"
                />
                <div style={{ paddingBottom: 10, color: '#94a3b8', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>→</div>
                <BoundInput
                  label="d (y max)"
                  value={limites.supY}
                  onChange={v => onLimitesChange({ ...limites, supY: v })}
                  placeholder="1"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vista previa LaTeX */}
      <PreviewExpresion expresion={value} operacion={operacion} limites={limites} />

      {/* Teclado virtual */}
      {teclado && (
        <TecladoMatematico
          onInsertar={insertar}
          onBorrar={borrar}
          onLimpiar={() => onChange('')}
          operacion={operacion}
        />
      )}

      {/* Ejemplos */}
      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600 }}>Ejemplos:</span>
        {ejemplos.map(({ label, val }) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              color: '#2563eb', borderRadius: 6, padding: '3px 10px',
              fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'monospace',
              fontWeight: 600, transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#93c5fd' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0' }}
          >
            {label}
          </button>
        ))}
      </div>

      {!teclado && (
        <p style={{ marginTop: 6, color: '#94a3b8', fontSize: '0.72rem' }}>
          {HINT_SINTAXIS[operacion] || HINT_SINTAXIS.derivada}
          {' '}— o activa el <span style={{ color: '#2563eb', fontWeight: 600 }}>teclado</span>
        </p>
      )}
    </div>
  )
}
