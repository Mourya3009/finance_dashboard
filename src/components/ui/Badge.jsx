import { getCategoryConfig } from '../../utils/categoryColors'

const Badge = ({ label, className = '' }) => {
  const config = getCategoryConfig(label)
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${config.bg} ${config.text} ${className}
      `}
    >
      {label}
    </span>
  )
}

export default Badge
