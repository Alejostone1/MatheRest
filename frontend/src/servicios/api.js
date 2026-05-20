import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const cliente = axios.create({
  baseURL: BASE_URL,
  timeout: 70000,
  headers: { 'Content-Type': 'application/json' },
})

export async function resolverExpresion({ expresion, operacion, limites = {} }) {
  const body = {
    expresion,
    operacion,
    limite_inferior:   limites.inf   || null,
    limite_superior:   limites.sup   || null,
    limite_inferior_y: limites.infY  || null,
    limite_superior_y: limites.supY  || null,
  }
  const { data } = await cliente.post('/solve', body)
  return data
}

export async function pingBackend() {
  try {
    await cliente.get('/../../health', { timeout: 5000 })
    return true
  } catch {
    return false
  }
}
