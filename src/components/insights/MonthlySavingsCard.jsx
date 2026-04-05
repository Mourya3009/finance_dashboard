import { useMemo } from 'react'
import { Trophy } from 'lucide-react'
import Card from '../ui/Card'
import useFinanceStore from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatCurrency'

const MONTHS = [
  { key: '2026-01', label: 'January' },
  { key: '2026-02', label: 'February' },
  { key: '2026-03', label: 'March' },
]

const MonthlySavingsCard = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  const data = useMemo(() => {
    return MONTHS.map(({ key, label }) => {
      const monthTxns = transactions.filter((t) => t.date.startsWith(key))
      const income = monthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
      const expenses = monthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      const savings = income - expenses
      const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0
      return { month: label, income, expenses, savings, savingsRate: Number(savingsRate) }
    })
  }, [transactions])

  const bestMonth = useMemo(() => {
    if (!data.length) return null
    return [...data].sort((a, b) => b.savingsRate - a.savingsRate)[0]
  }, [data])

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Monthly Savings Comparison
        </h3>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
          Income vs expenses across the last 3 months
        </p>
      </div>

      <div className="space-y-3">
        {data.map((m) => {
          const isBest = bestMonth && m.month === bestMonth.month
          return (
            <div
              key={m.month}
              className={`p-3 rounded-xl border transition-colors ${
                isBest
                  ? 'bg-violet-50/50 dark:bg-violet-900/10 border-violet-200 dark:border-violet-800/50'
                  : 'bg-slate-50 dark:bg-gray-800/40 border-slate-100 dark:border-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${isBest ? 'text-violet-700 dark:text-violet-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {m.month}
                  </span>
                  {isBest && (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-violet-600 bg-violet-100 dark:bg-violet-900/40 dark:text-violet-400 px-1.5 py-0.5 rounded-md">
                      <Trophy size={10} /> Best
                    </span>
                  )}
                </div>
                <span className={`text-sm font-bold tabular-nums ${m.savings >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                  {m.savings > 0 ? '+' : ''}{m.savingsRate}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-slate-400 dark:text-gray-500">Income</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">{formatCurrency(m.income, true)}</p>
                </div>
                <div>
                  <p className="text-slate-400 dark:text-gray-500">Expenses</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">{formatCurrency(m.expenses, true)}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 dark:text-gray-500">Saved</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">{formatCurrency(m.savings, true)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default MonthlySavingsCard
