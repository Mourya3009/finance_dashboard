import MonthlyTrendChart from '../components/insights/MonthlyTrendChart'
import CategoryBreakdown from '../components/insights/CategoryBreakdown'
import TopSpendingCard from '../components/insights/TopSpendingCard'
import MonthlySavingsCard from '../components/insights/MonthlySavingsCard'

const Insights = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Insights</h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
          Deep dive into your spending habits and financial trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyTrendChart />
        </div>
        <div>
          <TopSpendingCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryBreakdown />
        <MonthlySavingsCard />
      </div>
    </div>
  )
}

export default Insights
