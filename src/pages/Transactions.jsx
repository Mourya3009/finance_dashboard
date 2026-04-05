import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionForm from '../components/transactions/TransactionForm'
import CSVExportButton from '../components/transactions/CSVExportButton'
import useFinanceStore from '../store/useFinanceStore'
import useFilteredTransactions from '../hooks/useFilteredTransactions'

const Transactions = () => {
  const role = useFinanceStore((s) => s.role)
  const addTransaction = useFinanceStore((s) => s.addTransaction)
  const editTransaction = useFinanceStore((s) => s.editTransaction)
  
  const filteredTransactions = useFilteredTransactions()
  const isAdmin = role === 'admin'

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTxn, setEditingTxn] = useState(null)

  const handleOpenAdd = () => {
    setEditingTxn(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (txn) => {
    setEditingTxn(txn)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingTxn(null)
  }

  const handleSubmit = (txnData) => {
    if (editingTxn) {
      editTransaction(editingTxn.id, txnData)
    } else {
      addTransaction(txnData)
    }
    handleClose()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
            Manage and track all your income and expenses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CSVExportButton transactions={filteredTransactions} />
          {isAdmin && (
            <Button onClick={handleOpenAdd} icon={Plus}>
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
        <TransactionFilters />
      </div>

      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleOpenEdit}
        onAddNew={handleOpenAdd}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingTxn ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          initial={editingTxn}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </Modal>
    </div>
  )
}

export default Transactions
