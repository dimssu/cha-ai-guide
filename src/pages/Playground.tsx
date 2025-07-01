import { useState } from 'react'
import PlaygroundHeader from '../components/PlaygroundComponents/PlaygroundHeader'
import PlaygroundControls from '../components/PlaygroundComponents/PlaygroundControls'
import PlaygroundPreview from '../components/PlaygroundComponents/PlaygroundPreview'
import type { PlaygroundConfig } from '../components/PlaygroundComponents/types'
import './Playground.scss'

const Playground = () => {
  const [config, setConfig] = useState<PlaygroundConfig>({
    headerTitle: 'AI Assistant',
    theme: 'light',
    position: 'bottom-right',
    showTimestamps: false,
    enableFileUpload: false,
    enableFeedback: false,
    persistChat: false,
    maxHeight: '500px',
    widgetColor: '#4f46e5',
    textColor: '#ffffff',
    userMessageBackground: '#4f46e5',
    botMessageBackground: '#f3f4f6',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    suggestedQuestions: [
      'Hello! How can you help me?',
      'What can you do?'
    ]
  })

  const updateConfig = (key: keyof PlaygroundConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetToDefaults = () => {
    const defaultConfig: PlaygroundConfig = {
      headerTitle: 'AI Assistant',
      theme: 'light',
      position: 'bottom-right',
      showTimestamps: false,
      enableFileUpload: false,
      enableFeedback: false,
      persistChat: false,
      maxHeight: '500px',
      widgetColor: '#4f46e5',
      textColor: '#ffffff',
      userMessageBackground: '#4f46e5',
      botMessageBackground: '#f3f4f6',
      borderRadius: '12px',
      fontFamily: 'Inter, sans-serif',
      suggestedQuestions: [
        'Hello! How can you help me?',
        'What can you do?'
      ]
    }
    setConfig(defaultConfig)
  }

  return (
    <div className="playground">
      <div className="container">
        <PlaygroundHeader />
        
        <div className="playground-content">
          <PlaygroundControls 
            config={config} 
            updateConfig={updateConfig} 
            resetToDefaults={resetToDefaults} 
          />
          <PlaygroundPreview config={config} />
        </div>
      </div>
    </div>
  )
}

export default Playground 