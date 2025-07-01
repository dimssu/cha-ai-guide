import type { PlaygroundConfig } from './types'

interface LLMProviderControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const LLMProviderControls = ({ config, updateConfig }: LLMProviderControlsProps) => {
  return (
    <div className="control-group">
      <h3>🤖 LLM Provider Configuration</h3>
      
      <div className="control-item">
        <label>Provider</label>
        <select 
          className="control-select"
          value={config.llmProvider}
          onChange={(e) => updateConfig('llmProvider', e.target.value)}
        >
          <option value="openai">OpenAI</option>
          <option value="gemini">Google Gemini</option>
          <option value="claude">Anthropic Claude</option>
          <option value="backend">Custom Backend</option>
        </select>
      </div>

      {config.llmProvider !== 'backend' && (
        <div className="control-item">
          <label>API Key</label>
          <input
            type="password"
            className="control-input"
            value={config.apiKey}
            onChange={(e) => updateConfig('apiKey', e.target.value)}
            placeholder="Enter your API key..."
          />
        </div>
      )}

      {config.llmProvider === 'backend' && (
        <div className="control-item">
          <label>Backend URL</label>
          <input
            type="url"
            className="control-input"
            value={config.backendUrl}
            onChange={(e) => updateConfig('backendUrl', e.target.value)}
            placeholder="https://api.yourdomain.com/chat"
          />
        </div>
      )}

      <div className="control-item">
        <label>Context (AI Instructions)</label>
        <textarea
          className="control-textarea"
          value={config.context}
          onChange={(e) => updateConfig('context', e.target.value)}
          placeholder="You are a helpful AI assistant. Be friendly, professional, and provide accurate information."
          rows={4}
        />
        <small>This is the most important setting - it defines how your AI behaves!</small>
      </div>

      <div className="control-item">
        <label>Response Type</label>
        <select 
          className="control-select"
          value={config.responseType}
          onChange={(e) => updateConfig('responseType', e.target.value)}
        >
          <option value="casual">Casual - Friendly and conversational</option>
          <option value="formal">Formal - Professional and business-appropriate</option>
          <option value="technical">Technical - Detailed and precise</option>
        </select>
      </div>
    </div>
  )
}

export default LLMProviderControls 