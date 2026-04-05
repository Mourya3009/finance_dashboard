import SummaryCards from '../components/dashboard/SummaryCards'
import SpendingChart from '../components/dashboard/SpendingChart'
import CategoryPieChart from '../components/dashboard/CategoryPieChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        <div>
          <CategoryPieChart />
        </div>
      </div>

      <RecentTransactions />
    </div>
  )
}

export default Dashboard
