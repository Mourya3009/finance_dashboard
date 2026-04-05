import { Download } from 'lucide-react'
import Button from '../ui/Button'
import { exportToCSV } from '../../utils/csvExport'

const CSVExportButton = ({ transactions }) => {
  const handleExport = () => {
    if (!transactions.length) return
    exportToCSV(transactions, 'finflow-transactions')
  }

  return (
    <Button
      id="csv-export-btn"
      variant="ghost"
      onClick={handleExport}
      disabled={!transactions.length}
      icon={Download}
    >
      Export CSV
    </Button>
  )
}

export default CSVExportButton
