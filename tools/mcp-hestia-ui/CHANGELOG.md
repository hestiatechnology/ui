# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-XX

### Added
- ✨ Initial public release of Hestia UI MCP Server
- 🔍 `list_components` tool to discover all available components with category filtering
- 📋 `get_component_details` tool to retrieve component metadata (inputs, outputs, descriptions)
- 💡 `get_component_example` tool to generate practical code examples
- 📖 Comprehensive README with setup and usage instructions
- 🛠️ TypeScript source code with strict type checking
- 🔄 Automatic component metadata extraction from source files
- 🧪 Component scanning test utility (`test-scan.mjs`)

### Features
- Support for category-based filtering (form-controls, navigation, overlay, feedback, data)
- Automatic discovery of Angular components in the library
- Resilient path resolution for various environment setups
- Full integration with Claude, GitHub Copilot, and other MCP clients

### Infrastructure
- MIT License
- GitHub repository configuration
- npm package publication ready
- Node.js 18+ support

---

## Unreleased

### Planned Features
- 🔗 Component dependency tracking
- 📊 Usage statistics and popularity metrics
- 🎨 Theming and customization guidance
- 📱 Responsive behavior examples
- ♿ Accessibility guidelines integration
- 🧩 Component composition patterns
- 📚 Link to live Storybook examples

### Future Improvements
- Performance optimization for large component libraries
- Caching mechanism for metadata
- Rate limiting for example generation
- Enhanced error reporting and diagnostics
