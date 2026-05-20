# Asistente Matemático Inteligente

<div align="center">

**Trabajo Final · Matemáticas 3 — Cálculo Diferencial e Integral**

[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136-05998b?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![SymPy](https://img.shields.io/badge/SymPy-1.14-3B6EA5?style=flat)](https://sympy.org)

</div>

---

## Descripción general

El **Asistente Matemático Inteligente** es una aplicación web de cálculo simbólico que recibe una expresión matemática ingresada por el usuario, identifica automáticamente el método de resolución más apropiado y genera una explicación detallada **paso a paso** del proceso completo, con fórmulas renderizadas en notación LaTeX profesional.

La aplicación cubre derivadas, integrales indefinidas, integrales definidas e integrales dobles definidas, soportando todos los casos vistos en la asignatura Matemáticas 3.

---

## Objetivo

Desarrollar una herramienta educativa interactiva que refuerce el aprendizaje de los métodos de derivación e integración, permitiendo al estudiante no solo obtener el resultado final, sino comprender el proceso matemático completo aplicado en cada caso.

---

## Tecnologías utilizadas

| Capa | Tecnología | Versión | Función |
|------|-----------|---------|---------|
| Motor matemático | **SymPy** | 1.14 | Cálculo simbólico exacto (derivadas e integrales) |
| Backend | **Python** | 3.13 | Lenguaje del servidor |
| API | **FastAPI** | 0.136 | Endpoints REST, validación con Pydantic, docs automáticas |
| Frontend | **React** | 18 | Interfaz de usuario reactiva (SPA) |
| Build tool | **Vite** | 5 | Compilación y servidor de desarrollo |
| Estilos | **TailwindCSS** | 3.3 | Diseño visual profesional y responsivo |
| Fórmulas | **KaTeX** | 0.16 | Renderizado de notación matemática LaTeX en tiempo real |
| HTTP | **Axios** | 1.6 | Comunicación frontend–backend |
| PDF | **jsPDF** | 2.5 | Exportación de soluciones a PDF |
| Excel | **xlsx (SheetJS)** | 0.18 | Exportación de soluciones a hoja de cálculo |
| Deploy frontend | **Vercel** | — | Hosting estático con CDN global |
| Deploy backend | **Render** | — | Hosting del servidor Python en la nube |

---

## Instalación

### Requisitos previos

- Python 3.10 o superior
- Node.js 18 o superior
- npm o yarn

### Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd MatheRest
```

### Instalar dependencias del backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt
```

### Instalar dependencias del frontend

```bash
cd frontend
npm install
```

---

## Configuración

### Variables de entorno — Frontend

Crea el archivo `frontend/.env` con la URL del backend:

```env
# Desarrollo local
VITE_API_URL=http://localhost:8000/api/v1

# Producción (reemplaza con tu URL de Render)
# VITE_API_URL=https://<tu-backend>.onrender.com/api/v1
```

### Variables de entorno — Backend

El backend no requiere variables de entorno adicionales para ejecución local. En producción, Render inyecta automáticamente la variable `PORT`.

---

## Ejecución del proyecto

### Backend (desarrollo local)

```bash
cd backend
venv\Scripts\activate       # Windows
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API disponible en `http://localhost:8000`  
Documentación Swagger en `http://localhost:8000/docs`

### Frontend (desarrollo local)

```bash
cd frontend
npm run dev
```

Frontend disponible en `http://localhost:5173`

### Ejecución con Docker Compose

```bash
# En la raíz del proyecto
docker-compose up --build
```

Esto levanta backend en el puerto 8000 y frontend en el puerto 5173.

---

## Arquitectura del sistema

```
Usuario (Navegador)
       │
       ▼
┌────────────────────────────────────────┐
│           FRONTEND  (Vercel)           │
│   React 18 + Vite 5 + TailwindCSS     │
│                                        │
│  ┌──────────┐   ┌───────────────────┐  │
│  │  Home    │   │    Calculadora    │  │
│  │ Landing  │   │ Entrada + Teclado │  │
│  │  Page    │   │  Vista previa     │  │
│  └──────────┘   │  Resultado/Pasos  │  │
│                 └───────────────────┘  │
│          Axios — POST /api/v1/solve    │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│           BACKEND  (Render)            │
│      Python 3.13 + FastAPI             │
│                                        │
│  1. Validador de entrada  (Pydantic)   │
│  2. Detector de método    (heurístico) │
│  3. Solver SymPy          (exacto)     │
│  4. Generador de pasos    (narrativo)  │
│                                        │
│  ← JSON: resultado + pasos + LaTeX     │
└────────────────────────────────────────┘
```

---

## Estructura del repositorio

```
MatheRest/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/solve.py          # Endpoint POST /solve
│   │   ├── core/
│   │   │   ├── detector/detector.py     # Detección automática del método
│   │   │   ├── solver/derivada.py       # Cálculo de derivadas (SymPy)
│   │   │   ├── solver/integral.py       # Cálculo de integrales (SymPy)
│   │   │   └── explicador/
│   │   │       └── generador_pasos.py   # Generación de pasos explicativos
│   │   ├── models/
│   │   │   ├── peticion.py              # Modelos de entrada (Pydantic)
│   │   │   └── respuesta.py             # Modelos de salida
│   │   └── main.py                      # Punto de entrada FastAPI
│   ├── requirements.txt
│   ├── render.yaml                      # Configuración despliegue Render
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx                 # Página principal / landing
│   │   │   ├── entrada/
│   │   │   │   ├── EntradaExpresion.jsx # Campo + teclado matemático
│   │   │   │   ├── TecladoMatematico.jsx# Teclado visual matemático
│   │   │   │   ├── PreviewExpresion.jsx # Vista previa LaTeX en tiempo real
│   │   │   │   ├── SelectorOperacion.jsx# Selector de tipo de operación
│   │   │   │   └── BotonResolver.jsx    # Botón de cálculo
│   │   │   └── resultados/
│   │   │       ├── TarjetaResultado.jsx # Contenedor del resultado
│   │   │       ├── ListaPasos.jsx       # Lista de pasos de solución
│   │   │       ├── ResultadoFinal.jsx   # Resultado final formateado
│   │   │       ├── MetodoDetectado.jsx  # Badge del método detectado
│   │   │       └── ExportarBotones.jsx  # Exportar a PDF / Excel
│   │   ├── hooks/
│   │   │   ├── useResolver.js           # Lógica de llamada a la API
│   │   │   └── useHistorial.js          # Historial local (localStorage)
│   │   ├── servicios/api.js             # Cliente Axios
│   │   └── estilos/global.css           # Estilos globales + Tailwind
│   ├── vercel.json                      # Configuración despliegue Vercel
│   ├── vite.config.js
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Funcionalidades principales

### Operaciones matemáticas soportadas

| Operación | Descripción |
|-----------|-------------|
| **Derivada** | Derivación simbólica de expresiones en x |
| **Integral indefinida** | Integración simbólica con constante C |
| **Integral definida** | Evaluación numérica exacta con límites a y b |
| **Integral doble definida** | Integración en dos variables con cuatro límites |

### Teclado matemático visual

- Funciones trigonométricas: `sin`, `cos`, `tan`
- Funciones especiales: `ln`, `exp`, `√`
- Potencias: `x²`, `x³`, `xⁿ`
- Variables: `x`, `e`, `π`
- Operadores: `+`, `−`, `×`, `÷`, `(`, `)`
- Números y decimales
- Borrado caracter a caracter o limpieza total

### Vista previa en tiempo real

Cada expresión ingresada se renderiza instantáneamente en notación matemática LaTeX usando KaTeX, mostrando la fórmula con el tipo de operación seleccionada antes de enviar al servidor.

### Detección automática de método

El backend analiza la estructura de la expresión y detecta automáticamente:

**Derivadas:**
- Potencia simple / con coeficiente
- Función constante / lineal
- Suma y resta (linealidad)
- Regla del producto
- Regla del cociente
- Regla de la cadena
- Funciones elementales (sin, cos, exp, ln)

**Integrales:**
- Regla de la potencia
- Integral de constante
- Forma logarítmica (1/x)
- Funciones trigonométricas elementales
- Exponencial natural
- Sustitución simple
- Integración por partes

### Solución paso a paso

Cada cálculo genera entre 3 y 5 pasos explicativos que incluyen:
- Identificación de la estructura de la expresión
- Fórmula aplicada (en texto y en LaTeX)
- Explicación de por qué se eligió ese método
- Resultado parcial y resultado final simplificado

### Exportación de resultados

- **PDF**: genera un documento con todos los pasos y el resultado final
- **Excel**: genera una hoja de cálculo con los datos del cálculo

### Historial de sesión

Las últimas 8 expresiones calculadas quedan guardadas en `localStorage` y se pueden recuperar con un clic.

---

## Sintaxis de expresiones

| Notación | Símbolo | Ejemplo |
|----------|---------|---------|
| Potencia | `^` o `**` | `x^3`, `x**3` |
| Multiplicación | `*` | `x^2*exp(x)` |
| División | `/` | `sin(x)/x` |
| Exponencial eˣ | `exp(x)` | `exp(x^2)` |
| Logaritmo natural | `ln(x)` | `ln(x^2)` |
| Trigonométricas | `sin(x)`, `cos(x)`, `tan(x)` | `sin(x^2)` |
| Raíz cuadrada | `sqrt(x)` | `sqrt(x+1)` |
| Pi | `pi` | `sin(pi*x)` |

---

## Referencia de la API

### `POST /api/v1/solve`

**Request body:**

```json
{
  "expresion": "x^2*exp(x)",
  "operacion": "derivada",
  "limite_inferior": null,
  "limite_superior": null,
  "limite_inferior_y": null,
  "limite_superior_y": null
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `expresion` | string | Sí | Expresión matemática en sintaxis SymPy |
| `operacion` | string | Sí | `"derivada"`, `"integral"`, `"integral_definida"`, `"integral_doble"` |
| `limite_inferior` | string | No | Límite inferior (para integrales definidas) |
| `limite_superior` | string | No | Límite superior (para integrales definidas) |
| `limite_inferior_y` | string | No | Límite inferior de y (solo integrales dobles) |
| `limite_superior_y` | string | No | Límite superior de y (solo integrales dobles) |

**Response exitosa (200):**

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
      "formula": "f(x) = x², g(x) = exp(x)",
      "formula_latex": "f(x) = x^{2}, \\quad g(x) = e^{x}",
      "explicacion": "Separamos la expresión en dos factores."
    }
  ],
  "resultado": {
    "expresion": "x*(x + 2)*exp(x)",
    "latex": "x \\left(x + 2\\right) e^{x}",
    "simplificado": "x*(x + 2)*exp(x)",
    "simplificado_latex": "x \\left(x + 2\\right) e^{x}"
  },
  "tiempo_ejecucion_ms": 38.5
}
```

**Response de error (400):**

```json
{
  "exito": false,
  "error": "Expresión inválida",
  "detalle": "...",
  "sugerencia": "Usa ^ o ** para potencias, * para multiplicación..."
}
```

---

## Despliegue en producción

### Backend → Render.com

1. Crear nuevo **Web Service** apuntando al repositorio
2. Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend → Vercel

1. Importar el repositorio en Vercel
2. Root Directory: `frontend`
3. Framework: **Vite**
4. Variable de entorno: `VITE_API_URL = https://<tu-backend>.onrender.com/api/v1`

> **Nota sobre el plan gratuito de Render:** El servidor se "duerme" después de 15 minutos de inactividad. La primera petición puede tardar hasta 60 segundos en despertar. La aplicación muestra un mensaje de espera durante este proceso.

---

## Cobertura matemática

### Derivadas — 12 casos garantizados

| ID | Caso | Fórmula | Ejemplo |
|----|------|---------|---------|
| D1 | Potencia simple | `d/dx[xⁿ] = n·xⁿ⁻¹` | x⁵ → 5x⁴ |
| D2 | Potencia con coeficiente | `d/dx[axⁿ] = a·n·xⁿ⁻¹` | 3x⁴ → 12x³ |
| D3 | Constante | `d/dx[c] = 0` | 7 → 0 |
| D4 | Función lineal | `d/dx[ax+b] = a` | 5x+2 → 5 |
| D5 | Suma / Resta | `(f±g)' = f'±g'` | x³+x² → 3x²+2x |
| D6 | Regla del producto | `(f·g)' = f'g + fg'` | x²eˣ → eˣ(x²+2x) |
| D7 | Regla del cociente | `(f/g)' = (f'g−fg')/g²` | sin(x)/x → ... |
| D8 | Regla de la cadena | `[f(g(x))]' = f'(g)·g'` | sin(x²) → 2x·cos(x²) |
| D9 | Función seno | `d/dx[sin(x)] = cos(x)` | sin(x) → cos(x) |
| D10 | Función coseno | `d/dx[cos(x)] = −sin(x)` | cos(x) → −sin(x) |
| D11 | Exponencial natural | `d/dx[eˣ] = eˣ` | eˣ → eˣ |
| D12 | Logaritmo natural | `d/dx[ln(x)] = 1/x` | ln(x) → 1/x |

### Integrales — 8 casos garantizados

| ID | Caso | Fórmula | Ejemplo |
|----|------|---------|---------|
| I1 | Regla de la potencia | `∫xⁿ dx = xⁿ⁺¹/(n+1) + C` | x³ → x⁴/4 + C |
| I2 | Constante | `∫k dx = kx + C` | 5 → 5x + C |
| I3 | Logarítmica | `∫(1/x) dx = ln\|x\| + C` | 1/x → ln\|x\| + C |
| I4 | Función seno | `∫sin(x) dx = −cos(x) + C` | sin(x) → −cos(x) + C |
| I5 | Función coseno | `∫cos(x) dx = sin(x) + C` | cos(x) → sin(x) + C |
| I6 | Exponencial natural | `∫eˣ dx = eˣ + C` | eˣ → eˣ + C |
| I7 | Sustitución simple | `∫f(g(x))·g'(x) dx = F(g(x)) + C` | 2x·eˣ² → eˣ² + C |
| I8 | Integración por partes | `∫u dv = uv − ∫v du` | x·eˣ → eˣ(x−1) + C |

---

## Integrantes del proyecto

| Rol | Nombre | Contribución principal |
|-----|--------|----------------------|
| Desarrollador | **Daniel Colorado** | Diseño del sistema, backend Python/SymPy, detector de métodos matemáticos |
| Desarrollador | **Alejandro Piedrahita** | Frontend React, diseño de interfaz, integración API, exportación PDF/Excel, despliegue |
| Desarrollador | **Sebastian Patiño** | Lógica de integrales, generación de pasos explicativos, pruebas y validación matemática |
| Docente | **Cristhian Camilo Sánchez Ceballos** | Propuesta del proyecto, guía académica, asignatura Matemáticas 3 |

---

## Licencia y notas finales

Este proyecto fue desarrollado con fines **exclusivamente académicos** como Trabajo Final de la asignatura **Matemáticas 3 — Cálculo Diferencial e Integral**.

Los resultados matemáticos son generados mediante cálculo simbólico exacto con SymPy. Se recomienda verificar los resultados en casos de expresiones complejas.

---

*Asistente Matemático Inteligente · Daniel Colorado, Alejandro Piedrahita, Sebastian Patiño · Matemáticas 3 · Prof. Cristhian Camilo Sánchez Ceballos*
