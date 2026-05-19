import React from 'react'

const FUNCIONES = [
  { label: 'sin',  ins: 'sin()',  ret: 1, title: 'Seno' },
  { label: 'cos',  ins: 'cos()',  ret: 1, title: 'Coseno' },
  { label: 'tan',  ins: 'tan()',  ret: 1, title: 'Tangente' },
  { label: 'ln',   ins: 'ln()',   ret: 1, title: 'Log natural' },
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
    <div style={{ marginBottom: 14 }}>
      <p style={{ color: '#334155', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
        {titulo}
      </p>
      {children}
    </div>
  )
}

export default function TecladoMatematico({ onInsertar, onBorrar, onLimpiar }) {
  return (
    <div style={{
      marginTop: 12,
      background: '#070f1d',
      border: '1px solid #1e293b',
      borderRadius: 12,
      padding: 16,
    }} className="anim-fade">

      {/* Funciones */}
      <Seccion titulo="Funciones trigonométricas y logarítmicas">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
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
      <Seccion titulo="Variables y operadores">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 6 }}>
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

      {/* Números + acciones */}
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#334155', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            Números
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
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
            <div /> {/* relleno */}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'flex-end', minWidth: 64 }}>
          <p style={{ color: '#334155', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            Editar
          </p>
          <button type="button" onClick={onBorrar}  className="key-btn key-del"   style={{ padding: '10px 8px' }}>⌫</button>
          <button type="button" onClick={onLimpiar} className="key-btn key-clear" style={{ padding: '10px 8px' }}>C</button>
        </div>
      </div>

    </div>
  )
}
