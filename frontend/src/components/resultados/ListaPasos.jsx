import React, { useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

function SafeBlock({ tex }) {
  try {
    return <BlockMath math={tex} />
  } catch {
    return (
      <code style={{ color: '#93c5fd', fontFamily: 'monospace', fontSize: '0.9rem', wordBreak: 'break-all' }}>
        {tex}
      </code>
    )
  }
}

function Paso({ paso, delay }) {
  const [abierto, setAbierto] = useState(true)

  return (
    <div
      className={`step-card anim-up anim-delay${Math.min(delay, 5)} ${abierto ? 'open' : ''}`}
    >
      {/* Header del paso */}
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          padding: 0,
          textAlign: 'left',
        }}
      >
        <div className="step-number">{paso.numero}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', margin: '0 0 2px' }}>
            {paso.titulo}
          </p>
          <p style={{ color: '#475569', fontSize: '0.78rem', margin: 0, lineHeight: 1.4 }}>
            {paso.descripcion}
          </p>
        </div>
        <span style={{ color: '#334155', fontSize: '0.75rem', marginTop: 2, flexShrink: 0 }}>
          {abierto ? '▲' : '▼'}
        </span>
      </button>

      {/* Cuerpo expandido */}
      {abierto && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1e293b' }} className="anim-fade">
          {paso.formula_latex ? (
            <div style={{
              background: '#050d1a',
              border: '1px solid #1e3352',
              borderRadius: 8,
              padding: '10px 16px',
              overflowX: 'auto',
              textAlign: 'center',
            }}>
              <SafeBlock tex={paso.formula_latex} />
            </div>
          ) : (
            <div style={{
              background: '#050d1a',
              border: '1px solid #1e293b',
              borderRadius: 8,
              padding: '10px 16px',
            }}>
              <code style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {paso.formula}
              </code>
            </div>
          )}
          {paso.explicacion && (
            <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 }}>
              💡 {paso.explicacion}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function ListaPasos({ pasos }) {
  const [todosAbiertos, setTodosAbiertos] = useState(true)

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          Solución paso a paso &nbsp;
          <span style={{ color: '#334155', fontWeight: 400 }}>({pasos.length} pasos)</span>
        </h3>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setTodosAbiertos(!todosAbiertos)}
          style={{ fontSize: '0.72rem' }}
        >
          {todosAbiertos ? 'Colapsar todo' : 'Expandir todo'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pasos.map((paso, i) => (
          <Paso key={paso.numero} paso={paso} delay={i + 1} />
        ))}
      </div>
    </div>
  )
}
