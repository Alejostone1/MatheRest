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
    await resolver({ expresion, operacion })
    if (expresion.trim()) agregar({ expresion, operacion })
  }

  const cambiarOperacion = (op) => { setOperacion(op); setExpresion('') }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 36, paddingBottom: 60, paddingLeft: 16, paddingRight: 16, background: '#f1f5f9' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────── */}
        <header style={{ textAlign: 'center', marginBottom: 32 }} className="anim-fade">

          {/* Barra top */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 28, marginBottom: 24,
          }}>
            {[
              { n: '12', t: 'Derivadas',   color: '#2563eb' },
              { n: '8',  t: 'Integrales',  color: '#16a34a' },
              { n: '20', t: 'Casos total', color: '#0f172a' },
            ].map(({ n, t, color }) => (
              <div key={t} style={{ textAlign: 'center' }}>
                <p style={{ color, fontWeight: 800, fontSize: '1.5rem', margin: 0, lineHeight: 1 }}>{n}</p>
                <p style={{ color: '#64748b', fontSize: '0.72rem', margin: '2px 0 0', fontWeight: 500 }}>{t}</p>
              </div>
            ))}
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 10px',
            letterSpacing: '-0.025em',
          }}>
            Asistente Matemático
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0, fontWeight: 400 }}>
            Analiza expresiones · Detecta el método · Explica paso a paso
          </p>
        </header>

        {/* ── Panel entrada ─────────────────────────────── */}
        <form
          className="card anim-up"
          style={{ marginBottom: 16 }}
          onSubmit={(e) => { e.preventDefault(); manejarResolver() }}
        >
          <SelectorOperacion value={operacion} onChange={cambiarOperacion} />
          <EntradaExpresion value={expresion} onChange={setExpresion} operacion={operacion} />
          <BotonResolver onClick={manejarResolver} cargando={cargando} />
        </form>

        {/* ── Error ─────────────────────────────────────── */}
        <Error mensaje={error} />

        {/* ── Resultado ─────────────────────────────────── */}
        {resultado && <TarjetaResultado resultado={resultado} />}

        {/* ── Historial ─────────────────────────────────── */}
        {historial.length > 0 && !resultado && (
          <div className="card anim-fade" style={{ marginTop: 16 }}>
            <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Historial reciente
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {historial.slice(0, 8).map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setExpresion(h.expresion); setOperacion(h.operacion) }}
                  style={{
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#475569', borderRadius: 8,
                    padding: '5px 12px', fontSize: '0.78rem', cursor: 'pointer',
                    fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.background = '#eff6ff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = '#f8fafc' }}
                >
                  <span style={{ color: '#93c5fd', fontSize: '0.7rem' }}>
                    {h.operacion === 'derivada' ? 'd/dx' : '∫'}
                  </span>
                  {h.expresion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer ─────────────────────────────────────── */}
        <footer style={{ textAlign: 'center', marginTop: 48, color: '#cbd5e1', fontSize: '0.72rem' }}>
          Python · SymPy · FastAPI · React · TailwindCSS
        </footer>

      </div>
    </div>
  )
}
