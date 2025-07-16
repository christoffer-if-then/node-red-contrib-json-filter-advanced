# Examples

This directory contains example flows demonstrating various use cases for the JSON Filter Advanced node.

## Import Instructions

1. Copy the contents of `flows.json`
2. In Node-RED, go to the hamburger menu (☰) → Import
3. Paste the JSON and click "Import"
4. Deploy the flow

## Example Flows

### Example 1: Basic User Data Filtering
- **Input**: User object with nested address
- **Output Mode**: Object
- **Selected Paths**: `user.name`, `user.email`, `user.address.city`
- **Use Case**: Extract key user information while preserving structure

### Example 2: Product Array Processing
- **Input**: Array of product objects
- **Output Mode**: Flattened
- **Selected Paths**: `products.name`, `products.price`
- **Use Case**: Extract specific fields from arrays in flat format

### Example 3: API Response Filtering
- **Input**: Complex API response with nested users
- **Output Mode**: Array
- **Selected Paths**: User profile fields
- **Use Case**: Extract data from complex API responses

### Example 4: Different Property Source
- **Input**: Data in `msg.data` instead of `msg.payload`
- **Output Mode**: Object
- **Selected Paths**: Employee information
- **Use Case**: Working with different message properties

### Example 5: Template Mode Testing
- **Input**: Uses predefined JSON template
- **Output Mode**: Flattened
- **Selected Paths**: Order and customer information
- **Use Case**: Testing filtering logic during development

## Running the Examples

1. Click the inject buttons to send test data through each example
2. Check the debug output to see the filtered results
3. Double-click the filter nodes to see the configuration
4. Try modifying the selected paths to see different results

## Customization

Feel free to modify these examples:
- Change the input data in the inject nodes
- Adjust the selected paths in the filter nodes
- Switch between different output modes
- Try different property sources

These examples cover the most common use cases and can serve as starting points for your own implementations.
