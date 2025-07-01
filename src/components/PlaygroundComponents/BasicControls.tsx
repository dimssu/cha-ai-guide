import type { PlaygroundConfig } from './types'

interface BasicControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const BasicControls = ({ config, updateConfig }: BasicControlsProps) => {
  return (
    <div className="control-group">
      <h3>Basic Settings</h3>
      
      <div className="control-item">
        <label htmlFor="headerTitle">Header Title</label>
        <input
          id="headerTitle"
          type="text"
          value={config.headerTitle}
          onChange={(e) => updateConfig('headerTitle', e.target.value)}
          className="control-input"
        />
      </div>

      <div className="control-item">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          value={config.theme}
          onChange={(e) => updateConfig('theme', e.target.value as any)}
          className="control-select"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="control-item">
        <label htmlFor="position">Position</label>
        <select
          id="position"
          value={config.position}
          onChange={(e) => updateConfig('position', e.target.value as any)}
          className="control-select"
        >
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
        </select>
      </div>

      <div className="control-item">
        <label htmlFor="maxHeight">Max Height</label>
        <input
          id="maxHeight"
          type="text"
          value={config.maxHeight}
          onChange={(e) => updateConfig('maxHeight', e.target.value)}
          className="control-input"
          placeholder="e.g., 500px, 80vh"
        />
      </div>
    </div>
  )
}

export default BasicControls 