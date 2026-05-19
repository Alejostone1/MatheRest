import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

const cliente = axios.create({
  baseURL: BASE_URL,
  timeout: 70000,          // 70 s — Render free tier tarda hasta 60 s en despertar
  headers: { 'Content-Type': 'application/json' },
})

export async function resolverExpresion({ expresion, operacion }) {
  const { data } = await cliente.post('/solve', { expresion, operacion })
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
