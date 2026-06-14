import { Reveal } from '../../motion'

const PlaygroundHeader = () => {
  return (
    <Reveal direction="up" className="playground-header">
      <span className="eyebrow">Live sandbox</span>
      <h1>
        Interactive <span className="mark">Playground</span>
      </h1>
      <p>Experiment with different ChatBot configurations and see the changes in real-time. Adjust the settings below and watch the preview update instantly.</p>
    </Reveal>
  )
}

export default PlaygroundHeader
