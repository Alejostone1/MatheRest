# Asistente Matemático Inteligente

**Trabajo Final — Matemáticas 3**

> Aplicación web de cálculo simbólico que analiza expresiones matemáticas, detecta automáticamente el método de solución y explica paso a paso el proceso de derivación o integración.

---

## Información académica

| Campo | Detalle |
|---|---|
| **Asignatura** | Matemáticas 3 — Cálculo Diferencial e Integral |
| **Docente** | Cristhian Camilo Sánchez Ceballos |
| **Desarrolladores** | Daniel Colorado · Alejandro Piedrahita |
| **Propósito** | Trabajo Final de la asignatura |

---

## Descripción del proyecto

El Asistente Matemático Inteligente nace como respuesta a la necesidad de visualizar el **proceso completo** de resolución de derivadas e integrales, no solo el resultado final.

La aplicación recibe una expresión matemática escrita por el usuario, identifica automáticamente el método de solución adecuado (regla del producto, de la cadena, integración por partes, sustitución, etc.) y genera una explicación paso a paso con las fórmulas aplicadas en cada etapa, renderizadas en notación matemática formal mediante LaTeX.

---

## Cobertura matemática

### Derivadas — 12 casos

| ID | Caso | Fórmula | Ejemplo |
|---|---|---|---|
| D1 | Potencia simple | `d/dx[xⁿ] = n·xⁿ⁻¹` | x⁵ → 5x⁴ |
| D2 | Potencia con coeficiente | `d/dx[axⁿ] = a·n·xⁿ⁻¹` | 3x⁴ → 12x³ |
| D3 | Constante | `d/dx[c] = 0` | 7 → 0 |
| D4 | Función lineal | `d/dx[ax+b] = a` | 5x+2 → 5 |
| D5 | Suma / Resta | `(f±g)' = f'±g'` | x³+x² → 3x²+2x |
| D6 | Regla del producto | `(f·g)' = f'g + fg'` | x²eˣ → 2xeˣ+x²eˣ |
| D7 | Regla del cociente | `(f/g)' = (f'g−fg')/g²` | sin(x)/x → (xcos(x)−sin(x))/x² |
| D8 | Regla de la cadena | `[f(g(x))]' = f'(g)·g'` | sin(x²) → 2x·cos(x²) |
| D9 | Función seno | `d/dx[sin(x)] = cos(x)` | sin(x) → cos(x) |
| D10 | Función coseno | `d/dx[cos(x)] = −sin(x)` | cos(x) → −sin(x) |
| D11 | Exponencial natural | `d/dx[eˣ] = eˣ` | eˣ → eˣ |
| D12 | Logaritmo natural | `d/dx[ln(x)] = 1/x` | ln(x) → 1/x |

### Integrales — 8 casos

| ID | Caso | Fórmula | Ejemplo |
|---|---|---|---|
| I1 | Regla de la potencia | `∫xⁿ dx = xⁿ⁺¹/(n+1) + C` | x³ → x⁴/4 + C |
| I2 | Constante | `∫k dx = kx + C` | 5 → 5x + C |
| I3 | Logarítmica | `∫(1/x) dx = ln\|x\| + C` | 1/x → ln\|x\| + C |
| I4 | Seno | `∫sin(x) dx = −cos(x) + C` | sin(x) → −cos(x) + C |
| I5 | Coseno | `∫cos(x) dx = sin(x) + C` | cos(x) → sin(x) + C |
| I6 | Exponencial natural | `∫eˣ dx = eˣ + C` | eˣ → eˣ + C |
| I7 | Sustitución simple | `∫f(g(x))·g'(x) dx = F(g(x)) + C` | 2x·eˣ² → eˣ² + C |
| I8 | Integración por partes | `∫u dv = uv − ∫v du` | x·eˣ → eˣ(x−1) + C |

---

## Tecnologías utilizadas

| Capa | Tecnología | Versión | Función |
|---|---|---|---|
| Motor matemático | **SymPy** | 1.14 | Cálculo simbólico exacto (derivadas e integrales) |
| Backend | **Python** | 3.13 | Lenguaje del servidor |
| API | **FastAPI** | 0.136 | Endpoints REST, validación, documentación automática |
| Frontend | **React** | 18 | Interfaz de usuario reactiva |
| Build tool | **Vite** | 5 | Compilación y servidor de desarrollo |
| Estilos | **TailwindCSS** | 3.3 | Diseño visual profesional |
| Fórmulas | **KaTeX** | 0.16 | Renderizado de notación matemática LaTeX |
| HTTP | **Axios** | 1.6 | Comunicación frontend–backend |
| PDF | **jsPDF** | 2.5 | Exportación de soluciones a PDF |
| Excel | **xlsx (SheetJS)** | 0.18 | Exportación de soluciones a Excel |
| Deploy frontend | **Vercel** | — | Hosting estático con CDN global |
| Deploy backend | **Render** | — | Hosting del servidor Python |

---

## Arquitectura del sistema

```
Usuario
   │
   ▼
┌─────────────────────────────────────┐
│         FRONTEND  (Vercel)          │
│  React 18 + Vite + TailwindCSS      │
│                                     │
│  ┌──────────┐  ┌──────────────────┐ │
│  │  Home    │  │   Calculadora    │ │
│  │ Landing  │  │  Entrada + Pasos │ │
│  └──────────┘  └──────────────────┘ │
│         Axios  (HTTP/JSON)          │
└────────────────┬────────────────────┘
                 │  POST /api/v1/solve
                 ▼
┌─────────────────────────────────────┐
│         BACKEND  (Render)           │
│  Python 3.13 + FastAPI              │
│                                     │
│  1. Validador de entrada (Pydantic) │
│  2. Detector de método              │
│  3. Solver SymPy (cálculo exacto)   │
│  4. Generador de pasos explicativos │
│                                     │
│  ← JSON: resultado + pasos + LaTeX  │
└─────────────────────────────────────┘
```

---

## Estructura del repositorio

```
MatheRest/
├── backend/
│   ├── app/
│   │   ├── api/routes/solve.py          # Endpoint POST /solve
│   │   ├── core/
│   │   │   ├── detector/detector.py     # Detección automática del método
│   │   │   ├── solver/derivada.py       # Cálculo de derivadas (SymPy)
│   │   │   ├── solver/integral.py       # Cálculo de integrales (SymPy)
│   │   │   └── explicador/generador_pasos.py  # Generación de pasos
│   │   ├── models/peticion.py           # Modelos de entrada (Pydantic)
│   │   └── models/respuesta.py          # Modelos de salida
│   ├── requirements.txt
│   ├── render.yaml                      # Config despliegue Render
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx                 # Página principal / landing
│   │   │   ├── entrada/                 # Formulario + teclado matemático
│   │   │   └── resultados/              # Pasos, resultado final, exportar
│   │   ├── hooks/
│   │   │   ├── useResolver.js           # Lógica de llamada a la API
│   │   │   └── useHistorial.js          # Historial local (localStorage)
│   │   └── servicios/api.js             # Cliente Axios
│   ├── vercel.json                      # Config despliegue Vercel
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## API

### `POST /api/v1/solve`

**Request:**
```json
{
  "expresion": "x^2*exp(x)",
  "operacion": "derivada"
}
```

**Response exitosa:**
```json
{
  "exito": true,
  "expresion_original": "x^2*exp(x)",
  "operacion": "derivada",
  "metodo_detectado": {
    "nombre": "Regla del producto",
    "confianza": 0.92,
    "descripcion": "Se detectó multiplicación de dos funciones"
  },
  "pasos": [
    {
      "numero": 1,
      "titulo": "Identificar las funciones",
      "descripcion": "La expresión es un producto: f(x) · g(x)",
      "formula": "f(x) = x²,   g(x) = exp(x)",
      "formula_latex": "f(x) = x^{2}, \\quad g(x) = e^{x}",
      "explicacion": "Separamos la expresión en dos factores."
    }
  ],
  "resultado": {
    "expresion": "2*x*exp(x) + x**2*exp(x)",
    "latex": "2 x e^{x} + x^{2} e^{x}",
    "simplificado": "x*(x + 2)*exp(x)",
    "simplificado_latex": "x \\left(x + 2\\right) e^{x}"
  },
  "tiempo_ejecucion_ms": 38.5
}
```

Documentación interactiva disponible en `/docs` (Swagger UI generado por FastAPI).

---

## Ejecución local

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API disponible en `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env
npm run dev
```

Frontend disponible en `http://localhost:5173`

---

## Despliegue en producción

### Backend → Render.com

1. Nuevo **Web Service** apuntando al repositorio
2. Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend → Vercel

1. Importar repositorio
2. Root Directory: `frontend`
3. Framework: **Vite**
4. Variable de entorno: `VITE_API_URL = https://<tu-backend>.onrender.com/api/v1`

---

## Sintaxis de expresiones

| Notación | Símbolo | Ejemplo |
|---|---|---|
| Potencia | `^` o `**` | `x^3`, `x**3` |
| Multiplicación | `*` | `x^2*exp(x)` |
| División | `/` | `sin(x)/x` |
| Exponencial eˣ | `exp(x)` | `exp(x^2)` |
| Logaritmo natural | `ln(x)` | `ln(x^2)` |
| Trigonométricas | `sin(x)`, `cos(x)`, `tan(x)` | `sin(x^2)` |
| Raíz cuadrada | `sqrt(x)` | `sqrt(x+1)` |
| Pi | `pi` | `sin(pi*x)` |

---

*Daniel Colorado · Alejandro Piedrahita — Matemáticas 3 · Prof. Cristhian Camilo Sánchez Ceballos*
