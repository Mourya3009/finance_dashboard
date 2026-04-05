import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import TransactionRow from './TransactionRow'
import EmptyState from '../ui/EmptyState'
import useFinanceStore from '../../store/useFinanceStore'
import Button from '../ui/Button'

const COLS = [
  { key: 'date',     label: 'Date' },
  { key: 'title',    label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'type',     label: 'Type' },
  { key: 'amount',   label: 'Amount' },
]

const TransactionTable = ({ transactions, onEdit, onAddNew }) => {
  const role = useFinanceStore((s) => s.role)
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction)
  const isAdmin = role === 'admin'

  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...transactions].sort((a, b) => {
    let av = a[sortKey], bv = b[sortKey]
    if (sortKey === 'amount') { av = Number(av); bv = Number(bv) }
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  if (!transactions.length) {
    return (
      <EmptyState
        title="No transactions found"
        description="No transactions match your current filters. Try resetting them or add a new one."
        action={
          isAdmin
            ? <Button onClick={onAddNew} variant="primary">+ Add Transaction</Button>
            : null
        }
      />
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-800">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-gray-800/60 border-b border-slate-200 dark:border-gray-700">
            {COLS.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-gray-200 select-none whitespace-nowrap"
              >
                <span className="flex items-center gap-1">
                  {label}
                  <ArrowUpDown size={11} className={sortKey === key ? 'text-violet-500' : 'opacity-30'} />
                </span>
              </th>
            ))}
            {isAdmin && <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
          {sorted.map((t) => (
            <TransactionRow
              key={t.id}
              transaction={t}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={deleteTransaction}
            />
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-gray-800/40 border-t border-slate-200 dark:border-gray-800 text-xs text-slate-400 dark:text-gray-500">
        {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default TransactionTable
