import React from 'react'

export default function Error({ mensaje }) {
  if (!mensaje) return null
  return (
    <div
      className="anim-fade"
      style={{
        display: 'flex',
        gap: 14,
        background: '#1a0a0a',
        border: '1px solid #7f1d1d',
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 16,
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: '#450a0a', border: '1px solid #b91c1c',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem', flexShrink: 0,
      }}>
        ✕
      </div>
      <div>
        <p style={{ color: '#f87171', fontWeight: 700, fontSize: '0.9rem', margin: '0 0 4px' }}>
          No se pudo procesar la expresión
        </p>
        <p style={{ color: '#b91c1c', fontSize: '0.82rem', margin: '0 0 8px', fontFamily: 'monospace' }}>
          {mensaje}
        </p>
        <p style={{ color: '#6b1313', fontSize: '0.76rem', margin: 0, lineHeight: 1.5 }}>
          Verifica: <code style={{ color: '#fca5a5' }}>^</code> para potencias ·{' '}
          <code style={{ color: '#fca5a5' }}>*</code> para multiplicar ·{' '}
          <code style={{ color: '#fca5a5' }}>sin/cos/exp/ln</code> para funciones ·{' '}
          paréntesis bien cerrados
        </p>
      </div>
    </div>
  )
}
