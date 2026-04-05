import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import Card from '../ui/Card'
import useFinanceStore from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatCurrency'

const MONTHS = [
  { key: '2026-01', label: 'Jan 2026' },
  { key: '2026-02', label: 'Feb 2026' },
  { key: '2026-03', label: 'Mar 2026' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-700 dark:text-white mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

const MonthlyTrendChart = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  const data = useMemo(() =>
    MONTHS.map(({ key, label }) => {
      const m = transactions.filter((t) => t.date.startsWith(key))
      return {
        month: label,
        Income:   m.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        Expenses: m.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
      }
    }), [transactions]
  )

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
        3-Month Spending Trend
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => `₹${v >= 1000 ? `${v / 1000}K` : v}`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          <Line
            type="monotone" dataKey="Income"
            stroke="#10b981" strokeWidth={2.5}
            dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }}
          />
          <Line
            type="monotone" dataKey="Expenses"
            stroke="#ef4444" strokeWidth={2.5}
            dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default MonthlyTrendChart
