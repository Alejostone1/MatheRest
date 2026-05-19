import React from 'react'

const OPCIONES = [
  { id: 'derivada', icono: '∂', titulo: 'Derivada',          subtitulo: 'd/dx [ f(x) ]' },
  { id: 'integral', icono: '∫', titulo: 'Integral',          subtitulo: '∫ f(x) dx' },
]

export default function SelectorOperacion({ value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
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
                flex: 1, display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                border: activo ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                background: activo ? '#eff6ff' : '#ffffff',
                transition: 'all 0.15s',
                boxShadow: activo ? '0 2px 8px rgba(37,99,235,0.12)' : 'none',
              }}
            >
              <span style={{
                fontSize: '1.7rem', lineHeight: 1, fontFamily: 'serif',
                color: activo ? '#2563eb' : '#cbd5e1',
                transition: 'color 0.15s',
              }}>
                {icono}
              </span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: activo ? '#1e40af' : '#64748b', fontWeight: 700, fontSize: '0.9rem', margin: 0, transition: 'color 0.15s' }}>
                  {titulo}
                </p>
                <p style={{ color: activo ? '#3b82f6' : '#94a3b8', fontSize: '0.72rem', margin: 0, fontFamily: 'monospace', transition: 'color 0.15s' }}>
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
