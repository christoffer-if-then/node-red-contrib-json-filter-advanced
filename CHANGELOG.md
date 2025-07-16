# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.26] - 2024-01-16

### Changed
- Improved output mode terminology from "Original" to "Object" for better clarity
- Enhanced property selection with typedInput component
- Updated documentation and examples

### Fixed
- Better error handling and validation
- Performance optimizations for large datasets

## [1.0.25] - 2024-01-15

### Added
- Property selection support for any message property (msg.payload, msg.data, etc.)
- TypedInput component for professional Node-RED integration
- Modular code architecture for better maintainability

### Changed
- Refactored codebase into separate modules (Utils, TreeBuilder, TreeRenderer, etc.)
- Enhanced security features with XSS prevention
- Improved UI responsiveness and user experience

### Fixed
- Resolved UI blank screen issues
- Fixed function scoping problems in editor
- Enhanced error handling and validation

## [1.0.0] - 2024-01-01

### Added
- Initial release of JSON Filter Advanced node
- Interactive tree view for JSON structure navigation
- Multiple output modes (Object, Flattened, Array)
- Template editor for testing JSON structures
- Parent/child selection logic
- Real-time preview with latest message data
- Professional Node-RED styling
- Comprehensive error handling
- Performance optimizations with size limits
- Security features including input validation

### Features
- Visual tree representation of JSON data
- Expandable/collapsible tree nodes
- Smart selection controls (Select All, Select None, Expand All, Collapse All)
- Live message integration
- Template mode for development
- Multiple output formats
- Nested property support
- Array handling
- Debounced updates for performance
- Responsive UI design
