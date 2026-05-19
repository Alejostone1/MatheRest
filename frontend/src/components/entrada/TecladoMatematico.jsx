import React from 'react'

// retroceder: cuántos caracteres mover el cursor hacia atrás tras insertar
const FUNCIONES = [
  { label: 'sin',  tex: '\\sin',   ins: 'sin()',  ret: 1 },
  { label: 'cos',  tex: '\\cos',   ins: 'cos()',  ret: 1 },
  { label: 'tan',  tex: '\\tan',   ins: 'tan()',  ret: 1 },
  { label: 'ln',   tex: '\\ln',    ins: 'ln()',   ret: 1 },
  { label: 'eˣ',   tex: 'e^x',     ins: 'exp()', ret: 1 },
  { label: '√',    tex: '\\sqrt{}',ins: 'sqrt()', ret: 1 },
]

const POTENCIAS = [
  { label: 'x²',  ins: '^2',  ret: 0 },
  { label: 'x³',  ins: '^3',  ret: 0 },
  { label: 'xⁿ',  ins: '^()', ret: 1 },
]

const SIMBOLOS = [
  { label: 'x',  ins: 'x',   color: 'emerald' },
  { label: 'e',  ins: 'e',   color: 'emerald' },
  { label: 'π',  ins: 'pi',  color: 'emerald' },
  { label: '(',  ins: '(',   color: 'slate' },
  { label: ')',  ins: ')',   color: 'slate' },
  { label: '+',  ins: '+',   color: 'slate' },
  { label: '−',  ins: '-',   color: 'slate' },
  { label: '·',  ins: '*',   color: 'slate' },
  { label: '÷',  ins: '/',   color: 'slate' },
]

const NUMS = ['7','8','9','4','5','6','1','2','3','0','.']

function Btn({ children, onClick, variant = 'default', wide = false }) {
  const base = 'rounded-xl text-sm font-semibold transition-all active:scale-90 select-none cursor-pointer border'
  const size = wide ? 'px-4 py-3' : 'py-3'
  const styles = {
    default:  'bg-white/10 text-white hover:bg-white/20 border-white/15',
    purple:   'bg-purple-500/25 text-purple-200 hover:bg-purple-500/45 border-purple-500/40',
    blue:     'bg-blue-500/25 text-blue-200 hover:bg-blue-500/45 border-blue-500/40',
    emerald:  'bg-emerald-500/25 text-emerald-200 hover:bg-emerald-500/45 border-emerald-500/40',
    red:      'bg-red-500/20 text-red-300 hover:bg-red-500/40 border-red-500/30',
    orange:   'bg-orange-500/20 text-orange-300 hover:bg-orange-500/40 border-orange-500/30',
    slate:    'bg-slate-500/20 text-slate-200 hover:bg-slate-500/40 border-slate-500/30',
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${size} ${styles[variant]}`}>
      {children}
    </button>
  )
}

export default function TecladoMatematico({ onInsertar, onBorrar, onLimpiar }) {
  return (
    <div className="mt-3 bg-black/30 rounded-2xl p-4 border border-white/10 space-y-3">

      {/* Funciones */}
      <div>
        <p className="text-white/35 text-xs mb-2 font-medium uppercase tracking-wider">Funciones</p>
        <div className="grid grid-cols-6 gap-1.5">
          {FUNCIONES.map((f) => (
            <Btn key={f.label} variant="purple" onClick={() => onInsertar(f.ins, f.ret)}>
              {f.label}
            </Btn>
          ))}
        </div>
      </div>

      {/* Potencias */}
      <div>
        <p className="text-white/35 text-xs mb-2 font-medium uppercase tracking-wider">Potencias</p>
        <div className="grid grid-cols-3 gap-1.5">
          {POTENCIAS.map((p) => (
            <Btn key={p.label} variant="blue" onClick={() => onInsertar(p.ins, p.ret)}>
              {p.label}
            </Btn>
          ))}
        </div>
      </div>

      {/* Símbolos y operadores */}
      <div>
        <p className="text-white/35 text-xs mb-2 font-medium uppercase tracking-wider">Variables y operadores</p>
        <div className="grid grid-cols-9 gap-1.5">
          {SIMBOLOS.map((s) => (
            <Btn key={s.label} variant={s.color} onClick={() => onInsertar(s.ins, 0)}>
              {s.label}
            </Btn>
          ))}
        </div>
      </div>

      {/* Números + acciones */}
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-white/35 text-xs mb-2 font-medium uppercase tracking-wider">Números</p>
          <div className="grid grid-cols-4 gap-1.5">
            {NUMS.map((n) => (
              <Btn key={n} onClick={() => onInsertar(n, 0)}>{n}</Btn>
            ))}
            {/* relleno para grid par */}
            <div />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 justify-end min-w-[56px]">
          <Btn variant="red" onClick={onBorrar}>⌫</Btn>
          <Btn variant="orange" onClick={onLimpiar}>C</Btn>
        </div>
      </div>

    </div>
  )
}
