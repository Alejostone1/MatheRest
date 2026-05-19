import re


def detectar_metodo(expresion: str, operacion: str) -> dict:
    if operacion == "derivada":
        return _detectar_derivada(expresion)
    return _detectar_integral(expresion)


def _detectar_derivada(expr: str) -> dict:
    e = expr.strip()

    # Producto: contiene * pero no es potencia **
    if re.search(r'(?<!\*)\*(?!\*)', e):
        partes = re.split(r'(?<!\*)\*(?!\*)', e, maxsplit=1)
        return {
            "metodo": "producto",
            "nombre": "Regla del producto",
            "confianza": 0.92,
            "descripcion": "Se detectó multiplicación de dos funciones",
            "componentes": {"f": partes[0].strip(), "g": partes[1].strip()}
        }

    # Cociente: contiene /
    if '/' in e and not e.startswith('1/'):
        partes = e.split('/', 1)
        return {
            "metodo": "cociente",
            "nombre": "Regla del cociente",
            "confianza": 0.90,
            "descripcion": "Se detectó división de dos funciones",
            "componentes": {"f": partes[0].strip(), "g": partes[1].strip()}
        }

    # 1/x especial
    if e == '1/x':
        return {
            "metodo": "basica",
            "nombre": "Derivada de potencia (x⁻¹)",
            "confianza": 1.0,
            "descripcion": "Derivada de 1/x = x⁻¹",
            "componentes": {}
        }

    # Cadena: función trigonométrica, exp, log con argumento compuesto
    if re.search(r'(sin|cos|tan|exp|log|ln)\((.+)\)', e):
        inner = re.search(r'(sin|cos|tan|exp|log|ln)\((.+)\)', e)
        arg = inner.group(2) if inner else ""
        if arg and arg != 'x':
            return {
                "metodo": "cadena",
                "nombre": "Regla de la cadena",
                "confianza": 0.88,
                "descripcion": "Se detectó composición de funciones",
                "componentes": {"exterior": inner.group(1), "interior": arg}
            }

    # Suma o resta
    if re.search(r'[+-]', e.lstrip('-')):
        return {
            "metodo": "suma_resta",
            "nombre": "Regla de la suma/resta",
            "confianza": 0.93,
            "descripcion": "Derivada de suma o resta de funciones",
            "componentes": {}
        }

    # Potencia simple
    if '**' in e or '^' in e:
        return {
            "metodo": "potencia",
            "nombre": "Regla de la potencia",
            "confianza": 0.97,
            "descripcion": "Se aplica d/dx[xⁿ] = n·xⁿ⁻¹",
            "componentes": {}
        }

    return {
        "metodo": "basica",
        "nombre": "Derivada básica",
        "confianza": 1.0,
        "descripcion": "Derivada de función elemental",
        "componentes": {}
    }


def _detectar_integral(expr: str) -> dict:
    e = expr.strip()

    # Integración por partes: producto de función algebraica y transcendente
    if re.search(r'(?<!\*)\*(?!\*)', e):
        if re.search(r'(exp|sin|cos|ln|log)', e) and re.search(r'x(\*\*\d+)?(?!\s*[\*/])', e):
            return {
                "metodo": "partes",
                "nombre": "Integración por partes",
                "confianza": 0.87,
                "descripcion": "∫u·dv = u·v - ∫v·du",
                "componentes": {}
            }
        # Sustitución: producto donde uno es la derivada del otro
        return {
            "metodo": "sustitucion",
            "nombre": "Sustitución simple (u-sub)",
            "confianza": 0.85,
            "descripcion": "Se detectó un integrando compuesto",
            "componentes": {}
        }

    # 1/x
    if e == '1/x':
        return {
            "metodo": "logaritmo",
            "nombre": "Integral logarítmica",
            "confianza": 1.0,
            "descripcion": "∫(1/x) dx = ln|x| + C",
            "componentes": {}
        }

    # Trigonométricas básicas
    if re.match(r'^(sin|cos)\(x\)$', e):
        return {
            "metodo": "trigonometrica",
            "nombre": "Integral trigonométrica básica",
            "confianza": 1.0,
            "descripcion": "Fórmula directa de integración trigonométrica",
            "componentes": {}
        }

    # Exponencial
    if re.match(r'^exp\(x\)$', e) or e == 'E**x':
        return {
            "metodo": "exponencial",
            "nombre": "Integral exponencial",
            "confianza": 1.0,
            "descripcion": "∫e^x dx = e^x + C",
            "componentes": {}
        }

    # Potencia
    if re.search(r'x(\*\*\d+)?', e):
        return {
            "metodo": "potencia",
            "nombre": "Regla de la potencia",
            "confianza": 0.95,
            "descripcion": "∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
            "componentes": {}
        }

    return {
        "metodo": "basica",
        "nombre": "Integral directa",
        "confianza": 1.0,
        "descripcion": "Integración directa por fórmula",
        "componentes": {}
    }
