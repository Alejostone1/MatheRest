import React from 'react'

export default function Error({ mensaje }) {
  if (!mensaje) return null
  return (
    <div className="flex gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 mb-4">
      <span className="text-xl flex-shrink-0">⚠️</span>
      <div>
        <p className="font-semibold">Error al procesar la expresión</p>
        <p className="text-sm text-red-400 mt-1">{mensaje}</p>
        <p className="text-xs text-white/40 mt-2">
          Verifica que uses: <code>^</code> para potencias, <code>*</code> para multiplicación,
          <code> sin/cos/exp/ln</code> para funciones, paréntesis bien cerrados.
        </p>
      </div>
    </div>
  )
}
