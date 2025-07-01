const ExamplesFooter = () => {
  return (
    <div className="examples-footer">
      <div className="footer-content">
        <h2>Ready to Build Your Own?</h2>
        <p>These examples show just a few of the possibilities with Cha-ai. Check out the full documentation to learn more about all available features and customization options.</p>
        <div className="footer-actions">
          <a href="/docs" className="btn btn-primary">
            Read Documentation
          </a>
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
  )
}

export default ExamplesFooter 