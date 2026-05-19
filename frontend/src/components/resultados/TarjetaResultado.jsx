import React from 'react'
import MetodoDetectado from './MetodoDetectado'
import ListaPasos from './ListaPasos'
import ResultadoFinal from './ResultadoFinal'
import ExportarBotones from './ExportarBotones'

export default function TarjetaResultado({ resultado }) {
  const esDerivada = resultado.operacion === 'derivada'

  return (
    <div className="card anim-up">
      {/* Título */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f1f5f9',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe',
            borderRadius: 8, padding: '6px 14px',
            fontSize: '1.2rem', color: '#2563eb', fontFamily: 'serif',
          }}>
            {esDerivada ? 'd/dx' : '∫'}
          </div>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>
              {esDerivada ? 'Derivada' : 'Integral indefinida'}
            </p>
            <code style={{ color: '#0f172a', fontSize: '1.05rem', fontFamily: 'monospace', fontWeight: 700 }}>
              {resultado.expresion_original}
            </code>
          </div>
        </div>
        <div style={{
          background: '#f8fafc', border: '1px solid #e2e8f0',
          borderRadius: 8, padding: '4px 12px', textAlign: 'right',
        }}>
          <p style={{ color: '#94a3b8', fontSize: '0.62rem', margin: 0 }}>TIEMPO</p>
          <p style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 700, margin: 0, fontFamily: 'monospace' }}>
            {resultado.tiempo_ejecucion_ms} ms
          </p>
        </div>
      </div>

      <MetodoDetectado metodo={resultado.metodo_detectado} />
      <ListaPasos pasos={resultado.pasos} />
      <ResultadoFinal resultado={resultado.resultado} />

      {/* Exportar */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
        <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Exportar solución
        </p>
        <ExportarBotones resultado={resultado} />
      </div>
    </div>
  )
}
