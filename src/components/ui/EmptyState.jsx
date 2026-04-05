import { Inbox } from 'lucide-react'

const EmptyState = ({ title = 'No results found', description = 'Try adjusting your filters or add a new transaction.', action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Inbox size={32} className="text-slate-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-gray-400 max-w-xs mb-4">{description}</p>
      {action && action}
    </div>
  )
}

export default EmptyState
