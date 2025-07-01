import { generateChaAiContext, generateDynamicContext, searchDocumentation } from '../data/chaAiDocumentation'

// Keywords that indicate specific topics
const TOPIC_KEYWORDS = {
  installation: ['install', 'setup', 'npm', 'yarn', 'getting started'],
  styling: ['style', 'theme', 'color', 'appearance', 'custom', 'css'],
  props: ['prop', 'property', 'parameter', 'config', 'option'],
  api: ['api', 'llm', 'openai', 'gemini', 'claude', 'backend'],
  features: ['feature', 'capability', 'function', 'upload', 'feedback', 'markdown'],
  positioning: ['position', 'corner', 'placement', 'bottom', 'top', 'left', 'right'],
  troubleshooting: ['error', 'issue', 'problem', 'debug', 'help', 'fix', 'cors']
}

// Analyze user query to determine intent and relevant topics
export const analyzeUserIntent = (query: string): {
  topics: string[]
  intent: 'question' | 'request_example' | 'troubleshooting' | 'general'
  confidence: number
} => {
  const lowercaseQuery = query.toLowerCase()
  const words = lowercaseQuery.split(/\s+/)
  
  // Detect topics
  const detectedTopics: string[] = []
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some(keyword => lowercaseQuery.includes(keyword))) {
      detectedTopics.push(topic)
    }
  }
  
  // Detect intent
  let intent: 'question' | 'request_example' | 'troubleshooting' | 'general' = 'general'
  if (words.some(word => ['how', 'what', 'when', 'where', 'why', 'can', 'does'].includes(word))) {
    intent = 'question'
  } else if (words.some(word => ['example', 'show', 'demo', 'code'].includes(word))) {
    intent = 'request_example'
  } else if (words.some(word => ['error', 'issue', 'problem', 'fix', 'help'].includes(word))) {
    intent = 'troubleshooting'
  }
  
  const confidence = detectedTopics.length > 0 ? Math.min(detectedTopics.length * 0.3 + 0.4, 1) : 0.2
  
  return { topics: detectedTopics, intent, confidence }
}

// Generate smart context based on user query analysis
export const generateSmartContext = (userQuery: string): string => {
  const analysis = analyzeUserIntent(userQuery)
  
  // If we can't confidently determine the topic, return full context
  if (analysis.confidence < 0.4) {
    return generateChaAiContext()
  }
  
  // Generate targeted context based on detected topics
  if (analysis.topics.length > 0) {
    return generateDynamicContext(userQuery)
  }
  
  return generateChaAiContext()
}

// Enhanced context with conversation memory (for future implementation)
export const generateContextWithMemory = (
  userQuery: string, 
  conversationHistory: Array<{role: 'user' | 'assistant', content: string}>
): string => {
  const baseContext = generateSmartContext(userQuery)
  
  // Analyze recent conversation for context
  const recentQueries = conversationHistory
    .filter(msg => msg.role === 'user')
    .slice(-3)
    .map(msg => msg.content)
  
  if (recentQueries.length === 0) {
    return baseContext
  }
  
  // Combine contexts from recent queries
  const combinedTopics = recentQueries
    .flatMap(query => analyzeUserIntent(query).topics)
    .filter((topic, index, arr) => arr.indexOf(topic) === index) // Remove duplicates
  
  if (combinedTopics.length > 0) {
    const contextualQuery = `${userQuery} ${combinedTopics.join(' ')}`
    return generateDynamicContext(contextualQuery)
  }
  
  return baseContext
}

// Real-time context updater (for advanced implementation)
export const createContextUpdater = () => {
  let currentContext = generateChaAiContext()
  
  return {
    updateContext: (userQuery: string) => {
      currentContext = generateSmartContext(userQuery)
      return currentContext
    },
    getCurrentContext: () => currentContext,
    resetToDefault: () => {
      currentContext = generateChaAiContext()
      return currentContext
    }
  }
} 