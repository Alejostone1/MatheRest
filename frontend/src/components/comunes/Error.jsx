import React from 'react'

export default function Error({ mensaje }) {
  if (!mensaje) return null
  return (
    <div className="anim-fade" style={{
      display: 'flex', gap: 14,
      background: '#fef2f2', border: '1px solid #fca5a5',
      borderRadius: 10, padding: '14px 16px', marginBottom: 16,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: '#fee2e2', border: '1px solid #f87171',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem', color: '#dc2626', flexShrink: 0,
      }}>✕</div>
      <div>
        <p style={{ color: '#b91c1c', fontWeight: 700, fontSize: '0.9rem', margin: '0 0 4px' }}>
          No se pudo procesar la expresión
        </p>
        <p style={{ color: '#ef4444', fontSize: '0.82rem', margin: '0 0 8px', fontFamily: 'monospace' }}>
          {mensaje}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: 0, lineHeight: 1.5 }}>
          Verifica:&nbsp;
          <code style={{ background: '#fee2e2', color: '#dc2626', padding: '1px 5px', borderRadius: 4 }}>^</code> potencias ·{' '}
          <code style={{ background: '#fee2e2', color: '#dc2626', padding: '1px 5px', borderRadius: 4 }}>*</code> multiplicar ·{' '}
          <code style={{ background: '#fee2e2', color: '#dc2626', padding: '1px 5px', borderRadius: 4 }}>sin/cos/exp/ln</code> funciones
        </p>
      </div>
    </div>
  )
}
