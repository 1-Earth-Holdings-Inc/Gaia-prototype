# Gaia Frontend

A Next.js frontend application for the Gaia prototype project with JSX enabled, Tailwind CSS, and modern React features.

## Features

- ⚡ **Next.js 15** - Latest React framework with App Router
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 🔧 **JSX Enabled** - Full JSX support with proper configuration
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Fast Development** - Hot reload and optimized builds
- 🧹 **ESLint** - Code quality and consistency

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # App Router pages and layouts
│   ├── layout.js       # Root layout component
│   ├── page.js         # Home page component
│   └── globals.css     # Global styles
├── components/          # Reusable components (create as needed)
├── lib/                # Utility functions (create as needed)
└── styles/             # Additional stylesheets (create as needed)
```

## Configuration

- **JSX**: Enabled with `jsx: "react-jsx"` in jsconfig.json
- **Tailwind CSS**: Configured with PostCSS
- **ESLint**: Next.js recommended configuration
- **Import Aliases**: `@/*` maps to `./src/*`

## Development

The project uses the App Router pattern introduced in Next.js 13+. Each route is a directory with a `page.js` file.

### Adding New Pages

Create a new directory in `src/app/` with a `page.js` file:

```jsx
// src/app/about/page.js
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  )
}
```

### Adding Components

Create reusable components in `src/components/`:

```jsx
// src/components/Button.js
export default function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {children}
    </button>
  )
}
```

## Styling

- **Tailwind CSS**: Use utility classes for styling
- **CSS Modules**: Available for component-specific styles
- **Global Styles**: Edit `src/app/globals.css`

## Deployment

The project can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
