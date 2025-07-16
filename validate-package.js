#!/usr/bin/env node

/**
 * Package validation script for Node-RED nodes
 * Run with: node validate-package.js
 */

const fs = require('fs');
const path = require('path');

function validatePackage() {
    console.log('🔍 Validating Node-RED package...\n');
    
    const errors = [];
    const warnings = [];
    
    // Check required files
    const requiredFiles = [
        'package.json',
        'README.md',
        'LICENSE',
        'json-filter-advanced.js',
        'json-filter-advanced.html',
        '.npmignore'
    ];
    
    requiredFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            errors.push(`Missing required file: ${file}`);
        }
    });
    
    // Check package.json
    if (fs.existsSync('package.json')) {
        try {
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            
            // Required fields
            const requiredFields = ['name', 'version', 'description', 'keywords', 'node-red', 'author', 'license'];
            requiredFields.forEach(field => {
                if (!pkg[field]) {
                    errors.push(`Missing required package.json field: ${field}`);
                }
            });
            
            // Check keywords
            if (pkg.keywords && !pkg.keywords.includes('node-red')) {
                warnings.push('package.json should include "node-red" in keywords');
            }
            
            // Check node-red section
            if (pkg['node-red']) {
                if (!pkg['node-red'].nodes) {
                    errors.push('package.json node-red section missing nodes definition');
                }
                if (!pkg['node-red'].version) {
                    warnings.push('Consider specifying minimum Node-RED version in node-red.version');
                }
            }
            
            // Check engines
            if (!pkg.engines || !pkg.engines.node) {
                warnings.push('Consider specifying minimum Node.js version in engines.node');
            }
            
            console.log(`✅ Package name: ${pkg.name}`);
            console.log(`✅ Version: ${pkg.version}`);
            console.log(`✅ Description: ${pkg.description}`);
            
        } catch (e) {
            errors.push('Invalid package.json: ' + e.message);
        }
    }
    
    // Check README
    if (fs.existsSync('README.md')) {
        const readme = fs.readFileSync('README.md', 'utf8');
        if (readme.length < 500) {
            warnings.push('README.md seems quite short - consider adding more documentation');
        }
        if (!readme.includes('## Installation')) {
            warnings.push('README.md should include installation instructions');
        }
        if (!readme.includes('## Usage')) {
            warnings.push('README.md should include usage examples');
        }
    }
    
    // Check examples directory
    if (fs.existsSync('examples')) {
        const examples = fs.readdirSync('examples');
        if (examples.length === 0) {
            warnings.push('Examples directory is empty');
        }
        console.log(`✅ Found ${examples.length} example file(s)`);
    } else {
        warnings.push('Consider adding examples directory with sample flows');
    }
    
    // Check icons directory
    if (fs.existsSync('icons')) {
        const icons = fs.readdirSync('icons');
        console.log(`✅ Found ${icons.length} icon file(s)`);
    } else {
        warnings.push('Consider adding icons directory');
    }
    
    // Check lib directory
    if (fs.existsSync('lib')) {
        const libs = fs.readdirSync('lib');
        console.log(`✅ Found ${libs.length} library file(s)`);
    }
    
    // Check .npmignore
    if (fs.existsSync('.npmignore')) {
        const npmignore = fs.readFileSync('.npmignore', 'utf8');
        if (!npmignore.includes('node_modules')) {
            warnings.push('.npmignore should exclude node_modules');
        }
        if (!npmignore.includes('*.tgz')) {
            warnings.push('.npmignore should exclude *.tgz files');
        }
    }
    
    // Check main node file
    if (fs.existsSync('json-filter-advanced.js')) {
        const nodeJs = fs.readFileSync('json-filter-advanced.js', 'utf8');
        if (!nodeJs.includes('RED.nodes.registerType')) {
            errors.push('Node .js file should contain RED.nodes.registerType');
        }
    }
    
    // Check HTML file
    if (fs.existsSync('json-filter-advanced.html')) {
        const nodeHtml = fs.readFileSync('json-filter-advanced.html', 'utf8');
        if (!nodeHtml.includes('RED.nodes.registerType')) {
            errors.push('Node .html file should contain RED.nodes.registerType');
        }
        if (!nodeHtml.includes('data-template-name')) {
            errors.push('Node .html file should contain template definition');
        }
        if (!nodeHtml.includes('data-help-name')) {
            warnings.push('Consider adding help documentation in HTML file');
        }
    }
    
    // Report results
    console.log('\n📊 Validation Results:');
    console.log(`✅ ${requiredFiles.length - errors.length} required files present`);
    
    if (errors.length > 0) {
        console.log('\n❌ Errors (must fix):');
        errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (warnings.length > 0) {
        console.log('\n⚠️  Warnings (recommended):');
        warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    if (errors.length === 0 && warnings.length === 0) {
        console.log('\n🎉 Package validation passed! Ready for publication.');
    } else if (errors.length === 0) {
        console.log('\n✅ Package validation passed with warnings. Ready for publication.');
    } else {
        console.log('\n❌ Package validation failed. Please fix errors before publication.');
    }
    
    return errors.length === 0;
}

// Run validation
if (require.main === module) {
    const isValid = validatePackage();
    process.exit(isValid ? 0 : 1);
}

module.exports = validatePackage;
