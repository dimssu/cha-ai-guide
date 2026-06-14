import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
import ScrollToTop from './ScrollToTop'
import FeedbackDropdown from './FeedbackDropdown'
import type { FeedbackDropdownHandle } from './FeedbackDropdown'
import { Magnetic } from '../motion'
import './Layout.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const feedbackRef = useRef<FeedbackDropdownHandle>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Docs', href: '/docs' },
    { name: 'Examples', href: '/examples' },
    { name: 'Playground', href: '/playground' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="layout">
      <header className="header">
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo" aria-label="Cha-ai home">
              <span className="logo-mark" aria-hidden>
                <MessageCircle className="logo-glyph" size={17} strokeWidth={2.5} />
              </span>
              <span className="logo-text">
                cha-ai<span className="logo-caret" aria-hidden />
              </span>
            </Link>

            <nav className="nav desktop-nav" aria-label="Primary">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link ${active ? 'active' : ''}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="navPill"
                        className="nav-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="nav-label">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="header-actions">
              <Magnetic className="header-magnetic">
                <a
                  href="https://github.com/dimssu/Talkr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-github"
                  aria-label="View Cha-ai on GitHub"
                >
                  <Github size={18} />
                </a>
              </Magnetic>

              <FeedbackDropdown ref={feedbackRef} />

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-nav-content">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mobile-nav-index">0{i + 1}</span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="main">{children}</main>

      <ScrollToTop />

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-wordmark">cha-ai</span>
              <p>A lightweight, fully themeable chatbot component for React. Drop it in, ship it.</p>
              <a
                href="https://www.npmjs.com/package/cha-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-install"
              >
                <span className="footer-install-prompt">$</span> npm install cha-ai
              </a>
            </div>

            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/examples">Examples</Link></li>
                <li><Link to="/playground">Playground</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://www.npmjs.com/package/cha-ai" target="_blank" rel="noopener noreferrer">NPM</a></li>
                <li><a href="https://github.com/dimssu/Talkr" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li>
                  <a href="#issues" onClick={(e) => { e.preventDefault(); feedbackRef.current?.openWithCategory('bug') }}>
                    Report an issue
                  </a>
                </li>
                <li><a href="https://www.dimssu.com/questions" target="_blank" rel="noopener noreferrer">About</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; 2025 Cha-ai</span>
            <span className="footer-built">Built for React developers</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
