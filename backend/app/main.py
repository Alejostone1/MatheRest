from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import solve

app = FastAPI(
    title="Asistente Matemático Inteligente",
    description="API para derivación e integración paso a paso con SymPy",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(solve.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"mensaje": "Asistente Matemático API funcionando", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "ok"}
