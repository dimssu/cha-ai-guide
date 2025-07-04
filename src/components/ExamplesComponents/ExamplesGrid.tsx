import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'
import ChatBot from 'cha-ai'

const ExamplesGrid = () => {
  const [activeExample] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Fix ChatBot positioning within preview containers
  const fixChatBotPositioning = () => {
    // Find all preview containers
    const previewContainers = document.querySelectorAll('.preview-container')
    
    previewContainers.forEach(container => {
      // Find any fixed positioned elements within the container
      const allElements = container.querySelectorAll('*')
      
      allElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element)
        
        if (computedStyle.position === 'fixed') {
          const htmlElement = element as HTMLElement
          htmlElement.style.position = 'absolute'
          
          // Adjust positioning to be relative to container
          if (computedStyle.bottom && computedStyle.bottom !== 'auto') {
            htmlElement.style.bottom = '1rem'
          }
          if (computedStyle.right && computedStyle.right !== 'auto') {
            htmlElement.style.right = '1rem'
          }
          if (computedStyle.left && computedStyle.left !== 'auto') {
            htmlElement.style.left = '1rem'
          }
          if (computedStyle.top && computedStyle.top !== 'auto') {
            htmlElement.style.top = '1rem'
          }
        }
      })
    })
  }

  useEffect(() => {
    fixChatBotPositioning()
    
    // Run after a short delay to catch dynamically rendered elements
    const timeout = setTimeout(fixChatBotPositioning, 100)
    
    return () => clearTimeout(timeout)
  }, [activeExample])

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const examples = [
    {
      id: 'direct-llm',
      title: 'Direct LLM Integration',
      description: 'Connect directly to OpenAI API without a backend',
      code: `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>Direct OpenAI Integration</h1>
      <ChatBot
        directLlmConfig={{
          provider: 'openai',
          apiKey: process.env.REACT_APP_OPENAI_API_KEY,
          model: 'gpt-3.5-turbo',
          systemPrompt: 'You are a helpful assistant that specializes in web development.'
        }}
        headerTitle="Dev Assistant"
        theme="light"
        showTimestamps={true}
        suggestedQuestions={[
          "Help me with React",
          "Explain TypeScript",
          "CSS best practices",
          "JavaScript tips"
        ]}
      />
    </div>
  )
}`,
      preview: (
        <div className="preview-container">
          <div className="preview-header">
            <h3>Direct LLM Integration</h3>
            <p>This example would connect directly to OpenAI (requires API key)</p>
          </div>
          <div className="preview-placeholder">
            <p>🔑 This example requires an OpenAI API key to function</p>
            <p>Set your API key in environment variables to test this integration</p>
          </div>
        </div>
      )
    },
    {
      id: 'basic',
      title: 'Basic Implementation',
      description: 'Simple chatbot with minimal configuration',
      code: `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <ChatBot 
        backendUrl="YOUR_BACKEND_URL"
        headerTitle="Help Assistant"
      />
    </div>
  )
}`,
      preview: (
        <div className="preview-container">
          <div className="preview-header">
            <h3>Basic Example Preview</h3>
            <p>Click the chat icon to see the basic implementation</p>
          </div>
          <ChatBot
            backendUrl="https://api.openai.com/v1/chat/completions"
            headerTitle="Help Assistant"
            theme="light"
            position="bottom-right"
          />
        </div>
      )
    },
    {
      id: 'customized',
      title: 'Customized Styling',
      description: 'Chatbot with custom colors and styling',
      code: `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>Styled Chatbot Example</h1>
      <ChatBot
        backendUrl="YOUR_BACKEND_URL"
        headerTitle="Custom Assistant"
        theme="dark"
        position="bottom-left"
        styling={{
          widgetColor: '#10b981',
          textColor: '#ffffff',
          userMessageBackground: '#10b981',
          botMessageBackground: '#374151',
          borderRadius: '16px',
          fontFamily: 'Inter, sans-serif'
        }}
        maxHeight="500px"
      />
    </div>
  )
}`,
      preview: (
        <div className="preview-container">
          <div className="preview-header">
            <h3>Customized Styling Preview</h3>
            <p>Custom green theme with dark mode</p>
          </div>
          <ChatBot
            backendUrl="https://api.openai.com/v1/chat/completions"
            headerTitle="Custom Assistant"
            theme="dark"
            position="bottom-left"
            styling={{
              widgetColor: '#10b981',
              textColor: '#ffffff',
              userMessageBackground: '#10b981',
              botMessageBackground: '#374151',
              borderRadius: '16px',
              fontFamily: 'Inter, sans-serif'
            }}
            maxHeight="500px"
          />
        </div>
      )
    },
    {
      id: 'full-featured',
      title: 'Full-Featured Chatbot',
      description: 'All features enabled including file upload, feedback, and suggested questions',
      code: `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>Full-Featured Chatbot</h1>
      <ChatBot
        backendUrl="YOUR_BACKEND_URL"
        headerTitle="Smart Assistant"
        theme="system"
        position="bottom-right"
        showTimestamps={true}
        enableFileUpload={true}
        enableFeedback={true}
        suggestedQuestions={[
          "What can you help me with?",
          "How do I get started?",
          "Tell me about your features",
          "Show me an example"
        ]}
        styling={{
          widgetColor: '#8b5cf6',
          userMessageBackground: '#8b5cf6',
          botMessageBackground: '#f3f4f6',
          borderRadius: '12px'
        }}
        maxHeight="600px"
        persistChat={true}
      />
    </div>
  )
}`,
      preview: (
        <div className="preview-container">
          <div className="preview-header">
            <h3>Full-Featured Preview</h3>
            <p>All features enabled with suggested questions</p>
          </div>
          <ChatBot
            backendUrl="https://api.openai.com/v1/chat/completions"
            headerTitle="Smart Assistant"
            theme="system"
            position="bottom-right"
            showTimestamps={true}
            enableFileUpload={true}
            enableFeedback={true}
            suggestedQuestions={[
              "What can you help me with?",
              "How do I get started?",
              "Tell me about your features",
              "Show me an example"
            ]}
            styling={{
              widgetColor: '#8b5cf6',
              userMessageBackground: '#8b5cf6',
              botMessageBackground: '#f3f4f6',
              borderRadius: '12px'
            }}
            maxHeight="600px"
            persistChat={true}
            chatId='full-featured'
          />
        </div>
      )
    }
  ]

  const CodeBlock = ({ code, id }: { code: string, id: string }) => (
    <div className="code-block-container">
      <div className="code-header">
        <span className="language-tag">typescript</span>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(code, id)}
        >
          {copiedCode === id ? <Check size={16} /> : <Copy size={16} />}
          {copiedCode === id ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language="typescript"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 0.5rem 0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          padding: '1.5rem',
          background: '#1e1e1e !important'
        }}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )

  return (
    <div className="examples-grid">
      {examples.map((example) => (
        <div key={example.id} className="example-card card">
          <div className="example-header">
            <h3>{example.title}</h3>
            <p>{example.description}</p>
          </div>

          {/* <div className="example-actions">
            <button
              className={`action-btn ${activeExample === example.id ? 'active' : ''}`}
              onClick={() => setActiveExample(activeExample === example.id ? null : example.id)}
            >
              <Eye size={18} />
              {activeExample === example.id ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              className="action-btn secondary"
              onClick={() => {
                const codeElement = document.getElementById(`code-${example.id}`)
                if (codeElement) {
                  codeElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <Code size={18} />
              View Code
            </button>
          </div> */}

          {activeExample === example.id && (
            <div className="example-preview">
              {example.preview}
            </div>
          )}

          <div id={`code-${example.id}`} className="example-code">
            <CodeBlock code={example.code} id={example.id} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExamplesGrid 