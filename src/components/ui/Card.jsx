const Card = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800
        shadow-sm ${hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card
