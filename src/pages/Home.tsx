import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Zap, Shield, Palette, Upload, Star } from 'lucide-react'
import './Home.scss'

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Plug & Play',
      description: 'Drop into any React app with a single component. No complex setup required.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with lazy loading and efficient re-renders.'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Built-in markdown sanitization and XSS protection for safe user interactions.'
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Fully themeable with CSS variables and custom styling options.'
    },
    {
      icon: Upload,
      title: 'File Upload',
      description: 'Optional file upload support for rich conversational experiences. (Beta)'
    },
    {
      icon: Star,
      title: 'Context Aware',
      description: 'Uses conversation history as context for more relevant responses.'
    }
  ]

  const stats = [
    { label: 'Weekly Downloads', value: '50+' },
    { label: 'Bundle Size', value: '<50KB' },
    { label: 'React Support', value: '16.8+' }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="features section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need</h2>
            <p>Built for developers who want powerful chatbot functionality without the complexity.</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="feature-card card fade-in">
                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quick-start section">
        <div className="container">
          <div className="quick-start-content">
            <div className="quick-start-text">
              <h2>Get Started in Minutes</h2>
              <p>Add a powerful chatbot to your React app with just three simple steps.</p>
              
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Install</h4>
                    <p>Add cha-ai to your project</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Import</h4>
                    <p>Import the ChatBot component</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Use</h4>
                    <p>Drop it into your JSX</p>
                  </div>
                </div>
              </div>
              
              <Link to="/docs" className="btn btn-primary">
                View Full Documentation
                <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="quick-start-code">
              <div className="code-block">
                <div className="code-header">
                  <span>Terminal</span>
                </div>
                <pre><code>{`npm install cha-ai`}</code></pre>
              </div>
              
              <div className="code-block">
                <div className="code-header">
                  <span>App.tsx</span>
                </div>
                <pre><code>{`import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ChatBot 
        llmProvider='your_llm_provider'
        apiKey={your_api_key}
        headerTitle="Chat Assistant"
        theme="light"
        context='Your context here'
      />
    </div>
  )
}`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section section-alt">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of developers building amazing chat experiences with Cha-ai.</p>
            <div className="cta-actions">
              <Link to="/docs" className="btn btn-primary">
                Read Documentation
                <ArrowRight size={18} />
              </Link>
              <a 
                href="https://github.com/your-username/cha-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 