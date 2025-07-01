export interface PlaygroundConfig {
  headerTitle: string
  theme: 'light' | 'dark' | 'system'
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  showTimestamps: boolean
  enableFileUpload: boolean
  enableFeedback: boolean
  persistChat: boolean
  maxHeight: string
  widgetColor: string
  textColor: string
  userMessageBackground: string
  botMessageBackground: string
  borderRadius: string
  fontFamily: string
  suggestedQuestions: string[]
} 