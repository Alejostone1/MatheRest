import sympy as sp
from sympy.parsing.sympy_parser import (
    parse_expr,
    standard_transformations,
    implicit_multiplication_application,
    convert_xor,
)

_TRANSFORMATIONS = standard_transformations + (
    implicit_multiplication_application,
    convert_xor,
)

_LOCAL = {
    "e": sp.E,
    "pi": sp.pi,
    "sin": sp.sin,
    "cos": sp.cos,
    "tan": sp.tan,
    "ln": sp.log,
    "log": sp.log,
    "exp": sp.exp,
    "sqrt": sp.sqrt,
    "x": sp.Symbol("x"),
}


def calcular_derivada(expresion: str, variable: str = "x") -> dict:
    try:
        x = sp.Symbol(variable)
        expr = parse_expr(expresion, local_dict=_LOCAL, transformations=_TRANSFORMATIONS)
        derivada = sp.diff(expr, x)
        simplificada = sp.simplify(derivada)
        return {
            "resultado": str(derivada),
            "resultado_latex": sp.latex(derivada),
            "simplificado": str(simplificada),
            "simplificado_latex": sp.latex(simplificada),
            "error": None,
        }
    except Exception as exc:
        return {"error": str(exc)}
