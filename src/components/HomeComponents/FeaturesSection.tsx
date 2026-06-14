import { Puzzle, Cable, ShieldCheck, Palette, Paperclip, MessagesSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../../motion'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  cell: string
  badge?: string
}

const features: Feature[] = [
  {
    icon: Puzzle,
    title: 'Plug & play',
    description: 'Drop one <ChatBot /> into any React app. No providers, no boilerplate, no config ceremony.',
    cell: 'bento-a',
  },
  {
    icon: Cable,
    title: 'Direct LLM integration',
    description: 'Wire up OpenAI, Gemini or Claude straight from the client. Bring a key, skip the backend.',
    cell: 'bento-b',
  },
  {
    icon: ShieldCheck,
    title: 'Markdown, safely',
    description: 'Rich markdown rendering with built-in sanitization. XSS stays out.',
    cell: 'bento-c',
  },
  {
    icon: Palette,
    title: 'Themeable to the pixel',
    description: 'Colors, fonts, radius, position, custom buttons. Every surface is a prop.',
    cell: 'bento-d',
  },
  {
    icon: Paperclip,
    title: 'File upload',
    description: 'Optional attachments for richer conversations.',
    cell: 'bento-e',
    badge: 'Beta',
  },
  {
    icon: MessagesSquare,
    title: 'Context-aware',
    description: 'Feeds history back as context, with dynamic per-message context for sharper replies.',
    cell: 'bento-f',
  },
]

const FeaturesSection = () => {
  return (
    <section className="features section section-alt">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What you get</span>
          <h2>Everything the demo promises, shipped in the package.</h2>
          <p>Powerful chatbot functionality without the integration tax. These are real props you can use today.</p>
        </Reveal>

        <div className="bento">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.title} className={`bento-cell ${f.cell}`} delay={i * 0.06} distance={30}>
                <div className="bento-icon">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div className="bento-text">
                  <h3>
                    {f.title}
                    {f.badge && <span className="bento-badge">{f.badge}</span>}
                  </h3>
                  <p>{f.description}</p>
                </div>
                {f.cell === 'bento-a' && (
                  <div className="bento-snippet" aria-hidden>
                    <span className="bento-snippet-prompt">$</span> npm install cha-ai
                  </div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
