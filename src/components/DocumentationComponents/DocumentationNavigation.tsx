interface Section {
  id: string
  title: string
}

interface DocumentationNavigationProps {
  sections: Section[]
}

const DocumentationNavigation = ({ sections }: DocumentationNavigationProps) => {
  return (
    <nav className="doc-nav">
      <h3>Table of Contents</h3>
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default DocumentationNavigation 