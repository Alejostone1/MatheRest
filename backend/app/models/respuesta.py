from pydantic import BaseModel
from typing import List, Optional, Any


class Paso(BaseModel):
    numero: int
    titulo: str
    descripcion: str
    formula: str
    formula_latex: Optional[str] = ""
    explicacion: Optional[str] = ""


class MetodoDetectado(BaseModel):
    nombre: str
    confianza: float
    descripcion: str


class ResultadoMatematico(BaseModel):
    expresion: str
    latex: str
    simplificado: str
    simplificado_latex: str


class RespuestaExitosa(BaseModel):
    exito: bool = True
    expresion_original: str
    operacion: str
    metodo_detectado: MetodoDetectado
    pasos: List[Paso]
    resultado: ResultadoMatematico
    tiempo_ejecucion_ms: float


class RespuestaError(BaseModel):
    exito: bool = False
    error: str
    detalle: str
    sugerencia: str
