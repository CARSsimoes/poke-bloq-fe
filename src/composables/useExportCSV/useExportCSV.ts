export default function useExportCSV() {
  const convertToCSV = <T extends Record<string, unknown>>(data: T[]): string => {
    if (!data || data.length === 0) return ''

    const header = Object.keys(data[0] || {}).join(',')
    const rows = data.map((item) =>
      Object.values(item)
        .map((value) => {
          if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value)
          }
          return value
        })
        .map((value) => (typeof value === 'string' ? `"${value}"` : value))
        .join(','),
    )

    return [header, ...rows].join('\n')
  }

  const downloadCSV = <T extends Record<string, unknown>>(data: T[], filename = 'data.csv') => {
    if (!data || data.length === 0) return

    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return { downloadCSV, convertToCSV }
}
