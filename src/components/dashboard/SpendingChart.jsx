import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import Card from '../ui/Card'
import useFinanceStore from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatCurrency'

const MONTHS = [
  { key: '2026-01', label: 'Jan' },
  { key: '2026-02', label: 'Feb' },
  { key: '2026-03', label: 'Mar' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-700 dark:text-white mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

const SpendingChart = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  const data = useMemo(() => {
    return MONTHS.map(({ key, label }) => {
      const monthTxns = transactions.filter((t) => t.date.startsWith(key))
      const income  = monthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
      const expense = monthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      return { month: label, Income: income, Expenses: expense }
    })
  }, [transactions])

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
        Monthly Overview
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={28} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => `₹${v >= 1000 ? `${v / 1000}K` : v}`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', radius: 4 }} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          <Bar dataKey="Income"   fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default SpendingChart
