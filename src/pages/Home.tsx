import HeroSection from '../components/HomeComponents/HeroSection'
import FeaturesSection from '../components/HomeComponents/FeaturesSection'
import GetStartedSection from '../components/HomeComponents/GetStartedSection'
import { Marquee } from '../motion'
import './Home.scss'

const capabilities = [
  'Markdown', 'Persistent history', 'OpenAI', 'Gemini', 'Claude',
  'File upload', 'Feedback', 'Suggested questions', 'Streaming', 'TypeScript',
  'Custom themes', 'Dynamic context',
]

const Home = () => {
  return (
    <div className="home">
      <HeroSection />

      <div className="cap-strip">
        <Marquee speed={32}>
          {capabilities.map((c) => (
            <span key={c} className="cap-item">
              {c}
              <span className="cap-mark" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>

      <FeaturesSection />
      <GetStartedSection />
    </div>
  )
}

export default Home
