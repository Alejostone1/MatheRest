import React from 'react'

const FUNCIONES = [
  { label: 'sin',   ins: 'sin()',   ret: 1, title: 'Seno' },
  { label: 'cos',   ins: 'cos()',   ret: 1, title: 'Coseno' },
  { label: 'tan',   ins: 'tan()',   ret: 1, title: 'Tangente' },
  { label: 'ln',    ins: 'ln()',    ret: 1, title: 'Logaritmo natural' },
  { label: 'eˣ',    ins: 'exp()',   ret: 1, title: 'Exponencial' },
  { label: '√',     ins: 'sqrt()',  ret: 1, title: 'Raíz cuadrada' },
  { label: 'abs',   ins: 'Abs()',   ret: 1, title: 'Valor absoluto' },
  { label: 'asin',  ins: 'asin()',  ret: 1, title: 'Arcoseno' },
]

const POTENCIAS = [
  { label: 'x²',   ins: '^2',    ret: 0 },
  { label: 'x³',   ins: '^3',    ret: 0 },
  { label: 'xⁿ',   ins: '^()',   ret: 1 },
  { label: '1/x',  ins: '1/',    ret: 0 },
]

const VARIABLES = [
  { label: 'x',  ins: 'x',   cls: 'key-btn key-var' },
  { label: 'y',  ins: 'y',   cls: 'key-btn key-var' },
  { label: 'e',  ins: 'e',   cls: 'key-btn key-var' },
  { label: 'π',  ins: 'pi',  cls: 'key-btn key-var' },
  { label: 'a',  ins: 'a',   cls: 'key-btn key-var' },
  { label: 'b',  ins: 'b',   cls: 'key-btn key-var' },
  { label: 'n',  ins: 'n',   cls: 'key-btn key-var' },
  { label: 't',  ins: 't',   cls: 'key-btn key-var' },
]

const OPERADORES = [
  { label: '+',  ins: '+',  cls: 'key-btn key-op' },
  { label: '−',  ins: '-',  cls: 'key-btn key-op' },
  { label: '×',  ins: '*',  cls: 'key-btn key-op' },
  { label: '÷',  ins: '/',  cls: 'key-btn key-op' },
  { label: '^',  ins: '^',  cls: 'key-btn key-op' },
  { label: '(',  ins: '(',  cls: 'key-btn key-op' },
  { label: ')',  ins: ')',  cls: 'key-btn key-op' },
  { label: '{',  ins: '{',  cls: 'key-btn key-op' },
  { label: '}',  ins: '}',  cls: 'key-btn key-op' },
  { label: ',',  ins: ',',  cls: 'key-btn key-op' },
]

const NUMS = ['7','8','9','4','5','6','1','2','3','0','.']

function Seccion({ titulo, color = '#2563eb', children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{
        color: '#334155', fontSize: '0.65rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 3, height: 12, background: color, borderRadius: 2, display: 'inline-block', flexShrink: 0 }} />
        {titulo}
      </p>
      {children}
    </div>
  )
}

export default function TecladoMatematico({ onInsertar, onBorrar, onLimpiar, operacion }) {
  return (
    <div style={{
      marginTop: 12,
      background: '#f8fafc',
      border: '1.5px solid #e2e8f0',
      borderRadius: 14,
      padding: '16px 16px 12px',
      boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
    }} className="anim-fade">

      {/* Funciones — 4×2 grid */}
      <Seccion titulo="Funciones" color="#7c3aed">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {FUNCIONES.map((f) => (
            <button key={f.label} type="button" title={f.title}
              onClick={() => onInsertar(f.ins, f.ret)}
              className="key-btn key-func">
              {f.label}
            </button>
          ))}
        </div>
      </Seccion>

      {/* Potencias */}
      <Seccion titulo="Potencias y fracciones" color="#1e40af">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {POTENCIAS.map((p) => (
            <button key={p.label} type="button"
              onClick={() => onInsertar(p.ins, p.ret)}
              className="key-btn key-power">
              {p.label}
            </button>
          ))}
        </div>
      </Seccion>

      {/* Variables — 4×2 */}
      <Seccion titulo="Variables" color="#15803d">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {VARIABLES.map((v) => (
            <button key={v.label} type="button"
              onClick={() => onInsertar(v.ins, 0)}
              className={v.cls}>
              {v.label}
            </button>
          ))}
        </div>
      </Seccion>

      {/* Operadores — 5×2 grid */}
      <Seccion titulo="Operadores y agrupadores" color="#334155">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
          {OPERADORES.map((v) => (
            <button key={v.label} type="button"
              onClick={() => onInsertar(v.ins, 0)}
              className={v.cls}>
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
          <p style={{ color: '#334155', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            Números
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
            {NUMS.map((n) => (
              <button key={n} type="button"
                onClick={() => onInsertar(n, 0)}
                className="key-btn key-num"
                style={{ fontFamily: 'monospace' }}>
                {n}
              </button>
            ))}
            <div />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'flex-end', minWidth: 56 }}>
          <p style={{ color: '#334155', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            Editar
          </p>
          <button type="button" onClick={onBorrar}  className="key-btn key-del"   style={{ padding: '9px 6px' }}>⌫</button>
          <button type="button" onClick={onLimpiar} className="key-btn key-clear" style={{ padding: '9px 6px' }}>C</button>
        </div>
      </div>

    </div>
  )
}
