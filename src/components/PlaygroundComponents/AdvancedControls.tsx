import type { PlaygroundConfig } from './types'

interface AdvancedControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const AdvancedControls = ({ config, updateConfig }: AdvancedControlsProps) => {
  const handleFileTypesChange = (value: string) => {
    const types = value.split(',').map(type => type.trim()).filter(type => type)
    updateConfig('allowedFileTypes', types)
  }

  return (
    <div className="control-group">
      <h3>⚙️ Advanced Configuration</h3>
      
      <div className="control-item">
        <label>Chat ID</label>
        <input
          type="text"
          className="control-input"
          value={config.chatId}
          onChange={(e) => updateConfig('chatId', e.target.value)}
          placeholder="unique-chat-id"
        />
        <small>Unique identifier for chat history persistence</small>
      </div>

      <div className="control-item">
        <label>CSS Class Name</label>
        <input
          type="text"
          className="control-input"
          value={config.className}
          onChange={(e) => updateConfig('className', e.target.value)}
          placeholder="my-custom-chatbot"
        />
      </div>

      <div className="control-item">
        <label>Allowed File Types</label>
        <input
          type="text"
          className="control-input"
          value={config.allowedFileTypes.join(', ')}
          onChange={(e) => handleFileTypesChange(e.target.value)}
          placeholder="image/*, .pdf, .doc, .docx"
        />
        <small>Comma-separated list of MIME types or extensions</small>
      </div>

      <div className="control-item">
        <label>Max File Size (MB)</label>
        <input
          type="number"
          className="control-input"
          value={config.maxFileSizeMB}
          onChange={(e) => updateConfig('maxFileSizeMB', Number(e.target.value))}
          min="1"
          max="100"
        />
      </div>

      <div className="control-item">
        <label>Chat Button Icon</label>
        <input
          type="text"
          className="control-input"
          value={config.chatButtonIcon}
          onChange={(e) => updateConfig('chatButtonIcon', e.target.value)}
          placeholder="💬 or image URL"
        />
        <small>Emoji, text, or image URL for the chat button</small>
      </div>

      <div className="control-item">
        <label>Custom Chat Button</label>
        <input
          type="text"
          className="control-input"
          value={config.customChatButton}
          onChange={(e) => updateConfig('customChatButton', e.target.value)}
          placeholder="Lottie URL or image URL"
        />
        <small>URL for Lottie animation or custom button image</small>
      </div>
    </div>
  )
}

export default AdvancedControls 