import React from 'react'
import MetodoDetectado from './MetodoDetectado'
import ListaPasos from './ListaPasos'
import ResultadoFinal from './ResultadoFinal'
import ExportarBotones from './ExportarBotones'

export default function TarjetaResultado({ resultado }) {
  const esDerivada = resultado.operacion === 'derivada'

  return (
    <div className="card anim-up" style={{ borderColor: '#1e3352' }}>
      {/* Título de la tarjeta */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '1px solid #1e293b',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: '1.3rem',
              background: '#0f1e38',
              border: '1px solid #1e3a5f',
              borderRadius: 8,
              padding: '4px 10px',
              fontFamily: 'serif',
              color: '#60a5fa',
            }}>
              {esDerivada ? 'd/dx' : '∫'}
            </span>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>
                {esDerivada ? 'Derivada' : 'Integral indefinida'}
              </p>
              <code style={{ color: '#60a5fa', fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700 }}>
                {resultado.expresion_original}
              </code>
            </div>
          </div>
        </div>
        <div style={{
          background: '#0a1628',
          border: '1px solid #1e293b',
          borderRadius: 8,
          padding: '4px 12px',
          textAlign: 'right',
        }}>
          <p style={{ color: '#334155', fontSize: '0.65rem', margin: 0 }}>TIEMPO</p>
          <p style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 700, margin: 0, fontFamily: 'monospace' }}>
            {resultado.tiempo_ejecucion_ms} ms
          </p>
        </div>
      </div>

      {/* Contenido */}
      <MetodoDetectado metodo={resultado.metodo_detectado} />
      <ListaPasos pasos={resultado.pasos} />
      <ResultadoFinal resultado={resultado.resultado} />

      {/* Exportar */}
      <div style={{ borderTop: '1px solid #1e293b', paddingTop: 16 }}>
        <p style={{ color: '#334155', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Exportar solución
        </p>
        <ExportarBotones resultado={resultado} />
      </div>
    </div>
  )
}
