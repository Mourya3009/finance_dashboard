import { Moon, Sun, Shield, Eye } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'

const Navbar = () => {
  const darkMode = useFinanceStore((s) => s.darkMode)
  const toggleDarkMode = useFinanceStore((s) => s.toggleDarkMode)
  const role = useFinanceStore((s) => s.role)
  const setRole = useFinanceStore((s) => s.setRole)

  const isAdmin = role === 'admin'

  return (
    <header className="fixed top-0 left-0 right-0 md:left-60 z-20 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 flex items-center px-4 md:px-6 gap-4">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">F</span>
        </div>
        <span className="font-bold text-slate-900 dark:text-white">FinFlow</span>
      </div>

      <div className="flex-1" />

      {/* Role Switcher */}
      <div
        id="role-switcher"
        className="flex items-center bg-slate-100 dark:bg-gray-800 rounded-xl p-1 gap-1"
      >
        <button
          onClick={() => setRole('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
            ${isAdmin
              ? 'bg-white dark:bg-gray-700 text-violet-700 dark:text-violet-400 shadow-sm'
              : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200'
            }`}
        >
          <Shield size={13} />
          Admin
        </button>
        <button
          onClick={() => setRole('viewer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
            ${!isAdmin
              ? 'bg-white dark:bg-gray-700 text-violet-700 dark:text-violet-400 shadow-sm'
              : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200'
            }`}
        >
          <Eye size={13} />
          Viewer
        </button>
      </div>

      {/* Dark mode toggle */}
      <button
        id="dark-mode-toggle"
        onClick={toggleDarkMode}
        className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-gray-700 transition-all duration-150"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  )
}

export default Navbar
