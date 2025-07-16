const _ = require('lodash');

function setDeep(obj, path, value) {
    if (!obj || typeof obj !== 'object' || !path) {
        return;
    }
    
    const keys = path.split('.');
    let curr = obj;
    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (i === keys.length - 1) {
            curr[key] = value;
        } else {
            if (!curr[key] || typeof curr[key] !== 'object') {
                curr[key] = {};
            }
            curr = curr[key];
        }
    }
}

function filterJson(input, selectedPaths, mode = 'object') {
    // Input validation
    if (input === null || input === undefined) {
        return null;
    }
    
    if (!selectedPaths || !Array.isArray(selectedPaths)) {
        return null;
    }
    
    if (selectedPaths.length === 0) {
        return null;
    }
    
    // Mode validation
    const validModes = ['object', 'flattened', 'array'];
    if (validModes.indexOf(mode) === -1) {
        throw new Error('Invalid mode: ' + mode);
    }
    
    try {
        if (mode === 'object') {
            const result = {};
            selectedPaths.forEach(path => {
                if (typeof path === 'string' && path.length > 0) {
                    const value = _.get(input, path);
                    if (value !== undefined) {
                        setDeep(result, path, value);
                    }
                }
            });
            return Object.keys(result).length > 0 ? result : null;
        }
        
        if (mode === 'flattened') {
            const result = {};
            selectedPaths.forEach(path => {
                if (typeof path === 'string' && path.length > 0) {
                    const value = _.get(input, path);
                    if (value !== undefined) {
                        result[path] = value;
                    }
                }
            });
            return Object.keys(result).length > 0 ? result : null;
        }
        
        if (mode === 'array') {
            const result = selectedPaths
                .filter(path => typeof path === 'string' && path.length > 0)
                .map(path => {
                    const value = _.get(input, path);
                    if (value !== undefined) {
                        return { keyPath: path, value: value };
                    }
                    return null;
                })
                .filter(item => item !== null);
            
            return result.length > 0 ? result : null;
        }
    } catch (error) {
        throw new Error('Error filtering JSON: ' + error.message);
    }
    
    return null;
}

module.exports = { filterJson };
