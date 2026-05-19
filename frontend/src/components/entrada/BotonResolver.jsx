import React from 'react'

export default function BotonResolver({ onClick, cargando }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={cargando}
      className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
    >
      {cargando ? (
        <>
          <span className="animate-spin text-xl">⟳</span>
          Calculando...
        </>
      ) : (
        <>
          <span className="text-xl">🧮</span>
          Resolver paso a paso
        </>
      )}
    </button>
  )
}
