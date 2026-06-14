import { Rocket, BookOpen, Github } from 'lucide-react'
import { Reveal, Magnetic } from '../../motion'
import './ExamplesFooter.scss'

const ExamplesFooter = () => {
  return (
    <Reveal as="section" className="examples-footer" direction="up" distance={26}>
      <div className="footer-content">
        <div className="footer-icon">
          <Rocket size={32} />
        </div>
        <h2 className="footer-heading">
          Ready to Build Your Own?
        </h2>
        <p className="footer-tagline">
          Supercharge your app with <span><b>Cha-ai</b>!</span> Explore all features, customization, and real-world use cases in our docs.
        </p>
        <div className="footer-actions">
          <Magnetic strength={0.4}>
            <a href="/docs" className="btn btn-primary">
              <BookOpen size={18} />
              <span>Read Documentation</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href="https://github.com/dimssu/Talkr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github size={18} />
              <span>View on GitHub</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </Reveal>
  )
}

export default ExamplesFooter
