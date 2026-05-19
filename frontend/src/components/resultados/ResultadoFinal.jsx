import React, { useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import toast from 'react-hot-toast'

function SafeBlock({ tex }) {
  try {
    return <BlockMath math={tex} />
  } catch {
    return <code style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '1.1rem' }}>{tex}</code>
  }
}

export default function ResultadoFinal({ resultado }) {
  const [simplificado, setSimplificado] = useState(true)

  const tex  = simplificado ? resultado.simplificado_latex : resultado.latex
  const txt  = simplificado ? resultado.simplificado       : resultado.expresion
  const label = simplificado ? 'Simplificado' : 'Sin simplificar'

  const copiar = () => {
    navigator.clipboard.writeText(txt)
    toast.success('Copiado al portapapeles')
  }

  return (
    <div className="result-box anim-pop" style={{ marginBottom: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#166534', border: '1px solid #22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', flexShrink: 0,
          }}>✓</div>
          <div>
            <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>Resultado final</p>
            <p style={{ color: '#166534', fontSize: '0.72rem', margin: 0 }}>{label}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: '0.72rem' }}
            onClick={() => setSimplificado(!simplificado)}
          >
            {simplificado ? 'Ver sin simplificar' : 'Ver simplificado'}
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: '0.72rem' }}
            onClick={copiar}
          >
            📋 Copiar
          </button>
        </div>
      </div>

      {/* Fórmula grande */}
      <div style={{
        background: '#050d1a',
        border: '1px solid #166534',
        borderRadius: 10,
        padding: '16px 20px',
        textAlign: 'center',
        overflowX: 'auto',
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <SafeBlock tex={tex || txt} />
      </div>

      {/* Texto plano */}
      <p style={{
        marginTop: 8,
        textAlign: 'center',
        fontFamily: 'monospace',
        color: '#334155',
        fontSize: '0.8rem',
        wordBreak: 'break-all',
      }}>
        {txt}
      </p>
    </div>
  )
}
