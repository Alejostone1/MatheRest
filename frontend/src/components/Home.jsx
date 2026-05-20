import React, { useState } from 'react'

/* ── Estilos responsive ─────────────────────────────────── */
const STYLES = `
  .home-nav-links { display: flex; align-items: center; gap: 24px; }
  .home-nav-link  { color: #475569; font-size: 0.85rem; text-decoration: none; font-weight: 500; }
  .home-nav-link:hover { color: #0f172a; }

  .home-hero      { background:#fff; border-bottom:1px solid #e2e8f0; padding:72px 32px 64px; }
  .home-hero-grid { max-width:960px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }

  .home-h1        { font-size:2.6rem; font-weight:900; color:#0f172a; line-height:1.1; letter-spacing:-0.03em; margin:0 0 18px; }
  .home-cta-row   { display:flex; gap:12px; margin-bottom:36px; flex-wrap:wrap; }
  .home-stats     { display:flex; gap:32px; flex-wrap:wrap; }
  .home-mock      { display:block; }

  .home-section   { padding:72px 32px; max-width:960px; margin:0 auto; }

  /* Tech grid — flex centrado */
  .home-tech-grid { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; }
  .home-tech-card { flex:0 0 168px; }

  .home-team-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); gap:20px; }

  .home-tabs-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:2px; }
  .home-tabs      { display:inline-flex; gap:4px; background:#f1f5f9; border-radius:10px; padding:4px; white-space:nowrap; }

  @media (max-width: 768px) {
    .home-nav-links a { display: none; }
    .home-hero      { padding: 40px 20px 48px; }
    .home-hero-grid { grid-template-columns: 1fr; gap: 36px; }
    .home-h1        { font-size: 2rem; }
    .home-mock      { display: none; }
    .home-section   { padding: 48px 20px; }
    .home-tech-card { flex: 0 0 148px; }
    .home-team-grid { grid-template-columns: 1fr; }
    .home-cta-row   { flex-direction: column; }
    .home-cta-row a, .home-cta-row button { width: 100%; justify-content: center; box-sizing: border-box; }
    .home-stats     { gap: 20px; }
  }

  @media (max-width: 480px) {
    .home-h1        { font-size: 1.75rem; }
    .home-tech-card { flex: 0 0 calc(50% - 7px); }
  }
`

/* ── Iconos SVG inline de tecnologías ─────────────────── */
const SVG = {
  python: (
    <svg viewBox="0 0 128 128" width="100%" height="100%">
      <linearGradient id="py1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.15 707.17)">
        <stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/>
      </linearGradient>
      <linearGradient id="py2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.15 707.17)">
        <stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/>
      </linearGradient>
      <path fill="url(#py1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
      <path fill="url(#py2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.548v23.515c0 6.693 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
    </svg>
  ),
  react: (
    <svg viewBox="-10.5 -9.45 21 18.9" width="100%" height="100%" fill="none">
      <circle cx="0" cy="0" r="2" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="10" ry="4.5"/>
        <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
        <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  fastapi: (
    <svg viewBox="0 0 128 128" width="100%" height="100%">
      <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm1.3 110.6l1.7-34.5H45.5L70.3 17.4h2.1L70.7 52h21.9L67.4 110.6h-2.1z" fill="#05998b"/>
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 410 404" width="100%" height="100%">
      <path d="M399.641 59.525l-183.998 329.02c-3.799 6.793-13.559 6.833-17.415.072L10.29 59.597c-4.11-7.211 2.247-15.895 10.469-14.094l184.888 40.08a10.98 10.98 0 004.788-.001l182.957-40.05c8.206-1.795 14.558 6.863 10.249 14.093z" fill="url(#vg1)"/>
      <path d="M292.965 1.67L156.801 28.836a5.5 5.5 0 00-4.421 5.315l-4.785 156.973a5.5 5.5 0 006.508 5.498l36.158-7.96a5.5 5.5 0 016.362 6.282l-10.745 51.082a5.5 5.5 0 006.631 6.391l22.374-5.246a5.5 5.5 0 016.633 6.378l-16.827 79.2c-1.045 4.921 5.534 7.607 8.316 3.432l1.8-2.754 98.977-197.561a5.5 5.5 0 00-5.001-7.923l-37.21.529a5.5 5.5 0 01-5.48-6.835l24.31-99.208A5.5 5.5 0 00292.965 1.67z" fill="url(#vg2)"/>
      <defs>
        <linearGradient id="vg1" x1="6" y1="32.5" x2="235" y2="344" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF"/><stop offset="1" stopColor="#BD34FE"/>
        </linearGradient>
        <linearGradient id="vg2" x1="194.651" y1="8.818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF3E00"/><stop offset=".776" stopColor="#C000FF"/><stop offset="1" stopColor="#FF0079"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 54 33" width="100%" height="100%">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4"/>
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 76 65" width="100%" height="100%" fill="none">
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000"/>
    </svg>
  ),
  render: (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <rect width="40" height="40" rx="8" fill="#46E3B7"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#000" fontWeight="900" fontSize="22" fontFamily="system-ui">R</text>
    </svg>
  ),
  sympy: (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <rect width="40" height="40" rx="8" fill="#3B6EA5"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="20" fontFamily="serif">Σ</text>
    </svg>
  ),
  katex: (
    <svg viewBox="0 0 60 40" width="100%" height="100%">
      <rect width="60" height="40" rx="8" fill="#329894"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="14" fontFamily="serif">KaTeX</text>
    </svg>
  ),
  pdf: (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <rect width="40" height="40" rx="8" fill="#DC2626"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="12" fontFamily="system-ui">PDF</text>
    </svg>
  ),
  excel: (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <rect width="40" height="40" rx="8" fill="#217346"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="11" fontFamily="system-ui">XLSX</text>
    </svg>
  ),
}

const TECNOLOGIAS = [
  { icon: 'python',   nombre: 'Python 3.13',   rol: 'Lenguaje del backend',             tag: 'Backend' },
  { icon: 'sympy',    nombre: 'SymPy 1.14',    rol: 'Cálculo simbólico exacto',         tag: 'Matemáticas' },
  { icon: 'fastapi',  nombre: 'FastAPI',        rol: 'API REST del servidor',            tag: 'Backend' },
  { icon: 'react',    nombre: 'React 18',       rol: 'Interfaz de usuario',              tag: 'Frontend' },
  { icon: 'vite',     nombre: 'Vite 5',         rol: 'Compilador y dev server',          tag: 'Frontend' },
  { icon: 'tailwind', nombre: 'TailwindCSS',    rol: 'Sistema de estilos',               tag: 'Frontend' },
  { icon: 'katex',    nombre: 'KaTeX',          rol: 'Renderizado LaTeX en tiempo real', tag: 'Frontend' },
  { icon: 'pdf',      nombre: 'jsPDF',          rol: 'Exportación a PDF',                tag: 'Export' },
  { icon: 'excel',    nombre: 'SheetJS',        rol: 'Exportación a Excel',              tag: 'Export' },
  { icon: 'vercel',   nombre: 'Vercel',         rol: 'Hosting del frontend (CDN)',       tag: 'Deploy' },
  { icon: 'render',   nombre: 'Render',         rol: 'Hosting del backend (Cloud)',      tag: 'Deploy' },
]

const TAG_COLORS = {
  Backend:     { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  Matemáticas: { bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe' },
  Frontend:    { bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0' },
  Export:      { bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' },
  Deploy:      { bg: '#f8fafc', color: '#0f172a', border: '#e2e8f0' },
}

const DERIVADAS = [
  ['D1',  'Potencia simple',          'd/dx[xⁿ] = n·xⁿ⁻¹',         'x⁵ → 5x⁴'],
  ['D2',  'Potencia con coeficiente', 'd/dx[axⁿ] = a·n·xⁿ⁻¹',      '3x⁴ → 12x³'],
  ['D3',  'Constante',                'd/dx[c] = 0',                 '7 → 0'],
  ['D4',  'Función lineal',           'd/dx[ax+b] = a',              '5x+2 → 5'],
  ['D5',  'Suma / Resta',             "(f±g)' = f'±g'",              'x³+x² → 3x²+2x'],
  ['D6',  'Regla del producto',       "(f·g)' = f'g + fg'",          'x²eˣ → 2xeˣ+x²eˣ'],
  ['D7',  'Regla del cociente',       "(f/g)' = (f'g−fg')/g²",      'sin(x)/x → ...'],
  ['D8',  'Regla de la cadena',       "[f(g(x))]' = f'(g)·g'",      'sin(x²) → 2x·cos(x²)'],
  ['D9',  'Función seno',             'd/dx[sin(x)] = cos(x)',       'sin(x) → cos(x)'],
  ['D10', 'Función coseno',           'd/dx[cos(x)] = −sin(x)',      'cos(x) → −sin(x)'],
  ['D11', 'Exponencial natural',      'd/dx[eˣ] = eˣ',              'eˣ → eˣ'],
  ['D12', 'Logaritmo natural',        'd/dx[ln(x)] = 1/x',          'ln(x) → 1/x'],
]

const INTEGRALES = [
  ['I1', 'Regla de la potencia',   '∫xⁿ dx = xⁿ⁺¹/(n+1) + C',    'x³ → x⁴/4 + C'],
  ['I2', 'Constante',              '∫k dx = kx + C',               '5 → 5x + C'],
  ['I3', 'Logarítmica',            '∫(1/x) dx = ln|x| + C',        '1/x → ln|x|+C'],
  ['I4', 'Función seno',           '∫sin(x) dx = −cos(x) + C',     'sin(x) → −cos(x)+C'],
  ['I5', 'Función coseno',         '∫cos(x) dx = sin(x) + C',      'cos(x) → sin(x)+C'],
  ['I6', 'Exponencial natural',    '∫eˣ dx = eˣ + C',              'eˣ → eˣ + C'],
  ['I7', 'Sustitución simple',     "∫f(g)·g' dx = F(g(x)) + C",   '2xeˣ² → eˣ²+C'],
  ['I8', 'Integración por partes', '∫u dv = uv − ∫v du',           'xeˣ → eˣ(x−1)+C'],
]

const INTEGRALES_DEF = [
  ['ID1', 'Potencia acotada',     '∫ₐᵇ xⁿ dx = [xⁿ⁺¹/(n+1)]ₐᵇ', '∫₀¹ x² dx = 1/3'],
  ['ID2', 'Constante acotada',    '∫ₐᵇ k dx = k(b−a)',            '∫₀² 5 dx = 10'],
  ['ID3', 'Seno acotado',         '∫₀^π sin(x) dx = 2',           '∫₀^π sin(x) dx = 2'],
  ['ID4', 'Coseno acotado',       '∫₀^(π/2) cos(x) dx = 1',       '∫₀^(π/2) cos(x)dx = 1'],
  ['ID5', 'Exponencial acotada',  '∫₀¹ eˣ dx = e − 1',            '∫₀¹ eˣ dx ≈ 1.718'],
  ['ID6', 'T.F.C. — evaluación',  '∫ₐᵇ f(x)dx = F(b) − F(a)',    '∫₁ᵉ (1/x) dx = 1'],
]

const INTEGRALES_DOBLES = [
  ['DD1', 'Suma de variables',      '∫∫(x+y) dydx',                    '∫₀²∫₀³(x+y)dydx = 15'],
  ['DD2', 'Producto de variables',  '∫∫ x·y dydx',                     '∫₀¹∫₀¹ xy dydx = 1/4'],
  ['DD3', 'Solo función de x',      '∫ₐᵇ∫_c^d f(x) dydx=(d−c)·∫ₐᵇ f', '∫₀²∫₀³ x dydx = 6'],
  ['DD4', 'Solo función de y',      '∫ₐᵇ∫_c^d g(y) dydx=(b−a)·∫_c^d g','∫₀²∫₀² y dydx = 4'],
  ['DD5', 'Potencias combinadas',   '∫∫(x²+y²) dydx',                  '∫₀¹∫₀¹(x²+y²)dydx=2/3'],
  ['DD6', 'Teorema de Fubini',      '∫ₐᵇ[∫_c^d f(x,y)dy]dx',          'Iterar: y primero, luego x'],
]

const TABS = [
  { id: 'derivadas',   label: '∂  Derivadas (12)',    color: '#1d4ed8', bgHead: '#eff6ff', data: DERIVADAS },
  { id: 'integrales',  label: '∫  Integrales (8)',    color: '#15803d', bgHead: '#f0fdf4', data: INTEGRALES },
  { id: 'definidas',   label: '∫ₐᵇ  Definidas (6)',   color: '#0891b2', bgHead: '#ecfeff', data: INTEGRALES_DEF },
  { id: 'dobles',      label: '∬  Dobles (6)',        color: '#7c3aed', bgHead: '#f5f3ff', data: INTEGRALES_DOBLES },
]

/* ── Componente ─────────────────────────────────────────── */
export default function Home({ onEntrar }) {
  const [tabMath, setTabMath] = useState('derivadas')
  const tabActual = TABS.find(t => t.id === tabMath) || TABS[0]

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{STYLES}</style>

      {/* ══ NAV ════════════════════════════════════════════ */}
      <nav style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '0 20px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 3px rgba(15,23,42,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, background: '#2563eb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.9rem', fontFamily: 'serif', flexShrink: 0 }}>∫</div>
          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', letterSpacing: '-0.01em' }}>Asistente Matemático</span>
        </div>
        <div className="home-nav-links">
          <a href="#tecnologias" className="home-nav-link">Tecnologías</a>
          <a href="#matematica"  className="home-nav-link">Cobertura</a>
          <a href="#equipo"      className="home-nav-link">Equipo</a>
          <button onClick={onEntrar} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 18px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
            Abrir app →
          </button>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <div className="home-hero">
        <div className="home-hero-grid">

          {/* Left */}
          <div>
            {/* Badge profesional — sin burbuja, solo borde izquierdo */}
            <div style={{ borderLeft: '3px solid #2563eb', paddingLeft: 12, marginBottom: 24 }}>
              <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                Trabajo Final · Matemáticas 3
              </p>
              <p style={{ color: '#64748b', fontWeight: 500, fontSize: '0.78rem', margin: '3px 0 0' }}>
                Cálculo Diferencial e Integral
              </p>
            </div>

            <h1 className="home-h1">
              Asistente<br/>
              <span style={{ color: '#2563eb' }}>Matemático</span><br/>
              Inteligente
            </h1>

            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 28px' }}>
              Resuelve derivadas, integrales indefinidas, definidas y dobles.
              Detecta el método automáticamente y explica cada paso de forma
              <strong style={{ color: '#0f172a' }}> clara y rigurosa</strong>.
            </p>

            <div className="home-cta-row">
              <button onClick={onEntrar} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 28px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.3)' }}>
                Resolver ahora <span style={{ fontSize: '1.1rem' }}>→</span>
              </button>
              <a href="#matematica" style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 10, padding: '13px 22px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}>
                Ver cobertura
              </a>
            </div>

            {/* Stats — 4 tipos de operación */}
            <div className="home-stats">
              {[
                ['4',   '#2563eb', 'Tipos de operación'],
                ['12',  '#7c3aed', 'Casos de derivadas'],
                ['8',   '#059669', 'Integrales indefinidas'],
                ['∞',   '#0891b2', 'Definidas + Dobles'],
              ].map(([n, color, t]) => (
                <div key={t}>
                  <p style={{ fontWeight: 900, fontSize: '1.7rem', color, margin: 0, lineHeight: 1 }}>{n}</p>
                  <p style={{ color: '#64748b', fontSize: '0.7rem', margin: '3px 0 0', fontWeight: 500, maxWidth: 80 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: preview card */}
          <div className="home-mock" style={{ position: 'relative' }}>
            <div style={{ background: '#0f172a', borderRadius: 16, padding: '20px 24px', boxShadow: '0 20px 60px rgba(15,23,42,0.25)', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }}/>)}
                <div style={{ flex:1, height:20, background:'#1e293b', borderRadius:6, marginLeft:8 }}/>
              </div>
              <div style={{ background:'#1e293b', borderRadius:8, padding:'10px 14px', marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ color:'#334155', fontSize:'0.75rem', fontWeight:600 }}>f(x) =</span>
                <code style={{ color:'#60a5fa', fontSize:'0.95rem', fontFamily:'monospace', fontWeight:700 }}>x² · eˣ</code>
              </div>
              <div style={{ background:'#1e3a5f', borderRadius:8, padding:'8px 14px', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:'#3b82f6' }}/>
                <span style={{ color:'#93c5fd', fontSize:'0.8rem', fontWeight:600 }}>Regla del producto detectada</span>
                <span style={{ marginLeft:'auto', color:'#1d4ed8', fontSize:'0.7rem', background:'#172554', borderRadius:12, padding:'2px 8px' }}>92%</span>
              </div>
              {[
                ['1','Identificar f(x)·g(x)','f(x) = x²,  g(x) = eˣ'],
                ['2','Aplicar (f·g)\' = f\'g + fg\'','Fórmula del producto'],
                ['3','Derivar individualmente','f\'= 2x,  g\'= eˣ'],
                ['4','Resultado final','eˣ(x² + 2x)'],
              ].map(([n,t,f]) => (
                <div key={n} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:8 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'#2563eb', color:'#fff', fontSize:'0.7rem', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{n}</div>
                  <div>
                    <p style={{ color:'#e2e8f0', fontSize:'0.78rem', fontWeight:600, margin:'0 0 2px' }}>{t}</p>
                    <code style={{ color:'#64748b', fontSize:'0.72rem', fontFamily:'monospace' }}>{f}</code>
                  </div>
                </div>
              ))}
              <div style={{ background:'#052e16', border:'1px solid #166534', borderRadius:8, padding:'10px 14px', marginTop:12, textAlign:'center' }}>
                <span style={{ color:'#4ade80', fontSize:'0.72rem', fontWeight:700, display:'block', marginBottom:4 }}>RESULTADO FINAL</span>
                <code style={{ color:'#86efac', fontSize:'1.1rem', fontFamily:'monospace', fontWeight:700 }}>eˣ · (x² + 2x)</code>
              </div>
            </div>
            <div style={{ position:'absolute', top:-14, right:-14, background:'#22c55e', color:'#fff', borderRadius:20, padding:'5px 14px', fontSize:'0.75rem', fontWeight:800, boxShadow:'0 4px 12px rgba(34,197,94,0.4)' }}>
              ✓ 100% Exacto
            </div>
          </div>

        </div>
      </div>

      {/* ══ TECNOLOGÍAS ════════════════════════════════════ */}
      <div id="tecnologias" className="home-section">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 10px' }}>Stack técnico</p>
          <h2 style={{ fontWeight: 900, fontSize: '1.9rem', color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Tecnologías implementadas</h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, maxWidth: 520, marginInline: 'auto' }}>
            Seleccionadas para garantizar precisión matemática simbólica y una experiencia de usuario fluida
          </p>
        </div>

        {/* Tarjetas centradas con flex */}
        <div className="home-tech-grid">
          {TECNOLOGIAS.map(({ icon, nombre, rol, tag }) => {
            const tc = TAG_COLORS[tag]
            return (
              <div key={nombre} className="home-tech-card"
                style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 16px', transition: 'all 0.2s', cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,23,42,0.10)'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ width: 44, height: 44, marginBottom: 12 }}>{SVG[icon]}</div>
                <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', margin: '0 0 4px' }}>{nombre}</p>
                <p style={{ color: '#475569', fontSize: '0.73rem', margin: '0 0 10px', lineHeight: 1.4 }}>{rol}</p>
                <span style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`, borderRadius: 20, padding: '2px 8px', fontSize: '0.65rem', fontWeight: 700 }}>{tag}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ══ COBERTURA MATEMÁTICA ═══════════════════════════ */}
      <div id="matematica" style={{ background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '72px 20px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 10px' }}>Contenido académico</p>
            <h2 style={{ fontWeight: 900, fontSize: '1.9rem', color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Cobertura matemática</h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>
              4 tipos de operación — 12 derivadas · 8 integrales indefinidas · integrales definidas y dobles con límites exactos
            </p>
          </div>

          {/* Tabs scrollable */}
          <div className="home-tabs-wrap" style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="home-tabs">
              {TABS.map(({ id, label, color }) => (
                <button key={id} onClick={() => setTabMath(id)} style={{
                  padding: '8px 18px', borderRadius: 8, border: 'none',
                  fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: tabMath === id ? '#fff' : 'transparent',
                  color: tabMath === id ? color : '#64748b',
                  boxShadow: tabMath === id ? '0 1px 4px rgba(15,23,42,0.1)' : 'none',
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', minWidth: 420 }}>
              <thead>
                <tr style={{ background: tabActual.bgHead }}>
                  {['ID','Caso','Fórmula','Ejemplo'].map(h => (
                    <th key={h} style={{ padding:'11px 14px', textAlign:'left', color: tabActual.color, fontWeight:700, fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', borderBottom:'1px solid #e2e8f0', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tabActual.data.map(([id, caso, formula, ejemplo], i) => (
                  <tr key={id} style={{ borderBottom:'1px solid #f1f5f9', background: i%2===0?'#fff':'#fafafa' }}>
                    <td style={{ padding:'10px 14px', fontWeight:800, color: tabActual.color, fontFamily:'monospace', fontSize:'0.78rem', whiteSpace:'nowrap' }}>{id}</td>
                    <td style={{ padding:'10px 14px', color:'#0f172a', fontWeight:600 }}>{caso}</td>
                    <td style={{ padding:'10px 14px', color:'#334155', fontFamily:'monospace', fontSize:'0.75rem' }}>{formula}</td>
                    <td style={{ padding:'10px 14px', color:'#475569', fontFamily:'monospace', fontSize:'0.75rem', whiteSpace:'nowrap' }}>{ejemplo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ══ EQUIPO ══════════════════════════════════════════ */}
      <div id="equipo" className="home-section">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 10px' }}>Créditos académicos</p>
          <h2 style={{ fontWeight: 900, fontSize: '1.9rem', color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Equipo de desarrollo</h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0 }}>Trabajo Final presentado para la asignatura Matemáticas 3</p>
        </div>

        <div className="home-team-grid">
          {[
            { ini:'DC', nombre:'Daniel Colorado',      rol:'Desarrollador', desc:'Diseño del sistema, implementación del backend Python/SymPy y lógica de detección de métodos matemáticos.', color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe' },
            { ini:'AP', nombre:'Alejandro Piedrahita', rol:'Desarrollador', desc:'Desarrollo del frontend React, diseño de interfaz, integración API, exportación PDF/Excel y despliegue.', color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe' },
            { ini:'SP', nombre:'Sebastian Patiño',     rol:'Desarrollador', desc:'Implementación de la lógica de integrales, generación de pasos explicativos, pruebas del sistema y validación matemática.', color:'#d97706', bg:'#fffbeb', border:'#fde68a' },
          ].map(({ ini, nombre, rol, desc, color, bg, border }) => (
            <div key={nombre} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.boxShadow = `0 4px 20px ${color}18` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
                <div style={{ width:56, height:56, borderRadius:14, background:bg, border:`2px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', fontWeight:900, color, letterSpacing:'-0.02em', flexShrink:0 }}>{ini}</div>
                <div>
                  <p style={{ fontWeight:800, color:'#0f172a', fontSize:'1rem', margin:'0 0 4px' }}>{nombre}</p>
                  <span style={{ background:bg, color, border:`1px solid ${border}`, borderRadius:20, padding:'2px 10px', fontSize:'0.7rem', fontWeight:700 }}>{rol}</span>
                </div>
              </div>
              <p style={{ color:'#475569', fontSize:'0.83rem', lineHeight:1.6, margin:0 }}>{desc}</p>
            </div>
          ))}

          {/* Docente */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#86efac'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(34,197,94,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
              <div style={{ width:56, height:56, borderRadius:14, background:'#f0fdf4', border:'2px solid #86efac', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', fontWeight:900, color:'#15803d', flexShrink:0 }}>CS</div>
              <div>
                <p style={{ fontWeight:800, color:'#0f172a', fontSize:'1rem', margin:'0 0 4px' }}>Cristhian Camilo Sánchez Ceballos</p>
                <span style={{ background:'#f0fdf4', color:'#15803d', border:'1px solid #86efac', borderRadius:20, padding:'2px 10px', fontSize:'0.7rem', fontWeight:700 }}>Docente</span>
              </div>
            </div>
            <p style={{ color:'#475569', fontSize:'0.83rem', lineHeight:1.6, margin:'0 0 12px' }}>
              Profesor de Matemáticas 3 — Cálculo Diferencial e Integral. Propuso el desarrollo de una herramienta que refuerce el aprendizaje de los métodos de derivación e integración.
            </p>
            <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, padding:'8px 12px', display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:'0.9rem' }}>🎓</span>
              <span style={{ color:'#15803d', fontSize:'0.78rem', fontWeight:600 }}>Asignatura: Matemáticas 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CTA FINAL — fondo claro, letras oscuras ════════ */}
      <div style={{ background: '#f1f5f9', borderTop: '1px solid #e2e8f0', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 14px' }}>
          Listo para usar
        </p>
        <h2 style={{ color: '#0f172a', fontWeight: 900, fontSize: '1.8rem', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
          Empieza a resolver expresiones
        </h2>
        <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0 0 30px' }}>
          Derivadas, integrales indefinidas, definidas y dobles — con solución paso a paso
        </p>
        <button onClick={onEntrar} style={{ background:'#2563eb', color:'#fff', border:'none', borderRadius:12, padding:'14px 36px', fontSize:'1rem', fontWeight:800, cursor:'pointer', boxShadow:'0 4px 20px rgba(37,99,235,0.3)', display:'inline-flex', alignItems:'center', gap:10 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,99,235,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.3)' }}>
          Abrir la aplicación <span style={{ fontSize:'1.2rem' }}>→</span>
        </button>
        <p style={{ color: '#0f172a', fontSize: '0.75rem', marginTop: 32, fontWeight: 500 }}>
          Daniel Colorado · Alejandro Piedrahita · Sebastian Patiño — Matemáticas 3 · Prof. Cristhian Camilo Sánchez Ceballos
        </p>
      </div>

    </div>
  )
}
