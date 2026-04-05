import { useMemo } from 'react'
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import Card from '../ui/Card'
import AnimatedCounter from '../ui/AnimatedCounter'
import useFinanceStore from '../../store/useFinanceStore'

const SummaryCards = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  const { totalIncome, totalExpense, netBalance, savingsRate } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    const netBalance = totalIncome - totalExpense
    const savingsRate = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0
    return { totalIncome, totalExpense, netBalance, savingsRate }
  }, [transactions])

  const cards = [
    {
      id: 'total-income',
      label: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      prefix: '₹',
    },
    {
      id: 'total-expenses',
      label: 'Total Expenses',
      value: totalExpense,
      icon: TrendingDown,
      color: 'text-red-500 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      prefix: '₹',
    },
    {
      id: 'net-balance',
      label: 'Net Balance',
      value: netBalance,
      icon: Wallet,
      color: netBalance >= 0 ? 'text-violet-600 dark:text-violet-400' : 'text-red-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      prefix: '₹',
    },
    {
      id: 'savings-rate',
      label: 'Savings Rate',
      value: savingsRate,
      icon: PiggyBank,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      suffix: '%',
      prefix: '',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ id, label, value, icon: Icon, color, bg, prefix = '', suffix = '' }) => (
        <Card key={id} className="p-5 animate-slide-up">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={18} className={color} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${color}`}>
            <AnimatedCounter
              target={Math.abs(value)}
              prefix={value < 0 && id === 'net-balance' ? '-₹' : prefix}
              suffix={suffix}
              duration={1000}
            />
          </p>
          <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">All time</p>
        </Card>
      ))}
    </div>
  )
}

export default SummaryCards
