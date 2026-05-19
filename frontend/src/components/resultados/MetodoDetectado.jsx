import React from 'react'

const ICONOS = {
  'Regla del producto':               '✕',
  'Regla del cociente':               '÷',
  'Regla de la cadena':               '⛓',
  'Regla de la potencia':             'xⁿ',
  'Regla de la suma/resta':           '±',
  'Integración por partes':           '∫',
  'Sustitución simple (u-sub)':       'u',
  'Integral logarítmica':             'ln',
  'Integral trigonométrica básica':   '~',
  'Integral exponencial':             'eˣ',
  'Derivada básica':                  'f\'',
}

export default function MetodoDetectado({ metodo }) {
  const pct   = Math.round((metodo.confianza || 1) * 100)
  const icono = ICONOS[metodo.nombre] || '∑'

  return (
    <div
      className="anim-up"
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: '#eff6ff', border: '1px solid #bfdbfe',
        borderRadius: 10, padding: '12px 16px', marginBottom: 18,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: '#dbeafe', border: '1px solid #93c5fd',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem', color: '#1d4ed8', fontWeight: 800,
        fontFamily: 'serif', flexShrink: 0,
      }}>
        {icono}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: '#1e40af', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 2px' }}>
          {metodo.nombre}
        </p>
        <p style={{ color: '#3b82f6', fontSize: '0.8rem', margin: 0 }}>
          {metodo.descripcion}
        </p>
      </div>
      <div style={{
        background: '#dbeafe', border: '1px solid #93c5fd',
        borderRadius: 20, padding: '3px 12px',
        color: '#1d4ed8', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0,
      }}>
        {pct}% confianza
      </div>
    </div>
  )
}
