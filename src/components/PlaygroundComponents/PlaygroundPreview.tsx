import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'
import ChatBot from 'cha-ai'
import type { PlaygroundConfig } from './types'

interface PlaygroundPreviewProps {
  config: PlaygroundConfig
}

const PlaygroundPreview = ({ config }: PlaygroundPreviewProps) => {
  const [copiedCode, setCopiedCode] = useState(false)

  const generateCode = () => {
    const props: string[] = []
    
    // LLM Provider Configuration
    if (config.llmProvider === 'backend') {
      props.push(`backendUrl="${config.backendUrl || 'YOUR_BACKEND_URL'}"`)
    } else {
      props.push(`llmProvider="${config.llmProvider}"`)
      if (config.apiKey) {
        props.push(`apiKey="${config.apiKey}"`)
      } else {
        props.push(`apiKey="YOUR_API_KEY"`)
      }
    }
    
    // Context is critical
    if (config.context !== 'You are a helpful AI assistant. Be friendly, professional, and provide accurate information.') {
      props.push(`context="${config.context}"`)
    }
    
    // Basic Configuration
    if (config.headerTitle !== 'AI Assistant') {
      props.push(`headerTitle="${config.headerTitle}"`)
    }
    
    if (config.theme !== 'light') {
      props.push(`theme="${config.theme}"`)
    }
    
    if (config.position !== 'bottom-right') {
      props.push(`position="${config.position}"`)
    }
    
    if (config.responseType !== 'casual') {
      props.push(`responseType="${config.responseType}"`)
    }
    
    // UI Customization
    if (config.welcomeMessage) {
      props.push(`welcomeMessage="${config.welcomeMessage}"`)
    }
    
    if (config.placeholderText) {
      props.push(`placeholderText="${config.placeholderText}"`)
    }
    
    if (config.botAvatarUrl) {
      props.push(`botAvatarUrl="${config.botAvatarUrl}"`)
    }
    
    if (config.maxHeight !== '500px') {
      props.push(`maxHeight="${config.maxHeight}"`)
    }
    
    // Features
    if (config.showTimestamps) {
      props.push(`showTimestamps={true}`)
    }
    
    if (config.enableFileUpload) {
      props.push(`enableFileUpload={true}`)
    }
    
    if (config.enableFeedback) {
      props.push(`enableFeedback={true}`)
    }
    
    if (config.persistChat !== true) {
      props.push(`persistChat={${config.persistChat}}`)
    }
    
    // Advanced Configuration
    if (config.chatId) {
      props.push(`chatId="${config.chatId}"`)
    }
    
    if (config.className) {
      props.push(`className="${config.className}"`)
    }
    
    if (config.chatButtonIcon) {
      props.push(`chatButtonIcon="${config.chatButtonIcon}"`)
    }
    
    if (config.customChatButton) {
      props.push(`customChatButton="${config.customChatButton}"`)
    }
    
    // File Upload Settings
    if (config.enableFileUpload) {
      if (config.allowedFileTypes.join(', ') !== 'image/*, .pdf, .doc, .docx') {
        const fileTypesArray = config.allowedFileTypes.map(type => `"${type}"`).join(', ')
        props.push(`allowedFileTypes={[${fileTypesArray}]}`)
      }
      
      if (config.maxFileSizeMB !== 10) {
        props.push(`maxFileSizeMB={${config.maxFileSizeMB}}`)
      }
    }

    // Suggested Questions
    if (config.suggestedQuestions.length > 0) {
      const questionsArray = config.suggestedQuestions.map(q => `"${q}"`).join(',\n          ')
      props.push(`suggestedQuestions={[\n          ${questionsArray}\n        ]}`)
    }

         // Styling
     const stylingProps: string[] = []
     
     // Basic styling properties
     if (config.widgetColor !== '#4f46e5') stylingProps.push(`widgetColor: '${config.widgetColor}'`)
     if (config.textColor !== '#ffffff') stylingProps.push(`textColor: '${config.textColor}'`)
     if (config.fontFamily !== 'Inter, sans-serif') stylingProps.push(`fontFamily: '${config.fontFamily}'`)
     if (config.borderRadius !== '12px') stylingProps.push(`borderRadius: '${config.borderRadius}'`)
     if (config.boxShadow !== '0 4px 6px -1px rgba(0, 0, 0, 0.1)') stylingProps.push(`boxShadow: '${config.boxShadow}'`)
     if (config.chatBackground !== '#ffffff') stylingProps.push(`chatBackground: '${config.chatBackground}'`)
     if (config.userMessageBackground !== '#4f46e5') stylingProps.push(`userMessageBackground: '${config.userMessageBackground}'`)
     if (config.botMessageBackground !== '#f3f4f6') stylingProps.push(`botMessageBackground: '${config.botMessageBackground}'`)
    
    // Advanced CSS Styles (only if not empty)
    const advancedStyles = [
      'containerStyle', 'headerStyle', 'bodyStyle', 'windowStyle', 
      'buttonStyle', 'chatButtonIconStyle', 'customChatButtonStyle'
    ]
    
         advancedStyles.forEach(styleKey => {
       const styleValue = config[styleKey as keyof PlaygroundConfig] as string
       if (styleValue && styleValue !== '{}') {
         try {
           const parsed = JSON.parse(styleValue)
           if (Object.keys(parsed).length > 0) {
             stylingProps.push(`${styleKey}: ${JSON.stringify(parsed)}`)
           }
         } catch {
           // Invalid JSON, skip
         }
       }
     })

    if (stylingProps.length > 0) {
      props.push(`styling={{\n          ${stylingProps.join(',\n          ')}\n        }}`)
    }

    return `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <ChatBot
        ${props.join('\n        ')}
      />
    </div>
  )
}`
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateCode())
      setCopiedCode(true)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  return (
    <div className="playground-preview">

      <ChatBot
        llmProvider={config.llmProvider === 'backend' ? undefined : config.llmProvider}
        apiKey={config.llmProvider !== 'backend' ? (config.apiKey || 'demo-key') : undefined}
        backendUrl={config.llmProvider === 'backend' ? (config.backendUrl || 'https://api.openai.com/v1/chat/completions') : undefined}
        context={config.context}
        headerTitle={config.headerTitle}
        theme={config.theme}
        position={config.position}
        responseType={config.responseType}
        welcomeMessage={config.welcomeMessage || undefined}
        placeholderText={config.placeholderText || undefined}
        botAvatarUrl={config.botAvatarUrl || undefined}
        showTimestamps={config.showTimestamps}
        enableFileUpload={config.enableFileUpload}
        enableFeedback={config.enableFeedback}
        persistChat={config.persistChat}
        maxHeight={config.maxHeight}
        chatId={config.chatId || undefined}
        className={config.className || undefined}
        chatButtonIcon={config.chatButtonIcon || undefined}
        customChatButton={config.customChatButton || undefined}
        allowedFileTypes={config.allowedFileTypes}
        maxFileSizeMB={config.maxFileSizeMB}
        suggestedQuestions={config.suggestedQuestions}
        styling={{
          widgetColor: config.widgetColor,
          textColor: config.textColor,
          fontFamily: config.fontFamily,
          borderRadius: config.borderRadius,
          boxShadow: config.boxShadow,
          chatBackground: config.chatBackground,
          userMessageBackground: config.userMessageBackground,
          botMessageBackground: config.botMessageBackground,
          ...(config.containerStyle !== '{}' ? { containerStyle: JSON.parse(config.containerStyle || '{}') } : {}),
          ...(config.headerStyle !== '{}' ? { headerStyle: JSON.parse(config.headerStyle || '{}') } : {}),
          ...(config.bodyStyle !== '{}' ? { bodyStyle: JSON.parse(config.bodyStyle || '{}') } : {}),
          ...(config.windowStyle !== '{}' ? { windowStyle: JSON.parse(config.windowStyle || '{}') } : {}),
          ...(config.buttonStyle !== '{}' ? { buttonStyle: JSON.parse(config.buttonStyle || '{}') } : {}),
          ...(config.chatButtonIconStyle !== '{}' ? { chatButtonIconStyle: JSON.parse(config.chatButtonIconStyle || '{}') } : {}),
          ...(config.customChatButtonStyle !== '{}' ? { customChatButtonStyle: JSON.parse(config.customChatButtonStyle || '{}') } : {})
        }}
      />

      <div className="code-section">
        <div className="code-header">
          <h3>Generated Code</h3>
          <button 
            className="btn btn-primary btn-sm"
            onClick={copyCode}
          >
            {copiedCode ? <Check size={16} /> : <Copy size={16} />}
            {copiedCode ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        
        <div className="code-block-container">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              padding: '1.5rem',
              background: '#1e1e1e !important',
              maxHeight: '400px',
              overflow: 'auto'
            }}
            showLineNumbers={false}
            wrapLines={true}
            wrapLongLines={true}
          >
            {generateCode()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}

export default PlaygroundPreview 