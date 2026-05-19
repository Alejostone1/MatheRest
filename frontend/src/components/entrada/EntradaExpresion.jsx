import React from 'react'

const EJEMPLOS = {
  derivada: ['x^5', '3*x^4', 'x^2*exp(x)', 'sin(x^2)', 'sin(x)/x', 'ln(x)'],
  integral: ['x^3', '1/x', 'sin(x)', 'x*exp(x)', '2*x*exp(x^2)', 'cos(x)'],
}

export default function EntradaExpresion({ value, onChange, operacion }) {
  const ejemplos = EJEMPLOS[operacion] || EJEMPLOS.derivada

  return (
    <div className="mb-4">
      <label className="block text-white/80 text-sm font-medium mb-2">
        Expresión matemática
      </label>
      <input
        type="text"
        className="input-math"
        placeholder="Ej: x^2 * exp(x)  |  sin(x^2)  |  x^3 + 2*x"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.form?.requestSubmit()}
        autoFocus
        spellCheck={false}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="text-white/50 text-xs mt-1">Ejemplos:</span>
        {ejemplos.map((ej) => (
          <button
            key={ej}
            type="button"
            onClick={() => onChange(ej)}
            className="badge bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 cursor-pointer transition-colors"
          >
            {ej}
          </button>
        ))}
      </div>
      <p className="mt-2 text-white/40 text-xs">
        Usa <code className="text-blue-300">^</code> para potencias,{' '}
        <code className="text-blue-300">*</code> para multiplicar,{' '}
        <code className="text-blue-300">sin/cos/exp/ln</code> para funciones
      </p>
    </div>
  )
}
