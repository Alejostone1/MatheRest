import React from 'react'

const OPCIONES = [
  {
    id: 'derivada',
    icono: '∂',
    titulo: 'Derivada',
    subtitulo: 'd/dx [ f(x) ]',
  },
  {
    id: 'integral',
    icono: '∫',
    titulo: 'Integral',
    subtitulo: '∫ f(x) dx',
  },
]

export default function SelectorOperacion({ value, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
        Operación
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        {OPCIONES.map(({ id, icono, titulo, subtitulo }) => {
          const activo = value === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 10,
                border: activo ? '1.5px solid #2563eb' : '1.5px solid #1e293b',
                background: activo ? '#0f1e38' : '#0a1628',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <span style={{
                fontSize: '1.6rem',
                lineHeight: 1,
                color: activo ? '#60a5fa' : '#334155',
                fontFamily: 'serif',
                transition: 'color 0.15s',
              }}>
                {icono}
              </span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: activo ? '#e2e8f0' : '#64748b', fontWeight: 600, fontSize: '0.9rem', margin: 0, transition: 'color 0.15s' }}>
                  {titulo}
                </p>
                <p style={{ color: activo ? '#60a5fa' : '#334155', fontSize: '0.75rem', margin: 0, fontFamily: 'monospace', transition: 'color 0.15s' }}>
                  {subtitulo}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
