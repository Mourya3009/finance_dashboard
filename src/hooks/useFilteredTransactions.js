import { useMemo } from 'react'
import useFinanceStore from '../store/useFinanceStore'

const useFilteredTransactions = () => {
  const transactions = useFinanceStore((s) => s.transactions)
  const filters = useFinanceStore((s) => s.filters)

  return useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        !filters.search ||
        t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        (t.note && t.note.toLowerCase().includes(filters.search.toLowerCase()))

      const matchCategory =
        filters.category === 'all' || t.category === filters.category

      const matchType = filters.type === 'all' || t.type === filters.type

      const matchFrom = !filters.dateFrom || t.date >= filters.dateFrom
      const matchTo = !filters.dateTo || t.date <= filters.dateTo

      return matchSearch && matchCategory && matchType && matchFrom && matchTo
    })
  }, [transactions, filters])
}

export default useFilteredTransactions
