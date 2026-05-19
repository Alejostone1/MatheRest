import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const cliente = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export async function resolverExpresion({ expresion, operacion }) {
  const { data } = await cliente.post('/solve', { expresion, operacion })
  return data
}
