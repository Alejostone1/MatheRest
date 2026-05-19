from pydantic import BaseModel, validator
from typing import Literal


class PeticionSolver(BaseModel):
    expresion: str
    operacion: Literal["derivada", "integral"]

    @validator("expresion")
    def expresion_no_vacia(cls, v):
        if not v.strip():
            raise ValueError("La expresión no puede estar vacía")
        return v.strip()
