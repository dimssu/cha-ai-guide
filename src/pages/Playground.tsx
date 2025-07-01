import { useState } from 'react'
import PlaygroundHeader from '../components/PlaygroundComponents/PlaygroundHeader'
import PlaygroundControls from '../components/PlaygroundComponents/PlaygroundControls'
import PlaygroundPreview from '../components/PlaygroundComponents/PlaygroundPreview'
import type { PlaygroundConfig } from '../components/PlaygroundComponents/types'
import './Playground.scss'

const Playground = () => {
  const [config, setConfig] = useState<PlaygroundConfig>({
    // Basic Configuration
    headerTitle: 'AI Assistant',
    theme: 'light',
    position: 'bottom-right',
    
    // LLM Provider Configuration
    llmProvider: 'openai',
    apiKey: '',
    context: 'You are a helpful AI assistant. Be friendly, professional, and provide accurate information.',
    responseType: 'casual',
    backendUrl: '',
    
    // Core Features
    enableFileUpload: false,
    enableFeedback: false,
    showTimestamps: false,
    persistChat: true,
    
    // UI Customization
    welcomeMessage: '',
    placeholderText: '',
    botAvatarUrl: '',
    maxHeight: '500px',
    
    // Suggested Questions
    suggestedQuestions: [
      'Hello! How can you help me?',
      'What can you do?'
    ],
    
    // Advanced Configuration
    chatId: 'playground',
    className: '',
    
    // File Upload Settings
    allowedFileTypes: ['image/*', '.pdf', '.doc', '.docx'],
    maxFileSizeMB: 10,
    
    // Custom Buttons & Icons
    chatButtonIcon: '',
    customChatButton: '',
    
    // Basic Styling
    widgetColor: '#4f46e5',
    textColor: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    chatBackground: '#ffffff',
    userMessageBackground: '#4f46e5',
    botMessageBackground: '#8c74e2',
    
    // Advanced CSS Styles
    containerStyle: '{}',
    headerStyle: '{}',
    bodyStyle: '{}',
    windowStyle: '{}',
    buttonStyle: '{}',
    chatButtonIconStyle: '{}',
    customChatButtonStyle: '{}'
  })

  const updateConfig = (key: keyof PlaygroundConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetToDefaults = () => {
    const defaultConfig: PlaygroundConfig = {
      // Basic Configuration
      headerTitle: 'AI Assistant',
      theme: 'light',
      position: 'bottom-right',
      
      // LLM Provider Configuration
      llmProvider: 'openai',
      apiKey: '',
      context: 'You are a helpful AI assistant. Be friendly, professional, and provide accurate information.',
      responseType: 'casual',
      backendUrl: '',
      
      // Core Features
      enableFileUpload: false,
      enableFeedback: false,
      showTimestamps: false,
      persistChat: true,
      
      // UI Customization
      welcomeMessage: '',
      placeholderText: '',
      botAvatarUrl: '',
      maxHeight: '500px',
      
      // Suggested Questions
      suggestedQuestions: [
        'Hello! How can you help me?',
        'What can you do?'
      ],
      
      // Advanced Configuration
      chatId: 'playground',
      className: '',
      
      // File Upload Settings
      allowedFileTypes: ['image/*', '.pdf', '.doc', '.docx'],
      maxFileSizeMB: 10,
      
      // Custom Buttons & Icons
      chatButtonIcon: '',
      customChatButton: '',
      
      // Basic Styling
      widgetColor: '#4f46e5',
      textColor: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      chatBackground: '#ffffff',
      userMessageBackground: '#4f46e5',
      botMessageBackground: '#8c74e2',
      
      // Advanced CSS Styles
      containerStyle: '{}',
      headerStyle: '{}',
      bodyStyle: '{}',
      windowStyle: '{}',
      buttonStyle: '{}',
      chatButtonIconStyle: '{}',
      customChatButtonStyle: '{}'
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