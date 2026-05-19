import React from 'react'

export default function BotonResolver({ onClick, cargando, mensaje }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={cargando}
        className="btn-primary"
        style={{ marginTop: 6 }}
      >
        {cargando ? (
          <>
            <span style={{ display: 'inline-block', animation: 'spin 0.9s linear infinite' }}>◌</span>
            Calculando...
          </>
        ) : (
          <>
            <span style={{ fontSize: '1.1rem' }}>⟹</span>
            Resolver paso a paso
          </>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </button>

      {/* Mensaje de espera cuando Render está despertando */}
      {cargando && mensaje && mensaje !== 'Calculando...' && (
        <div style={{
          marginTop: 10,
          background: '#fffbeb',
          border: '1px solid #fcd34d',
          borderRadius: 8,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.82rem',
          color: '#92400e',
        }}>
          <span style={{ fontSize: '1rem' }}>⏳</span>
          <span>{mensaje}</span>
        </div>
      )}
    </div>
  )
}
