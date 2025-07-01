import { useState, useEffect } from 'react'
import DocumentationHeader from '../components/DocumentationComponents/DocumentationHeader'
import DocumentationNavigation from '../components/DocumentationComponents/DocumentationNavigation'
import DocumentationContent from '../components/DocumentationComponents/DocumentationContent'
import './Documentation.scss'

const Documentation = () => {
  const [openSections, setOpenSections] = useState<string[]>(['installation'])
  const [activeSection, setActiveSection] = useState<string>('installation')

  const sections = [
    { id: 'installation', title: 'Installation' },
    { id: 'basic-usage', title: 'Basic Usage' },
    { id: 'direct-llm', title: 'Direct LLM Configuration' },
    { id: 'props', title: 'Props & Configuration' },
    { id: 'styling', title: 'Custom Styling' },
    { id: 'positioning-theming', title: 'Positioning & Theming' },
    { id: 'ui-customization', title: 'UI Customization' },
    { id: 'file-upload-feedback', title: 'File Upload & Feedback' },
    { id: 'event-handlers', title: 'Event Handlers & Callbacks' },
    { id: 'features', title: 'Built-in Features' },
    { id: 'examples', title: 'Complete Examples' }
  ]

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    if (!openSections.includes(sectionId)) {
      setOpenSections(prev => [...prev, sectionId])
    }
  }

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const isCurrentlyOpen = prev.includes(sectionId)
      
      // If collapsing a section and it matches the current hash, clear the hash
      if (isCurrentlyOpen && window.location.hash === `#${sectionId}`) {
        window.history.pushState({}, '', window.location.pathname)
      }
      
      return isCurrentlyOpen 
        ? prev.filter(s => s !== sectionId)
        : [...prev, sectionId]
    })
  }

  const collapseAll = () => {
    setOpenSections([])
    window.history.pushState({}, '', window.location.pathname)
  }

  const expandAll = () => {
    setOpenSections(sections.map(section => section.id))
  }

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(item => item.element)

      let currentActiveSection = activeSection

      for (const { id, element } of sectionElements) {
        const rect = element!.getBoundingClientRect()
        // Consider a section active if it's within the top 20% of the viewport
        if (rect.top <= window.innerHeight * 0.2 && rect.bottom >= 0) {
          currentActiveSection = id
        }
      }

      if (currentActiveSection !== activeSection) {
        setActiveSection(currentActiveSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, activeSection])

  return (
    <div className="documentation">
      <div className="container">
        <DocumentationHeader />
        
        <div className="doc-content">
          <DocumentationNavigation 
            sections={sections} 
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
            onCollapseAll={collapseAll}
            onExpandAll={expandAll}
          />
          <DocumentationContent 
            openSections={openSections}
            onToggleSection={toggleSection}
            onSetOpenSections={setOpenSections}
          />
        </div>
      </div>
    </div>
  )
}

export default Documentation 