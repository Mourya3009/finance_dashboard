import Papa from 'papaparse'

export const exportToCSV = (transactions, filename = 'transactions') => {
  const data = transactions.map((t) => ({
    ID: t.id,
    Date: t.date,
    Title: t.title,
    Category: t.category,
    Type: t.type.charAt(0).toUpperCase() + t.type.slice(1),
    Amount: t.amount,
    Note: t.note || '',
  }))

  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
