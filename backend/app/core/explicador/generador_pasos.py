import sympy as sp
from sympy.parsing.sympy_parser import (
    parse_expr,
    standard_transformations,
    implicit_multiplication_application,
    convert_xor,
)

_T = standard_transformations + (implicit_multiplication_application, convert_xor)
_L = {
    "e": sp.E, "pi": sp.pi, "sin": sp.sin, "cos": sp.cos,
    "tan": sp.tan, "ln": sp.log, "log": sp.log, "exp": sp.exp,
    "sqrt": sp.sqrt, "x": sp.Symbol("x"),
}

x = sp.Symbol("x")


def _parse(expr_str: str):
    return parse_expr(expr_str, local_dict=_L, transformations=_T)


def generar_pasos(expresion: str, operacion: str, metodo: str, calculo: dict) -> list:
    try:
        if operacion == "derivada":
            return _pasos_derivada(expresion, metodo, calculo)
        return _pasos_integral(expresion, metodo, calculo)
    except Exception:
        return _pasos_fallback(expresion, operacion, calculo)


def _pasos_fallback(expresion: str, operacion: str, calculo: dict) -> list:
    resultado = calculo.get("simplificado", calculo.get("resultado", "?"))
    latex_r = calculo.get("simplificado_latex", calculo.get("resultado_latex", "?"))
    op_label = "derivada" if operacion == "derivada" else "integral"
    return [
        {
            "numero": 1,
            "titulo": "Expresión identificada",
            "descripcion": f"Calculamos la {op_label} de: {expresion}",
            "formula": expresion,
            "formula_latex": expresion,
            "explicacion": "Preparamos la expresión para aplicar SymPy.",
        },
        {
            "numero": 2,
            "titulo": "Resultado",
            "descripcion": f"La {op_label} calculada es:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "Resultado obtenido mediante cálculo simbólico.",
        },
    ]


# ────────────────────────────────────────────────────────────────────
# DERIVADAS
# ────────────────────────────────────────────────────────────────────

def _pasos_derivada(expresion: str, metodo: str, calculo: dict) -> list:
    resultado = calculo.get("simplificado", calculo.get("resultado", "?"))
    latex_r = calculo.get("simplificado_latex", calculo.get("resultado_latex", "?"))

    if metodo == "producto":
        return _pasos_producto(expresion, resultado, latex_r)
    if metodo == "cociente":
        return _pasos_cociente(expresion, resultado, latex_r)
    if metodo == "cadena":
        return _pasos_cadena(expresion, resultado, latex_r)
    if metodo == "suma_resta":
        return _pasos_suma_resta(expresion, resultado, latex_r)
    return _pasos_potencia_basica(expresion, resultado, latex_r)


def _pasos_producto(expresion: str, resultado: str, latex_r: str) -> list:
    try:
        import re
        partes = re.split(r'(?<!\*)\*(?!\*)', expresion, maxsplit=1)
        f_str = partes[0].strip()
        g_str = partes[1].strip() if len(partes) > 1 else expresion
        f_expr = _parse(f_str)
        g_expr = _parse(g_str)
        fp = sp.diff(f_expr, x)
        gp = sp.diff(g_expr, x)
        fp_latex = sp.latex(fp)
        gp_latex = sp.latex(gp)
        f_latex = sp.latex(f_expr)
        g_latex = sp.latex(g_expr)
    except Exception:
        f_str = g_str = expresion
        f_latex = g_latex = fp_latex = gp_latex = expresion

    return [
        {
            "numero": 1,
            "titulo": "Identificar las funciones",
            "descripcion": f"La expresión es un producto: f(x) · g(x)",
            "formula": f"f(x) = {f_str},   g(x) = {g_str}",
            "formula_latex": f"f(x) = {f_latex}, \\quad g(x) = {g_latex}",
            "explicacion": "Separamos la expresión en dos factores.",
        },
        {
            "numero": 2,
            "titulo": "Fórmula de la regla del producto",
            "descripcion": "La regla del producto establece:",
            "formula": "(f·g)' = f'·g + f·g'",
            "formula_latex": "(f \\cdot g)' = f' \\cdot g + f \\cdot g'",
            "explicacion": "Esta regla siempre se usa cuando hay multiplicación de funciones.",
        },
        {
            "numero": 3,
            "titulo": "Derivar cada función por separado",
            "descripcion": "Calculamos f'(x) y g'(x):",
            "formula": f"f'(x) = {fp_latex},   g'(x) = {gp_latex}",
            "formula_latex": f"f'(x) = {fp_latex}, \\quad g'(x) = {gp_latex}",
            "explicacion": "Aplicamos las reglas básicas a cada factor.",
        },
        {
            "numero": 4,
            "titulo": "Aplicar la fórmula",
            "descripcion": "Sustituimos f', g, f, g' en la fórmula:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "Multiplicamos y sumamos los términos resultantes.",
        },
    ]


def _pasos_cociente(expresion: str, resultado: str, latex_r: str) -> list:
    try:
        partes = expresion.split('/', 1)
        f_str = partes[0].strip()
        g_str = partes[1].strip()
        f_expr = _parse(f_str)
        g_expr = _parse(g_str)
        fp = sp.diff(f_expr, x)
        gp = sp.diff(g_expr, x)
        f_latex = sp.latex(f_expr)
        g_latex = sp.latex(g_expr)
        fp_latex = sp.latex(fp)
        gp_latex = sp.latex(gp)
    except Exception:
        f_str = g_str = expresion
        f_latex = g_latex = fp_latex = gp_latex = expresion

    return [
        {
            "numero": 1,
            "titulo": "Identificar numerador y denominador",
            "descripcion": f"La expresión es un cociente f(x)/g(x):",
            "formula": f"f(x) = {f_str},   g(x) = {g_str}",
            "formula_latex": f"f(x) = {f_latex}, \\quad g(x) = {g_latex}",
            "explicacion": "Identificamos numerador y denominador.",
        },
        {
            "numero": 2,
            "titulo": "Fórmula de la regla del cociente",
            "descripcion": "La regla del cociente establece:",
            "formula": "(f/g)' = (f'·g - f·g') / g²",
            "formula_latex": "\\left(\\frac{f}{g}\\right)' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}",
            "explicacion": "Denominador al cuadrado en el denominador del resultado.",
        },
        {
            "numero": 3,
            "titulo": "Derivar numerador y denominador",
            "descripcion": "Calculamos las derivadas individuales:",
            "formula": f"f'(x) = {fp_latex},   g'(x) = {gp_latex}",
            "formula_latex": f"f'(x) = {fp_latex}, \\quad g'(x) = {gp_latex}",
            "explicacion": "Aplicamos reglas básicas a cada función.",
        },
        {
            "numero": 4,
            "titulo": "Resultado final",
            "descripcion": "Sustituimos y simplificamos:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "Combinamos numerador y denominador.",
        },
    ]


def _pasos_cadena(expresion: str, resultado: str, latex_r: str) -> list:
    import re
    m = re.search(r'(sin|cos|tan|exp|log|ln)\((.+)\)', expresion)
    ext = m.group(1) if m else "f"
    inn = m.group(2) if m else "g(x)"

    derivadas_externas = {
        "sin": "cos(u)", "cos": "-sin(u)", "tan": "sec²(u)",
        "exp": "eᵘ", "log": "1/u", "ln": "1/u",
    }
    d_ext = derivadas_externas.get(ext, "f'(u)")

    try:
        inn_expr = _parse(inn)
        gp = sp.diff(inn_expr, x)
        gp_latex = sp.latex(gp)
    except Exception:
        gp_latex = "g'(x)"

    return [
        {
            "numero": 1,
            "titulo": "Identificar la composición f(g(x))",
            "descripcion": "La expresión es una función compuesta:",
            "formula": f"f(u) = {ext}(u),   g(x) = {inn}",
            "formula_latex": f"f(u) = \\{ext}(u), \\quad g(x) = {inn}",
            "explicacion": "La función exterior actúa sobre la función interior.",
        },
        {
            "numero": 2,
            "titulo": "Fórmula de la regla de la cadena",
            "descripcion": "La regla de la cadena establece:",
            "formula": "[f(g(x))]' = f'(g(x)) · g'(x)",
            "formula_latex": "[f(g(x))]' = f'(g(x)) \\cdot g'(x)",
            "explicacion": "Derivamos exterior evaluada en interior, multiplicamos por derivada interior.",
        },
        {
            "numero": 3,
            "titulo": "Derivar la función exterior",
            "descripcion": f"Si f(u) = {ext}(u), entonces f'(u) = {d_ext}",
            "formula": f"f'(u) = {d_ext}",
            "formula_latex": f"f'(u) = {d_ext}",
            "explicacion": "Aplicamos la derivada de la función elemental.",
        },
        {
            "numero": 4,
            "titulo": "Derivar la función interior",
            "descripcion": f"Derivamos g(x) = {inn}:",
            "formula": f"g'(x) = {gp_latex}",
            "formula_latex": f"g'(x) = {gp_latex}",
            "explicacion": "Aplicamos reglas básicas a la función interior.",
        },
        {
            "numero": 5,
            "titulo": "Resultado final",
            "descripcion": "Multiplicamos ambas derivadas:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "Producto de derivada exterior por derivada interior.",
        },
    ]


def _pasos_suma_resta(expresion: str, resultado: str, latex_r: str) -> list:
    return [
        {
            "numero": 1,
            "titulo": "Propiedad de linealidad",
            "descripcion": "La derivada de una suma es la suma de las derivadas:",
            "formula": "(f ± g)' = f' ± g'",
            "formula_latex": "(f \\pm g)' = f' \\pm g'",
            "explicacion": "Derivamos término a término.",
        },
        {
            "numero": 2,
            "titulo": "Identificar cada término",
            "descripcion": f"Separamos los términos de: {expresion}",
            "formula": expresion,
            "formula_latex": expresion,
            "explicacion": "Cada término se deriva de forma independiente.",
        },
        {
            "numero": 3,
            "titulo": "Derivar cada término",
            "descripcion": "Aplicamos regla de la potencia a cada término:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "d/dx[xⁿ] = n·xⁿ⁻¹ aplicado a cada término.",
        },
    ]


def _pasos_potencia_basica(expresion: str, resultado: str, latex_r: str) -> list:
    pasos_especiales = {
        "sin(x)": ("d/dx[sin(x)] = cos(x)", "\\frac{d}{dx}[\\sin(x)] = \\cos(x)"),
        "cos(x)": ("d/dx[cos(x)] = -sin(x)", "\\frac{d}{dx}[\\cos(x)] = -\\sin(x)"),
        "exp(x)": ("d/dx[eˣ] = eˣ", "\\frac{d}{dx}[e^x] = e^x"),
        "log(x)": ("d/dx[ln(x)] = 1/x", "\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}"),
        "ln(x)":  ("d/dx[ln(x)] = 1/x", "\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}"),
    }

    formula_str, formula_tex = pasos_especiales.get(
        expresion.strip(), (f"d/dx[{expresion}]", f"\\frac{{d}}{{dx}}[{expresion}]")
    )

    return [
        {
            "numero": 1,
            "titulo": "Identificar la función",
            "descripcion": f"Tenemos f(x) = {expresion}",
            "formula": expresion,
            "formula_latex": expresion,
            "explicacion": "Reconocemos el tipo de función para aplicar la regla correcta.",
        },
        {
            "numero": 2,
            "titulo": "Aplicar la regla de derivación",
            "descripcion": "Usamos la fórmula correspondiente:",
            "formula": formula_str,
            "formula_latex": formula_tex,
            "explicacion": "Regla estándar de cálculo diferencial.",
        },
        {
            "numero": 3,
            "titulo": "Resultado final",
            "descripcion": "La derivada es:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "Resultado simplificado.",
        },
    ]


# ────────────────────────────────────────────────────────────────────
# INTEGRALES
# ────────────────────────────────────────────────────────────────────

def _pasos_integral(expresion: str, metodo: str, calculo: dict) -> list:
    resultado = calculo.get("simplificado", calculo.get("resultado", "?"))
    latex_r = calculo.get("simplificado_latex", calculo.get("resultado_latex", "?"))

    if metodo == "partes":
        return _pasos_partes(expresion, resultado, latex_r)
    if metodo == "sustitucion":
        return _pasos_sustitucion(expresion, resultado, latex_r)
    if metodo == "logaritmo":
        return _pasos_logaritmo(resultado, latex_r)
    return _pasos_integral_basica(expresion, resultado, latex_r)


def _pasos_integral_basica(expresion: str, resultado: str, latex_r: str) -> list:
    return [
        {
            "numero": 1,
            "titulo": "Identificar la función",
            "descripcion": f"Calculamos ∫ {expresion} dx",
            "formula": f"∫ {expresion} dx",
            "formula_latex": f"\\int {expresion} \\, dx",
            "explicacion": "Identificamos el tipo de función para aplicar la fórmula correcta.",
        },
        {
            "numero": 2,
            "titulo": "Aplicar la fórmula de integración",
            "descripcion": "Usamos la regla de la potencia: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
            "formula": "∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
            "formula_latex": "\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C",
            "explicacion": "Aumentamos el exponente en 1 y dividimos por el nuevo exponente.",
        },
        {
            "numero": 3,
            "titulo": "Resultado final",
            "descripcion": "La integral indefinida es:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "No olvides la constante de integración C.",
        },
    ]


def _pasos_partes(expresion: str, resultado: str, latex_r: str) -> list:
    return [
        {
            "numero": 1,
            "titulo": "Identificar u y dv (regla ILATE)",
            "descripcion": "Usamos la regla ILATE: Inversa, Logarítmica, Algebraica, Trigonométrica, Exponencial",
            "formula": f"∫ {expresion} dx",
            "formula_latex": f"\\int {expresion} \\, dx",
            "explicacion": "El término de mayor prioridad en ILATE será u.",
        },
        {
            "numero": 2,
            "titulo": "Fórmula de integración por partes",
            "descripcion": "La fórmula es: ∫u·dv = u·v - ∫v·du",
            "formula": "∫u·dv = u·v - ∫v·du",
            "formula_latex": "\\int u \\, dv = u \\cdot v - \\int v \\, du",
            "explicacion": "Transformamos una integral difícil en una más sencilla.",
        },
        {
            "numero": 3,
            "titulo": "Calcular du y v",
            "descripcion": "Derivamos u para obtener du, integramos dv para obtener v",
            "formula": "du = u' dx,   v = ∫dv",
            "formula_latex": "du = u' \\, dx, \\quad v = \\int dv",
            "explicacion": "Este paso nos da todos los elementos de la fórmula.",
        },
        {
            "numero": 4,
            "titulo": "Aplicar la fórmula y simplificar",
            "descripcion": "Sustituimos y resolvemos la nueva integral:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "La nueva integral suele ser más sencilla que la original.",
        },
    ]


def _pasos_sustitucion(expresion: str, resultado: str, latex_r: str) -> list:
    return [
        {
            "numero": 1,
            "titulo": "Identificar la sustitución u",
            "descripcion": "Buscamos una función interior g(x) tal que g'(x) aparezca en el integrando",
            "formula": f"∫ {expresion} dx",
            "formula_latex": f"\\int {expresion} \\, dx",
            "explicacion": "La clave es encontrar u = g(x) donde g'(x) está presente.",
        },
        {
            "numero": 2,
            "titulo": "Realizar el cambio de variable",
            "descripcion": "Sea u = g(x), entonces du = g'(x) dx",
            "formula": "u = g(x),   du = g'(x) dx",
            "formula_latex": "u = g(x), \\quad du = g'(x) \\, dx",
            "explicacion": "Expresamos toda la integral en términos de u.",
        },
        {
            "numero": 3,
            "titulo": "Integrar respecto a u",
            "descripcion": "La integral en u es directa:",
            "formula": "∫ f(u) du",
            "formula_latex": "\\int f(u) \\, du",
            "explicacion": "Ahora tenemos una integral conocida.",
        },
        {
            "numero": 4,
            "titulo": "Regresar a la variable original",
            "descripcion": "Sustituimos u = g(x) de regreso:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "El resultado final está en términos de x.",
        },
    ]


def _pasos_logaritmo(resultado: str, latex_r: str) -> list:
    return [
        {
            "numero": 1,
            "titulo": "Reconocer la forma 1/x",
            "descripcion": "La integral de 1/x es un caso especial:",
            "formula": "∫(1/x) dx",
            "formula_latex": "\\int \\frac{1}{x} \\, dx",
            "explicacion": "No podemos usar la regla de la potencia (n=-1 genera división por cero).",
        },
        {
            "numero": 2,
            "titulo": "Aplicar la fórmula logarítmica",
            "descripcion": "La fórmula directa es:",
            "formula": "∫(1/x) dx = ln|x| + C",
            "formula_latex": "\\int \\frac{1}{x} \\, dx = \\ln|x| + C",
            "explicacion": "Usamos valor absoluto para contemplar x positivo y negativo.",
        },
        {
            "numero": 3,
            "titulo": "Resultado final",
            "descripcion": "La integral es:",
            "formula": resultado,
            "formula_latex": latex_r,
            "explicacion": "La constante C representa la familia de primitivas.",
        },
    ]
