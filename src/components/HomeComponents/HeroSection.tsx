import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'

const HeroSection = () => {
  const stats = [
    { label: 'Weekly Downloads', value: '50+' },
    { label: 'Bundle Size', value: '<59KB' },
    { label: 'React Support', value: '16.8+' }
  ]

  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-content fade-in">
          <div className="hero-badge">
            <MessageCircle size={16} />
            <span>v1.0.5 • Now Available</span>
          </div>
          
          <h1 className="hero-title">
            The React Chatbot Component
            <br />
            <span className="gradient-text">You've Been Waiting For</span>
          </h1>
          
          <p className="hero-description">
            Cha-ai is a powerful, lightweight chatbot component that drops into any React application. 
            With built-in markdown support, persistent chat history, and extensive customization options.
          </p>
          
          <div className="hero-actions">
            <Link to="/docs" className="btn btn-primary">
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link to="/examples" className="btn btn-secondary">
              View Examples
            </Link>
          </div>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-visual fade-in">
          <div className="chat-preview">
            <div className="chat-header">
              <div className="chat-controls">
                <div className="control red"></div>
                <div className="control yellow"></div>
                <div className="control green"></div>
              </div>
              <span>Chat Assistant</span>
            </div>
            <div className="chat-body">
              <div className="message bot-message">
                <div className="message-content">
                  Hello! I'm powered by **Cha-ai**. How can I help you today?
                </div>
                <div className="message-time">{new Date(Date.now() - 60000).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</div>
              </div>
              <div className="message user-message">
                <div className="message-content">
                  Can you tell me about your features?
                </div>
                <div className="message-time">{new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</div>
              </div>
              <div className="message bot-message">
                <div className="message-content">
                  I support **markdown**, file uploads, and maintain conversation context!
                </div>
                <div className="message-time">{new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 