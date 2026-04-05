import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import Card from '../ui/Card'
import useFinanceStore from '../../store/useFinanceStore'
import { getCategoryConfig } from '../../utils/categoryColors'
import { formatCurrency } from '../../utils/formatCurrency'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { category, value } = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-700 dark:text-white">{category}</p>
      <p className="text-slate-500 dark:text-gray-400">{formatCurrency(value)}</p>
    </div>
  )
}

const CategoryBreakdown = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense')
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([category, value]) => ({
        category,
        value,
        color: getCategoryConfig(category).color,
      }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
        Category Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} horizontal={true} vertical={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default CategoryBreakdown
