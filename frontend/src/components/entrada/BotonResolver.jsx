import React from 'react'

export default function BotonResolver({ onClick, cargando }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={cargando}
      className="btn-primary"
      style={{ marginTop: 6 }}
    >
      {cargando ? (
        <>
          <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>◌</span>
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
  )
}
