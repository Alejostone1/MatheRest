import React from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

function toLatex(raw) {
  if (!raw) return ''
  let s = raw.trim()
  s = s.replace(/\*\*/g, '^')
  const repExp = (str) =>
    str.replace(/exp\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, a) => `e^{${a}}`)
  s = repExp(repExp(s))
  s = s.replace(/sqrt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_, a) => `\\sqrt{${a}}`)
  const funcs = { sin: '\\sin', cos: '\\cos', tan: '\\tan', ln: '\\ln', log: '\\log' }
  for (const [f, lf] of Object.entries(funcs))
    s = s.replace(new RegExp(`\\b${f}\\(`, 'g'), `${lf}\\left(`)
  s = s.replace(/\\left\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, '\\left($1\\right)')
  s = s.replace(/(?<!\^)\*(?!\*)/g, ' \\cdot ')
  s = s.replace(/\bpi\b/g, '\\pi')
  s = s.replace(/\b(\w+)\s*\/\s*(\w+)\b/g, '\\frac{$1}{$2}')
  return s
}

function SafeBlock({ math }) {
  try { return <BlockMath math={math} /> }
  catch { return <code style={{ color: '#2563eb', fontFamily: 'monospace' }}>{math}</code> }
}

export default function PreviewExpresion({ expresion, operacion }) {
  if (!expresion.trim()) return null
  const tex  = toLatex(expresion)
  const math = operacion === 'derivada'
    ? `\\dfrac{d}{dx}\\Bigl[\\,${tex}\\,\\Bigr]`
    : `\\displaystyle\\int \\Bigl(${tex}\\Bigr)\\,dx`

  return (
    <div style={{
      marginTop: 10,
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: 10,
      padding: '10px 16px',
      overflowX: 'auto',
    }}>
      <p style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
        Vista previa
      </p>
      <div style={{ textAlign: 'center', color: '#0f172a' }}>
        <SafeBlock math={math} />
      </div>
    </div>
  )
}
