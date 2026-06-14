import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  /** seconds */
  delay?: number
  /** travel distance in px */
  distance?: number
  direction?: Direction
  /**
   * How much of the element must be visible before triggering. Defaults to
   * 'some' (any part), which is robust even for elements taller than the
   * viewport. A numeric area ratio (e.g. 0.3) can stall on very tall elements,
   * so only pass one when the element is known to be shorter than the viewport.
   */
  amount?: number | 'some' | 'all'
  once?: boolean
  className?: string
  as?: 'div' | 'li' | 'span' | 'section'
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up': return { y: d }
    case 'down': return { y: -d }
    case 'left': return { x: d }
    case 'right': return { x: -d }
    default: return {}
  }
}

/**
 * Scroll-reveal wrapper. Fades + slides content into view as it enters the
 * viewport. Collapses to an instant, static render under reduced-motion.
 */
const Reveal = ({
  children,
  delay = 0,
  distance = 26,
  direction = 'up',
  amount = 'some',
  once = true,
  className,
  as = 'div',
}: RevealProps) => {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
