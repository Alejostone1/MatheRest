import React from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

function aLatex(expr) {
  return expr
    .replace(/\*\*/g, '^')
    .replace(/exp\(([^()]+)\)/g, 'e^{$1}')
    .replace(/sqrt\(([^()]+)\)/g, '\\sqrt{$1}')
    .replace(/ln\(([^()]+)\)/g, '\\ln\\left($1\\right)')
    .replace(/log\(([^()]+)\)/g, '\\log\\left($1\\right)')
    .replace(/sin\(([^()]+)\)/g, '\\sin\\left($1\\right)')
    .replace(/cos\(([^()]+)\)/g, '\\cos\\left($1\\right)')
    .replace(/tan\(([^()]+)\)/g, '\\tan\\left($1\\right)')
    .replace(/\*/g, '\\cdot ')
    .replace(/\bpi\b/g, '\\pi')
    .replace(/\be\b/g, 'e')
}

export default function PreviewExpresion({ expresion, operacion }) {
  if (!expresion.trim()) return null

  try {
    const tex = aLatex(expresion)
    const math =
      operacion === 'derivada'
        ? `\\dfrac{d}{dx}\\left[${tex}\\right]`
        : `\\displaystyle\\int \\left(${tex}\\right) dx`

    return (
      <div className="mt-2 bg-black/25 rounded-xl px-4 py-3 border border-white/10 overflow-x-auto">
        <p className="text-white/30 text-xs mb-1">Vista previa</p>
        <div className="text-center text-white">
          <BlockMath math={math} />
        </div>
      </div>
    )
  } catch {
    return null
  }
}
