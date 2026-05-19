import time
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.models.peticion import PeticionSolver
from app.models.respuesta import (
    RespuestaExitosa, RespuestaError,
    MetodoDetectado, Paso, ResultadoMatematico
)
from app.core.detector.detector import detectar_metodo
from app.core.solver.derivada import calcular_derivada
from app.core.solver.integral import calcular_integral
from app.core.explicador.generador_pasos import generar_pasos

router = APIRouter()


@router.post("/solve")
def resolver(peticion: PeticionSolver):
    inicio = time.time()
    expresion = peticion.expresion
    operacion = peticion.operacion

    # 1. Detectar método
    info_metodo = detectar_metodo(expresion, operacion)

    # 2. Calcular
    if operacion == "derivada":
        calculo = calcular_derivada(expresion)
    else:
        calculo = calcular_integral(expresion)

    if calculo.get("error"):
        return JSONResponse(
            status_code=400,
            content={
                "exito": False,
                "error": "Expresión inválida",
                "detalle": calculo["error"],
                "sugerencia": (
                    "Usa ^ o ** para potencias, * para multiplicación, "
                    "sin/cos/exp/ln para funciones."
                ),
            },
        )

    # 3. Generar pasos
    pasos_raw = generar_pasos(expresion, operacion, info_metodo["metodo"], calculo)
    pasos = [Paso(**p) for p in pasos_raw]

    # 4. Construir respuesta
    ms = round((time.time() - inicio) * 1000, 2)
    respuesta = RespuestaExitosa(
        exito=True,
        expresion_original=expresion,
        operacion=operacion,
        metodo_detectado=MetodoDetectado(
            nombre=info_metodo.get("nombre", "Método directo"),
            confianza=info_metodo.get("confianza", 1.0),
            descripcion=info_metodo.get("descripcion", ""),
        ),
        pasos=pasos,
        resultado=ResultadoMatematico(
            expresion=calculo.get("resultado", ""),
            latex=calculo.get("resultado_latex", ""),
            simplificado=calculo.get("simplificado", ""),
            simplificado_latex=calculo.get("simplificado_latex", ""),
        ),
        tiempo_ejecucion_ms=ms,
    )
    return respuesta
