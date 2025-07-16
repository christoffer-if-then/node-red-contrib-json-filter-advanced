# Deployment Guide

This guide walks you through publishing your Node-RED node to the npm registry and Node-RED Flow Library.

## Pre-Deployment Checklist

✅ **Package Validation**: Run `node validate-package.js` - Should pass without errors
✅ **Local Testing**: Test the node in a fresh Node-RED installation
✅ **Documentation**: README.md, examples, and help documentation complete
✅ **Version**: Ensure version number is correct in package.json
✅ **Dependencies**: All required dependencies listed in package.json
✅ **Files**: Check `.npmignore` excludes unnecessary files

## Publishing to npm

### 1. Setup npm Account
If you don't have an npm account:
1. Go to https://www.npmjs.com/signup
2. Create an account
3. Verify your email

### 2. Login to npm
```bash
npm login
```
Enter your username, password, and email when prompted.

### 3. Publish the Package
```bash
npm publish
```

**Note**: Package names must be unique. If you get a name conflict, consider:
- Using a scoped package: `@yourusername/node-red-contrib-json-filter-advanced`
- Choosing a different name

### 4. Verify Publication
- Check your package at: https://www.npmjs.com/package/node-red-contrib-json-filter-advanced
- Test installation: `npm install node-red-contrib-json-filter-advanced`

## Adding to Node-RED Flow Library

### 1. Requirements Check
- ✅ Package published on npm
- ✅ Contains `node-red` keyword in package.json
- ✅ Follows Node-RED packaging guidelines
- ✅ Has proper documentation

### 2. Submit to Flow Library
1. Go to https://flows.nodered.org/
2. Click the "+" button at the top
3. Select "node" option
4. Fill in the form:
   - **npm package name**: `node-red-contrib-json-filter-advanced`
   - **Keywords**: Add relevant keywords
   - **Description**: Use the package.json description
5. Submit the form

### 3. Wait for Review
- The Node-RED team will review your submission
- This typically takes a few days to a week
- You'll receive notification when approved

## Post-Publication

### Monitor and Maintain
- Watch for issues on npm and the flow library
- Respond to user feedback
- Update documentation as needed
- Release updates for bug fixes and new features

### Version Updates
When publishing updates:
1. Update version in package.json (semantic versioning)
2. Update CHANGELOG.md
3. Test thoroughly
4. Publish with `npm publish`
5. Request refresh on flow library (if needed)

## GitHub Repository (Recommended)

Consider creating a GitHub repository for:
- Issue tracking
- Community contributions
- Documentation hosting
- Version control

### Setup Steps
1. Create repository on GitHub
2. Update package.json with repository URLs:
   ```json
   {
     "repository": {
       "type": "git",
       "url": "git+https://github.com/yourusername/node-red-contrib-json-filter-advanced.git"
     },
     "bugs": {
       "url": "https://github.com/yourusername/node-red-contrib-json-filter-advanced/issues"
     },
     "homepage": "https://github.com/yourusername/node-red-contrib-json-filter-advanced#readme"
   }
   ```
3. Push your code to GitHub
4. Update package and republish

## Troubleshooting

### Common Issues

**Package name already exists**
- Choose a different name or use a scoped package

**Missing files in package**
- Check `.npmignore` isn't excluding needed files
- Verify `files` array in package.json includes all necessary files

**Flow library submission rejected**
- Ensure package.json has `node-red` keyword
- Check all documentation is complete
- Verify package follows Node-RED guidelines

### Getting Help
- Node-RED Forum: https://discourse.nodered.org/
- Node-RED Slack: https://nodered.org/slack
- GitHub Issues: For code-specific problems

## Summary

Your node is ready for publication! The package has been validated and all required files are in place. Follow the steps above to share your work with the Node-RED community.

## Current Status
- ✅ Package validated and ready
- ✅ All documentation complete
- ✅ Example flows provided
- ✅ Help documentation included
- ✅ Proper licensing (MIT)
- ✅ Clean package structure

The node is production-ready and should be accepted into the Node-RED Flow Library once published to npm.
