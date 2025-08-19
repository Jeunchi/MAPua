# MAPúa Navigation System 🗺️

A modern, interactive campus navigation web application designed for MAPúa University. This unified platform combines pathfinding algorithms, location visualization, and bookmark management in a sleek, responsive interface.


## ✨ Features

### 🎯 **Interactive Campus Map**
- High-resolution canvas-based map visualization
- Real-time pathfinding with visual route display
- Interactive markers for start and end points
- Responsive canvas that adapts to screen sizes

### 🚀 **Smart Route Planning**
- Comprehensive location database (19 rooms + facilities)
- Dropdown selectors with intuitive icons
- Automatic image updates based on selected locations
- Clear path visualization with animated routes


### 🔖 **Advanced Bookmark System**
- Save frequently used routes with custom names
- Full CRUD operations (Create, Read, Update, Delete)
- Persistent storage for user preferences
- Quick route loading from saved bookmarks

### 🎨 **Modern UI/UX Design**
- Glassmorphism design with backdrop blur effects
- Smooth animations and micro-interactions
- MAPúa brand colors and typography
- Mobile-first responsive design
- Dark mode compatible


## 🚀 **Getting Started**

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Web server (for local development) or hosting platform

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mapua-navigation.git
   cd mapua-navigation
   ```

2. **Set up local server** (choose one method)
   
   **Option A: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js**
   ```bash
   npx serve .
   ```
   
   **Option C: Using PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Alternative: Direct File Access
For quick testing, you can open `index.html` directly in your browser, though some features may require a web server.

## 💻 **Usage Guide**

### Finding Routes
1. Navigate to the **Route Planning** section
2. Select your **starting location** from the "From Location" dropdown
3. Choose your **destination** from the "To Location" dropdown
4. Click **"Find Route"** to calculate and display the path
5. Use **"Clear Path"** to reset the map

### Viewing Location Images
1. Go to the **Location View** section
2. Select locations from the dropdown menus
3. Images will automatically update based on your selections
4. Images are integrated with route planning for seamless experience

### Managing Bookmarks
1. First, plan a route using the Route Planning section
2. Click **"Bookmark Current Route"** in the Saved Routes section
3. Enter a custom name for your route in the modal dialog
4. Click **"Save Bookmark"** to store the route
5. Use **"Go"** button on saved bookmarks to quickly load routes
6. Delete individual bookmarks or use **"Clear All"** for bulk removal

### Navigation Tips
- Use the header navigation links to quickly jump to sections
- Click the **Time** link to see current date and time
- The system provides real-time notifications for all actions
- Responsive design ensures great experience on all devices

## 🔧 **Technical Details**

### Technologies Used
- **HTML5**: Semantic markup and canvas element
- **CSS3**: Advanced styling with custom properties, grid, and flexbox
- **Vanilla JavaScript**: ES6+ features, no external frameworks
- **Canvas API**: For map rendering and path visualization
- **Web APIs**: LocalStorage, URLSearchParams, DOM manipulation

### Browser Compatibility
| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 80+ | ✅ Fully Supported |
| Firefox | 75+ | ✅ Fully Supported |
| Safari | 13+ | ✅ Fully Supported |
| Edge | 80+ | ✅ Fully Supported |
| IE | 11 | ❌ Not Supported |

### Performance Features
- **Optimized animations**: 60fps CSS transitions and transforms
- **Lazy loading**: Images load only when needed
- **Efficient canvas rendering**: Optimized drawing operations
- **Memory management**: Proper cleanup of event listeners and intervals
- **Mobile optimization**: Touch-friendly interfaces and responsive images

## 🎨 **Customization**

### Adding New Locations
1. Open `index.html`
2. Add new options to both location dropdown menus:
   ```html
   <option value="new-location">New Location Name</option>
   ```
3. Update the `locationImages` object in the JavaScript section:
   ```javascript
   var locationImages = {
     "new-location": "image/new-location.jpg",
     // ... existing locations
   };
   ```
4. Add corresponding image file to the `image/` directory

### Customizing Colors
The app uses CSS custom properties for easy theming:
```css
:root {
  --primary-color: #B30000;     /* MAPúa Red */
  --secondary-color: #8B0000;   /* Darker Red */
  --success-color: #4CAF50;     /* Green */
  --info-color: #2196F3;        /* Blue */
}
```

### Modifying Animations
Animation durations and easing functions can be adjusted:
```css
.section {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease forwards;
}
```

## 📱 **Mobile Responsiveness**

The application is built with a mobile-first approach:

- **Breakpoints**: 768px (mobile), 1024px (tablet), 1400px (desktop)
- **Touch-friendly**: All interactive elements have appropriate touch targets
- **Flexible layouts**: Grid and flexbox for adaptive layouts
- **Optimized images**: Responsive images that scale appropriately
- **Canvas scaling**: Automatic canvas resizing for different screen sizes

## 🐛 **Troubleshooting**

### Common Issues

**Images not loading**
- Ensure image files exist in the `image/` directory
- Check file paths and names match exactly
- Verify web server is serving static files correctly

**Canvas not displaying**
- Check browser console for JavaScript errors
- Ensure `map.js` file is properly linked
- Verify canvas dimensions are appropriate for viewport

**Bookmarks not saving**
- Modern browsers may block localStorage on `file://` protocol
- Use a local web server instead of opening files directly
- Check browser privacy settings

**Responsive issues**
- Clear browser cache and reload
- Test on different devices and orientations
- Check CSS media queries are loading correctly

### Browser Developer Tools
Use browser dev tools for debugging:
1. **Console**: Check for JavaScript errors
2. **Network**: Verify all resources load correctly
3. **Elements**: Inspect HTML structure and CSS styles
4. **Application**: Check localStorage data (if using local server)

## 🤝 **Contributing**

We welcome contributions to improve the MAPúa Navigation System!

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test on multiple browsers before submitting
- Update documentation for new features
- Ensure responsive design principles are maintained

### Areas for Contribution
- 🗺️ **Map Data**: Add more detailed campus layout
- 🎨 **UI/UX**: Improve accessibility and user experience
- ⚡ **Performance**: Optimize rendering and animations
- 📱 **Mobile**: Enhance mobile user experience
- 🔍 **Search**: Add location search functionality
- 🌐 **i18n**: Add multi-language support

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 **Authors & Acknowledgments**

- **Development Team**: [Your Name/Team]
- **Design Inspiration**: Modern web design trends and MAPúa branding
- **Icons**: Font Awesome 6.5.1
- **Fonts**: Google Fonts (Inter family)

### Special Thanks
- MAPúa University for campus layout references
- The open-source community for inspiration and resources
- Beta testers who provided valuable feedback

## 🗺️ **Roadmap**

### Version 2.0 (Planned)
- [ ] Real-time location tracking
- [ ] Multi-floor navigation
- [ ] Voice-guided directions
- [ ] Offline map support
- [ ] QR code integration
- [ ] Admin panel for location management

### Version 1.1 (In Development)
- [ ] Search functionality for locations
- [ ] Route sharing via URL
- [ ] Print-friendly directions
- [ ] Accessibility improvements
- [ ] Performance optimizations

---

**Made with ❤️ for MAPúa University**

*Last updated: 8/19/2025*
