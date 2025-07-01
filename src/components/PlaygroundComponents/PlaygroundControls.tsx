import { RefreshCw, Settings } from 'lucide-react'
import BasicControls from './BasicControls'
import LLMProviderControls from './LLMProviderControls'
import FeatureControls from './FeatureControls'
import UICustomizationControls from './UICustomizationControls'
import SuggestedQuestionsControls from './SuggestedQuestionsControls'
import AdvancedControls from './AdvancedControls'
import StylingControls from './StylingControls'
import AdvancedStylingControls from './AdvancedStylingControls'
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

      {/* Most Important - Basic Configuration */}
      <BasicControls config={config} updateConfig={updateConfig} />
      
      {/* Critical - LLM Provider Setup */}
      <LLMProviderControls config={config} updateConfig={updateConfig} />
      
      {/* Common Features */}
      <FeatureControls config={config} updateConfig={updateConfig} />
      
      {/* UI Customization */}
      <UICustomizationControls config={config} updateConfig={updateConfig} />
      
      {/* Suggested Questions */}
      <SuggestedQuestionsControls config={config} updateConfig={updateConfig} />
      
      {/* Basic Styling */}
      <StylingControls config={config} updateConfig={updateConfig} />
      
      {/* Advanced Configuration */}
      <AdvancedControls config={config} updateConfig={updateConfig} />
      
      {/* Least Used - Advanced CSS Styling */}
      <AdvancedStylingControls config={config} updateConfig={updateConfig} />
    </div>
  )
}

export default PlaygroundControls 