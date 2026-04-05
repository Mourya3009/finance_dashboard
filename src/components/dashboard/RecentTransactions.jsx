import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import useFinanceStore from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatCurrency'

const RecentTransactions = () => {
  const transactions = useFinanceStore((s) => s.transactions)
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recent Transactions</h3>
        <Link
          to="/transactions"
          className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:underline"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="space-y-1">
        {recent.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800/60 transition-colors"
          >
            {/* Icon dot */}
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${t.type === 'income' ? 'bg-emerald-500' : 'bg-red-500'}`} />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{t.title}</p>
              <p className="text-xs text-slate-400 dark:text-gray-500">{t.date}</p>
            </div>

            <Badge label={t.category} />

            <span
              className={`text-sm font-semibold tabular-nums flex-shrink-0 ${
                t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
              }`}
            >
              {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RecentTransactions
