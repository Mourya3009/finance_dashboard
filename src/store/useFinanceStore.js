import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockTransactions'

let nextId = mockTransactions.length + 1

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // ── Data ────────────────────────────────────────────────────
      transactions: mockTransactions,

      // ── Role ────────────────────────────────────────────────────
      role: 'admin', // 'admin' | 'viewer'
      setRole: (role) => set({ role }),

      // ── Dark Mode ───────────────────────────────────────────────
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // ── Filters ─────────────────────────────────────────────────
      filters: {
        search: '',
        category: 'all',
        type: 'all',
        dateFrom: '',
        dateTo: '',
      },
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      resetFilters: () =>
        set({
          filters: {
            search: '',
            category: 'all',
            type: 'all',
            dateFrom: '',
            dateTo: '',
          },
        }),

      // ── CRUD (Admin only) ───────────────────────────────────────
      addTransaction: (txn) =>
        set((state) => ({
          transactions: [
            { ...txn, id: `txn_${String(nextId++).padStart(3, '0')}` },
            ...state.transactions,
          ],
        })),

      editTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'finance-store', // localStorage key
      partialize: (state) => ({
        transactions: state.transactions,
        darkMode: state.darkMode,
        role: state.role,
      }),
    }
  )
)

export default useFinanceStore
