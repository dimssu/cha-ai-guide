import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  /** seconds for one full loop */
  speed?: number
  reverse?: boolean
  gap?: string
  className?: string
}

/**
 * Seamless kinetic marquee. The content is rendered twice inside one track that
 * translates -50%, so the loop is continuous with no jump. Pauses on hover;
 * degrades to a static, horizontally-scrollable strip under reduced-motion
 * (handled in App.scss).
 */
const Marquee = ({ children, speed = 28, reverse = false, gap = '2.5rem', className }: MarqueeProps) => {
  return (
    <div
      className={`marquee ${reverse ? 'marquee--reverse' : ''} ${className ?? ''}`}
      style={{ ['--speed' as string]: `${speed}s`, ['--gap' as string]: gap }}
    >
      <div className="marquee__track">
        {children}
        {children}
      </div>
    </div>
  )
}

export default Marquee
