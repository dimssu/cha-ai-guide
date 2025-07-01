import HeroSection from '../components/HomeComponents/HeroSection'
import FeaturesSection from '../components/HomeComponents/FeaturesSection'
import GetStartedSection from '../components/HomeComponents/GetStartedSection'
import './Home.scss'

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <FeaturesSection />
      <GetStartedSection />
    </div>
  )
}

export default Home 