import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { PlaygroundConfig } from './types'

interface AdvancedStylingControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const AdvancedStylingControls = ({ config, updateConfig }: AdvancedStylingControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const validateJSON = (value: string) => {
    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  }

  const handleStyleChange = (key: keyof PlaygroundConfig, value: string) => {
    // Only update if valid JSON or empty
    if (value === '' || validateJSON(value)) {
      updateConfig(key, value)
    }
  }

  const styleInputs = [
    { key: 'containerStyle', label: 'Container Style', description: 'Main container CSS properties' },
    { key: 'headerStyle', label: 'Header Style', description: 'Chat header CSS properties' },
    { key: 'bodyStyle', label: 'Body Style', description: 'Chat body/messages area CSS' },
    { key: 'windowStyle', label: 'Window Style', description: 'Chat window CSS properties' },
    { key: 'buttonStyle', label: 'Button Style', description: 'General button CSS properties' },
    { key: 'chatButtonIconStyle', label: 'Chat Button Icon Style', description: 'Chat button icon CSS' },
    { key: 'customChatButtonStyle', label: 'Custom Chat Button Style', description: 'Custom floating button CSS' },
  ] as const

  return (
    <div className="control-group">
      <button
        type="button"
        className="advanced-styling-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          🎨 Advanced CSS Styling
        </h3>
      </button>
      
      {isExpanded && (
        <div className="advanced-styling-content">
          <p className="styling-warning">
            ⚠️ Advanced feature: Enter CSS properties as JSON objects. Invalid JSON will be ignored.
          </p>
          
          <div className="styling-example">
            <strong>Example:</strong>
            <code>{"{ \"maxWidth\": \"400px\", \"zIndex\": 1000 }"}</code>
          </div>

          {styleInputs.map(({ key, label, description }) => (
            <div key={key} className="control-item">
              <label>{label}</label>
              <textarea
                className={`control-textarea advanced-style-input ${
                  config[key] && !validateJSON(config[key]) ? 'invalid-json' : ''
                }`}
                value={config[key]}
                onChange={(e) => handleStyleChange(key, e.target.value)}
                placeholder="{}"
                rows={3}
              />
              <small>{description}</small>
              {config[key] && !validateJSON(config[key]) && (
                <small className="error-text">Invalid JSON format</small>
              )}
            </div>
          ))}

          <div className="styling-note">
            <strong>💡 Tip:</strong> These styles override the basic styling options above. 
            Use camelCase for CSS properties (e.g., "backgroundColor" not "background-color").
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedStylingControls 