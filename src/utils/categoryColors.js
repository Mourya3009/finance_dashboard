export const CATEGORY_CONFIG = {
  Food: {
    color: '#f97316',      // orange-500
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    chart: '#f97316',
  },
  Rent: {
    color: '#8b5cf6',      // violet-500
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-700 dark:text-violet-300',
    chart: '#8b5cf6',
  },
  Salary: {
    color: '#10b981',      // emerald-500
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    chart: '#10b981',
  },
  Shopping: {
    color: '#ec4899',      // pink-500
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300',
    chart: '#ec4899',
  },
  Transport: {
    color: '#3b82f6',      // blue-500
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    chart: '#3b82f6',
  },
  Entertainment: {
    color: '#f59e0b',      // amber-500
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    chart: '#f59e0b',
  },
}

export const getCategoryConfig = (category) =>
  CATEGORY_CONFIG[category] || {
    color: '#6b7280',
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    chart: '#6b7280',
  }
