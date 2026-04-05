import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Card from '../ui/Card'
import useFinanceStore from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { getCategoryConfig } from '../../utils/categoryColors'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-700 dark:text-white">{name}</p>
      <p className="text-slate-500 dark:text-gray-400">{formatCurrency(value)}</p>
    </div>
  )
}

const CategoryPieChart = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense')
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      color: getCategoryConfig(name).color,
    }))
  }, [transactions])

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
        Expense Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default CategoryPieChart
