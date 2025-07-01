import { useState, useCallback, useEffect } from 'react'
import { generateChaAiContext } from '../data/chaAiDocumentation'
import { generateSmartContext, analyzeUserIntent } from './smartContext'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface UseChatContextReturn {
  context: string
  updateContextForQuery: (query: string) => void
  resetContext: () => void
  getRelevantDocs: (query: string) => string[]
  analyzeQuery: (query: string) => ReturnType<typeof analyzeUserIntent>
  conversationHistory: ChatMessage[]
  addToHistory: (role: 'user' | 'assistant', content: string) => void
}

/**
 * Custom hook for managing dynamic ChatBot context
 * Automatically updates context based on user queries to provide more relevant responses
 */
export const useChatContext = (initialContext?: string): UseChatContextReturn => {
  const [context, setContext] = useState<string>(initialContext || generateChaAiContext())
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([])

  // Update context based on user query
  const updateContextForQuery = useCallback((query: string) => {
    const smartContext = generateSmartContext(query)
    setContext(smartContext)
    
    // Add query to history for future context generation
    addToHistory('user', query)
  }, [])

  // Reset to default comprehensive context
  const resetContext = useCallback(() => {
    setContext(generateChaAiContext())
  }, [])

  // Get relevant documentation sections for a query
  const getRelevantDocs = useCallback((query: string) => {
    const analysis = analyzeUserIntent(query)
    return analysis.topics
  }, [])

  // Analyze user query intent and topics
  const analyzeQuery = useCallback((query: string) => {
    return analyzeUserIntent(query)
  }, [])

  // Add message to conversation history
  const addToHistory = useCallback((role: 'user' | 'assistant', content: string) => {
    setConversationHistory(prev => [
      ...prev,
      { role, content, timestamp: new Date() }
    ].slice(-10)) // Keep only last 10 messages for performance
  }, [])

  // Auto-update context when conversation history changes
  useEffect(() => {
    if (conversationHistory.length > 0) {
      const lastUserMessage = conversationHistory
        .filter(msg => msg.role === 'user')
        .slice(-1)[0]
      
      if (lastUserMessage) {
        const enhancedContext = generateSmartContext(lastUserMessage.content)
        setContext(enhancedContext)
      }
    }
  }, [conversationHistory])

  return {
    context,
    updateContextForQuery,
    resetContext,
    getRelevantDocs,
    analyzeQuery,
    conversationHistory,
    addToHistory
  }
}

/**
 * Higher-order component for ChatBot with smart context
 * Usage example:
 * 
 * function MyComponent() {
 *   const { context, updateContextForQuery } = useChatContext()
 *   
 *   return (
 *     <ChatBot
 *       context={context}
 *       onUserMessage={updateContextForQuery} // If cha-ai supports this callback
 *       {...otherProps}
 *     />
 *   )
 * }
 */

export default useChatContext 