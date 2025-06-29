# Cha-ai Documentation & UI

A comprehensive documentation website and interactive guide for the **cha-ai** React chatbot component. This project showcases the capabilities of cha-ai while providing users with detailed documentation, live examples, and an integrated chatbot experience.

## 🌟 Features

### 📚 Comprehensive Documentation
- **Installation Guide** - Step-by-step setup instructions
- **API Reference** - Complete props and configuration documentation
- **Usage Examples** - Real-world implementation examples
- **Styling Guide** - Custom theming and styling options
- **Interactive Code Blocks** - Copy-to-clipboard functionality

### 🎮 Live Examples
- **Basic Implementation** - Minimal setup example
- **Customized Styling** - Theme and color customization
- **Full-Featured** - All features enabled
- **Direct LLM Integration** - API key-based configuration

### 🤖 Integrated Chatbot Experience
- **Self-Referential** - Users can ask the chatbot about cha-ai itself
- **Context-Aware** - Understands documentation content
- **Interactive Help** - Real-time assistance for implementation

### 🎨 Modern UI/UX
- **Responsive Design** - Works on all devices
- **Dark/Light Mode Support** - Automatic theme detection
- **Smooth Animations** - Professional transitions and effects
- **Accessibility** - WCAG compliant design

## 🚀 Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **SCSS** for styling with CSS custom properties
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **React Syntax Highlighter** for code display
- **Cha-ai** (the package being documented)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cha-ai-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout with navigation
│   └── Layout.scss         # Layout styles
├── pages/
│   ├── Home.tsx           # Landing page with hero section
│   ├── Home.scss          # Home page styles
│   ├── Documentation.tsx   # Interactive documentation
│   ├── Documentation.scss  # Documentation styles
│   ├── Examples.tsx       # Live examples with previews
│   └── Examples.scss      # Examples page styles
├── App.tsx                # Main app with routing
├── App.scss              # Global styles and variables
└── main.tsx              # App entry point
```

## 🎯 Key Components

### Home Page
- Hero section with animated chat preview
- Feature highlights with icons
- Quick start guide with code examples
- Call-to-action sections

### Documentation
- Collapsible sections for easy navigation 
- Searchable table of contents
- Interactive code blocks with syntax highlighting
- Comprehensive API reference table
- Copy-to-clipboard functionality

### Examples
- Live, interactive chatbot previews
- Side-by-side code and preview display
- Multiple implementation scenarios
- Real working examples with cha-ai

### Layout
- Responsive navigation with mobile menu
- Sticky header with smooth scrolling
- Footer with useful links
- Professional branding and styling

## 🎨 Customization

### CSS Variables
The project uses CSS custom properties for easy theming:

```scss
:root {
  --primary-color: #4f46e5;
  --secondary-color: #6366f1;
  --background: #ffffff;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  // ... more variables
}
```

### Dark Mode
Automatic dark mode support based on system preferences:

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --background: #111827;
    --text-primary: #f9fafb;
    // ... dark theme variables
  }
}
```

## 🤖 Chatbot Integration

The site includes a working cha-ai chatbot that can answer questions about:
- Installation and setup
- Props and configuration options
- Usage examples and best practices
- Troubleshooting common issues

To configure the chatbot backend, update the `backendUrl` in `src/App.tsx`:

```tsx
<ChatBot
  backendUrl="YOUR_BACKEND_URL" // Replace with your backend
  headerTitle="Ask about Cha-ai"
  // ... other props
/>
```

## 📱 Responsive Design

The entire site is fully responsive with breakpoints for:
- **Mobile**: < 480px
- **Tablet**: < 768px  
- **Desktop**: < 1024px
- **Large Desktop**: 1024px+

## 🚀 Performance

- **Fast Loading** - Optimized with Vite bundling
- **Code Splitting** - Route-based code splitting
- **Lazy Loading** - Components loaded on demand
- **Optimized Assets** - Compressed images and fonts

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** formatting (recommended)
- **SCSS** with organized structure

## 📄 License

MIT License - feel free to use this as a template for your own documentation sites.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions about this documentation site:
- Open an issue on GitHub
- Check the existing documentation
- Use the integrated chatbot for quick help

For questions about the cha-ai package itself:
- Visit the cha-ai repository
- Check the package documentation
- Contact the cha-ai maintainers

---

Built with ❤️ to showcase the power and simplicity of cha-ai.
