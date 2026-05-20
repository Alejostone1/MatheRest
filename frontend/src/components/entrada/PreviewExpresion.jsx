import React from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

/**
 * Converts a plain-text math expression to LaTeX.
 * Handles: exp(), sqrt(), trig functions, fractions (simple and grouped),
 * powers with ^, pi, and multiplication *.
 */
function toLatex(raw) {
  if (!raw) return ''
  let s = raw.trim()

  // 1. Normalize ** → ^
  s = s.replace(/\*\*/g, '^')

  // 2. exp(...) → e^{...}  (two passes handle nested)
  const repExp = (str) =>
    str.replace(/exp\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, a) => `e^{${a}}`)
  s = repExp(repExp(s))

  // 3. sqrt(...) → \sqrt{...}
  s = s.replace(/sqrt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, a) => `\\sqrt{${a}}`)

  // 4. Trig / log functions: add backslash and wrap args with \left(\right)
  const FUNCS = ['sin', 'cos', 'tan', 'ln', 'log']
  for (const f of FUNCS) {
    s = s.replace(new RegExp(`\\b${f}\\(([^()]*)\\)`, 'g'), `\\${f}\\left($1\\right)`)
  }

  // 5. Fraction patterns — most specific first
  //    (a) (expr) / (expr)  →  \dfrac{expr}{expr}
  s = s.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, '\\dfrac{$1}{$2}')
  //    (b) \func{arg} / word  →  \dfrac{\func{arg}}{word}
  s = s.replace(/(\\[a-z]+\{[^{}]+\})\s*\/\s*([a-zA-Z0-9]+)/g, '\\dfrac{$1}{$2}')
  //    (c) word / word  →  \dfrac{word}{word}
  s = s.replace(/\b([a-zA-Z0-9_]+)\s*\/\s*([a-zA-Z0-9_]+)\b/g, '\\dfrac{$1}{$2}')

  // 6. * → \cdot
  s = s.replace(/\*/g, ' \\cdot ')

  // 7. pi → \pi
  s = s.replace(/\bpi\b/g, '\\pi')

  // 8. Clean up double spaces
  s = s.replace(/  +/g, ' ').trim()

  return s
}

function SafeBlock({ math }) {
  try {
    return <BlockMath math={math} />
  } catch {
    return <code style={{ color: '#2563eb', fontFamily: 'monospace', fontSize: '1rem' }}>{math}</code>
  }
}

export default function PreviewExpresion({ expresion, operacion, limites = {} }) {
  if (!expresion.trim()) return null

  const tex = toLatex(expresion)
  const a   = (limites.inf  || '').trim() || 'a'
  const b   = (limites.sup  || '').trim() || 'b'
  const c   = (limites.infY || '').trim() || 'c'
  const d_  = (limites.supY || '').trim() || 'd'

  let math
  if (operacion === 'derivada') {
    math = `\\dfrac{d}{dx}\\Bigl[\\,${tex}\\,\\Bigr]`
  } else if (operacion === 'integral') {
    math = `\\displaystyle\\int \\left(${tex}\\right)\\,dx`
  } else if (operacion === 'integral_definida') {
    math = `\\displaystyle\\int_{${a}}^{${b}} \\left(${tex}\\right)\\,dx`
  } else if (operacion === 'integral_doble') {
    math = (
      `\\displaystyle\\int_{${a}}^{${b}} \\int_{${c}}^{${d_}} ` +
      `\\left(${tex}\\right)\\,dy\\,dx`
    )
  } else {
    math = tex
  }

  return (
    <div style={{
      marginTop: 10,
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: 12,
      padding: '12px 18px',
      overflowX: 'auto',
      boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
    }}>
      <p style={{
        color: '#94a3b8', fontSize: '0.65rem', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 3, height: 10, background: '#2563eb', borderRadius: 2, display: 'inline-block' }} />
        Vista previa
      </p>
      <div style={{
        textAlign: 'center', color: '#0f172a',
        minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <SafeBlock math={math} />
      </div>
    </div>
  )
}
