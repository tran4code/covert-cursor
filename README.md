# CursorMorph 🎯

An experimental web experience that breaks the fourth wall of UI conventions by transforming your cursor into whatever UI element you interact with.

## 🌟 Live Demo

Visit [https://YOUR-USERNAME.github.io/covert-cursor](https://YOUR-USERNAME.github.io/covert-cursor)

## ✨ Features

- **Cursor Transformation**: Click any UI element to transform your cursor into a functional miniature version
- **Smart Selection**: 
  - Click individual elements (buttons, inputs) to copy just that element
  - Click container backgrounds to copy entire forms, cards, or sections
- **Visual Feedback**: 
  - Green highlight for individual elements
  - Purple highlight for containers
- **Full-Size Cloning**: Cursors maintain the exact size and styling of original elements
- **9+ Element Types**: Buttons, inputs, checkboxes, toggles, sliders, dropdowns, links, images, progress bars, and more

## 🎮 Controls

- **Click** any element to transform your cursor
- **Press `A`** to return to default cursor
- **Press `ESC`** to temporarily show system cursor
- **Click empty space** to reset cursor

## 🚀 Getting Started

### Prerequisites

- Node.js (for building)
- Python 3 (for local development server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/covert-cursor.git
cd covert-cursor
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm start
```

Or use Python directly:
```bash
python3 server.py
```

Visit `http://localhost:8000` to see the app.

### Building for Production

Build the project:
```bash
npm run build
```

This creates a `dist` directory with all necessary files.

## 📦 Deployment

### GitHub Pages (Automatic)

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Enable GitHub Pages in your repository settings (source: GitHub Actions)

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the contents of the `dist` directory to your web server

## 🛠️ Technical Details

### Architecture

- **CursorEngine.js**: Core tracking and transformation system
- **ElementFactory.js**: Creates cursor elements based on type
- **TransformManager.js**: Manages cursor state and transitions
- **Elements/**: Individual cursor implementations for each UI element type

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance

- 60 FPS cursor tracking using requestAnimationFrame
- Hardware-accelerated animations with transform3d
- Efficient event handling and memory management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by experimental web interactions
- Built with vanilla JavaScript for maximum performance
- Designed to challenge UI conventions

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/YOUR-USERNAME/covert-cursor](https://github.com/YOUR-USERNAME/covert-cursor)