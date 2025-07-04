import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, BookOpen, Code, Home, Gamepad2 } from 'lucide-react'
import ScrollToTop from './ScrollToTop'
import FeedbackDropdown from './FeedbackDropdown'
import type { FeedbackDropdownHandle } from './FeedbackDropdown'
import './Layout.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const feedbackRef = useRef<FeedbackDropdownHandle>(null)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Documentation', href: '/docs', icon: BookOpen },
    { name: 'Examples', href: '/examples', icon: Code },
    { name: 'Playground', href: '/playground', icon: Gamepad2 },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                  <path
                    d="M8 16L14 10L20 16L14 22L8 16Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M14 10L20 16L24 12L18 6L14 10Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                      <stop stopColor="#4F46E5" />
                      <stop offset="1" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="logo-text">Cha-ai</span>
            </Link>

            <nav className="nav desktop-nav">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="header-actions">
              <FeedbackDropdown ref={feedbackRef} />
              
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      <main className="main">
        {children}
      </main>

      <ScrollToTop />

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Cha-ai</h3>
              <p>A simple, powerful chatbot component for React applications.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/examples">Examples</Link></li>
                <li><Link to="/playground">Playground</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#issues" onClick={e => { e.preventDefault(); feedbackRef.current?.openWithCategory('bug'); }}>Report Issues</a></li>
                <li><a href="https://github.com/dimssu/Talkr" target="_blank">Contribute</a></li>
                <li><a href="https://github.com/dimssu" target="_blank">GitHub</a></li>
                <li><a href="https://www.npmjs.com/package/cha-ai" target="_blank">NPM</a></li>
                <li><a href="https://www.dimssu.com/questions" target="_blank">About Me</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Cha-ai</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 