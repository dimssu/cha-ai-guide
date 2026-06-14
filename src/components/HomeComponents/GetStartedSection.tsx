import { Link } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Reveal, Magnetic } from '../../motion'

const steps = [
  { n: '01', title: 'Install', body: 'Add cha-ai to your project.' },
  { n: '02', title: 'Import', body: 'Pull in the ChatBot component.' },
  { n: '03', title: 'Drop it in', body: 'Render it anywhere in your JSX.' },
]

const codeStyle = {
  margin: 0,
  padding: '1.1rem 1.25rem',
  background: 'transparent',
  fontSize: '0.85rem',
  lineHeight: 1.7,
  fontFamily: "'JetBrains Mono', monospace",
}

const usage = `import ChatBot from 'cha-ai'

function App() {
  return (
    <ChatBot
      llmProvider="gemini"
      apiKey={GEMINI_KEY}
      headerTitle="Ask anything"
      theme="system"
    />
  )
}`

const GetStartedSection = () => {
  return (
    <>
      {/* Quick start - steps + code, a split distinct from the bento above */}
      <section className="quick-start section">
        <div className="container quick-start-grid">
          <Reveal className="quick-start-text" direction="right">
            <h2>Live before your coffee gets cold.</h2>
            <p>From zero to a working chatbot in about thirty seconds.</p>

            <ol className="steps">
              {steps.map((s) => (
                <li key={s.n} className="step">
                  <span className="step-number">{s.n}</span>
                  <div className="step-content">
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="quick-start-code" delay={0.1}>
            <div className="code-card">
              <div className="code-card-bar">
                <span className="code-dots" aria-hidden><i /><i /><i /></span>
                <span className="code-file">terminal</span>
              </div>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={codeStyle}>
                npm install cha-ai
              </SyntaxHighlighter>
            </div>

            <div className="code-card">
              <div className="code-card-bar">
                <span className="code-dots" aria-hidden><i /><i /><i /></span>
                <span className="code-file">App.tsx</span>
              </div>
              <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={codeStyle}>
                {usage}
              </SyntaxHighlighter>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA - bold ink color block, a distinct layout family */}
      <section className="cta">
        <div className="container">
          <Reveal className="cta-block">
            <div className="cta-noise" aria-hidden />
            <div className="cta-inner">
              <h2 className="display">
                Ready to ship a <span className="cta-mark">chatbot</span>?
              </h2>
              <p>Read the docs, copy a snippet, and have a working assistant in your app today.</p>
              <div className="cta-actions">
                <Magnetic strength={0.4}>
                  <Link to="/docs" className="btn btn-primary btn-lg">
                    Get started
                    <ArrowRight size={18} />
                  </Link>
                </Magnetic>
                <a
                  href="https://github.com/dimssu/Talkr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg cta-ghost"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default GetStartedSection
