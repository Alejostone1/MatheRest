import React, { useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import toast from 'react-hot-toast'

function SafeBlockMath({ tex }) {
  try {
    return <BlockMath math={tex} />
  } catch {
    return <code className="text-blue-200 text-lg">{tex}</code>
  }
}

export default function ResultadoFinal({ resultado }) {
  const [mostrarSimple, setMostrarSimple] = useState(true)
  const tex = mostrarSimple ? resultado.simplificado_latex : resultado.latex
  const texto = mostrarSimple ? resultado.simplificado : resultado.expresion

  const copiar = () => {
    navigator.clipboard.writeText(texto)
    toast.success('Copiado al portapapeles')
  }

  return (
    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold flex items-center gap-2">
          <span>✨</span> Resultado final
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMostrarSimple(!mostrarSimple)}
            className="badge bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 cursor-pointer text-xs"
          >
            {mostrarSimple ? 'Ver sin simplificar' : 'Ver simplificado'}
          </button>
          <button
            type="button"
            onClick={copiar}
            className="badge bg-white/10 text-white/70 hover:bg-white/20 cursor-pointer text-xs"
          >
            📋 Copiar
          </button>
        </div>
      </div>

      <div className="bg-black/30 rounded-xl p-4 overflow-x-auto text-center min-h-[60px] flex items-center justify-center">
        <SafeBlockMath tex={tex || texto} />
      </div>

      <p className="text-white/50 text-xs mt-2 text-center font-mono">{texto}</p>
    </div>
  )
}
