import DocumentationHeader from '../components/DocumentationComponents/DocumentationHeader'
import DocumentationNavigation from '../components/DocumentationComponents/DocumentationNavigation'
import DocumentationContent from '../components/DocumentationComponents/DocumentationContent'
import './Documentation.scss'

const Documentation = () => {
  const sections = [
    { id: 'installation', title: 'Installation' },
    { id: 'basic-usage', title: 'Basic Usage' },
    { id: 'direct-llm', title: 'Direct LLM Configuration' },
    { id: 'props', title: 'Props & Configuration' },
    { id: 'styling', title: 'Custom Styling' },
    { id: 'features', title: 'Features' },
    { id: 'examples', title: 'Complete Examples' }
  ]

  return (
    <div className="documentation">
      <div className="container">
        <DocumentationHeader />
        
        <div className="doc-content">
          <DocumentationNavigation sections={sections} />
          <DocumentationContent />
        </div>
      </div>
    </div>
  )
}

export default Documentation 