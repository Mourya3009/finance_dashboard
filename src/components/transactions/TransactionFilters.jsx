import { Search, SlidersHorizontal, X } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'
import { CATEGORIES } from '../../data/mockTransactions'

const TransactionFilters = () => {
  const filters = useFinanceStore((s) => s.filters)
  const setFilter = useFinanceStore((s) => s.setFilter)
  const resetFilters = useFinanceStore((s) => s.resetFilters)

  const hasActive = filters.search || filters.category !== 'all' || filters.type !== 'all' || filters.dateFrom || filters.dateTo

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          id="filter-search"
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition"
        />
      </div>

      {/* Category */}
      <select
        id="filter-category"
        value={filters.category}
        onChange={(e) => setFilter('category', e.target.value)}
        className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Type */}
      <select
        id="filter-type"
        value={filters.type}
        onChange={(e) => setFilter('type', e.target.value)}
        className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Date from */}
      <input
        id="filter-date-from"
        type="date"
        value={filters.dateFrom}
        onChange={(e) => setFilter('dateFrom', e.target.value)}
        className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition"
      />

      {/* Date to */}
      <input
        id="filter-date-to"
        type="date"
        value={filters.dateTo}
        onChange={(e) => setFilter('dateTo', e.target.value)}
        className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition"
      />

      {/* Reset */}
      {hasActive && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl transition"
        >
          <X size={13} /> Reset
        </button>
      )}
    </div>
  )
}

export default TransactionFilters
