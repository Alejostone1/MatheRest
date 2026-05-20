from pydantic import BaseModel, validator
from typing import Literal, Optional


class PeticionSolver(BaseModel):
    expresion: str
    operacion: Literal["derivada", "integral", "integral_definida", "integral_doble"]
    limite_inferior: Optional[str] = None
    limite_superior: Optional[str] = None
    limite_inferior_y: Optional[str] = None
    limite_superior_y: Optional[str] = None

    @validator("expresion")
    def expresion_no_vacia(cls, v):
        if not v.strip():
            raise ValueError("La expresión no puede estar vacía")
        return v.strip()
