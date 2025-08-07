# VS Code Setup Guide for TD Studios NY

## 🚀 Quick Start

### **Open Project in VS Code**
```bash
# From terminal
cd /Users/tylerdiorio/Projects/tdstudiosny
code .
```

### **Or use this one-liner:**
```bash
code /Users/tylerdiorio/Projects/tdstudiosny
```

## 📦 Recommended Extensions (Auto-Install)

When you open the project, VS Code will prompt you to install these extensions:

### **Essential Extensions:**
- ✅ **Tailwind CSS IntelliSense** - Auto-completion for classes
- ✅ **Prettier** - Code formatting
- ✅ **ESLint** - Code linting and error detection
- ✅ **TypeScript** - Enhanced TypeScript support
- ✅ **GitHub Copilot** - AI code assistance

### **Helpful Extensions:**
- **Path Intellisense** - Auto-complete file paths
- **Auto Rename Tag** - Rename HTML/JSX tags together
- **Pretty TypeScript Errors** - Better error messages

## ⚙️ VS Code Features Configured

### **Auto-Formatting**
- ✅ Format on save enabled
- ✅ ESLint auto-fix on save
- ✅ Prettier as default formatter

### **Tailwind CSS Support**
- ✅ Auto-completion in `cn()` and `clsx()` functions
- ✅ Hover previews for Tailwind classes
- ✅ CSS validation

### **TypeScript Enhancement**
- ✅ Auto-import suggestions
- ✅ File move updates imports
- ✅ Better error messages

### **File Management**
- ✅ Nested file grouping
- ✅ Git auto-fetch
- ✅ Emmet support in TSX files

## 🛠️ Development Workflow in VS Code

### **1. Start Development Server**
```bash
# In VS Code terminal (Ctrl/Cmd + `)
npm run dev
```

### **2. Key Shortcuts**
- **Ctrl/Cmd + `** - Open terminal
- **Ctrl/Cmd + Shift + P** - Command palette
- **Ctrl/Cmd + P** - Quick file open
- **F12** - Go to definition
- **Shift + F12** - Find references

### **3. Debugging**
- **F5** - Start debugging Next.js app
- Set breakpoints in your code
- Debug both client and server side

### **4. Git Integration**
- **Source Control panel** (Ctrl/Cmd + Shift + G)
- Stage changes with **+** button
- Commit with message
- Push to GitHub

## 📁 Project Structure in VS Code

```
tdstudiosny/
├── 📁 app/               # Next.js app directory
│   ├── 📁 components/    # React components
│   ├── 📁 lib/          # Utilities
│   ├── 📄 layout.tsx    # Root layout
│   ├── 📄 page.tsx      # Homepage
│   └── 📄 globals.css   # Global styles
├── 📁 public/           # Static assets
├── 📁 .vscode/          # VS Code configuration
├── 📄 .env.local        # Environment variables
├── 📄 package.json      # Dependencies
├── 📄 tailwind.config.ts # Tailwind configuration
└── 📄 README.md         # Documentation
```

## 🔥 Pro Tips for Development

### **IntelliSense Magic**
- Type `rafce` for React functional component
- Use **Ctrl/Cmd + Space** for auto-completion
- **Ctrl/Cmd + .** for quick fixes

### **Tailwind CSS Classes**
- Auto-completion works in `className=""` and `cn()` function
- Hover over classes to see CSS properties
- Use **F12** to go to Tailwind documentation

### **Component Development**
```tsx
// Create new component in app/components/
export function MyComponent() {
  return (
    <div className="flex items-center space-x-4">
      {/* VS Code will auto-complete Tailwind classes */}
    </div>
  )
}
```

### **Import Management**
- VS Code automatically adds imports
- Use **Ctrl/Cmd + Shift + O** to organize imports
- Unused imports are highlighted and auto-removed

## 🚀 Ready to Code!

### **Next Steps:**
1. **Open in VS Code:** `code /Users/tylerdiorio/Projects/tdstudiosny`
2. **Install extensions** (VS Code will prompt you)
3. **Start dev server:** `npm run dev`
4. **Begin building** your TD Studios NY website!

### **Live Development:**
- ✅ **Hot reload** - Changes appear instantly
- ✅ **Error overlay** - See errors in browser
- ✅ **TypeScript checking** - Real-time error detection
- ✅ **Tailwind IntelliSense** - Auto-completion for styles

Happy coding! 🎉