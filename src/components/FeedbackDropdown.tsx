import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { MessageSquare, X, Star, Send } from 'lucide-react'
import './FeedbackDropdown.scss'
import toast from 'react-hot-toast'

export interface FeedbackDropdownHandle {
  openWithCategory: (category: FeedbackData['category']) => void
}

interface FeedbackData {
  rating: number
  name: string
  email: string
  message: string
  category: 'positive' | 'negative' | 'bug' | 'suggestion' | 'feature_request'
}

const FeedbackDropdown = forwardRef<FeedbackDropdownHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    name: '',
    email: '',
    message: '',
    category: 'positive'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isDisabled = isSubmitting || !feedback.message.trim() || !feedback.email.trim() || feedback.rating === 0

  useImperativeHandle(ref, () => ({
    openWithCategory: (category) => {
      setIsOpen(true)
      setFeedback(prev => ({ ...prev, category }))
    }
  }))

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [props])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Build payload
    const payload = {
      submitter: {
        name: feedback.name || '',
        email: feedback.email || '',
        role: '',
        userId: ''
      },
      recipient: {
        name: 'Cha-ai Product Team',
        email: 'feedbacksdimsuu@gmail.com',
        role: 'Admin',
        team: 'Admin'
      },
      feedback: {
        content: feedback.message,
        rating: feedback.rating,
        type: feedback.category,
        category: feedback.category
      },
      context: {
        applicationName: 'Cha-ai Guide',
        featureName: 'Feedback',
        version: '1.0.11',
        environment: import.meta.env.VITE_NODE_ENV || 'development',
        userAgent: navigator.userAgent,
        url: window.location.href
      },
      metadata: {
        attachments: [],
        tags: [],
        customFields: {},
        sessionId: '',
        timestamp: new Date().toISOString()
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_NARADH_API_URL}/feedback/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      console.log(response)
      if (response.ok) {
        setIsSubmitted(true)
        setIsSubmitting(false)
        toast.success('Feedback submitted successfully')
      } else {
        toast.error('Failed to submit feedback')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    }

    setIsSubmitted(true)
    setIsSubmitting(false)

    setTimeout(() => {
        setIsOpen(false)
    },1500) 

    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFeedback({ rating: 0, name: '', email: '', message: '', category: 'positive' })
    }, 2000)
  }

  const handleStarClick = (rating: number) => {
    setFeedback(prev => ({ ...prev, rating }))
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'positive': return '😊'
      case 'negative': return '😞'
      case 'bug': return '🐛'
      case 'suggestion': return '💡'
      case 'feature_request': return '✨'
      default: return '💬'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'positive': return 'Positive'
      case 'negative': return 'Negative'
      case 'bug': return 'Bug Report'
      case 'suggestion': return 'Suggestion'
      case 'feature_request': return 'Feature Request'
      default: return 'Feedback'
    }
  }

  return (
    <div className="feedback-dropdown" ref={dropdownRef}>
      <button
        className="feedback-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Give feedback"
      >
        <MessageSquare size={18} />
        Feedback
      </button>

      {/* Backdrop */}
      <div 
        className={`feedback-backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`feedback-panel ${isOpen ? 'open' : ''}`}>
        <div className="feedback-header">
          <h3>Share Your Feedback</h3>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close feedback"
          >
            <X size={16} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="feedback-success">
            <div className="success-icon">✅</div>
            <h4>Thank you!</h4>
            <p>Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            {/* Star Rating */}
            <div className="form-group">
              <label>How would you rate your experience?</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star${star <= (hoveredStar ?? feedback.rating) ? ' hovered' : ''}${star <= feedback.rating ? ' filled' : ''}`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star size={20} />
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className="form-group">
              <label>Category</label>
              <div className="category-selector">
                {(['positive', 'negative', 'bug', 'suggestion', 'feature_request'] as const).map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`category-chip ${feedback.category === category ? 'active' : ''}`}
                    onClick={() => setFeedback(prev => ({ ...prev, category }))}
                    title={getCategoryLabel(category)}
                  >
                    <span className="category-emoji">{getCategoryEmoji(category)}</span>
                    <span className="category-text">{getCategoryLabel(category)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="feedback-email">Email</label>
              <input
                id="feedback-email"
                type="email"
                value={feedback.email}
                onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="feedback-input"
              />
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="feedback-name">Name</label>
              <input
                id="feedback-name"
                type="text"
                value={feedback.name}
                onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="feedback-input"
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="feedback-message">Your message</label>
              <textarea
                id="feedback-message"
                value={feedback.message}
                onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us what you think..."
                rows={3}
                required
                className="feedback-textarea"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isDisabled}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Feedback
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
})

export default FeedbackDropdown 