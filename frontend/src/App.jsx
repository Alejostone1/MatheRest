import React, { useState } from 'react'
import EntradaExpresion from './components/entrada/EntradaExpresion'
import SelectorOperacion from './components/entrada/SelectorOperacion'
import BotonResolver from './components/entrada/BotonResolver'
import TarjetaResultado from './components/resultados/TarjetaResultado'
import Error from './components/comunes/Error'
import { useResolver } from './hooks/useResolver'
import { useHistorial } from './hooks/useHistorial'

export default function App() {
  const [expresion, setExpresion] = useState('')
  const [operacion, setOperacion] = useState('derivada')
  const { resolver, cargando, error, resultado } = useResolver()
  const { historial, agregar } = useHistorial()

  const manejarResolver = async () => {
    const ok = await resolver({ expresion, operacion })
    if (expresion.trim()) agregar({ expresion, operacion })
  }

  const cambiarOperacion = (op) => {
    setOperacion(op)
    setExpresion('')
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 32, paddingBottom: 48, paddingLeft: 16, paddingRight: 16 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────── */}
        <header style={{ textAlign: 'center', marginBottom: 32 }} className="anim-fade">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#0a1628',
            border: '1px solid #1e3352',
            borderRadius: 8,
            padding: '4px 14px',
            fontSize: '0.72rem',
            color: '#60a5fa',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Sistema activo
          </div>

          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: '#e2e8f0',
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}>
            Asistente Matemático
          </h1>
          <p style={{ color: '#475569', fontSize: '1rem', margin: '0 0 20px' }}>
            Analiza · Detecta el método · Explica paso a paso
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {[
              { n: '12', t: 'Derivadas' },
              { n: '8',  t: 'Integrales' },
              { n: '20', t: 'Casos totales' },
            ].map(({ n, t }) => (
              <div key={t} style={{
                background: '#0a1628',
                border: '1px solid #1e3352',
                borderRadius: 8,
                padding: '6px 16px',
                textAlign: 'center',
              }}>
                <p style={{ color: '#2563eb', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{n}</p>
                <p style={{ color: '#334155', fontSize: '0.7rem', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ── Panel de entrada ─────────────────────────────── */}
        <form
          className="card anim-up"
          style={{ marginBottom: 16 }}
          onSubmit={(e) => { e.preventDefault(); manejarResolver() }}
        >
          <SelectorOperacion value={operacion} onChange={cambiarOperacion} />
          <EntradaExpresion value={expresion} onChange={setExpresion} operacion={operacion} />
          <BotonResolver onClick={manejarResolver} cargando={cargando} />
        </form>

        {/* ── Error ────────────────────────────────────────── */}
        <Error mensaje={error} />

        {/* ── Resultado ────────────────────────────────────── */}
        {resultado && <TarjetaResultado resultado={resultado} />}

        {/* ── Historial ────────────────────────────────────── */}
        {historial.length > 0 && !resultado && (
          <div className="card anim-fade" style={{ marginTop: 16 }}>
            <p style={{ color: '#334155', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Historial reciente
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {historial.slice(0, 8).map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setExpresion(h.expresion); setOperacion(h.operacion) }}
                  style={{
                    background: '#0a1628',
                    border: '1px solid #1e293b',
                    color: '#64748b',
                    borderRadius: 8,
                    padding: '5px 12px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#93c5fd' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.color = '#64748b' }}
                >
                  <span style={{ color: '#1e3a8a', fontSize: '0.7rem' }}>
                    {h.operacion === 'derivada' ? 'd/dx' : '∫'}
                  </span>
                  {h.expresion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer ───────────────────────────────────────── */}
        <footer style={{ textAlign: 'center', marginTop: 40, color: '#1e293b', fontSize: '0.72rem' }}>
          Python · SymPy · FastAPI · React · TailwindCSS
        </footer>

      </div>
    </div>
  )
}
