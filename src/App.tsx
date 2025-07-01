import { Routes, Route, useLocation } from 'react-router-dom'
import ChatBot from 'cha-ai'
import Layout from './components/Layout'
import Home from './pages/Home'
import Documentation from './pages/Documentation'
import Examples from './pages/Examples'
import Playground from './pages/Playground'
import './App.scss'
import { generateChaAiContext } from './data/chaAiDocumentation'
import { useEffect, useState } from 'react'

function App() {

  const location = useLocation()
  const [showGlobalChat, setShowGlobalChat] = useState(true)

  useEffect(() => {
    if (location.pathname === '/playground') {
      setShowGlobalChat(false)
    } else {
      setShowGlobalChat(true)
    }
  }, [location.pathname])

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </Layout>
      
      {/* Cha-ai ChatBot - Users can ask about the documentation */}
      {showGlobalChat && 
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
            widgetColor: '#fff',
            textColor: '#fff',
            userMessageBackground: '#4f46e5',
            botMessageBackground: '#111827',
            borderRadius: '12px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            customChatButtonStyle: {
              backgroundColor: '#fff',
              padding: '10px',
            }
          }}
          maxHeight="600px"
          persistChat={true}
          context={generateChaAiContext()}
          customChatButton='https://lottie.host/embed/0df71204-aba8-4fa3-874a-0781f79fe41d/nARRb2P4KE.lottie'
        />
      }
    </div>
  )
}

export default App
