import React, { useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import toast from 'react-hot-toast'

function SafeBlock({ tex }) {
  try { return <BlockMath math={tex} /> }
  catch { return <code style={{ color: '#15803d', fontFamily: 'monospace', fontSize: '1.1rem' }}>{tex}</code> }
}

export default function ResultadoFinal({ resultado }) {
  const [simplificado, setSimplificado] = useState(true)
  const tex = simplificado ? resultado.simplificado_latex : resultado.latex
  const txt = simplificado ? resultado.simplificado       : resultado.expresion

  const copiar = () => { navigator.clipboard.writeText(txt); toast.success('Copiado') }

  return (
    <div className="result-box anim-pop" style={{ marginBottom: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: '#dcfce7', border: '1px solid #86efac',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: '#16a34a', fontWeight: 800, flexShrink: 0,
          }}>✓</div>
          <div>
            <p style={{ color: '#15803d', fontWeight: 800, fontSize: '0.92rem', margin: 0 }}>Resultado final</p>
            <p style={{ color: '#4ade80', fontSize: '0.7rem', margin: 0, background:'#dcfce7', display:'inline-block', padding:'1px 6px', borderRadius:4, marginTop:2 }}>
              {simplificado ? 'Simplificado' : 'Sin simplificar'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn-ghost" style={{ fontSize: '0.72rem' }} onClick={() => setSimplificado(!simplificado)}>
            {simplificado ? 'Ver sin simplificar' : 'Ver simplificado'}
          </button>
          <button type="button" className="btn-ghost" style={{ fontSize: '0.72rem' }} onClick={copiar}>
            📋 Copiar
          </button>
        </div>
      </div>

      {/* Fórmula */}
      <div style={{
        background: '#ffffff', border: '1px solid #86efac', borderRadius: 10,
        padding: '18px 20px', textAlign: 'center', overflowX: 'auto',
        minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <SafeBlock tex={tex || txt} />
      </div>

      {/* Texto plano */}
      <p style={{ marginTop: 8, textAlign: 'center', fontFamily: 'monospace', color: '#94a3b8', fontSize: '0.8rem', wordBreak: 'break-all' }}>
        {txt}
      </p>
    </div>
  )
}
