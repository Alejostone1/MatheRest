import React from 'react'

export default function SelectorOperacion({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-white/80 text-sm font-medium mb-2">
        Operación
      </label>
      <div className="flex gap-3">
        {[
          { id: 'derivada', label: "d/dx — Derivada", icon: "∂" },
          { id: 'integral', label: "∫ — Integral indefinida", icon: "∫" },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
              value === id
                ? 'border-blue-400 bg-blue-500/30 text-white shadow-lg shadow-blue-500/20'
                : 'border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white'
            }`}
          >
            <span className="text-xl">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
