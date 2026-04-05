import { Pencil, Trash2 } from 'lucide-react'
import Badge from '../ui/Badge'
import { formatCurrency } from '../../utils/formatCurrency'

const TransactionRow = ({ transaction: t, isAdmin, onEdit, onDelete }) => {
  return (
    <tr className="group border-b border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3 text-sm text-slate-500 dark:text-gray-400 whitespace-nowrap">
        {t.date}
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.title}</p>
          {t.note && (
            <p className="text-xs text-slate-400 dark:text-gray-500 truncate max-w-[200px]">{t.note}</p>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge label={t.category} />
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          t.type === 'income'
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        }`}>
          {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
        </span>
      </td>
      <td className={`px-4 py-3 text-sm font-semibold tabular-nums text-right ${
        t.type === 'income'
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-red-500 dark:text-red-400'
      }`}>
        {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
      </td>

      {isAdmin && (
        <td className="px-4 py-3">
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(t)}
              className="p-1.5 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              aria-label="Edit transaction"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(t.id)}
              className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              aria-label="Delete transaction"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}

export default TransactionRow
