import { Reveal } from '../../motion'

const ExamplesHeader = () => {
  return (
    <Reveal className="examples-header" direction="up" distance={26}>
      <span className="eyebrow">Live examples</span>
      <h1>See Cha-ai in action</h1>
      <p>These examples are just a few of the possibilities with Cha-ai. Check out the full documentation to learn more about all available features and customization options.</p>
    </Reveal>
  )
}

export default ExamplesHeader
