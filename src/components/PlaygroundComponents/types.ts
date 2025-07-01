export type ChatBotPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
export type ChatBotTheme = 'light' | 'dark' | 'system'
export type ChatBotResponseType = 'casual' | 'formal' | 'technical'
export type LLMProvider = 'openai' | 'gemini' | 'claude' | 'backend'

export interface PlaygroundConfig {
  // Basic Configuration (Most Used)
  headerTitle: string
  theme: ChatBotTheme
  position: ChatBotPosition
  
  // LLM Provider Configuration  
  llmProvider: LLMProvider
  apiKey: string
  context: string
  responseType: ChatBotResponseType
  backendUrl: string
  
  // Core Features
  enableFileUpload: boolean
  enableFeedback: boolean
  showTimestamps: boolean
  persistChat: boolean
  
  // UI Customization
  welcomeMessage: string
  placeholderText: string
  botAvatarUrl: string
  maxHeight: string
  
  // Suggested Questions
  suggestedQuestions: string[]
  
  // Advanced Configuration
  chatId: string
  className: string
  
  // File Upload Settings
  allowedFileTypes: string[]
  maxFileSizeMB: number
  
  // Custom Buttons & Icons
  chatButtonIcon: string
  customChatButton: string
  
  // Basic Styling (Most Common)
  widgetColor: string
  textColor: string
  fontFamily: string
  borderRadius: string
  boxShadow: string
  chatBackground: string
  userMessageBackground: string
  botMessageBackground: string
  
  // Advanced CSS Styles (Least Used - as JSON strings for the playground)
  containerStyle: string
  headerStyle: string
  bodyStyle: string
  windowStyle: string
  buttonStyle: string
  chatButtonIconStyle: string
  customChatButtonStyle: string
} 