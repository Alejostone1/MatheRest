import React from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

/* Convierte notación Python/SymPy a LaTeX válido */
function toLatex(raw) {
  if (!raw) return ''
  let s = raw.trim()

  // 1. Potencias dobles  (**) → ^
  s = s.replace(/\*\*/g, '^')

  // 2. exp(arg) → e^{arg}  — soporta un nivel de parens anidados
  const repExp = (str) =>
    str.replace(/exp\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, a) => `e^{${a}}`)
  s = repExp(repExp(s)) // dos pasadas para doble anidamiento

  // 3. sqrt(arg) → \sqrt{arg}
  s = s.replace(/sqrt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, a) => `\\sqrt{${a}}`)

  // 4. Funciones trig/log → \sin \cos ...
  const funcs = { sin:'\\sin', cos:'\\cos', tan:'\\tan', ln:'\\ln', log:'\\log' }
  for (const [f, lf] of Object.entries(funcs)) {
    const re = new RegExp(`\\b${f}\\(`, 'g')
    s = s.replace(re, `${lf}\\left(`)
    // cerrar \left( con \right)
  }
  // arreglamos el cierre de \left( añadido
  s = s.replace(/\\left\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, '\\left($1\\right)')

  // 5. Multiplicación  * → \cdot (no afecta ** ya convertido)
  s = s.replace(/(?<!\^)\*(?!\*)/g, '\\cdot ')

  // 6. Constantes
  s = s.replace(/\bpi\b/g, '\\pi')

  // 7. Fracciones  a/b   → \frac{a}{b}   (solo entre tokens simples)
  s = s.replace(/\b(\w+)\s*\/\s*(\w+)\b/g, '\\frac{$1}{$2}')

  return s
}

function SafeBlock({ math }) {
  try {
    return <BlockMath math={math} />
  } catch {
    return (
      <code style={{ color: '#93c5fd', fontFamily: 'monospace', fontSize: '1rem' }}>
        {math}
      </code>
    )
  }
}

export default function PreviewExpresion({ expresion, operacion }) {
  if (!expresion.trim()) return null

  const tex = toLatex(expresion)
  const math =
    operacion === 'derivada'
      ? `\\dfrac{d}{dx}\\Bigl[\\,${tex}\\,\\Bigr]`
      : `\\displaystyle\\int \\Bigl(${tex}\\Bigr)\\,dx`

  return (
    <div
      style={{
        marginTop: 10,
        background: '#070f1d',
        border: '1px solid #1e3352',
        borderRadius: 10,
        padding: '10px 16px',
        overflowX: 'auto',
      }}
    >
      <p style={{ color: '#475569', fontSize: '0.7rem', marginBottom: 4, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Vista previa
      </p>
      <div style={{ textAlign: 'center', color: '#e2e8f0' }}>
        <SafeBlock math={math} />
      </div>
    </div>
  )
}
