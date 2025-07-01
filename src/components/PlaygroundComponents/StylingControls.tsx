import type { PlaygroundConfig } from './types'

interface StylingControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const StylingControls = ({ config, updateConfig }: StylingControlsProps) => {
  return (
    <div className="control-group">
      <h3>🎨 Basic Styling</h3>
      
      <div className="color-controls">
        <div className="control-item">
          <label htmlFor="widgetColor">Widget Color</label>
          <div className="color-input-group">
            <input
              id="widgetColor"
              type="color"
              value={config.widgetColor}
              onChange={(e) => updateConfig('widgetColor', e.target.value)}
              className="control-color"
            />
            <input
              type="text"
              value={config.widgetColor}
              onChange={(e) => updateConfig('widgetColor', e.target.value)}
              className="control-input color-text"
            />
          </div>
        </div>

        <div className="control-item">
          <label htmlFor="textColor">Text Color</label>
          <div className="color-input-group">
            <input
              id="textColor"
              type="color"
              value={config.textColor}
              onChange={(e) => updateConfig('textColor', e.target.value)}
              className="control-color"
            />
            <input
              type="text"
              value={config.textColor}
              onChange={(e) => updateConfig('textColor', e.target.value)}
              className="control-input color-text"
            />
          </div>
        </div>

        <div className="control-item">
          <label htmlFor="chatBackground">Chat Background</label>
          <div className="color-input-group">
            <input
              id="chatBackground"
              type="color"
              value={config.chatBackground}
              onChange={(e) => updateConfig('chatBackground', e.target.value)}
              className="control-color"
            />
            <input
              type="text"
              value={config.chatBackground}
              onChange={(e) => updateConfig('chatBackground', e.target.value)}
              className="control-input color-text"
            />
          </div>
        </div>

        <div className="control-item">
          <label htmlFor="userMessageBackground">User Message Background</label>
          <div className="color-input-group">
            <input
              id="userMessageBackground"
              type="color"
              value={config.userMessageBackground}
              onChange={(e) => updateConfig('userMessageBackground', e.target.value)}
              className="control-color"
            />
            <input
              type="text"
              value={config.userMessageBackground}
              onChange={(e) => updateConfig('userMessageBackground', e.target.value)}
              className="control-input color-text"
            />
          </div>
        </div>

        <div className="control-item">
          <label htmlFor="botMessageBackground">Bot Message Background</label>
          <div className="color-input-group">
            <input
              id="botMessageBackground"
              type="color"
              value={config.botMessageBackground}
              onChange={(e) => updateConfig('botMessageBackground', e.target.value)}
              className="control-color"
            />
            <input
              type="text"
              value={config.botMessageBackground}
              onChange={(e) => updateConfig('botMessageBackground', e.target.value)}
              className="control-input color-text"
            />
          </div>
        </div>
      </div>

      <div className="control-item">
        <label htmlFor="borderRadius">Border Radius</label>
        <input
          id="borderRadius"
          type="text"
          value={config.borderRadius}
          onChange={(e) => updateConfig('borderRadius', e.target.value)}
          className="control-input"
          placeholder="e.g., 12px, 0.5rem"
        />
      </div>

      <div className="control-item">
        <label htmlFor="boxShadow">Box Shadow</label>
        <input
          id="boxShadow"
          type="text"
          value={config.boxShadow}
          onChange={(e) => updateConfig('boxShadow', e.target.value)}
          className="control-input"
          placeholder="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        />
      </div>

      <div className="control-item">
        <label htmlFor="fontFamily">Font Family</label>
        <select 
          id="fontFamily"
          className="control-select"
          value={config.fontFamily}
          onChange={(e) => updateConfig('fontFamily', e.target.value)}
        >
          <option value="Inter, sans-serif">Inter</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
        </select>
      </div>
    </div>
  )
}

export default StylingControls 