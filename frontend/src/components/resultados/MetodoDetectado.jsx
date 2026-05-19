import React from 'react'

export default function MetodoDetectado({ metodo }) {
  const pct = Math.round((metodo.confianza || 1) * 100)
  return (
    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl mb-4">
      <span className="text-2xl">🔍</span>
      <div className="flex-1">
        <p className="text-green-300 font-semibold">{metodo.nombre}</p>
        <p className="text-white/60 text-sm">{metodo.descripcion}</p>
      </div>
      <span className="badge bg-green-500/20 text-green-300 text-xs">
        {pct}% confianza
      </span>
    </div>
  )
}
