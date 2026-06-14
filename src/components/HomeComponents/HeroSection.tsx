import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'
import { Magnetic } from '../../motion'
import HeroChat from './HeroChat'

const stats = [
  { value: '350+', label: 'weekly installs' },
  { value: '<70KB', label: 'bundle size' },
  { value: '16.8+', label: 'React support' },
]

const HeroSection = () => {
  const reduce = useReducedMotion()

  const lineUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.05 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section className="hero">
      <div className="hero-accent hero-accent--lime" aria-hidden />
      <div className="hero-accent hero-accent--tang" aria-hidden />

      <div className="container hero-grid">
        <div className="hero-content">
          <motion.span className="eyebrow" custom={0} variants={lineUp} initial="hidden" animate="show">
            Built for React + TypeScript
          </motion.span>

          <h1 className="hero-title display">
            <motion.span custom={1} variants={lineUp} initial="hidden" animate="show">
              Drop-in AI
            </motion.span>
            <motion.span custom={2} variants={lineUp} initial="hidden" animate="show">
              <span className="mark">chat</span> for React.
            </motion.span>
          </h1>

          <motion.p className="hero-description" custom={3} variants={lineUp} initial="hidden" animate="show">
            Markdown, persistent history and direct LLM integration. One install,
            one component, entirely yours to theme.
          </motion.p>

          <motion.div className="hero-actions" custom={4} variants={lineUp} initial="hidden" animate="show">
            <Magnetic strength={0.4}>
              <Link to="/docs" className="btn btn-primary btn-lg">
                Get started
                <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <Link to="/playground" className="btn btn-secondary btn-lg">
              Live playground
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={reduce ? false : { opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroChat />
          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
