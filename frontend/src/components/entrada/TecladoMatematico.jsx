import React from 'react'

const FUNCIONES = [
  { label: 'sin',  ins: 'sin()',  ret: 1, title: 'Seno' },
  { label: 'cos',  ins: 'cos()',  ret: 1, title: 'Coseno' },
  { label: 'tan',  ins: 'tan()',  ret: 1, title: 'Tangente' },
  { label: 'ln',   ins: 'ln()',   ret: 1, title: 'Logaritmo natural' },
  { label: 'eˣ',   ins: 'exp()', ret: 1, title: 'Exponencial' },
  { label: '√',    ins: 'sqrt()', ret: 1, title: 'Raíz cuadrada' },
]

const POTENCIAS = [
  { label: 'x²',  ins: '^2',   ret: 0 },
  { label: 'x³',  ins: '^3',   ret: 0 },
  { label: 'xⁿ',  ins: '^()',  ret: 1 },
]

const VARS = [
  { label: 'x',  ins: 'x',   cls: 'key-btn key-var' },
  { label: 'y',  ins: 'y',   cls: 'key-btn key-var' },
  { label: 'e',  ins: 'e',   cls: 'key-btn key-var' },
  { label: 'π',  ins: 'pi',  cls: 'key-btn key-var' },
  { label: '(',  ins: '(',   cls: 'key-btn key-op' },
  { label: ')',  ins: ')',   cls: 'key-btn key-op' },
  { label: '+',  ins: '+',   cls: 'key-btn key-op' },
  { label: '−',  ins: '-',   cls: 'key-btn key-op' },
  { label: '×',  ins: '*',   cls: 'key-btn key-op' },
  { label: '÷',  ins: '/',   cls: 'key-btn key-op' },
]

const NUMS = ['7','8','9','4','5','6','1','2','3','0','.']

function Seccion({ titulo, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{
        color: '#64748b', fontSize: '0.65rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 3, height: 12, background: '#2563eb', borderRadius: 2, display: 'inline-block', flexShrink: 0 }} />
        {titulo}
      </p>
      {children}
    </div>
  )
}

export default function TecladoMatematico({ onInsertar, onBorrar, onLimpiar, operacion }) {
  const esDoble = operacion === 'integral_doble'

  return (
    <div style={{
      marginTop: 12,
      background: '#f8fafc',
      border: '1.5px solid #e2e8f0',
      borderRadius: 14,
      padding: '16px 16px 12px',
      boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
    }} className="anim-fade">

      {/* Funciones */}
      <Seccion titulo="Funciones">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 5 }}>
          {FUNCIONES.map((f) => (
            <button
              key={f.label}
              type="button"
              title={f.title}
              onClick={() => onInsertar(f.ins, f.ret)}
              className="key-btn key-func"
            >
              {f.label}
            </button>
          ))}
        </div>
      </Seccion>

      {/* Potencias */}
      <Seccion titulo="Potencias">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
          {POTENCIAS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => onInsertar(p.ins, p.ret)}
              className="key-btn key-power"
            >
              {p.label}
            </button>
          ))}
        </div>
      </Seccion>

      {/* Variables y operadores */}
      <Seccion titulo={esDoble ? 'Variables (x, y) y operadores' : 'Variables y operadores'}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
          {VARS.map((v) => (
            <button
              key={v.label}
              type="button"
              onClick={() => onInsertar(v.ins, 0)}
              className={v.cls}
            >
              {v.label}
            </button>
          ))}
        </div>
      </Seccion>

      {/* Divisor */}
      <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0 10px' }} />

      {/* Números + acciones */}
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <p style={{
            color: '#64748b', fontSize: '0.65rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 3, height: 12, background: '#64748b', borderRadius: 2, display: 'inline-block', flexShrink: 0 }} />
            Números
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
            {NUMS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onInsertar(n, 0)}
                className="key-btn key-num"
                style={{ fontFamily: 'monospace' }}
              >
                {n}
              </button>
            ))}
            <div />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'flex-end', minWidth: 56 }}>
          <p style={{
            color: '#64748b', fontSize: '0.65rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6,
          }}>
            Editar
          </p>
          <button type="button" onClick={onBorrar}  className="key-btn key-del"   style={{ padding: '9px 6px' }}>⌫</button>
          <button type="button" onClick={onLimpiar} className="key-btn key-clear" style={{ padding: '9px 6px' }}>C</button>
        </div>
      </div>

    </div>
  )
}
