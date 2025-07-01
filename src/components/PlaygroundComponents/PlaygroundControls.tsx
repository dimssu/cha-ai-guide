import { RefreshCw, Settings } from 'lucide-react'
import BasicControls from './BasicControls'
import FeatureControls from './FeatureControls'
import StylingControls from './StylingControls'
import SuggestedQuestionsControls from './SuggestedQuestionsControls'
import type { PlaygroundConfig } from './types'

interface PlaygroundControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
  resetToDefaults: () => void
}

const PlaygroundControls = ({ config, updateConfig, resetToDefaults }: PlaygroundControlsProps) => {
  return (
    <div className="playground-controls">
      <div className="controls-header">
        <h2>
          <Settings size={20} />
          Configuration
        </h2>
        <button 
          className="btn btn-ghost btn-sm"
          onClick={resetToDefaults}
        >
          <RefreshCw size={16} />
          Reset
        </button>
      </div>

      <BasicControls config={config} updateConfig={updateConfig} />
      <FeatureControls config={config} updateConfig={updateConfig} />
      <StylingControls config={config} updateConfig={updateConfig} />
      <SuggestedQuestionsControls config={config} updateConfig={updateConfig} />
    </div>
  )
}

export default PlaygroundControls 