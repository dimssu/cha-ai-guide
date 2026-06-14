import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUp } from 'lucide-react'

type Msg = { id: number; from: 'bot' | 'user'; text: string }

const script: Msg[] = [
  { id: 1, from: 'bot', text: "Hey, I'm cha-ai. Ask me anything about these docs." },
  { id: 2, from: 'user', text: 'How long does setup take?' },
  { id: 3, from: 'bot', text: 'About 30 seconds. One npm install, one component.' },
  { id: 4, from: 'user', text: 'Can I theme it?' },
  { id: 5, from: 'bot', text: 'Fully. Colors, fonts, radius, layout. All props.' },
]

/**
 * Self-playing chat preview. Replays a short scripted conversation with a
 * typing indicator, then loops. The product demonstrating itself. Under
 * reduced-motion it renders the full transcript statically.
 */
const HeroChat = () => {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(reduce ? script.length : 0)
  const [typing, setTyping] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    if (reduce) {
      setVisible(script.length)
      return
    }
    const t = timers.current
    let i = 0

    const step = () => {
      if (i >= script.length) {
        t.push(window.setTimeout(() => {
          i = 0
          setVisible(0)
          setTyping(false)
          t.push(window.setTimeout(step, 600))
        }, 2800))
        return
      }
      const msg = script[i]
      if (msg.from === 'bot') {
        setTyping(true)
        t.push(window.setTimeout(() => {
          setTyping(false)
          setVisible((v) => v + 1)
          i++
          t.push(window.setTimeout(step, 850))
        }, 1150))
      } else {
        setVisible((v) => v + 1)
        i++
        t.push(window.setTimeout(step, 1000))
      }
    }

    t.push(window.setTimeout(step, 650))
    return () => {
      t.forEach(clearTimeout)
      t.length = 0
    }
  }, [reduce])

  return (
    <div className="herochat" role="img" aria-label="Animated preview of a cha-ai conversation">
      <div className="herochat-bar">
        <div className="herochat-dots" aria-hidden>
          <span /><span /><span />
        </div>
        <span className="herochat-title">cha-ai</span>
        <span className="herochat-live" aria-hidden>
          <i /> live
        </span>
      </div>

      <div className="herochat-body">
        <AnimatePresence initial={false}>
          {script.slice(0, visible).map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`hc-msg hc-${m.from}`}
            >
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="hc-msg hc-bot hc-typing"
            aria-hidden
          >
            <span /><span /><span />
          </motion.div>
        )}
      </div>

      <div className="herochat-input" aria-hidden>
        <span className="herochat-placeholder">Ask cha-ai anything…</span>
        <span className="herochat-send"><ArrowUp size={16} /></span>
      </div>
    </div>
  )
}

export default HeroChat
