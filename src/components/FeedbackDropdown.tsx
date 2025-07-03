import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Star, Send } from 'lucide-react'
import './FeedbackDropdown.scss'

interface FeedbackData {
  rating: number
  email: string
  message: string
  category: 'positive' | 'negative' | 'bug' | 'suggestion' | 'feature_request'
}

const FeedbackDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    email: '',
    message: '',
    category: 'positive'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 2 seconds
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setFeedback({ rating: 0, email: '', message: '', category: 'positive' })
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
              <label htmlFor="feedback-email">Email (optional)</label>
              <input
                id="feedback-email"
                type="email"
                value={feedback.email}
                onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
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
              disabled={isSubmitting || !feedback.message.trim()}
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
}

export default FeedbackDropdown 