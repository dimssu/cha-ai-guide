import { Rocket, BookOpen, Github } from 'lucide-react'
import './ExamplesFooter.scss'

const ExamplesFooter = () => {
  return (
    <section className="examples-footer">
      <div className="footer-content">
        <div className="footer-icon">
          <Rocket size={40} />
        </div>
        <h2 className="footer-heading">
          Ready to Build Your Own?
        </h2>
        <p className="footer-tagline">
          Supercharge your app with <span><b>Cha-ai</b>!</span> Explore all features, customization, and real-world use cases in our docs.
        </p>
        <div className="footer-actions">
          <a href="/docs" className="btn btn-primary">
            <BookOpen size={18} />
            <span>Read Documentation</span>
          </a>
          <a 
            href="https://github.com/dimssu/Talkr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Github size={18} />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ExamplesFooter