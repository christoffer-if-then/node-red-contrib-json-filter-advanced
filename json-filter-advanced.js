const filter = require('./lib/filter');
const path = require('path');

module.exports = function(RED) {
    // Helper function to get property value from message
    function getProperty(msg, property) {
        if (!property || property === '') {
            return msg.payload;
        }
        
        // Handle nested properties like "payload.data.items"
        const keys = property.split('.');
        let value = msg;
        
        for (let key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return undefined;
            }
        }
        
        return value;
    }

    // Helper function to set property value in message
    function setProperty(msg, property, value) {
        if (!property || property === '') {
            msg.payload = value;
            return;
        }
        
        // Handle nested properties like "payload.data.items"
        const keys = property.split('.');
        let current = msg;
        
        // Navigate to the parent object
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        // Set the final value
        current[keys[keys.length - 1]] = value;
    }

    function JsonFilterAdvancedNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        
        // Validate configuration
        if (!config.mode || ['object', 'flattened', 'array'].indexOf(config.mode) === -1) {
            node.error('Invalid output mode configuration');
            return;
        }
        
        // Initialize
        node.latestMsg = null;
        node.status({});

        node.on('input', function(msg, send, done) {
            // Use send and done for Node-RED 1.0+ compatibility
            send = send || function() { node.send.apply(node, arguments); };
            done = done || function(err) { if (err) node.error(err, msg); };
            
            try {
                // Get the property value
                const property = config.property || 'payload';
                const propertyValue = getProperty(msg, property);
                
                // Store latest message for editor
                node.latestMsg = propertyValue;
                node.context().set('latestMsg', node.latestMsg);
                
                // Validate input
                if (propertyValue === null || propertyValue === undefined) {
                    node.warn(`Input property "${property}" is null or undefined`);
                    send(msg);
                    done();
                    return;
                }
                
                // Apply filtering if paths are selected
                if (config.selectedPaths && config.selectedPaths !== '[]') {
                    try {
                        const selectedPaths = JSON.parse(config.selectedPaths);
                        const mode = config.mode || 'object';
                        
                        // Validate selectedPaths
                        if (!Array.isArray(selectedPaths)) {
                            throw new Error('Selected paths must be an array');
                        }
                        
                        if (selectedPaths.length > 0) {
                            node.status({ fill: 'blue', shape: 'dot', text: `filtering ${selectedPaths.length} paths` });
                            
                            const filteredPayload = filter.filterJson(propertyValue, selectedPaths, mode);
                            
                            if (filteredPayload === null) {
                                node.warn('Filtering resulted in null output');
                                node.status({ fill: 'yellow', shape: 'ring', text: 'no data filtered' });
                            } else {
                                node.status({ fill: 'green', shape: 'dot', text: `filtered (${mode})` });
                            }
                            
                            // Set the filtered result back to the original property path
                            const outputMsg = { ...msg };
                            setProperty(outputMsg, property, filteredPayload);
                            send(outputMsg);
                        } else {
                            // No paths selected, pass through original
                            node.status({ fill: 'grey', shape: 'ring', text: 'no paths selected' });
                            send(msg);
                        }
                    } catch (e) {
                        node.error('Error parsing selected paths: ' + e.message, msg);
                        node.status({ fill: 'red', shape: 'ring', text: 'config error' });
                        done(e);
                        return;
                    }
                } else {
                    // No configuration, pass through original
                    node.status({ fill: 'grey', shape: 'ring', text: 'not configured' });
                    send(msg);
                }
                
                done();
            } catch (err) {
                node.error('Unexpected error: ' + err.message, msg);
                node.status({ fill: 'red', shape: 'ring', text: 'error' });
                done(err);
            }
        });

        node.on('close', function(removed, done) {
            // Clean up resources
            node.latestMsg = null;
            node.status({});
            
            if (done) {
                done();
            }
        });

        // HTTP Admin endpoint with proper error handling
        const httpEndpoint = RED.httpAdmin.get('/json-filter-advanced/latest/:id', 
            RED.auth.needsPermission('json-filter-advanced.read'), 
            function(req, res) {
                try {
                    const nodeId = req.params.id;
                    const requestedProperty = req.query.property || 'payload';
                    
                    // Validate node ID
                    if (!nodeId || typeof nodeId !== 'string') {
                        return res.status(400).json({ error: 'Invalid node ID' });
                    }
                    
                    const n = RED.nodes.getNode(nodeId);
                    if (n) {
                        const latestMsg = n.context().get('latestMsg');
                        res.json({ latestMsg: latestMsg || null });
                    } else {
                        res.status(404).json({ error: 'Node not found', latestMsg: null });
                    }
                } catch (err) {
                    RED.log.error('Error in HTTP endpoint: ' + err.message);
                    res.status(500).json({ error: 'Internal server error', latestMsg: null });
                }
            }
        );
        
        // Store endpoint reference for cleanup
        node._httpEndpoint = httpEndpoint;

        RED.httpAdmin.post('/json-filter-advanced/filter/:id', RED.auth.needsPermission('json-filter-advanced.write'), function(req, res) {
            const nodeId = req.params.id;
            const n = RED.nodes.getNode(nodeId);
            if (n) {
                let { selectedPaths, mode } = req.body;
                if (typeof selectedPaths === 'string') selectedPaths = JSON.parse(selectedPaths);
                const input = n.context().get('latestMsg');
                const result = filter.filterJson(input, selectedPaths, mode);
                res.json({ result });
            } else {
                res.status(404).json({ error: 'Node not found' });
            }
        });
    }
    RED.nodes.registerType('json-filter-advanced', JsonFilterAdvancedNode);
};
