# Contributing to JSON Filter Advanced

Thank you for your interest in contributing to this Node-RED node! Here are some guidelines to help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Make your changes
5. Test your changes with Node-RED
6. Submit a pull request

## Development Setup

### Prerequisites
- Node.js 14.0.0 or higher
- Node-RED 2.0.0 or higher
- npm or yarn

### Local Development
1. Clone the repository
2. Run `npm install` to install dependencies
3. Link the package for local testing: `npm link`
4. In your Node-RED directory, run: `npm link node-red-contrib-json-filter-advanced`
5. Restart Node-RED to load the node

### Testing
- Test with various JSON structures
- Verify all output modes work correctly
- Check error handling with invalid inputs
- Test with large datasets (within limits)
- Verify UI responsiveness

## Code Style

- Use consistent indentation (4 spaces)
- Follow JavaScript best practices
- Add comments for complex logic
- Use meaningful variable names
- Keep functions small and focused

## File Structure

```
├── json-filter-advanced.js      # Main node logic
├── json-filter-advanced.html    # UI and editor
├── lib/                         # Utility modules
│   └── filter.js               # Core filtering logic
├── icons/                      # Node icons
├── examples/                   # Example flows
├── package.json               # Package configuration
├── README.md                  # Main documentation
└── CHANGELOG.md              # Version history
```

## Submitting Changes

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines
- Provide a clear description of the changes
- Include any relevant issue numbers
- Update documentation if needed
- Add tests for new features
- Ensure all existing tests pass

## Reporting Issues

When reporting issues, please include:
- Node-RED version
- Node.js version
- Operating system
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Sample input data (if applicable)

## Feature Requests

Feature requests are welcome! Please:
- Check if the feature already exists
- Describe the use case clearly
- Explain why it would be useful
- Consider backward compatibility

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn
- Follow the project's coding standards
- Report inappropriate behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions about contributing.
