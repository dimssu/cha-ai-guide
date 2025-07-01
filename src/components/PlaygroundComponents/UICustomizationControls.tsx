import type { PlaygroundConfig } from './types'

interface UICustomizationControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const UICustomizationControls = ({ config, updateConfig }: UICustomizationControlsProps) => {
  return (
    <div className="control-group">
      <h3>🎨 UI Customization</h3>
      
      <div className="control-item">
        <label>Welcome Message</label>
        <input
          type="text"
          className="control-input"
          value={config.welcomeMessage}
          onChange={(e) => updateConfig('welcomeMessage', e.target.value)}
          placeholder="👋 Hello! How can I help you today?"
        />
      </div>

      <div className="control-item">
        <label>Input Placeholder Text</label>
        <input
          type="text"
          className="control-input"
          value={config.placeholderText}
          onChange={(e) => updateConfig('placeholderText', e.target.value)}
          placeholder="Type your message here..."
        />
      </div>

      <div className="control-item">
        <label>Bot Avatar URL</label>
        <input
          type="url"
          className="control-input"
          value={config.botAvatarUrl}
          onChange={(e) => updateConfig('botAvatarUrl', e.target.value)}
          placeholder="https://example.com/bot-avatar.png"
        />
      </div>

      <div className="control-item">
        <label>Max Height</label>
        <input
          type="text"
          className="control-input"
          value={config.maxHeight}
          onChange={(e) => updateConfig('maxHeight', e.target.value)}
          placeholder="500px"
        />
        <small>CSS value (e.g., 500px, 80vh)</small>
      </div>
    </div>
  )
}

export default UICustomizationControls 