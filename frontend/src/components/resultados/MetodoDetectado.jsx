import React from 'react'

const ICONOS = {
  'Regla del producto':     '✕',
  'Regla del cociente':     '÷',
  'Regla de la cadena':     '⛓',
  'Regla de la potencia':   'ⁿ',
  'Regla de la suma/resta': '±',
  'Integración por partes': '∫',
  'Sustitución simple':     'u',
  'Integral logarítmica':   'ln',
  'Integral trigonométrica básica': '~',
  'Integral exponencial':   'e',
}

export default function MetodoDetectado({ metodo }) {
  const pct  = Math.round((metodo.confianza || 1) * 100)
  const icono = ICONOS[metodo.nombre] || '∑'

  return (
    <div
      className="anim-up"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        background: '#0a1e38',
        border: '1px solid #1e3a5f',
        borderRadius: 10,
        padding: '12px 16px',
        marginBottom: 16,
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: '#1e3a8a',
        border: '1px solid #2563eb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem', color: '#93c5fd', fontFamily: 'serif',
        flexShrink: 0,
      }}>
        {icono}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: '#93c5fd', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 2px' }}>
          {metodo.nombre}
        </p>
        <p style={{ color: '#475569', fontSize: '0.8rem', margin: 0 }}>
          {metodo.descripcion}
        </p>
      </div>
      <div style={{
        background: '#172554',
        border: '1px solid #1e40af',
        borderRadius: 20,
        padding: '3px 10px',
        color: '#60a5fa',
        fontSize: '0.73rem',
        fontWeight: 700,
        flexShrink: 0,
      }}>
        {pct}% confianza
      </div>
    </div>
  )
}
