import { useState } from 'react'
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'
import './Documentation.scss'

const Documentation = () => {
  const [openSections, setOpenSections] = useState<string[]>(['installation'])
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

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
                  <td><code>llmProvider</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>LLM provider (e.g., 'openai', 'gemini', 'claude')</td>
                </tr>
                <tr>
                  <td><code>apiKey</code></td>
                  <td>string</td>
                  <td>-</td>
                  <td>API key for the LLM provider</td>
                </tr>
                <tr>
                  <td><code>context</code></td>
                  <td>string</td>
                  <td>''</td>
                  <td>Context information for the chatbot</td>
                </tr>
                <tr>
                  <td><code>headerTitle</code></td>
                  <td>string</td>
                  <td>"Chat Assistant"</td>
                  <td>Title displayed in the chat header</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td>'light' | 'dark' | 'system'</td>
                  <td>'system'</td>
                  <td>Color theme for the chat widget</td>
                </tr>
                <tr>
                  <td><code>position</code></td>
                  <td>'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'</td>
                  <td>'bottom-right'</td>
                  <td>Position of the chat widget on screen</td>
                </tr>
                <tr>
                  <td><code>showTimestamps</code></td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Show timestamps on messages</td>
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
                  <td>Enable message feedback (thumbs up/down)</td>
                </tr>
                <tr>
                  <td><code>suggestedQuestions</code></td>
                  <td>string[]</td>
                  <td>[]</td>
                  <td>Array of suggested questions to display</td>
                </tr>
                <tr>
                  <td><code>styling</code></td>
                  <td>object</td>
                  <td>{}</td>
                  <td>Custom styling options</td>
                </tr>
                <tr>
                  <td><code>maxHeight</code></td>
                  <td>string</td>
                  <td>'500px'</td>
                  <td>Maximum height of the chat window</td>
                </tr>
                <tr>
                  <td><code>persistChat</code></td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Persist chat history in localStorage</td>
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
    widgetColor: '#4f46e5',
    textColor: '#ffffff',
    userMessageBackground: '#4f46e5',
    botMessageBackground: '#f3f4f6',
    inputBackground: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px'
  }}
/>`}
            id="custom-styling"
          />
          
          <h4>Available Styling Options</h4>
          <ul>
            <li><code>widgetColor</code> - Primary color for the widget</li>
            <li><code>textColor</code> - Text color for messages</li>
            <li><code>userMessageBackground</code> - Background color for user messages</li>
            <li><code>botMessageBackground</code> - Background color for bot messages</li>
            <li><code>inputBackground</code> - Background color for input field</li>
            <li><code>borderColor</code> - Border color for elements</li>
            <li><code>borderRadius</code> - Border radius for rounded corners</li>
            <li><code>fontFamily</code> - Font family for text</li>
            <li><code>fontSize</code> - Font size for text</li>
          </ul>
        </div>
      )
    },
    {
      id: 'direct-llm',
      title: 'Direct LLM Configuration',
      content: (
        <div className="section-content">
          <p>You can configure the chatbot to work directly with LLM APIs without a backend:</p>
          
          <h4>OpenAI Configuration</h4>
          <CodeBlock 
            code={`<ChatBot
  llmProvider="openai"
  apiKey={import.meta.env.VITE_OPENAI_API_KEY}
  headerTitle="OpenAI Assistant"
  context="You are a helpful assistant."
/>`}
            id="openai-config"
          />
          
          <h4>Claude Configuration</h4>
          <CodeBlock 
            code={`<ChatBot
  llmProvider="claude"
  apiKey={import.meta.env.VITE_CLAUDE_API_KEY}
  headerTitle="Claude Assistant"
  context="You are a helpful assistant."
/>`}
            id="claude-config"
          />
          
          <h4>Gemini Configuration</h4>
          <CodeBlock 
            code={`<ChatBot
  llmProvider="gemini"
  apiKey={import.meta.env.VITE_GEMINI_API_KEY}
  headerTitle="Gemini Assistant"
  context="You are a helpful assistant."
/>`}
            id="gemini-config"
          />
        </div>
      )
    },
    {
      id: 'features',
      title: 'Features',
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
          
          <h4>Chat History & Context</h4>
          <p>The chatbot automatically:</p>
          <ul>
            <li>Persists chat history in localStorage</li>
            <li>Uses recent messages as context for better responses</li>
            <li>Maintains conversation continuity across sessions</li>
          </ul>
          
          <h4>File Upload</h4>
          <p>When enabled, users can upload files to enhance conversations. Supported file types depend on your backend implementation.</p>
          
          <h4>Feedback System</h4>
          <p>Users can rate bot responses with thumbs up/down feedback, helping improve the chat experience.</p>
        </div>
      )
    },
    {
      id: 'examples',
      title: 'Complete Examples',
      content: (
        <div className="section-content">
          <h4>Full Featured Chatbot</h4>
          <CodeBlock 
            code={`import ChatBot from 'cha-ai'

function App() {
  return (
    <div className="app">
      <header>
        <h1>My Website</h1>
      </header>
      
      <main>
        <p>Your main content here...</p>
      </main>
      
      <ChatBot
        backendUrl="https://api.yourdomain.com/chat"
        headerTitle="Support Assistant"
        theme="light"
        position="bottom-right"
        showTimestamps={true}
        enableFileUpload={true}
        enableFeedback={true}
        suggestedQuestions={[
          "How can I help you?",
          "What services do you offer?",
          "How do I get started?",
          "Contact support"
        ]}
        styling={{
          widgetColor: '#2563eb',
          textColor: '#ffffff',
          userMessageBackground: '#2563eb',
          botMessageBackground: '#f1f5f9',
          borderRadius: '16px'
        }}
        maxHeight="600px"
        persistChat={true}
      />
    </div>
  )
}`}
            id="full-example"
          />
          
          <h4>Minimal Setup</h4>
          <CodeBlock 
            code={`import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <ChatBot backendUrl="YOUR_BACKEND_URL" />
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
    <div className="documentation">
      <div className="container">
        <div className="doc-header">
          <h1>Documentation</h1>
          <p>Everything you need to know about integrating and customizing Cha-ai in your React applications.</p>
        </div>
        
        <div className="doc-content">
          <nav className="doc-nav">
            <h3>Table of Contents</h3>
            <ul>
              {sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="doc-main">
            {sections.map(section => (
              <section key={section.id} id={section.id} className="doc-section">
                <button
                  className="section-toggle"
                  onClick={() => toggleSection(section.id)}
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
        </div>
      </div>
    </div>
  )
}

export default Documentation 