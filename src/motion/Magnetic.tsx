import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

interface MagneticProps {
  children: ReactNode
  /** how strongly the element follows the cursor (0-1) */
  strength?: number
  className?: string
}

/**
 * Magnetic hover. The wrapped element drifts toward the cursor while hovered,
 * driven entirely by motion values (never React state) so it stays smooth and
 * never re-renders the tree. No-op under reduced-motion.
 */
const Magnetic = ({ children, strength = 0.35, className }: MagneticProps) => {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 170, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 170, damping: 15, mass: 0.4 })

  if (reduce) return <span className={className}>{children}</span>

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
    >
      {children}
    </motion.span>
  )
}

export default Magnetic
