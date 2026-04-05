import { useMemo } from 'react'
import { Flame } from 'lucide-react'
import Card from '../ui/Card'
import AnimatedCounter from '../ui/AnimatedCounter'
import useFinanceStore from '../../store/useFinanceStore'
import { getCategoryConfig } from '../../utils/categoryColors'

const TopSpendingCard = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  const topCategory = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense')
    if (!expenses.length) return null

    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

    let maxCat = ''
    let maxVal = 0
    Object.entries(grouped).forEach(([cat, val]) => {
      if (val > maxVal) {
        maxVal = val
        maxCat = cat
      }
    })

    return { category: maxCat, amount: maxVal }
  }, [transactions])

  if (!topCategory) return null

  const config = getCategoryConfig(topCategory.category)

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Flame size={16} className="text-orange-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Top Spending Category
          </h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">
          You have spent the most on <span className={`font-semibold ${config.text}`}>{topCategory.category}</span>
        </p>
      </div>

      <div className="mt-4">
        <p className={`text-3xl font-bold ${config.text}`}>
          <AnimatedCounter target={topCategory.amount} prefix="₹" duration={1000} />
        </p>
      </div>
    </Card>
  )
}

export default TopSpendingCard
