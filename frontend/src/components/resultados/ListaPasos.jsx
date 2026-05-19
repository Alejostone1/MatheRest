import React, { useState } from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

function FormulaLatex({ tex, block = false }) {
  try {
    if (!tex) return null
    return block ? <BlockMath math={tex} /> : <InlineMath math={tex} />
  } catch {
    return <code className="text-blue-200">{tex}</code>
  }
}

export default function ListaPasos({ pasos }) {
  const [expandido, setExpandido] = useState(null)

  return (
    <div className="mb-4">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <span>📋</span> Pasos de solución
      </h3>
      <div className="space-y-3">
        {pasos.map((paso) => {
          const isOpen = expandido === paso.numero
          return (
            <div key={paso.numero} className="step-card">
              <button
                type="button"
                className="w-full flex items-center gap-3 text-left"
                onClick={() => setExpandido(isOpen ? null : paso.numero)}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/30 text-blue-300 text-sm font-bold flex items-center justify-center">
                  {paso.numero}
                </span>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{paso.titulo}</p>
                  <p className="text-white/60 text-xs mt-0.5">{paso.descripcion}</p>
                </div>
                <span className="text-white/40 text-sm">{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  {paso.formula_latex ? (
                    <div className="bg-black/20 rounded-lg p-3 overflow-x-auto text-center">
                      <FormulaLatex tex={paso.formula_latex} block />
                    </div>
                  ) : (
                    <code className="text-blue-200 text-sm block bg-black/20 rounded-lg p-3">
                      {paso.formula}
                    </code>
                  )}
                  {paso.explicacion && (
                    <p className="text-white/60 text-sm mt-2 italic">{paso.explicacion}</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
