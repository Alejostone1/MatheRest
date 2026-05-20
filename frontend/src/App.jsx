import React, { useState } from 'react'
import Home from './components/Home'
import EntradaExpresion from './components/entrada/EntradaExpresion'
import SelectorOperacion from './components/entrada/SelectorOperacion'
import BotonResolver from './components/entrada/BotonResolver'
import TarjetaResultado from './components/resultados/TarjetaResultado'
import Error from './components/comunes/Error'
import { useResolver } from './hooks/useResolver'
import { useHistorial } from './hooks/useHistorial'

const LIMITES_INICIALES = { inf: '', sup: '', infY: '', supY: '' }

export default function App() {
  const [pagina, setPagina]   = useState('home')
  const [expresion, setExpresion] = useState('')
  const [operacion, setOperacion] = useState('derivada')
  const [limites,   setLimites]   = useState(LIMITES_INICIALES)
  const { resolver, cargando, error, resultado, mensaje } = useResolver()
  const { historial, agregar } = useHistorial()

  const manejarResolver = async () => {
    await resolver({ expresion, operacion, limites })
    if (expresion.trim()) agregar({ expresion, operacion })
  }

  const cambiarOperacion = (op) => {
    setOperacion(op)
    setExpresion('')
    setLimites(LIMITES_INICIALES)
  }

  if (pagina === 'home') {
    return <Home onEntrar={() => setPagina('app')} />
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', paddingBottom: 60 }}>

      {/* Barra de navegación */}
      <nav style={{
        background: '#ffffff', borderBottom: '1px solid #e2e8f0',
        padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 3px rgba(15,23,42,0.06)',
      }}>
        <button
          onClick={() => setPagina('home')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10, padding: 0,
          }}
        >
          <div style={{
            background: '#2563eb', color: '#fff',
            borderRadius: 8, padding: '4px 10px',
            fontWeight: 800, fontSize: '0.85rem', fontFamily: 'serif',
          }}>∂∫</div>
          <span style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.95rem' }}>Asistente Matemático</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'none' }} className="nav-credits">
            D. Colorado · A. Piedrahita · S. Patiño
          </span>
          <button
            onClick={() => setPagina('home')}
            className="btn-ghost"
            style={{ fontSize: '0.78rem' }}
          >
            ← Inicio
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 16px 0' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: 28 }} className="anim-fade">
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Resolver expresión
          </h1>
          <p style={{ color: '#334155', fontSize: '0.92rem', margin: 0 }}>
            Ingresa la expresión · selecciona la operación · obtén la solución paso a paso
          </p>
        </header>

        {/* Panel de entrada */}
        <form
          className="card anim-up"
          style={{ marginBottom: 16 }}
          onSubmit={(e) => { e.preventDefault(); manejarResolver() }}
        >
          <SelectorOperacion value={operacion} onChange={cambiarOperacion} />
          <EntradaExpresion
            value={expresion}
            onChange={setExpresion}
            operacion={operacion}
            limites={limites}
            onLimitesChange={setLimites}
          />
          <BotonResolver onClick={manejarResolver} cargando={cargando} mensaje={mensaje} />
        </form>

        <Error mensaje={error} />

        {resultado && <TarjetaResultado resultado={resultado} />}

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
                  onClick={() => { setExpresion(h.expresion); setOperacion(h.operacion); setLimites(LIMITES_INICIALES) }}
                  style={{
                    background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569',
                    borderRadius: 8, padding: '5px 12px', fontSize: '0.78rem',
                    cursor: 'pointer', fontFamily: 'monospace',
                    display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
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

        <footer style={{ textAlign: 'center', marginTop: 48, color: '#0f172a', fontSize: '0.72rem', fontWeight: 500 }}>
          Daniel Colorado · Alejandro Piedrahita · Sebastian Patiño — Matemáticas 3 · Prof. Cristhian Camilo Sánchez Ceballos
        </footer>
      </div>
    </div>
  )
}
