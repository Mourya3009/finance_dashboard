const VARIANTS = {
  primary: 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm',
  danger:  'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  ghost:   'bg-transparent hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-gray-700',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 rounded-xl font-medium
        transition-all duration-150 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}
      `}
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  )
}

export default Button
