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
    
    props.push(`backendUrl="YOUR_BACKEND_URL"`)
    props.push(`headerTitle="${config.headerTitle}"`)
    
    if (config.theme !== 'light') {
      props.push(`theme="${config.theme}"`)
    }
    
    if (config.position !== 'bottom-right') {
      props.push(`position="${config.position}"`)
    }
    
    if (config.showTimestamps) {
      props.push(`showTimestamps={true}`)
    }
    
    if (config.enableFileUpload) {
      props.push(`enableFileUpload={true}`)
    }
    
    if (config.enableFeedback) {
      props.push(`enableFeedback={true}`)
    }
    
    if (config.persistChat) {
      props.push(`persistChat={true}`)
    }
    
    if (config.maxHeight !== '500px') {
      props.push(`maxHeight="${config.maxHeight}"`)
    }

    if (config.suggestedQuestions.length > 0) {
      const questionsArray = config.suggestedQuestions.map(q => `"${q}"`).join(',\n          ')
      props.push(`suggestedQuestions={[\n          ${questionsArray}\n        ]}`)
    }

    // Only include styling if it's different from defaults
    const hasCustomStyling = 
      config.widgetColor !== '#4f46e5' ||
      config.textColor !== '#ffffff' ||
      config.userMessageBackground !== '#4f46e5' ||
      config.botMessageBackground !== '#f3f4f6' ||
      config.borderRadius !== '12px' ||
      config.fontFamily !== 'Inter, sans-serif'

    if (hasCustomStyling) {
      const stylingProps: string[] = []
      if (config.widgetColor !== '#4f46e5') stylingProps.push(`widgetColor: '${config.widgetColor}'`)
      if (config.textColor !== '#ffffff') stylingProps.push(`textColor: '${config.textColor}'`)
      if (config.userMessageBackground !== '#4f46e5') stylingProps.push(`userMessageBackground: '${config.userMessageBackground}'`)
      if (config.botMessageBackground !== '#f3f4f6') stylingProps.push(`botMessageBackground: '${config.botMessageBackground}'`)
      if (config.borderRadius !== '12px') stylingProps.push(`borderRadius: '${config.borderRadius}'`)
      if (config.fontFamily !== 'Inter, sans-serif') stylingProps.push(`fontFamily: '${config.fontFamily}'`)
      
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
      <div className="preview-header">
        <h2>Live Preview</h2>
        <p>Click the chat widget to test your configuration</p>
      </div>

      <div className="preview-container">
        <div className="preview-content">
          <h3>Your Application</h3>
          <p>This is where your application content would be. The chatbot widget appears based on your position setting.</p>
          
          <ChatBot
            backendUrl="https://api.openai.com/v1/chat/completions"
            headerTitle={config.headerTitle}
            theme={config.theme}
            position={config.position}
            showTimestamps={config.showTimestamps}
            enableFileUpload={config.enableFileUpload}
            enableFeedback={config.enableFeedback}
            persistChat={config.persistChat}
            maxHeight={config.maxHeight}
            suggestedQuestions={config.suggestedQuestions}
            styling={{
              widgetColor: config.widgetColor,
              textColor: config.textColor,
              userMessageBackground: config.userMessageBackground,
              botMessageBackground: config.botMessageBackground,
              borderRadius: config.borderRadius,
              fontFamily: config.fontFamily
            }}
          />
        </div>
      </div>

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