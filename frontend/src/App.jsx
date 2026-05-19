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
    if (expresion.trim()) {
      agregar({ expresion, operacion })
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            🧠 Asistente Matemático
          </h1>
          <p className="text-white/60 text-lg">
            Analiza expresiones · Detecta el método · Explica paso a paso
          </p>
          <div className="flex justify-center gap-4 mt-3">
            {['12 derivadas', '8 integrales', '20 casos garantizados'].map((t) => (
              <span key={t} className="badge bg-blue-500/20 text-blue-300 text-xs">
                ✓ {t}
              </span>
            ))}
          </div>
        </header>

        {/* Panel de entrada */}
        <form
          className="card"
          onSubmit={(e) => { e.preventDefault(); manejarResolver() }}
        >
          <SelectorOperacion value={operacion} onChange={(op) => { setOperacion(op); setExpresion('') }} />
          <EntradaExpresion value={expresion} onChange={setExpresion} operacion={operacion} />
          <BotonResolver onClick={manejarResolver} cargando={cargando} />
        </form>

        {/* Error */}
        <Error mensaje={error} />

        {/* Resultado */}
        {resultado && <TarjetaResultado resultado={resultado} />}

        {/* Historial */}
        {historial.length > 0 && !resultado && (
          <div className="card">
            <h3 className="text-white/80 font-semibold mb-3 text-sm">🕐 Historial reciente</h3>
            <div className="flex flex-wrap gap-2">
              {historial.slice(0, 6).map((h, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setExpresion(h.expresion); setOperacion(h.operacion) }}
                  className="badge bg-white/10 text-white/70 hover:bg-white/20 cursor-pointer"
                >
                  <span className="text-xs text-white/40">{h.operacion === 'derivada' ? 'd/dx' : '∫'}</span>
                  {h.expresion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-white/30 text-xs pb-4">
          Powered by Python · SymPy · FastAPI · React · TailwindCSS
        </footer>
      </div>
    </div>
  )
}
