import React from 'react'

const TECNOLOGIAS = [
  { nombre: 'Python 3.13',  rol: 'Lenguaje del backend',          color: '#3b82f6', bg: '#eff6ff', icono: '🐍' },
  { nombre: 'SymPy 1.14',   rol: 'Motor de cálculo simbólico',    color: '#7c3aed', bg: '#f5f3ff', icono: '∑' },
  { nombre: 'FastAPI',      rol: 'API REST del servidor',          color: '#059669', bg: '#f0fdf4', icono: '⚡' },
  { nombre: 'React 18',     rol: 'Interfaz de usuario',            color: '#0ea5e9', bg: '#f0f9ff', icono: '⚛' },
  { nombre: 'TailwindCSS',  rol: 'Estilos y diseño visual',        color: '#0891b2', bg: '#ecfeff', icono: '🎨' },
  { nombre: 'KaTeX',        rol: 'Renderizado de fórmulas LaTeX',  color: '#dc2626', bg: '#fef2f2', icono: 'ƒ' },
  { nombre: 'jsPDF',        rol: 'Exportación a PDF',              color: '#9a3412', bg: '#fff7ed', icono: '📄' },
  { nombre: 'Vercel',       rol: 'Despliegue del frontend',        color: '#0f172a', bg: '#f8fafc', icono: '▲' },
  { nombre: 'Render',       rol: 'Despliegue del backend',         color: '#7c3aed', bg: '#f5f3ff', icono: '☁' },
]

const DERIVADAS = [
  { caso: 'Potencia simple',        formula: 'd/dx[xⁿ] = n·xⁿ⁻¹',              ejemplo: 'x⁵  →  5x⁴' },
  { caso: 'Potencia con coeficiente', formula: 'd/dx[axⁿ] = a·n·xⁿ⁻¹',         ejemplo: '3x⁴  →  12x³' },
  { caso: 'Constante',              formula: 'd/dx[c] = 0',                      ejemplo: '7  →  0' },
  { caso: 'Lineal',                 formula: 'd/dx[ax+b] = a',                   ejemplo: '5x+2  →  5' },
  { caso: 'Suma / Resta',           formula: 'd/dx[f±g] = f\'±g\'',              ejemplo: 'x³+x²  →  3x²+2x' },
  { caso: 'Regla del producto',     formula: 'd/dx[f·g] = f\'g + fg\'',          ejemplo: 'x²eˣ  →  2xeˣ+x²eˣ' },
  { caso: 'Regla del cociente',     formula: 'd/dx[f/g] = (f\'g−fg\')/g²',      ejemplo: 'sin(x)/x  →  (xcos(x)−sin(x))/x²' },
  { caso: 'Regla de la cadena',     formula: 'd/dx[f(g(x))] = f\'(g)·g\'',      ejemplo: 'sin(x²)  →  2x·cos(x²)' },
  { caso: 'Función seno',           formula: 'd/dx[sin(x)] = cos(x)',            ejemplo: 'sin(x)  →  cos(x)' },
  { caso: 'Función coseno',         formula: 'd/dx[cos(x)] = −sin(x)',           ejemplo: 'cos(x)  →  −sin(x)' },
  { caso: 'Exponencial natural',    formula: 'd/dx[eˣ] = eˣ',                   ejemplo: 'eˣ  →  eˣ' },
  { caso: 'Logaritmo natural',      formula: 'd/dx[ln(x)] = 1/x',               ejemplo: 'ln(x)  →  1/x' },
]

const INTEGRALES = [
  { caso: 'Regla de la potencia',   formula: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C',        ejemplo: 'x³  →  x⁴/4 + C' },
  { caso: 'Constante',              formula: '∫k dx = kx + C',                   ejemplo: '5  →  5x + C' },
  { caso: 'Logarítmica (1/x)',      formula: '∫(1/x) dx = ln|x| + C',            ejemplo: '1/x  →  ln|x| + C' },
  { caso: 'Función seno',           formula: '∫sin(x) dx = −cos(x) + C',         ejemplo: 'sin(x)  →  −cos(x)+C' },
  { caso: 'Función coseno',         formula: '∫cos(x) dx = sin(x) + C',          ejemplo: 'cos(x)  →  sin(x)+C' },
  { caso: 'Exponencial natural',    formula: '∫eˣ dx = eˣ + C',                  ejemplo: 'eˣ  →  eˣ + C' },
  { caso: 'Sustitución simple',     formula: '∫f(g(x))·g\'(x) dx = F(g(x))+C',  ejemplo: '2x·eˣ²  →  eˣ² + C' },
  { caso: 'Integración por partes', formula: '∫u dv = uv − ∫v du',               ejemplo: 'x·eˣ  →  eˣ(x−1) + C' },
]

function Separador() {
  return <div style={{ height: 1, background: '#e2e8f0', margin: '0 0 40px' }} />
}

function SeccionTitulo({ numero, titulo, subtitulo }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: '#2563eb', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
        }}>{numero}</div>
        <h2 style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.25rem', margin: 0 }}>{titulo}</h2>
      </div>
      {subtitulo && <p style={{ color: '#64748b', fontSize: '0.92rem', margin: '0 0 0 44px' }}>{subtitulo}</p>}
    </div>
  )
}

export default function Home({ onEntrar }) {
  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', paddingBottom: 60 }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

          {/* Etiqueta académica */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#eff6ff', border: '1px solid #bfdbfe',
            borderRadius: 20, padding: '6px 16px', marginBottom: 24,
            fontSize: '0.82rem', color: '#1d4ed8', fontWeight: 600,
          }}>
            🎓 Trabajo Final · Matemáticas 3
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900, color: '#0f172a',
            margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            Asistente Matemático<br />
            <span style={{ color: '#2563eb' }}>Inteligente</span>
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Aplicación web que analiza expresiones matemáticas, detecta automáticamente
            el método de solución y explica <strong style={{ color: '#0f172a' }}>paso a paso</strong> el proceso de
            derivación e integración simbólica.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 36, flexWrap: 'wrap' }}>
            {[
              { n: '12', t: 'Casos de derivadas' },
              { n: '8',  t: 'Casos de integrales' },
              { n: '20', t: 'Casos garantizados' },
              { n: '100%', t: 'Cálculo simbólico' },
            ].map(({ n, t }) => (
              <div key={t} style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 900, fontSize: '1.8rem', color: '#2563eb', margin: 0, lineHeight: 1 }}>{n}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '4px 0 0', fontWeight: 500 }}>{t}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onEntrar}
            style={{
              background: '#2563eb', color: '#fff',
              border: 'none', borderRadius: 12,
              padding: '15px 40px', fontSize: '1.05rem',
              fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(37,99,235,0.35)',
              transition: 'all 0.15s',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.45)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.35)' }}
          >
            <span style={{ fontSize: '1.2rem' }}>⟹</span>
            Abrir la aplicación
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 0' }}>

        {/* ── CRÉDITOS ACADÉMICOS ───────────────────────── */}
        <div style={{
          background: '#ffffff', border: '1px solid #e2e8f0',
          borderRadius: 14, padding: '28px 32px', marginBottom: 40,
          boxShadow: '0 1px 4px rgba(15,23,42,0.06)',
        }}>
          <SeccionTitulo numero="①" titulo="Información académica" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>

            {/* Asignatura */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Asignatura</p>
              <p style={{ color: '#0f172a', fontWeight: 700, fontSize: '1rem', margin: '0 0 4px' }}>Matemáticas 3</p>
              <p style={{ color: '#64748b', fontSize: '0.82rem', margin: 0 }}>Cálculo Diferencial e Integral</p>
            </div>

            {/* Docente */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '16px 20px' }}>
              <p style={{ color: '#3b82f6', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Docente</p>
              <p style={{ color: '#0f172a', fontWeight: 700, fontSize: '1rem', margin: '0 0 4px' }}>Cristhian Camilo Sánchez Ceballos</p>
              <p style={{ color: '#3b82f6', fontSize: '0.82rem', margin: 0 }}>Profesor de Matemáticas 3</p>
            </div>

            {/* Estudiantes */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px' }}>
              <p style={{ color: '#16a34a', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Desarrollado por</p>
              <p style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 4px' }}>Daniel Colorado</p>
              <p style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 6px' }}>Alejandro Piedrahita</p>
              <p style={{ color: '#16a34a', fontSize: '0.78rem', margin: 0 }}>Trabajo Final de la asignatura</p>
            </div>

          </div>
        </div>

        <Separador />

        {/* ── QUÉ HACE LA APLICACIÓN ─────────────────────── */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '28px 32px', marginBottom: 40, boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}>
          <SeccionTitulo
            numero="②"
            titulo="¿Qué hace la aplicación?"
            subtitulo="Funcionalidades principales implementadas para el trabajo final"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icono: '🔍', titulo: 'Detección automática', desc: 'Identifica el método a usar: regla del producto, cociente, cadena, sustitución, partes, entre otros.' },
              { icono: '📐', titulo: 'Cálculo simbólico exacto', desc: 'Utiliza SymPy para obtener resultados algebraicamente exactos, no aproximaciones numéricas.' },
              { icono: '📋', titulo: 'Pasos explicativos', desc: 'Cada solución se desglosa paso a paso con la fórmula aplicada y la justificación matemática.' },
              { icono: '🔢', titulo: 'Teclado matemático', desc: 'Entrada de expresiones mediante teclado virtual con funciones trigonométricas, potencias y operadores.' },
              { icono: '👁', titulo: 'Vista previa LaTeX', desc: 'Renderiza la expresión en notación matemática formal en tiempo real mientras el usuario escribe.' },
              { icono: '📄', titulo: 'Exportación PDF / Excel', desc: 'Genera un informe profesional en PDF o un libro de Excel con todos los pasos de la solución.' },
            ].map(({ icono, titulo, desc }) => (
              <div key={titulo} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 18px' }}>
                <p style={{ fontSize: '1.5rem', margin: '0 0 8px', lineHeight: 1 }}>{icono}</p>
                <p style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.88rem', margin: '0 0 6px' }}>{titulo}</p>
                <p style={{ color: '#64748b', fontSize: '0.78rem', margin: 0, lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Separador />

        {/* ── COBERTURA MATEMÁTICA ──────────────────────── */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '28px 32px', marginBottom: 40, boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}>
          <SeccionTitulo
            numero="③"
            titulo="Cobertura matemática"
            subtitulo="20 casos garantizados al 100 % — todos los temas vistos en Matemáticas 3"
          />

          {/* Derivadas */}
          <h3 style={{ color: '#1d4ed8', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 6, padding: '2px 10px', fontSize: '0.78rem' }}>∂</span>
            Derivadas — 12 casos
          </h3>
          <div style={{ overflowX: 'auto', marginBottom: 28 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['#', 'Caso', 'Fórmula aplicada', 'Ejemplo'].map((h) => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DERIVADAS.map((d, i) => (
                  <tr key={d.caso} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                    <td style={{ padding: '9px 12px', color: '#94a3b8', fontWeight: 700 }}>D{i + 1}</td>
                    <td style={{ padding: '9px 12px', color: '#0f172a', fontWeight: 600 }}>{d.caso}</td>
                    <td style={{ padding: '9px 12px', color: '#1d4ed8', fontFamily: 'monospace', fontSize: '0.78rem' }}>{d.formula}</td>
                    <td style={{ padding: '9px 12px', color: '#475569', fontFamily: 'monospace', fontSize: '0.78rem' }}>{d.ejemplo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Integrales */}
          <h3 style={{ color: '#15803d', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 6, padding: '2px 10px', fontSize: '0.78rem' }}>∫</span>
            Integrales — 8 casos
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['#', 'Caso', 'Fórmula aplicada', 'Ejemplo'].map((h) => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INTEGRALES.map((d, i) => (
                  <tr key={d.caso} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                    <td style={{ padding: '9px 12px', color: '#94a3b8', fontWeight: 700 }}>I{i + 1}</td>
                    <td style={{ padding: '9px 12px', color: '#0f172a', fontWeight: 600 }}>{d.caso}</td>
                    <td style={{ padding: '9px 12px', color: '#15803d', fontFamily: 'monospace', fontSize: '0.78rem' }}>{d.formula}</td>
                    <td style={{ padding: '9px 12px', color: '#475569', fontFamily: 'monospace', fontSize: '0.78rem' }}>{d.ejemplo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Separador />

        {/* ── TECNOLOGÍAS ───────────────────────────────── */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '28px 32px', marginBottom: 40, boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}>
          <SeccionTitulo
            numero="④"
            titulo="Tecnologías implementadas"
            subtitulo="Stack completo seleccionado para garantizar precisión matemática y experiencia de usuario óptima"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {TECNOLOGIAS.map(({ nombre, rol, color, bg, icono }) => (
              <div key={nombre} style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '1.1rem' }}>{icono}</span>
                  <p style={{ color, fontWeight: 800, fontSize: '0.88rem', margin: 0 }}>{nombre}</p>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0, lineHeight: 1.4 }}>{rol}</p>
              </div>
            ))}
          </div>
        </div>

        <Separador />

        {/* ── ARQUITECTURA ─────────────────────────────── */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '28px 32px', marginBottom: 40, boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}>
          <SeccionTitulo
            numero="⑤"
            titulo="Arquitectura del sistema"
            subtitulo="Separación en capas: frontend desacoplado del backend mediante API REST"
          />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              {
                titulo: 'Frontend — Vercel',
                color: '#0ea5e9', bg: '#f0f9ff', border: '#bae6fd',
                items: ['React 18 + Vite', 'TailwindCSS', 'KaTeX (LaTeX)', 'Axios (HTTP)', 'jsPDF / xlsx'],
              },
              {
                titulo: 'API REST — FastAPI',
                color: '#059669', bg: '#f0fdf4', border: '#bbf7d0',
                items: ['POST /api/v1/solve', 'Validación Pydantic', 'CORS habilitado', 'Docs en /docs', 'Health en /health'],
              },
              {
                titulo: 'Backend — Render',
                color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
                items: ['Python 3.13', 'SymPy (cálculo exacto)', 'Detector de métodos', 'Generador de pasos', 'Simplificador'],
              },
            ].map(({ titulo, color, bg, border, items }) => (
              <div key={titulo} style={{ flex: 1, minWidth: 200, background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '16px 18px' }}>
                <p style={{ color, fontWeight: 800, fontSize: '0.88rem', margin: '0 0 12px', borderBottom: `1px solid ${border}`, paddingBottom: 8 }}>{titulo}</p>
                {items.map((it) => (
                  <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ color: '#475569', fontSize: '0.8rem' }}>{it}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA FINAL ─────────────────────────────────── */}
        <div style={{
          background: '#ffffff', border: '1px solid #bfdbfe',
          borderRadius: 14, padding: '32px', textAlign: 'center',
          boxShadow: '0 1px 4px rgba(37,99,235,0.08)',
        }}>
          <p style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.2rem', margin: '0 0 8px' }}>
            ¿Listo para resolver?
          </p>
          <p style={{ color: '#64748b', fontSize: '0.92rem', margin: '0 0 24px' }}>
            Ingresa cualquier expresión de derivadas o integrales y obtén la solución completa paso a paso.
          </p>
          <button
            onClick={onEntrar}
            style={{
              background: '#2563eb', color: '#fff', border: 'none',
              borderRadius: 10, padding: '13px 36px',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
              transition: 'all 0.15s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1d4ed8' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#2563eb' }}
          >
            <span>⟹</span> Ir a la aplicación
          </button>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '0.72rem', marginTop: 40 }}>
          Daniel Colorado · Alejandro Piedrahita — Matemáticas 3 · Prof. Cristhian Camilo Sánchez Ceballos
        </p>

      </div>
    </div>
  )
}
