import { Link } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
        <AlertTriangle size={40} />
      </div>
      <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">404</h1>
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-500 dark:text-gray-400 max-w-sm mb-8">
        Oops! The page you're looking for doesn't exist, has been moved, or you don't have access to it.
      </p>
      <Link to="/">
        <Button icon={Home} size="lg">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
