import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'

interface DocumentationContentProps {
  openSections: string[]
  onToggleSection: (sectionId: string) => void
  onSetOpenSections: (sections: string[] | ((prev: string[]) => string[])) => void
}

const DocumentationContent = ({ openSections, onToggleSection, onSetOpenSections }: DocumentationContentProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)



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

  // Handle hash changes and auto-expand sections
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash && !openSections.includes(hash)) {
        onSetOpenSections(prev => [...prev, hash])
      }
    }

    // Handle initial hash on load
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [onSetOpenSections])

  const CodeBlock = ({ code, language = 'typescript', id }: { code: string, language?: string, id: string }) => (
    <div className="code-block-container">
      <div className="code-header">
        <span className="language-tag">{language}</span>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(code, id)}
        >
          {copiedCode === id ? <Check size={16} /> : <Copy size={16} />}
          {copiedCode === id ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
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

  const sections = [
    {
      id: 'installation',
      title: 'Installation',
      content: (
        <div className="section-content">
          <p>Install cha-ai in your React project using npm or yarn:</p>
          <CodeBlock 
            code="npm install cha-ai" 
            language="bash" 
            id="install-npm"
          />
          <CodeBlock 
            code="yarn add cha-ai" 
            language="bash" 
            id="install-yarn"
          />
        </div>
      )
    },
    {
      id: 'basic-usage',
      title: 'Basic Usage',
      content: (
        <div className="section-content">
          <p>Import the ChatBot component and add it to your React application:</p>
          <CodeBlock 
            code={`import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <ChatBot 
        llmProvider="your_llm_provider"
        apiKey={your_api_key}
        headerTitle="Chat Assistant"
        context="Your context here"
      />
    </div>
  )
}`}
            id="basic-usage"
          />
        </div>
      )
    },
    {
      id: 'direct-llm',
      title: 'Direct LLM Configuration',
      content: (
        <div className="section-content">
          <p>You can configure the chatbot to work directly with LLM APIs in multiple ways:</p>
          
          <h4>Simple LLM Provider Setup</h4>
          <p>Use the built-in providers for quick setup:</p>
          
          <CodeBlock 
            code={`// OpenAI Configuration
<ChatBot
  llmProvider="openai"
  apiKey={import.meta.env.VITE_OPENAI_API_KEY}
  headerTitle="OpenAI Assistant"
  context="You are a helpful assistant."
  responseType="professional"
/>

// Claude Configuration
<ChatBot
  llmProvider="claude"
  apiKey={import.meta.env.VITE_CLAUDE_API_KEY}
  headerTitle="Claude Assistant"
  context="You are a helpful assistant."
  responseType="casual"
/>

// Gemini Configuration
<ChatBot
  llmProvider="gemini"
  apiKey={import.meta.env.VITE_GEMINI_API_KEY}
  headerTitle="Gemini Assistant"
  context="You are a helpful assistant."
  responseType="technical"
/>`}
            id="simple-llm-config"
          />
          
          <h4>Advanced Direct LLM Configuration</h4>
          <p>For custom LLM endpoints or advanced configuration:</p>
          
          <CodeBlock 
            code={`<ChatBot
  directLlmConfig={{
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: 'gpt-4-turbo',
    headers: {
      'Content-Type': 'application/json',
      'Custom-Header': 'value'
    },
    formatMessages: (messages, newMessage, context) => ({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: context || 'You are a helpful assistant.' },
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: newMessage }
      ],
      temperature: 0.7,
      max_tokens: 1000
    }),
    parseResponse: (data) => data.choices[0].message.content
  }}
  headerTitle="Custom LLM Assistant"
/>`}
            id="advanced-llm-config"
          />
          
          <h4>Response Types</h4>
          <p>Control the tone and style of AI responses:</p>
          <ul>
            <li><code>casual</code> - Friendly, conversational tone</li>
            <li><code>formal</code> - Professional, business-appropriate</li>
            <li><code>technical</code> - Detailed, precise technical explanations</li>
          </ul>
        </div>
      )
    },
    {
      id: 'props',
      title: 'Props & Configuration',
      content: (
        <div className="section-content">
          <p>The ChatBot component accepts the following props:</p>
          
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>backendUrl</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>URL for the backend API endpoint</td>
                </tr>
                <tr>
                  <td><code>directLlmConfig</code></td>
                  <td>DirectLlmConfig</td>
                  <td>-</td>
                  <td>Configuration for direct LLM API calls (alternative to backendUrl)</td>
                </tr>
                <tr>
                  <td><code>llmProvider</code></td>
                  <td>'openai' | 'gemini' | 'claude'</td>
                  <td>-</td>
                  <td>LLM provider (e.g., 'openai', 'gemini', 'claude'). If provided with apiKey, overrides directLlmConfig.</td>
                </tr>
                <tr>
                  <td><code>apiKey</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>API key for the LLM provider. Used with llmProvider.</td>
                </tr>
                <tr>
                  <td><code>context</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Context information to help guide the AI responses</td>
                </tr>
                <tr>
                  <td><code>responseType</code></td>
                  <td>'casual' | 'formal' | 'technical'</td>
                  <td>-</td>
                  <td>Tone of the AI responses</td>
                </tr>
                <tr>
                  <td><code>position</code></td>
                  <td>'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'</td>
                  <td>'bottom-right'</td>
                  <td>Position of the chat widget on screen</td>
                </tr>
                <tr>
                  <td><code>welcomeMessage</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Initial welcome message displayed when chat is opened</td>
                </tr>
                <tr>
                  <td><code>styling</code></td>
                  <td>ChatBotStyling</td>
                  <td>-</td>
                  <td>Custom styling options</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td>'light' | 'dark' | 'system'</td>
                  <td>'system'</td>
                  <td>Color theme for the chat widget</td>
                </tr>
                <tr>
                  <td><code>placeholderText</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Placeholder text for the input field</td>
                </tr>
                <tr>
                  <td><code>headerTitle</code></td>
                  <td>string</td>
                  <td>"Chat Assistant"</td>
                  <td>Custom header title for the chat window</td>
                </tr>
                <tr>
                  <td><code>showTimestamps</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Whether to show timestamps on messages</td>
                </tr>
                <tr>
                  <td><code>botAvatarUrl</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Custom avatar URL for the bot</td>
                </tr>
                <tr>
                  <td><code>chatButtonIcon</code></td>
                  <td>string | React.ReactNode</td>
                  <td>-</td>
                  <td>Custom icon for the chat button (URL string or React component)</td>
                </tr>
                <tr>
                  <td><code>customChatButton</code></td>
                  <td>string | React.ReactNode</td>
                  <td>-</td>
                  <td>Custom chat button component (JSX component, Lottie URL, or image URL)</td>
                </tr>
                <tr>
                  <td><code>onBeforeSend</code></td>
                  <td>(message: string) =&gt; string | false</td>
                  <td>-</td>
                  <td>Function to call before sending message to backend</td>
                </tr>
                <tr>
                  <td><code>onAfterResponse</code></td>
                  <td>(response: string) =&gt; string</td>
                  <td>-</td>
                  <td>Function to call after receiving response</td>
                </tr>
                <tr>
                  <td><code>maxHeight</code></td>
                  <td>string</td>
                  <td>'500px'</td>
                  <td>Maximum height of the chat window (CSS value)</td>
                </tr>
                <tr>
                  <td><code>persistChat</code></td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Whether to persist chat history in localStorage</td>
                </tr>
                <tr>
                  <td><code>chatId</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Unique identifier for this chat instance (used with persistChat to separate chat histories)</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>Custom class name for the container</td>
                </tr>
                <tr>
                  <td><code>enableFileUpload</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Enable file upload functionality</td>
                </tr>
                <tr>
                  <td><code>enableFeedback</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Enable feedback collection on bot messages</td>
                </tr>
                <tr>
                  <td><code>suggestedQuestions</code></td>
                  <td>string[]</td>
                  <td>[]</td>
                  <td>Suggested questions to display to the user</td>
                </tr>
                <tr>
                  <td><code>onFeedbackSubmit</code></td>
                  <td>(messageId: string, rating: 'positive' | 'negative', comment?: string) =&gt; void</td>
                  <td>-</td>
                  <td>Function to call when feedback is submitted</td>
                </tr>
                <tr>
                  <td><code>onFileUpload</code></td>
                  <td>(file: File) =&gt; Promise&lt;void&gt;</td>
                  <td>-</td>
                  <td>Function to handle file uploads</td>
                </tr>
                <tr>
                  <td><code>allowedFileTypes</code></td>
                  <td>string[]</td>
                  <td>-</td>
                  <td>Allowed file types for upload</td>
                </tr>
                <tr>
                  <td><code>maxFileSizeMB</code></td>
                  <td>number</td>
                  <td>-</td>
                  <td>Maximum file size in MB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'styling',
      title: 'Custom Styling',
      content: (
        <div className="section-content">
          <p>Customize the appearance of your chatbot with the styling prop:</p>
          <CodeBlock 
            code={`<ChatBot
  llmProvider="gemini"
  apiKey={import.meta.env.VITE_GEMINI_API_KEY}
  styling={{
    // Container & component styles
    containerStyle: { maxWidth: '400px' },
    headerStyle: { padding: '1rem' },
    bodyStyle: { height: '500px' },
    windowStyle: { border: '1px solid #e5e7eb' },
    buttonStyle: { padding: '0.5rem 1rem' },
    chatButtonIconStyle: { width: '24px' },
    customChatButtonStyle: { position: 'fixed', bottom: '2rem', right: '2rem' },

    // Colors & theming
    widgetColor: '#4f46e5',
    textColor: '#ffffff',
    chatBackground: '#ffffff',
    userMessageBackground: '#4f46e5',
    botMessageBackground: '#f3f4f6',

    // Typography & layout
    fontFamily: 'Inter, sans-serif',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}
/>`}
            id="custom-styling"
          />
          
          <h4>Available Styling Options</h4>
          <ul>
            <li><code>containerStyle</code> - Custom styles for the main container</li>
            <li><code>headerStyle</code> - Custom styles for the chat header</li>
            <li><code>bodyStyle</code> - Custom styles for the chat body</li>
            <li><code>windowStyle</code> - Custom styles for the chat window</li>
            <li><code>buttonStyle</code> - Custom styles for buttons</li>
            <li><code>chatButtonIconStyle</code> - Custom styles for the chat button icon</li>
            <li><code>customChatButtonStyle</code> - Custom styles for the floating chat button</li>
            <li><code>widgetColor</code> - Primary color for the widget</li>
            <li><code>textColor</code> - Text color for messages</li>
            <li><code>chatBackground</code> - Background color for the chat window</li>
            <li><code>userMessageBackground</code> - Background color for user messages</li>
            <li><code>botMessageBackground</code> - Background color for bot messages</li>
            <li><code>fontFamily</code> - Font family for text</li>
            <li><code>borderRadius</code> - Border radius for rounded corners</li>
            <li><code>boxShadow</code> - Box shadow for the chat window</li>
          </ul>
        </div>
      )
    },
    {
      id: 'positioning-theming',
      title: 'Positioning & Theming',
      content: (
        <div className="section-content">
          <h4>Widget Positioning</h4>
          <p>Control where the chat widget appears on your page:</p>
          <CodeBlock 
            code={`// Bottom-right (default)
<ChatBot position="bottom-right" />

// Bottom-left  
<ChatBot position="bottom-left" />

// Top-right
<ChatBot position="top-right" />

// Top-left
<ChatBot position="top-left" />`}
            id="positioning-examples"
          />
          
          <h4>Theme Options</h4>
          <p>Choose from built-in themes or system preference:</p>
          <CodeBlock 
            code={`// Light theme
<ChatBot theme="light" />

// Dark theme
<ChatBot theme="dark" />

// System preference (default)
<ChatBot theme="system" />`}
            id="theme-examples"
          />
          
          <h4>Welcome Messages & Placeholders</h4>
          <CodeBlock 
            code={`<ChatBot
  welcomeMessage="👋 Hello! How can I help you today?"
  placeholderText="Type your message here..."
  headerTitle="Support Assistant"
/>`}
            id="welcome-placeholder"
          />
        </div>
      )
    },
    {
      id: 'ui-customization',
      title: 'UI Customization',
      content: (
        <div className="section-content">
          <h4>Custom Avatars & Icons</h4>
          <CodeBlock 
            code={`<ChatBot
  botAvatarUrl="https://example.com/bot-avatar.png"
  chatButtonIcon="💬"
  // OR with a custom React component
  chatButtonIcon={<CustomChatIcon />}
/>`}
            id="avatars-icons"
          />
          
          <h4>Custom Chat Button</h4>
          <p>Replace the default floating button with your own:</p>
          <CodeBlock 
            code={`// Using a Lottie animation URL
<ChatBot
  customChatButton="https://assets.lottiefiles.com/packages/lf20_chat.json"
/>

// Using a custom React component
<ChatBot
  customChatButton={
    <div className="my-custom-button">
      <ChatIcon />
      <span>Chat with us!</span>
    </div>
  }
/>

// Using an image URL
<ChatBot
  customChatButton="https://example.com/chat-button.png"
/>`}
            id="custom-chat-button"
          />
          
          <h4>Layout & Sizing</h4>
          <CodeBlock 
            code={`<ChatBot
  maxHeight="600px"
  className="my-chatbot-class"
  styling={{
    containerStyle: { 
      maxWidth: '400px',
      zIndex: 1000 
    },
    windowStyle: { 
      border: '2px solid #4f46e5',
      borderRadius: '16px' 
    }
  }}
/>`}
            id="layout-sizing"
          />
        </div>
      )
    },
    {
      id: 'file-upload-feedback',
      title: 'File Upload & Feedback',
      content: (
        <div className="section-content">
          <h4>File Upload Configuration</h4>
          <CodeBlock 
            code={`<ChatBot
  enableFileUpload={true}
  allowedFileTypes={['image/*', '.pdf', '.doc', '.docx']}
  maxFileSizeMB={10}
  onFileUpload={async (file) => {
    console.log('File uploaded:', file.name)
    // Handle file upload logic
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        console.log('File uploaded successfully')
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }}
/>`}
            id="file-upload-config"
          />
          
          <h4>Feedback System</h4>
          <CodeBlock 
            code={`<ChatBot
  enableFeedback={true}
  onFeedbackSubmit={(messageId, rating, comment) => {
    console.log('Feedback received:', { messageId, rating, comment })
    
    // Send feedback to your analytics service
    analytics.track('chat_feedback', {
      messageId,
      rating, // 'positive' or 'negative'
      comment,
      timestamp: new Date()
    })
  }}
/>`}
            id="feedback-config"
          />
          
          <h4>Suggested Questions</h4>
          <CodeBlock 
            code={`<ChatBot
  suggestedQuestions={[
    "How can I track my order?",
    "What are your business hours?", 
    "How do I return an item?",
    "Contact customer support"
  ]}
/>`}
            id="suggested-questions"
          />
        </div>
      )
    },
    {
      id: 'event-handlers',
      title: 'Event Handlers & Callbacks',
      content: (
        <div className="section-content">
          <h4>Message Processing Hooks</h4>
          <CodeBlock 
            code={`<ChatBot
  onBeforeSend={(message) => {
    // Pre-process user messages
    if (message.toLowerCase().includes('password')) {
      alert('Please don\'t share sensitive information')
      return false // Prevents sending
    }
    
    // Transform message if needed
    return message.trim()
  }}
  
  onAfterResponse={(response) => {
    // Post-process bot responses
    console.log('Bot responded:', response)
    
    // Track or modify response
    analytics.track('bot_response_received', { 
      length: response.length,
      timestamp: new Date()
    })
    
    return response
  }}
/>`}
            id="message-hooks"
          />
          
          <h4>Chat Persistence</h4>
          <CodeBlock 
            code={`// Enable chat persistence (default: true)
<ChatBot
  persistChat={true}
  chatId="support-chat" // Unique identifier for this chat
/>

// Multiple chat instances with different histories
<ChatBot
  persistChat={true}
  chatId="sales-chat"
  headerTitle="Sales Assistant"
/>

<ChatBot
  persistChat={true}
  chatId="technical-support"
  headerTitle="Technical Support"
/>`}
            id="chat-persistence"
          />
        </div>
      )
    },
    {
      id: 'features',
      title: 'Built-in Features',
      content: (
        <div className="section-content">
          <h4>Markdown Support</h4>
          <p>Chat messages support full Markdown formatting including:</p>
          <ul>
            <li>**Bold text** and *italic text*</li>
            <li>Links: [link text](URL)</li>
            <li>Code blocks and inline `code`</li>
            <li>Lists (numbered and bulleted)</li>
            <li>Headers and more</li>
          </ul>
          
          <h4>Timestamps</h4>
          <CodeBlock 
            code={`<ChatBot showTimestamps={true} />`}
            id="timestamps"
          />
          
          <h4>Context & Memory</h4>
          <p>The chatbot automatically:</p>
          <ul>
            <li>Maintains conversation context across messages</li>
            <li>Persists chat history in localStorage</li>
            <li>Uses recent messages to provide better responses</li>
            <li>Supports custom context injection</li>
          </ul>
          
          <CodeBlock 
            code={`<ChatBot
  context="You are a customer support agent for Acme Corp. 
          Our products include laptops, tablets, and smartphones. 
          Always be helpful and provide specific product information when asked."
/>`}
            id="context-example"
          />
        </div>
      )
    },
    {
      id: 'examples',
      title: 'Complete Examples',
      content: (
        <div className="section-content">
          <h4>E-commerce Support Bot</h4>
          <CodeBlock 
            code={`import ChatBot from 'cha-ai'

function EcommerceSite() {
  return (
    <div className="ecommerce-site">
      <header>
        <h1>Acme Store</h1>
      </header>
      
      <main>
        <p>Shop our amazing products...</p>
      </main>
      
      <ChatBot
        llmProvider="openai"
        apiKey={import.meta.env.VITE_OPENAI_API_KEY}
        context="You are a helpful e-commerce support agent for Acme Store. 
                Help customers with orders, returns, product questions, and shipping. 
                Be friendly and always try to solve their problems."
        responseType="casual"
        
        headerTitle="🛍️ Shopping Assistant"
        welcomeMessage="Hi! I'm here to help with your shopping needs. How can I assist you today?"
        placeholderText="Ask about products, orders, returns..."
        
        position="bottom-right"
        theme="light"
        showTimestamps={true}
        
        enableFileUpload={true}
        allowedFileTypes={['image/*', '.pdf']}
        maxFileSizeMB={5}
        enableFeedback={true}
        
        suggestedQuestions={[
          "Track my order",
          "Return policy",
          "Product recommendations",
          "Shipping information"
        ]}
        
        styling={{
          widgetColor: '#059669',
          userMessageBackground: '#059669',
          botMessageBackground: '#f0fdf4',
          chatBackground: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Inter, sans-serif'
        }}
        
        onFileUpload={async (file) => {
          // Handle receipt/product image uploads
          console.log('Customer uploaded:', file.name)
        }}
        
        onFeedbackSubmit={(messageId, rating, comment) => {
          // Track customer satisfaction
          analytics.track('support_feedback', { messageId, rating, comment })
        }}
        
        maxHeight="500px"
        persistChat={true}
        chatId="ecommerce-support"
      />
    </div>
  )
}`}
            id="ecommerce-example"
          />
          
          <h4>Technical Documentation Bot</h4>
          <CodeBlock 
            code={`import ChatBot from 'cha-ai'

function DevPortal() {
  return (
    <div className="dev-portal">
      <ChatBot
        directLlmConfig={{
          apiEndpoint: 'https://api.anthropic.com/v1/messages',
          apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
          model: 'claude-3-sonnet-20240229',
          headers: {
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          formatMessages: (messages, newMessage, context) => ({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1000,
            messages: [
              { role: 'user', content: \`\${context}\n\n\${newMessage}\` }
            ]
          }),
          parseResponse: (data) => data.content[0].text
        }}
        
        context="You are a technical documentation assistant. 
                Help developers understand APIs, provide code examples, 
                explain error messages, and guide through implementation steps.
                Always provide accurate, well-formatted code snippets."
        responseType="technical"
        
        headerTitle="🤖 Dev Assistant"
        welcomeMessage="Hello developer! I can help you with API documentation, code examples, and troubleshooting."
        botAvatarUrl="/dev-bot-avatar.png"
        
        position="bottom-left"
        theme="dark"
        showTimestamps={false}
        
        customChatButton={
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            🤖
          </div>
        }
        
        suggestedQuestions={[
          "Show me API authentication examples",
          "How to handle rate limiting?",
          "What are the error codes?",
          "SDK installation guide"
        ]}
        
        styling={{
          widgetColor: '#6366f1',
          chatBackground: '#1f2937',
          userMessageBackground: '#4f46e5',
          botMessageBackground: '#374151',
          textColor: '#f9fafb',
          fontFamily: 'JetBrains Mono, monospace',
          borderRadius: '8px'
        }}
        
        onBeforeSend={(message) => {
          // Log developer queries for documentation improvements
          analytics.track('dev_query', { query: message })
          return message
        }}
        
        maxHeight="600px"
        className="dev-chatbot"
        persistChat={true}
        chatId="dev-support"
      />
    </div>
  )
}`}
            id="technical-example"
          />
          
          <h4>Multi-language Customer Service</h4>
          <CodeBlock 
            code={`import ChatBot from 'cha-ai'

function GlobalSupportApp() {
  const [userLanguage, setUserLanguage] = useState('en')
  
  const getContextForLanguage = (lang) => {
    const contexts = {
      en: "You are a helpful customer service agent. Respond in English.",
      es: "Eres un agente de servicio al cliente. Responde en español.",
      fr: "Vous êtes un agent de service client. Répondez en français.",
      de: "Sie sind ein Kundendienstmitarbeiter. Antworten Sie auf Deutsch."
    }
    return contexts[lang] || contexts.en
  }
  
  const getSuggestedQuestions = (lang) => {
    const questions = {
      en: ["Check order status", "Return item", "Contact human agent"],
      es: ["Verificar estado del pedido", "Devolver artículo", "Contactar agente humano"],
      fr: ["Vérifier le statut de commande", "Retourner article", "Contacter agent humain"],
      de: ["Bestellstatus prüfen", "Artikel zurücksenden", "Menschlichen Agent kontaktieren"]
    }
    return questions[lang] || questions.en
  }
  
  return (
    <div>
      <select onChange={(e) => setUserLanguage(e.target.value)} value={userLanguage}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
      
      <ChatBot
        llmProvider="gemini"
        apiKey={import.meta.env.VITE_GEMINI_API_KEY}
        context={getContextForLanguage(userLanguage)}
        responseType="formal"
        
        headerTitle="Global Support"
        position="bottom-right"
        theme="system"
        
        suggestedQuestions={getSuggestedQuestions(userLanguage)}
        
        enableFeedback={true}
        enableFileUpload={true}
        
        onFeedbackSubmit={(messageId, rating, comment) => {
          // Track satisfaction by language
          analytics.track('global_support_feedback', { 
            messageId, 
            rating, 
            comment, 
            language: userLanguage 
          })
        }}
        
        styling={{
          widgetColor: '#0ea5e9',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }}
        
        chatId={\`global-support-\${userLanguage}\`}
        persistChat={true}
      />
    </div>
  )
}`}
            id="multilingual-example"
          />
          
          <h4>Minimal Setup</h4>
          <CodeBlock 
            code={`import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <ChatBot 
        llmProvider="openai"
        apiKey={import.meta.env.VITE_OPENAI_API_KEY}
      />
    </div>
  )
}`}
            id="minimal-example"
          />
        </div>
      )
    }
  ]

  return (
    <div className="doc-main">
      {sections.map(section => (
        <section key={section.id} id={section.id} className="doc-section">
          <button
            className="section-toggle"
            onClick={() => onToggleSection(section.id)}
          >
            <h2>{section.title}</h2>
            {openSections.includes(section.id) ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
          
          {openSections.includes(section.id) && (
            <div className="section-body">
              {section.content}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export default DocumentationContent 