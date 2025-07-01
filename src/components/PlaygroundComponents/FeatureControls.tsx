import type { PlaygroundConfig } from './types'

interface FeatureControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const FeatureControls = ({ config, updateConfig }: FeatureControlsProps) => {
  return (
    <div className="control-group">
      <h3>Features</h3>
      
      <div className="control-item checkbox-item">
        <input
          id="showTimestamps"
          type="checkbox"
          checked={config.showTimestamps}
          onChange={(e) => updateConfig('showTimestamps', e.target.checked)}
          className="control-checkbox"
        />
        <label htmlFor="showTimestamps">Show Timestamps</label>
      </div>

      <div className="control-item checkbox-item">
        <input
          id="enableFileUpload"
          type="checkbox"
          checked={config.enableFileUpload}
          onChange={(e) => updateConfig('enableFileUpload', e.target.checked)}
          className="control-checkbox"
        />
        <label htmlFor="enableFileUpload">Enable File Upload</label>
      </div>

      <div className="control-item checkbox-item">
        <input
          id="enableFeedback"
          type="checkbox"
          checked={config.enableFeedback}
          onChange={(e) => updateConfig('enableFeedback', e.target.checked)}
          className="control-checkbox"
        />
        <label htmlFor="enableFeedback">Enable Feedback</label>
      </div>

      <div className="control-item checkbox-item">
        <input
          id="persistChat"
          type="checkbox"
          checked={config.persistChat}
          onChange={(e) => updateConfig('persistChat', e.target.checked)}
          className="control-checkbox"
        />
        <label htmlFor="persistChat">Persist Chat</label>
      </div>
    </div>
  )
}

export default FeatureControls 