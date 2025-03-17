---
title: Installing React with Vite
tags:
  - React
  - Javascript
  - Vite
---

# What is Vite?

Vite (French word for "fast") is a modern build tool created by Evan You (Vue.js creator). It offers a significantly faster development experience compared to traditional tools like Create React App through:
- Ultra-fast development server
- Native ES modules support
- Optimized production builds

# Installation Steps

## 1. Project Creation
```bash
npm create vite@latest
```
This command launches the Vite project creation wizard.

## 2. Initial Configuration
After running the command, you'll need to:

1. **Name your project**
   - Enter your project folder name
   - This name will also be used in package.json

2. **Select a framework**
   Available options:
   - `vanilla` - Pure JavaScript
   - `vue` - Vue.js framework
   - `react` - React framework
   - `preact` - Lightweight React alternative
   - `lit` - For Web Components
   - `svelte` - Svelte framework
   - And others...

3. **Choose a variant**
   For React, options include:
   - `JavaScript` - Standard React setup with JavaScript
   - `TypeScript` - React with TypeScript support
   - `JavaScript + SWC` - Uses SWC for faster compilation
   - `TypeScript + SWC` - TypeScript with SWC compiler

## 3. Installing Dependencies
Once the project is created:

```bash
cd project-name    # Navigate to project folder
npm install        # Install dependencies
```

## 4. Project Structure

```
project-name/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 5. Available Scripts

In `package.json`, you'll find several scripts:
- `npm run dev` : Starts development server
- `npm run build` : Builds project for production
- `npm run preview` : Preview production build locally

## 6. Vite Configuration

The `vite.config.js` file allows you to customize your configuration:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Other configuration options
})
```

# Advantages over Create React App

1. **Performance**
   - Instant server start
   - Lightning-fast hot reload
   - Optimized production build

2. **Modern**
   - Uses native ES modules
   - Built-in TypeScript support
   - More flexible configuration

3. **Lightweight**
   - Fewer dependencies
   - Faster installation
   - Smaller project size

# Next Steps

After installation:
1. Start development server: `npm run dev`
2. Open your preferred code editor
3. Start modifying `src/App.jsx`
4. Explore Vite documentation for advanced configurations

# Common Issues and Solutions

1. **Port Already in Use**
   - Default port is 5173
   - Change port in vite.config.js:
   ```javascript
   export default defineConfig({
     server: {
       port: 3000
     }
   })
   ```

2. **Node Version**
   - Vite requires Node.js version 14.18+ or 16+
   - Use `node -v` to check your version

3. **Dependencies Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: 
   ```bash
   rm -rf node_modules
   npm install
   ```

# Environment Variables

Create `.env` files for environment variables:
```plaintext
VITE_API_URL=https://api.example.com
```

Access in code:
```javascript
console.log(import.meta.env.VITE_API_URL)
```

Remember: Only variables prefixed with `VITE_` are exposed to your code.