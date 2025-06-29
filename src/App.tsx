import { Routes, Route } from 'react-router-dom'
import ChatBot from 'cha-ai'
import Layout from './components/Layout'
import Home from './pages/Home'
import Documentation from './pages/Documentation'
import Examples from './pages/Examples'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/examples" element={<Examples />} />
        </Routes>
      </Layout>
      
      {/* Cha-ai ChatBot - Users can ask about the documentation */}
      <ChatBot
        llmProvider='gemini'
        apiKey={import.meta.env.VITE_GEMINI_API_KEY}
        headerTitle="Ask about Cha-ai"
        theme="system"
        position="bottom-right"
        showTimestamps={true}
        enableFeedback={true}
        suggestedQuestions={[
          "How do I install cha-ai?",
          "What props are available?",
          "How do I customize the styling?",
          "Can you show me an example?",
          "What features does cha-ai have?",
          "How do I use direct LLM integration?"
        ]}
        styling={{
          widgetColor: '#4f46e5',
          textColor: '#fff',
          userMessageBackground: '#4f46e5',
          botMessageBackground: '#f3f4f6',
          borderRadius: '12px',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        }}
        maxHeight="600px"
        persistChat={true}
        context='' // TODO: Add context for the chatbot
      />
    </div>
  )
}

export default App
