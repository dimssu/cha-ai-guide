import { useState, useEffect } from 'react'
import type { PlaygroundConfig } from './types'

interface SuggestedQuestionsControlsProps {
  config: PlaygroundConfig
  updateConfig: (key: keyof PlaygroundConfig, value: any) => void
}

const SuggestedQuestionsControls = ({ config, updateConfig }: SuggestedQuestionsControlsProps) => {
  const [suggestedQuestionsInput, setSuggestedQuestionsInput] = useState(config.suggestedQuestions.join('\n'))

  // Sync state when config changes (e.g., reset button)
  useEffect(() => {
    setSuggestedQuestionsInput(config.suggestedQuestions.join('\n'))
  }, [config.suggestedQuestions])

  const updateSuggestedQuestions = (value: string) => {
    setSuggestedQuestionsInput(value)
    const questions = value.split('\n').filter(q => q.trim() !== '')
    updateConfig('suggestedQuestions', questions)
  }

  return (
    <div className="control-group">
      <h3>Suggested Questions</h3>
      <div className="control-item">
        <label htmlFor="suggestedQuestions">Questions (one per line)</label>
        <textarea
          id="suggestedQuestions"
          value={suggestedQuestionsInput}
          onChange={(e) => updateSuggestedQuestions(e.target.value)}
          className="control-textarea"
          rows={4}
          placeholder="Hello! How can you help me?&#10;What can you do?&#10;Show me examples"
        />
      </div>
    </div>
  )
}

export default SuggestedQuestionsControls 