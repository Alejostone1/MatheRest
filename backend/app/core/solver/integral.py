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
    "y": sp.Symbol("y"),
}


def _parse(expr_str: str, extra: dict = None):
    local = {**_LOCAL, **(extra or {})}
    return parse_expr(expr_str, local_dict=local, transformations=_TRANSFORMATIONS)


def calcular_integral(expresion: str, variable: str = "x") -> dict:
    try:
        x = sp.Symbol(variable)
        expr = _parse(expresion)
        integral = sp.integrate(expr, x)
        simplificada = sp.simplify(integral)
        return {
            "resultado": str(integral) + " + C",
            "resultado_latex": sp.latex(integral) + " + C",
            "simplificado": str(simplificada) + " + C",
            "simplificado_latex": sp.latex(simplificada) + " + C",
            "error": None,
        }
    except Exception as exc:
        return {"error": str(exc)}


def calcular_integral_definida(expresion: str, a: str, b: str, variable: str = "x") -> dict:
    try:
        x = sp.Symbol(variable)
        expr = _parse(expresion)
        a_val = _parse(a)
        b_val = _parse(b)
        resultado = sp.integrate(expr, (x, a_val, b_val))
        simplificada = sp.simplify(resultado)
        return {
            "resultado": str(resultado),
            "resultado_latex": sp.latex(resultado),
            "simplificado": str(simplificada),
            "simplificado_latex": sp.latex(simplificada),
            "limite_inferior": str(a_val),
            "limite_superior": str(b_val),
            "error": None,
        }
    except Exception as exc:
        return {"error": str(exc)}


def calcular_integral_doble(expresion: str, ax: str, bx: str, ay: str, by: str) -> dict:
    try:
        x = sp.Symbol("x")
        y = sp.Symbol("y")
        extra = {"y": y}
        expr = _parse(expresion, extra)
        ax_val = _parse(ax)
        bx_val = _parse(bx)
        ay_val = _parse(ay)
        by_val = _parse(by)
        resultado = sp.integrate(expr, (y, ay_val, by_val), (x, ax_val, bx_val))
        simplificada = sp.simplify(resultado)
        return {
            "resultado": str(resultado),
            "resultado_latex": sp.latex(resultado),
            "simplificado": str(simplificada),
            "simplificado_latex": sp.latex(simplificada),
            "limite_inferior": str(ax_val),
            "limite_superior": str(bx_val),
            "limite_inferior_y": str(ay_val),
            "limite_superior_y": str(by_val),
            "error": None,
        }
    except Exception as exc:
        return {"error": str(exc)}
