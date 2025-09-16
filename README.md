# 🎨 Project Palette

A modern, interactive color palette generator that creates beautiful color schemes and generates ready-to-use configuration code for popular CSS frameworks.

![Project Palette](https://img.shields.io/badge/React-19.1.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.5-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-cyan)

## ✨ Features

- **🎯 Smart Color Generation**: Generate harmonious color palettes from a single primary color
- **📋 Multiple Format Support**: Export colors in HEX, RGB, HSL, and OKLCH formats
- **⚙️ Framework Integration**: Generate configuration files for:
  - CSS Custom Properties
  - SCSS Variables
  - Tailwind CSS v3
  - Tailwind CSS v4
- **🎨 Visual Preview**: See your colors in action with text preview
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **♿ Accessibility**: WCAG compliant color combinations

## 🚀 Live Demo

Visit the live application: [https://MSpiechowicz.github.io/project-palette/](https://MSpiechowicz.github.io/project-palette/)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **State Management**: Zustand
- **Color Processing**: Chroma.js
- **Code Quality**: Biome, ESLint

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/MSpiechowicz/project-palette.git
cd project-palette
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build & Deploy

### Local Build

```bash
npm run build
npm run preview
```

### GitHub Pages Deployment

The project is configured for automatic deployment to GitHub Pages:

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your app will be available at `https://MSpiechowicz.github.io/project-palette/`

## 🎯 Usage

1. **Enter a Color**: Input your primary color using HEX, RGB, HSL, or color picker
2. **Configure Output**: Choose which color formats to include (HEX, RGB, HSL, OKLCH)
3. **Select Framework**: Pick your preferred CSS framework configuration
4. **Copy & Use**: Copy the generated code and paste it into your project

## 📁 Project Structure

```Bash
src/
├── components/          # React components
├── stores/             # Zustand state management
├── strategies/         # Configuration generation strategies
├── utils/              # Utility functions
├── interfaces/         # TypeScript interfaces
├── enums/              # TypeScript enums
└── types/              # TypeScript type definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chroma.js](https://gka.github.io/chroma.js/) for color manipulation
- [Tailwind CSS](https://tailwindcss.com/) for the design system
- [React](https://react.dev/) for the amazing framework
