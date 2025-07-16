# node-red-contrib-json-filter-advanced

A powerful Node-RED node for interactive JSON filtering with a visual tree interface, template editor, and flexible output options.

## Features

- **Interactive Tree View**: Visual representation of JSON structure with expandable/collapsible nodes
- **Flexible Property Selection**: Select any message property (msg.payload, msg.data, etc.) as the data source
- **Template Editor**: Build and test JSON structures directly in the editor
- **Multiple Output Modes**: Choose between Object, Flattened, or Array output formats
- **Parent/Child Selection**: Smart selection logic that automatically includes parent paths
- **Real-time Preview**: See your JSON structure as you work with live messages
- **Professional UI**: Clean, Node-RED-styled interface with intuitive controls

## Installation

```bash
npm install node-red-contrib-json-filter-advanced
```

Or install via the Node-RED palette manager.

## Usage

### Basic Setup

1. Drag the "json filter advanced" node into your flow
2. Double-click to open the configuration dialog
3. Select your data source:
   - **Use Latest Message**: Work with live data from your flow
   - **Use JSON Template**: Define a JSON structure for testing

### Configuration Options

#### Property Selection
- **Property**: Choose which message property to filter (default: `payload`)
- Supports nested properties like `data.items`, `response.body`, etc.

#### Output Modes
- **Object**: Returns the filtered data as a nested object structure
- **Flattened**: Returns key-value pairs with dot-notation keys
- **Array**: Returns an array of the selected leaf values

#### Data Sources
- **Use Latest Message**: Automatically loads the structure from the last message received
- **Use JSON Template**: Define your own JSON structure for testing and development

### Tree Navigation

- **Expand/Collapse**: Click the arrow icons or use the "Expand All"/"Collapse All" buttons
- **Selection**: Check boxes to select specific fields
- **Parent/Child Logic**: Selecting a parent automatically includes its children
- **Visual Feedback**: Selected items are highlighted with different colors

## Examples

### Example 1: Basic Filtering

**Input Message:**
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zip": "10001"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Selected Paths:** `user.name`, `user.email`, `user.address.city`

**Output (Object mode):**
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "city": "New York"
    }
  }
}
```

**Output (Flattened mode):**
```json
{
  "user.name": "John Doe",
  "user.email": "john@example.com",
  "user.address.city": "New York"
}
```

**Output (Array mode):**
```json
["John Doe", "john@example.com", "New York"]
```

### Example 2: Working with Arrays

**Input Message:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics"
    },
    {
      "id": 2,
      "name": "Mouse",
      "price": 29.99,
      "category": "Electronics"
    }
  ]
}
```

**Selected Paths:** `products.name`, `products.price`

**Output (Object mode):**
```json
{
  "products": [
    {
      "name": "Laptop",
      "price": 999.99
    },
    {
      "name": "Mouse",
      "price": 29.99
    }
  ]
}
```

## Use Cases

### API Response Filtering
Filter large API responses to extract only the data you need, reducing payload size and improving performance.

### Data Transformation
Convert between different JSON structures while preserving the relationships between fields.

### Development and Testing
Use the template editor to prototype JSON structures before connecting to live data sources.

### Message Routing
Extract specific fields for routing decisions or conditional processing.

## Technical Details

### Node Properties
- **name**: Optional display name for the node
- **property**: Message property to filter (supports dot notation)
- **mode**: Output format (object/flattened/array)
- **selectedPaths**: Array of selected JSON paths
- **sourceType**: Data source type (message/template)
- **templateData**: JSON template for testing

### Performance Considerations
- Maximum JSON size: 1MB
- Maximum tree nodes: 1000
- Debounced updates for better performance
- Efficient tree rendering with virtual scrolling

### Security Features
- Input validation and sanitization
- XSS prevention in UI components
- Safe JSON parsing with error handling
- Size limits to prevent memory issues

## Error Handling

The node includes comprehensive error handling:
- Invalid JSON structure detection
- Property path validation
- Size limit enforcement
- User-friendly error messages
- Graceful fallback behavior

## Requirements

- Node-RED 2.0.0 or higher
- Node.js 14.0.0 or higher

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - see LICENSE file for details.

## Changelog

### 1.0.26
- Improved output mode terminology (Object/Flattened/Array)
- Enhanced property selection with typedInput component
- Better error handling and validation
- Performance optimizations

### 1.0.25
- Added property selection support
- Modular code architecture
- Enhanced security features
- UI improvements

### 1.0.0
- Initial release
- Interactive tree view
- Template editor
- Multiple output modes
- Parent/child selection logic
