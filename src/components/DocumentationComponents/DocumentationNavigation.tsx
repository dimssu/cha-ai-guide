interface Section {
  id: string
  title: string
}

interface DocumentationNavigationProps {
  sections: Section[]
  activeSection?: string
  onSectionClick?: (sectionId: string) => void
  onCollapseAll?: () => void
  onExpandAll?: () => void
}

const DocumentationNavigation = ({ sections, activeSection, onSectionClick, onCollapseAll, onExpandAll }: DocumentationNavigationProps) => {
  const handleNavClick = (sectionId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    
    // Notify parent to expand the section first
    onSectionClick?.(sectionId)
    
    // Update URL without triggering scroll
    window.history.pushState({}, '', `#${sectionId}`)
    
    // Smooth scroll to the section after a small delay to allow section to expand
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const elementPosition = element.offsetTop
        const offsetPosition = elementPosition - 80 // 20px offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <nav className="doc-nav">
      <div className="nav-header">
        <h3>Table of Contents</h3>
        <div className="nav-controls">
          <button 
            className="nav-control-btn"
            onClick={onExpandAll}
            title="Expand All Sections"
          >
            Expand All
          </button>
          <button 
            className="nav-control-btn"
            onClick={onCollapseAll}
            title="Collapse All Sections"
          >
            Collapse All
          </button>
        </div>
      </div>
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <a 
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
              onClick={(e) => handleNavClick(section.id, e)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default DocumentationNavigation 