import { useEffect, useRef } from 'react'

const AnimatedCounter = ({ target, duration = 1200, prefix = '', suffix = '', className = '' }) => {
  const ref = useRef(null)
  const startTime = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * target)
      el.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        el.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, prefix, suffix])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}0{suffix}
    </span>
  )
}

export default AnimatedCounter
