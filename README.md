# 🧠 Asistente Matemático Inteligente

Aplicación web que resuelve derivadas e integrales **paso a paso** con detección automática del método.

## Casos soportados: 20 (12 derivadas + 8 integrales)

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Python 3.11 + FastAPI + SymPy |
| Frontend | React 18 + Vite + TailwindCSS |
| Deploy backend | Render.com |
| Deploy frontend | Vercel |

---

## Inicio rápido local

### Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API disponible en `http://localhost:8000`  
Docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
# Crea .env con tu backend URL:
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env
npm run dev
```

Frontend en `http://localhost:5173`

---

## Deploy en producción

### 1. Backend → Render.com

1. Crea cuenta en [render.com](https://render.com)
2. Nuevo servicio → **Web Service**
3. Conecta tu repo de GitHub
4. **Root Directory:** `backend`
5. **Build Command:** `pip install -r requirements.txt`
6. **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Copia la URL que te da Render (ej: `https://matheRest-backend.onrender.com`)

### 2. Frontend → Vercel

1. Crea cuenta en [vercel.com](https://vercel.com)
2. Importa tu repo de GitHub
3. **Root Directory:** `frontend`
4. **Framework:** Vite
5. Agrega variable de entorno:
   - `VITE_API_URL` = `https://tu-backend.onrender.com/api/v1`
6. Deploy

---

## Con Docker (local)

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:8000

---

## API

```
POST /api/v1/solve

Body: { "expresion": "x^2*exp(x)", "operacion": "derivada" }
```

---

## Expresiones soportadas

| Sintaxis | Ejemplo |
|---|---|
| Potencias | `x^5`, `3*x^4` |
| Producto | `x^2*exp(x)` |
| Cociente | `sin(x)/x` |
| Cadena | `sin(x^2)` |
| Suma/resta | `x^3 + x^2` |
| Funciones | `sin(x)`, `cos(x)`, `exp(x)`, `ln(x)` |
