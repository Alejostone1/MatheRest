import React from 'react'

const OPCIONES = [
  {
    id: 'derivada',
    icono: '∂',
    titulo: 'Derivada',
    subtitulo: 'd/dx [ f(x) ]',
    color: '#2563eb',
    bgActivo: '#eff6ff',
    borderActivo: '#2563eb',
  },
  {
    id: 'integral',
    icono: '∫',
    titulo: 'Integral indefinida',
    subtitulo: '∫ f(x) dx + C',
    color: '#7c3aed',
    bgActivo: '#f5f3ff',
    borderActivo: '#7c3aed',
  },
  {
    id: 'integral_definida',
    icono: '∫ₐᵇ',
    titulo: 'Integral definida',
    subtitulo: '∫ₐᵇ f(x) dx',
    color: '#0891b2',
    bgActivo: '#ecfeff',
    borderActivo: '#0891b2',
  },
  {
    id: 'integral_doble',
    icono: '∬',
    titulo: 'Integral doble',
    subtitulo: '∫∫ f(x,y) dydx',
    color: '#059669',
    bgActivo: '#ecfdf5',
    borderActivo: '#059669',
  },
]

export default function SelectorOperacion({ value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{
        color: '#334155', fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8,
      }}>
        Operación
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 8,
      }}>
        {OPCIONES.map(({ id, icono, titulo, subtitulo, color, bgActivo, borderActivo }) => {
          const activo = value === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                border: activo ? `2px solid ${borderActivo}` : '1.5px solid #e2e8f0',
                background: activo ? bgActivo : '#ffffff',
                transition: 'all 0.15s',
                boxShadow: activo ? `0 2px 8px ${color}20` : 'none',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                if (!activo) { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc' }
              }}
              onMouseLeave={e => {
                if (!activo) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#ffffff' }
              }}
            >
              <span style={{
                fontSize: '1.4rem', lineHeight: 1, fontFamily: 'serif', minWidth: 28,
                color: activo ? color : '#cbd5e1',
                transition: 'color 0.15s',
              }}>
                {icono}
              </span>
              <div>
                <p style={{
                  color: activo ? color : '#64748b', fontWeight: 700,
                  fontSize: '0.82rem', margin: 0, transition: 'color 0.15s',
                }}>
                  {titulo}
                </p>
                <p style={{
                  color: activo ? color : '#94a3b8', fontSize: '0.68rem',
                  margin: 0, fontFamily: 'monospace', opacity: activo ? 0.85 : 1,
                  transition: 'color 0.15s',
                }}>
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
