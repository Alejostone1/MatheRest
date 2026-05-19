import React, { useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

function SafeBlock({ tex }) {
  try { return <BlockMath math={tex} /> }
  catch { return <code style={{ color: '#2563eb', fontFamily: 'monospace', fontSize: '0.9rem' }}>{tex}</code> }
}

function Paso({ paso, delay }) {
  const [abierto, setAbierto] = useState(true)

  return (
    <div className={`step-card anim-up anim-delay${Math.min(delay, 5)} ${abierto ? 'open' : ''}`}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12, padding: 0, textAlign: 'left' }}
      >
        <div className="step-number">{paso.numero}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem', margin: '0 0 2px' }}>
            {paso.titulo}
          </p>
          <p style={{ color: '#64748b', fontSize: '0.78rem', margin: 0, lineHeight: 1.45 }}>
            {paso.descripcion}
          </p>
        </div>
        <span style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: 4, flexShrink: 0 }}>
          {abierto ? '▲' : '▼'}
        </span>
      </button>

      {abierto && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9' }} className="anim-fade">
          {paso.formula_latex ? (
            <div style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: 8, padding: '10px 16px', overflowX: 'auto', textAlign: 'center',
            }}>
              <SafeBlock tex={paso.formula_latex} />
            </div>
          ) : (
            <div style={{
              background: '#eff6ff', border: '1px solid #bfdbfe',
              borderRadius: 8, padding: '10px 16px',
            }}>
              <code style={{ color: '#1d4ed8', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {paso.formula}
              </code>
            </div>
          )}
          {paso.explicacion && (
            <p style={{ color: '#94a3b8', fontSize: '0.77rem', marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 }}>
              💡 {paso.explicacion}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function ListaPasos({ pasos }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ color: '#64748b', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          Solución paso a paso <span style={{ color: '#94a3b8', fontWeight: 400 }}>({pasos.length} pasos)</span>
        </h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pasos.map((paso, i) => <Paso key={paso.numero} paso={paso} delay={i + 1} />)}
      </div>
    </div>
  )
}
