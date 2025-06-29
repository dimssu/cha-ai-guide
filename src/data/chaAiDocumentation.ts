export interface DocSection {
  id: string
  title: string
  content: string
  tags: string[]
}

export interface PropInfo {
  name: string
  type: string
  default: string
  required: boolean
  description: string
}

export const chaAiProps: PropInfo[] = [
  {
    name: 'llmProvider',
    type: 'string',
    default: '-',
    required: true,
    description: 'LLM provider (e.g., "openai", "gemini", "claude")'
  },
  {
    name: 'apiKey',
    type: 'string',
    default: '-',
    required: true,
    description: 'API key for the LLM provider'
  },
  {
    name: 'context',
    type: 'string',
    default: '""',
    required: false,
    description: 'Context information for the chatbot'
  },
  {
    name: 'headerTitle',
    type: 'string',
    default: 'Chat Assistant',
    required: false,
    description: 'Title displayed in the chat header'
  },
  {
    name: 'theme',
    type: "'light' | 'dark' | 'system'",
    default: 'system',
    required: false,
    description: 'Color theme for the chat widget'
  },
  {
    name: 'position',
    type: "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'",
    default: 'bottom-right',
    required: false,
    description: 'Position of the chat widget on screen'
  },
  {
    name: 'showTimestamps',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show timestamps on messages'
  },
  {
    name: 'enableFileUpload',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Enable file upload functionality'
  },
  {
    name: 'enableFeedback',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Enable message feedback (thumbs up/down)'
  },
  {
    name: 'suggestedQuestions',
    type: 'string[]',
    default: '[]',
    required: false,
    description: 'Array of suggested questions to display'
  },
  {
    name: 'styling',
    type: 'object',
    default: '{}',
    required: false,
    description: 'Custom styling options'
  },
  {
    name: 'maxHeight',
    type: 'string',
    default: '500px',
    required: false,
    description: 'Maximum height of the chat window'
  },
  {
    name: 'persistChat',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Persist chat history in localStorage'
  }
]

export const chaAiDocumentation: DocSection[] = [
  {
    id: 'overview',
    title: 'What is Cha-ai?',
    content: 'Cha-ai is a powerful, lightweight React chatbot component that can be easily integrated into any React application. It provides a plug-and-play solution for adding intelligent chat capabilities with features like markdown support, file uploads, feedback collection, and customizable styling.',
    tags: ['overview', 'introduction', 'what is', 'about']
  },
  {
    id: 'installation',
    title: 'Installation',
    content: 'Install cha-ai using npm or yarn:\n\nnpm install cha-ai\n\nor\n\nyarn add cha-ai\n\nThen import it in your React component:\n\nimport ChatBot from "cha-ai"',
    tags: ['install', 'installation', 'setup', 'npm', 'yarn']
  },
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    content: 'The simplest way to use cha-ai is to import the ChatBot component and provide an LLM provider and API key:\n\nimport ChatBot from "cha-ai"\n\nfunction App() {\n  return (\n    <div>\n      <ChatBot \n        llmProvider="gemini"\n        apiKey={import.meta.env.VITE_GEMINI_API_KEY}\n      />\n    </div>\n  )\n}',
    tags: ['usage', 'basic', 'simple', 'example', 'getting started']
  },
  {
    id: 'features',
    title: 'Key Features',
    content: 'Cha-ai includes the following features:\n\n• Markdown support in messages\n• File upload capabilities\n• Message feedback (thumbs up/down)\n• Suggested questions\n• Chat history persistence\n• Customizable styling and theming\n• Multiple positioning options\n• Timestamp display\n• Context-aware conversations\n• Direct LLM API integration',
    tags: ['features', 'capabilities', 'what can it do', 'functionality']
  },
  {
    id: 'styling',
    title: 'Custom Styling',
    content: 'You can customize the appearance of cha-ai using the styling prop:\n\n<ChatBot\n  styling={{\n    widgetColor: "#4f46e5",\n    textColor: "#ffffff",\n    userMessageBackground: "#4f46e5",\n    botMessageBackground: "#f3f4f6",\n    borderRadius: "12px",\n    fontFamily: "Inter, sans-serif"\n  }}\n/>\n\nAvailable styling options include: widgetColor, textColor, userMessageBackground, botMessageBackground, inputBackground, borderColor, borderRadius, fontFamily, fontSize',
    tags: ['styling', 'customization', 'theming', 'colors', 'appearance']
  },
  {
    id: 'direct-llm',
    title: 'Direct LLM Integration',
    content: 'You can connect directly to LLM APIs without a backend:\n\nOpenAI:\n<ChatBot\n  directLlmConfig={{\n    provider: "openai",\n    apiKey: "your-key",\n    model: "gpt-3.5-turbo"\n  }}\n/>\n\nClaude:\n<ChatBot\n  directLlmConfig={{\n    provider: "claude",\n    apiKey: "your-key",\n    model: "claude-3-sonnet-20240229"\n  }}\n/>\n\nGemini:\n<ChatBot\n  directLlmConfig={{\n    provider: "gemini",\n    apiKey: "your-key",\n    model: "gemini-pro"\n  }}\n/>',
    tags: ['direct', 'llm', 'api', 'openai', 'claude', 'gemini', 'backend']
  },
  {
    id: 'markdown',
    title: 'Markdown Support',
    content: 'Cha-ai supports full markdown formatting in chat messages:\n\n• **Bold** and *italic* text\n• [Links](https://example.com)\n• `Inline code` and code blocks\n• Lists (numbered and bulleted)\n• Headers\n• Blockquotes\n\nAll markdown is safely sanitized to prevent XSS attacks.',
    tags: ['markdown', 'formatting', 'bold', 'italic', 'links', 'code', 'security']
  },
  {
    id: 'file-upload',
    title: 'File Upload',
    content: 'Enable file upload functionality by setting enableFileUpload={true}. Users can then upload files to enhance their conversations. The supported file types depend on your backend implementation.',
    tags: ['file', 'upload', 'files', 'attachment', 'documents']
  },
  {
    id: 'feedback',
    title: 'Message Feedback',
    content: 'Enable message feedback with enableFeedback={true}. This allows users to rate bot responses with thumbs up/down, helping you improve the chat experience and gather user feedback.',
    tags: ['feedback', 'rating', 'thumbs up', 'thumbs down', 'user feedback']
  },
  {
    id: 'positioning',
    title: 'Widget Positioning',
    content: 'You can position the chat widget in different corners of the screen using the position prop:\n\n• "bottom-right" (default)\n• "bottom-left"\n• "top-right"\n• "top-left"\n\nExample: <ChatBot position="bottom-left" />',
    tags: ['position', 'positioning', 'corner', 'placement', 'location']
  },
  {
    id: 'themes',
    title: 'Themes',
    content: 'Cha-ai supports three theme options:\n\n• "light" - Light theme\n• "dark" - Dark theme\n• "system" (default) - Follows system preference\n\nExample: <ChatBot theme="dark" />',
    tags: ['theme', 'themes', 'dark', 'light', 'system', 'appearance']
  },
  {
    id: 'persistence',
    title: 'Chat History',
    content: 'Chat history is automatically persisted in localStorage when persistChat={true} (default). The last N messages are used as context for LLM calls to provide better, more relevant responses. You can clear localStorage to reset chat history.',
    tags: ['history', 'persistence', 'localStorage', 'context', 'memory']
  },
  {
    id: 'troubleshooting',
    title: 'Common Issues',
    content: 'Common troubleshooting tips:\n\n1. Module not found: Make sure you installed cha-ai with npm/yarn\n2. Backend connection issues: Verify your backendUrl is correct and accessible\n3. Styling not applying: Check that your styling object properties are correctly named\n4. API key issues: Ensure your API key is valid and has proper permissions\n5. CORS errors: Configure your backend to allow requests from your domain',
    tags: ['troubleshooting', 'issues', 'problems', 'errors', 'help', 'debug']
  }
]

export const getDocumentationByTags = (tags: string[]): DocSection[] => {
  return chaAiDocumentation.filter(doc => 
    tags.some(tag => 
      doc.tags.some(docTag => 
        docTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  )
}

export const searchDocumentation = (query: string): DocSection[] => {
  const lowercaseQuery = query.toLowerCase()
  return chaAiDocumentation.filter(doc => 
    doc.title.toLowerCase().includes(lowercaseQuery) ||
    doc.content.toLowerCase().includes(lowercaseQuery) ||
    doc.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export const getExampleCode = (type: 'basic' | 'styled' | 'full' | 'direct-llm'): string => {
  const examples = {
    basic: `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <ChatBot backendUrl="YOUR_BACKEND_URL" />
    </div>
  )
}`,
    styled: `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <ChatBot
        backendUrl="YOUR_BACKEND_URL"
        theme="dark"
        styling={{
          widgetColor: '#10b981',
          userMessageBackground: '#10b981',
          borderRadius: '16px'
        }}
      />
    </div>
  )
}`,
    full: `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <ChatBot
        backendUrl="YOUR_BACKEND_URL"
        headerTitle="Smart Assistant"
        theme="system"
        position="bottom-right"
        showTimestamps={true}
        enableFileUpload={true}
        enableFeedback={true}
        suggestedQuestions={[
          "How can I help you?",
          "What services do you offer?",
          "Get started guide"
        ]}
        styling={{
          widgetColor: '#8b5cf6',
          borderRadius: '12px'
        }}
        maxHeight="600px"
      />
    </div>
  )
}`,
    'direct-llm': `import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <ChatBot
        directLlmConfig={{
          provider: 'openai',
          apiKey: process.env.REACT_APP_OPENAI_API_KEY,
          model: 'gpt-3.5-turbo',
          systemPrompt: 'You are a helpful assistant.'
        }}
        headerTitle="AI Assistant"
      />
    </div>
  )
}`
  }
  
  return examples[type] || examples.basic
} 