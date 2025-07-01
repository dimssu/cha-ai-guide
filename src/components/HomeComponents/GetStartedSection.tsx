import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const GetStartedSection = () => {
  return (
    <>
      {/* Quick Start Section */}
      <section className="quick-start section">
        <div className="container">
          <div className="quick-start-content">
            <div className="quick-start-text">
              <h2>Get Started in Minutes</h2>
              <p>Add a powerful chatbot to your React app with just three simple steps.</p>
              
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Install</h4>
                    <p>Add cha-ai to your project</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Import</h4>
                    <p>Import the ChatBot component</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Use</h4>
                    <p>Drop it into your JSX</p>
                  </div>
                </div>
              </div>
              
              <Link to="/docs" className="btn btn-primary">
                View Full Documentation
                <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="quick-start-code">
              <div className="code-block">
                <div className="code-header">
                  <span>Terminal</span>
                </div>
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem'
                  }}
                >
                  npm install cha-ai
                </SyntaxHighlighter>
              </div>
              
              <div className="code-block">
                <div className="code-header">
                  <span>App.tsx</span>
                </div>
                <SyntaxHighlighter
                  language="tsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem'
                  }}
                >
{`import ChatBot from 'cha-ai'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ChatBot 
        llmProvider='your_llm_provider'
        apiKey={your_api_key}
        headerTitle="Chat Assistant"
        theme="light"
        context='Your context here'
      />
    </div>
  )
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section section-alt">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of developers building amazing chat experiences with Cha-ai.</p>
            <div className="cta-actions">
              <Link to="/docs" className="btn btn-primary">
                Read Documentation
                <ArrowRight size={18} />
              </Link>
              <Link to="/playground" className="btn btn-secondary">
                Try Playground
              </Link>
              <a 
                href="https://github.com/your-username/cha-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GetStartedSection 