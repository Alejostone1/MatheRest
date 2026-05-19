import React from 'react'
import MetodoDetectado from './MetodoDetectado'
import ListaPasos from './ListaPasos'
import ResultadoFinal from './ResultadoFinal'

export default function TarjetaResultado({ resultado }) {
  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Resolución de{' '}
          <code className="text-blue-300 font-mono">{resultado.expresion_original}</code>
        </h2>
        <span className="badge bg-white/10 text-white/50 text-xs">
          {resultado.tiempo_ejecucion_ms} ms
        </span>
      </div>

      <MetodoDetectado metodo={resultado.metodo_detectado} />
      <ListaPasos pasos={resultado.pasos} />
      <ResultadoFinal resultado={resultado.resultado} />
    </div>
  )
}
