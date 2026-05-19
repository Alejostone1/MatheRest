import React, { useState } from 'react'
import toast from 'react-hot-toast'

/* ── PDF ─────────────────────────────────────────────────── */
async function exportarPDF(resultado) {
  const { default: jsPDF } = await import('jspdf')

  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
  const W = 210, M = 18
  const AZUL_R = 15, AZUL_G = 30, AZUL_B = 90      // #0f1e5a
  const AZUL2_R = 37, AZUL2_G = 99, AZUL2_B = 235  // #2563eb
  const VERDE_R = 22, VERDE_G = 101, VERDE_B = 52   // #166534
  let y = 0

  // ── Encabezado ──────────────────────────────────────────
  doc.setFillColor(AZUL_R, AZUL_G, AZUL_B)
  doc.rect(0, 0, W, 28, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Asistente Matemático Inteligente', M, 13)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(147, 197, 253)
  doc.text(`Generado: ${new Date().toLocaleString('es')}`, M, 21)

  y = 36

  // ── Bloque info ──────────────────────────────────────────
  doc.setFillColor(10, 30, 56)
  doc.roundedRect(M, y, W - M * 2, 28, 3, 3, 'F')
  doc.setDrawColor(37, 99, 235)
  doc.setLineWidth(0.4)
  doc.roundedRect(M, y, W - M * 2, 28, 3, 3, 'S')

  doc.setFontSize(10)
  doc.setTextColor(148, 163, 184)
  doc.setFont('helvetica', 'bold')
  doc.text('Expresión:', M + 6, y + 8)
  doc.text('Operación:', M + 6, y + 16)
  doc.text('Método:', M + 6, y + 24)

  doc.setFont('courier', 'normal')
  doc.setTextColor(226, 232, 240)
  doc.text(resultado.expresion_original, M + 35, y + 8)
  doc.setFont('helvetica', 'normal')
  doc.text(resultado.operacion === 'derivada' ? 'Derivada' : 'Integral indefinida', M + 35, y + 16)
  doc.setTextColor(147, 197, 253)
  doc.text(resultado.metodo_detectado.nombre, M + 35, y + 24)

  y += 36

  // ── Título pasos ────────────────────────────────────────
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(AZUL2_R, AZUL2_G, AZUL2_B)
  doc.text('Solución paso a paso', M, y)
  doc.setDrawColor(AZUL2_R, AZUL2_G, AZUL2_B)
  doc.setLineWidth(0.6)
  doc.line(M, y + 2, W - M, y + 2)
  y += 10

  // ── Pasos ────────────────────────────────────────────────
  resultado.pasos.forEach((paso, idx) => {
    if (y > 258) { doc.addPage(); y = 18 }

    // Círculo numerado
    doc.setFillColor(AZUL2_R, AZUL2_G, AZUL2_B)
    doc.circle(M + 4, y + 3, 4.5, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(String(paso.numero), M + 4, y + 4.5, { align: 'center' })

    // Título paso
    doc.setTextColor(226, 232, 240)
    doc.setFontSize(10.5)
    doc.text(paso.titulo, M + 12, y + 4)

    y += 10

    // Descripción
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 116, 139)
    const descLines = doc.splitTextToSize(paso.descripcion, W - M * 2 - 12)
    doc.text(descLines, M + 12, y)
    y += descLines.length * 5

    // Fórmula en caja
    if (paso.formula) {
      if (y > 258) { doc.addPage(); y = 18 }
      const fLines = doc.splitTextToSize(paso.formula, W - M * 2 - 20)
      const fH = fLines.length * 5 + 8
      doc.setFillColor(7, 15, 29)
      doc.setDrawColor(30, 58, 95)
      doc.setLineWidth(0.3)
      doc.roundedRect(M + 10, y, W - M * 2 - 10, fH, 2, 2, 'FD')
      doc.setFont('courier', 'bold')
      doc.setFontSize(9.5)
      doc.setTextColor(147, 197, 253)
      doc.text(fLines, M + 14, y + 5)
      y += fH + 4
    }

    // Explicación
    if (paso.explicacion) {
      if (y > 258) { doc.addPage(); y = 18 }
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8.5)
      doc.setTextColor(71, 85, 105)
      const expLines = doc.splitTextToSize(paso.explicacion, W - M * 2 - 12)
      doc.text(expLines, M + 12, y)
      y += expLines.length * 4.5
    }

    y += (idx < resultado.pasos.length - 1) ? 6 : 4
  })

  // ── Resultado final ──────────────────────────────────────
  if (y > 248) { doc.addPage(); y = 18 }
  y += 4

  doc.setFillColor(VERDE_R, VERDE_G, VERDE_B)
  doc.roundedRect(M, y, W - M * 2, 20, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Resultado Final:', M + 6, y + 8)
  doc.setFont('courier', 'bold')
  doc.setFontSize(11)
  const resStr = resultado.resultado.simplificado || resultado.resultado.expresion
  doc.text(resStr, M + 44, y + 8)

  // Tiempo
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(134, 239, 172)
  doc.text(`Tiempo de cálculo: ${resultado.tiempo_ejecucion_ms} ms`, M + 6, y + 16)

  // ── Pie de página ────────────────────────────────────────
  const pags = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pags; i++) {
    doc.setPage(i)
    doc.setFontSize(7.5)
    doc.setTextColor(71, 85, 105)
    doc.text(`Asistente Matemático Inteligente — Página ${i} de ${pags}`, W / 2, 292, { align: 'center' })
    doc.setDrawColor(30, 41, 59)
    doc.setLineWidth(0.2)
    doc.line(M, 288, W - M, 288)
  }

  const nombre = resultado.expresion_original.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)
  doc.save(`solucion_${nombre}.pdf`)
}

/* ── Excel ──────────────────────────────────────────────── */
async function exportarExcel(resultado) {
  const XLSX = await import('xlsx')

  const wb = XLSX.utils.book_new()

  // Hoja 1: Resumen
  const resumen = [
    ['ASISTENTE MATEMÁTICO INTELIGENTE'],
    [],
    ['Expresión',       resultado.expresion_original],
    ['Operación',       resultado.operacion === 'derivada' ? 'Derivada' : 'Integral indefinida'],
    ['Método',          resultado.metodo_detectado.nombre],
    ['Confianza',       `${Math.round(resultado.metodo_detectado.confianza * 100)}%`],
    ['Resultado',       resultado.resultado.simplificado || resultado.resultado.expresion],
    ['Resultado LaTeX', resultado.resultado.simplificado_latex || resultado.resultado.latex],
    ['Tiempo (ms)',     resultado.tiempo_ejecucion_ms],
    ['Fecha',          new Date().toLocaleString('es')],
  ]
  const wsRes = XLSX.utils.aoa_to_sheet(resumen)
  wsRes['!cols'] = [{ wch: 22 }, { wch: 55 }]
  XLSX.utils.book_append_sheet(wb, wsRes, 'Resumen')

  // Hoja 2: Pasos
  const header  = ['Paso', 'Título', 'Descripción', 'Fórmula', 'Fórmula LaTeX', 'Explicación']
  const filas   = resultado.pasos.map((p) => [
    p.numero, p.titulo, p.descripcion, p.formula, p.formula_latex || '', p.explicacion || '',
  ])
  const wsPasos = XLSX.utils.aoa_to_sheet([header, ...filas])
  wsPasos['!cols'] = [{ wch: 6 }, { wch: 28 }, { wch: 38 }, { wch: 35 }, { wch: 45 }, { wch: 40 }]
  XLSX.utils.book_append_sheet(wb, wsPasos, 'Pasos')

  const nombre = resultado.expresion_original.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)
  XLSX.writeFile(wb, `solucion_${nombre}.xlsx`)
}

/* ── Componente ─────────────────────────────────────────── */
export default function ExportarBotones({ resultado }) {
  const [loadingPDF,   setLoadingPDF]   = useState(false)
  const [loadingExcel, setLoadingExcel] = useState(false)

  const handlePDF = async () => {
    setLoadingPDF(true)
    try {
      await exportarPDF(resultado)
      toast.success('PDF exportado correctamente')
    } catch (e) {
      toast.error('Error al generar PDF')
      console.error(e)
    } finally {
      setLoadingPDF(false)
    }
  }

  const handleExcel = async () => {
    setLoadingExcel(true)
    try {
      await exportarExcel(resultado)
      toast.success('Excel exportado correctamente')
    } catch (e) {
      toast.error('Error al generar Excel')
      console.error(e)
    } finally {
      setLoadingExcel(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={handlePDF}
        disabled={loadingPDF}
        className="btn-export-pdf"
      >
        {loadingPDF ? '⏳' : '📄'} Exportar PDF
      </button>
      <button
        type="button"
        onClick={handleExcel}
        disabled={loadingExcel}
        className="btn-export-excel"
      >
        {loadingExcel ? '⏳' : '📊'} Exportar Excel
      </button>
    </div>
  )
}
