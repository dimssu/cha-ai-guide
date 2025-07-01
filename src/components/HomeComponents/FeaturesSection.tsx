import { MessageCircle, Zap, Shield, Palette, Upload, Star } from 'lucide-react'

const FeaturesSection = () => {
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

  return (
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
  )
}

export default FeaturesSection 