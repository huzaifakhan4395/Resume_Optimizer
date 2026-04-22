# Resume Optimizer v1.0

A professional, accessible web application that provides AI-powered resume analysis and instant feedback to help job seekers improve their resumes and increase their chances of getting hired.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Design & Accessibility](#design--accessibility)
- [Technology Stack](#technology-stack)
- [Browser Compatibility](#browser-compatibility)
- [Responsive Design](#responsive-design)
- [Theme System](#theme-system)
- [File Upload](#file-upload)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Contributing](#contributing)
- [FAQs](#faqs)

---

## ✨ Features

### Core Features
- **✅ Multi-Page Application** — Three interconnected pages with seamless navigation
- **🌙 Dark/Light Mode** — Persistent theme support with system preference detection
- **📱 Fully Responsive** — Mobile-first design (320px → 1024px+)
- **♿ WCAG 2.1 Level AA Compliant** — Accessible for users with disabilities
- **📊 Resume Analysis** — AI-powered feedback on resume quality (mock analysis)
- **🔒 Privacy-First** — All processing is done locally; no data is sent to servers
- **⚡ Fast & Lightweight** — Optimized performance; instant results
- **🎨 Professional Design** — Clean, modern UI following UX best practices

### Pages
1. **Home/Landing Page** (`index.html`)
   - Hero section with value proposition
   - Feature highlights (3 cards)
   - How it works flow (3 steps)
   - Call-to-action buttons

2. **Upload & Analysis Page** (`upload.html`)
   - Drag-and-drop file upload
   - File format validation (PDF, Word, Text)
   - Resume analysis trigger
   - Loading indicator with progress messaging
   - Sample analysis results display

3. **Results Page** (`results.html`)
   - Overall resume score (0-100)
   - Category breakdown (Keyword Match, Format, Content)
   - Strengths section (highlight positives)
   - Weaknesses section (actionable improvements)
   - Recommendations with priority levels

---

## 📁 Project Structure

```
Resume Optimizer/
├── index.html                 # Home/Landing page
├── upload.html               # Upload & Analysis page
├── results.html              # Results & Recommendations page
├── css/
│   ├── design-system.css     # Design tokens, colors, typography, spacing
│   └── styles.css            # Component library & responsive styles
├── js/
│   ├── scripts.js            # Main application orchestration
│   ├── theme.js              # Dark/light mode management
│   ├── navigation.js         # Multi-page routing & active link handling
│   ├── form-handler.js       # File upload & validation
│   └── accessibility.js      # Keyboard navigation & focus management
├── README.md                 # This file
└── .gitignore               # Git ignore file (OS files, node_modules)
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No additional dependencies or build tools required
- Works offline (no internet required after initial load)

### Installation

1. **Extract the ZIP file** to your desired location
   ```bash
   unzip Resume_Optimizer_v1.0.zip
   cd "Resume Optimizer"
   ```

2. **Open in your browser**
   - Double-click `index.html` to open locally
   - OR use a local server (recommended for better performance):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Then navigate to `http://localhost:8000`

3. **No additional setup required!**
   - All JavaScript modules load automatically
   - Styles are applied on page load
   - Theme preference is saved to localStorage

---

## 📖 Usage Guide

### Home Page (index.html)
1. Open the application in your browser
2. Review the value propositions and how it works
3. Click **"Get Started"** button to proceed to upload
4. Or click **"Learn More"** to scroll to features section

### Upload Page (upload.html)
1. Click the upload area or drag a resume file (PDF, Word, or text)
2. Accepted formats: `.pdf`, `.doc`, `.docx`, `.txt`
3. Maximum file size: 10 MB
4. After selecting a file, click **"Analyze Resume"**
5. Wait for the analysis to complete (typically 2-3 seconds)
6. Results will automatically display below

### Results Page (results.html)
1. After analysis, you'll see your overall score and metrics
2. Review the **Strengths** section for positive feedback
3. Check the **Weaknesses** section for improvement areas
4. Read actionable **Recommendations** to strengthen your resume
5. Click **"Analyze Again"** to return to upload page and test another resume

---

## 🎨 Design & Accessibility

### Design Principles
This application follows **ethical design principles**:
- **Clarity over complexity** — Simple, intuitive navigation
- **Inclusive by default** — WCAG 2.1 AA standards from the ground up
- **Performance-first** — Fast load times and smooth interactions
- **Privacy-preserved** — Local-only processing, no tracking
- **Non-discriminatory** — Analysis provides balanced, fair feedback

### Accessibility Features

#### Visual Accessibility
- ✅ **Contrast Ratio:** 4.5:1 minimum for all text (WCAG AA standard)
- ✅ **Font Scaling:** Responsive text sizes using CSS clamp()
- ✅ **Color Independence:** Information not conveyed by color alone
- ✅ **Dark Mode:** Reduces eye strain; separate color palette for dark theme
- ✅ **Focus Indicators:** Always visible 3px outline with 2px offset

#### Keyboard Accessibility
- ✅ **Full Keyboard Navigation:** All interactive elements reachable via Tab/Shift+Tab
- ✅ **Skip Link:** "Skip to main content" link at top of each page
- ✅ **Focus Trap Prevention:** Focus management in modals (future feature)
- ✅ **Enter Key Support:** Forms submit with Enter; buttons activate with Enter/Space

#### Screen Reader Support
- ✅ **Semantic HTML:** Proper use of `<main>`, `<nav>`, `<section>`, `<article>`
- ✅ **ARIA Labels:** Descriptive labels for icon buttons and form fields
- ✅ **Heading Hierarchy:** One H1 per page, nested H2/H3 for structure
- ✅ **Form Accessibility:** Labels linked via `for` attribute; errors announced via `aria-live`
- ✅ **Chart Fallback:** Data tables as fallback for chart visualizations

#### Motion & Animation
- ✅ **Reduced Motion Support:** Respects `prefers-reduced-motion` media query
- ✅ **Smooth Transitions:** 300ms default transitions (customizable CSS variables)
- ✅ **No Auto-play:** No animations that play automatically

### WCAG 2.1 Level AA Compliance Checklist

| Criterion | Status | Notes |
|-----------|--------|-------|
| 1.4.3 Contrast (Minimum) | ✅ Pass | 4.5:1 for normal text, 3:1 for large text |
| 1.4.4 Resize Text | ✅ Pass | All content remains accessible at 200% zoom |
| 2.1.1 Keyboard | ✅ Pass | All functionality accessible via keyboard |
| 2.1.2 No Keyboard Trap | ✅ Pass | Focus can always move away from components |
| 2.4.3 Focus Order | ✅ Pass | Logical tab order following DOM structure |
| 2.4.7 Focus Visible | ✅ Pass | Always visible, at least 2px outline |
| 3.2.4 Consistent Identification | ✅ Pass | Navigation consistent across all pages |
| 4.1.2 Name, Role, Value | ✅ Pass | Proper semantic HTML and ARIA attributes |

---

## 💻 Technology Stack

### Frontend
- **HTML5** — Semantic markup for accessibility
- **CSS3** — Modern features (CSS Grid, Flexbox, CSS Variables)
- **Vanilla JavaScript** — No frameworks; pure ES6+ module pattern
- **Chart.js** — Beautiful data visualizations (CDN-loaded)

### Architecture
- **Module Pattern** — Encapsulated JavaScript modules for maintainability
- **CSS Design System** — Token-based styling with design variables
- **localStorage API** — Client-side persistence (theme, session data)
- **Responsive Design** — Mobile-first approach with media queries

---

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |
| Internet Explorer | Any | ❌ Not Supported |

### Older Browser Support
For older browsers (IE11), consider using polyfills for:
- CSS Variables
- Array methods (find, includes)
- Promise API

---

## 📱 Responsive Design

### Breakpoints
- **Mobile** (< 768px) — Single-column layout, hamburger menu
- **Tablet** (768px - 1024px) — Two-column layout where appropriate
- **Desktop** (≥ 1024px) — Multi-column layout, full navigation

### Mobile-First Approach
- Base styles apply to all screen sizes (mobile-first)
- Media queries enhance layout for larger screens
- Touch-friendly: All buttons/inputs ≥ 44px minimum
- No horizontal scrolling on any device

### Tested Devices
- iPhone 12 (375px)
- iPad (768px)
- Desktop (1024px+)
- Ultra-wide screens (2560px+)

---

## 🌙 Theme System

### How to Switch Themes
1. Click the 🌙 button in the header to toggle dark mode
2. Your preference is automatically saved to localStorage
3. When you return, your preference is restored

### Theme Detection
- **Manual Override:** Click the toggle button to manually switch themes
- **System Preference:** If no saved preference, uses your OS dark mode setting
- **Fallback:** Defaults to light mode if no preference detected

### Color Variables
All colors are defined in `css/design-system.css`:
```css
:root {
  --color-primary: #4f46e5;      /* Light mode */
  --color-bg: #f5f7fb;
  --color-text: #1a1a1a;
}

body.dark {
  --color-primary: #818cf8;       /* Dark mode */
  --color-bg: #0f172a;
  --color-text: #f1f5f9;
}
```

---

## 📤 File Upload

### Supported Formats
- PDF (`.pdf`)
- Microsoft Word (`.doc`, `.docx`)
- Plain Text (`.txt`)

### File Validation
- Maximum file size: 10 MB
- Invalid formats are rejected with user-friendly error message
- File is processed locally; never sent to external servers

### Drag & Drop Support
- Click the upload area to select a file
- OR drag and drop a file into the upload zone
- Visual feedback on hover

### File Storage
- File is temporarily stored in browser memory during analysis
- After page refresh, file is cleared (session-only)
- Optional: Enable localStorage to persist file metadata (name, size)

---

## ⌨️ Keyboard Navigation

### Global Navigation
| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift + Tab | Move to previous interactive element |
| Enter | Activate button, submit form, open link |
| Space | Activate button (when focused) |
| Escape | Close modal/menu (future feature) |

### Form Navigation
| Key | Action |
|-----|--------|
| Tab | Move to next form field |
| Enter | Submit form (from button focus) |
| Space | Instead of Enter for file input activation |

### Testing Keyboard Navigation
1. Press Tab repeatedly to navigate through all interactive elements
2. Verify focus indicator is always visible
3. All buttons should activate with Enter or Space
4. All links should work with Enter key
5. No elements should become unreachable

---

## 🔊 Screen Reader Support

### Supported Screen Readers
- NVDA (Windows) — Free, open-source
- JAWS (Windows) — Commercial
- Narrator (Windows) — Built-in
- VoiceOver (macOS/iOS) — Built-in
- TalkBack (Android) — Built-in

### Testing with Screen Readers

#### NVDA (Windows)
1. Download from https://www.nvaccess.org/download/
2. Install and launch NVDA
3. Open the application in a browser
4. Navigate using arrow keys and Tab

#### VoiceOver (macOS)
1. Press Cmd + F5 to enable VoiceOver
2. Use VO keys (usually Ctrl + Option) to navigate
3. Press VO + U to open the rotor

### Structure Announced by Screen Readers
- **Page Title:** Announced first
- **Skip Link:** Available first in tab order
- **Header:** Main navigation clearly announced
- **Main Content:** Semantic sections with proper heading hierarchy
- **Footer:** Links and copyright information
- **Forms:** Labels clearly associated with inputs
- **Charts:** Data table fallback for accessibility

---

## 🔧 Customization

### Changing Colors
Edit `css/design-system.css`:
```css
:root {
  --color-primary: #4f46e5;        /* Change primary color */
  --color-success: #10b981;        /* Change success color */
  /* Update other colors as needed */
}
```

### Adjusting Spacing
Edit spacing scale in `css/design-system.css`:
```css
:root {
  --space-4: 1rem;                 /* Adjust base spacing */
  --space-8: 2rem;
  /* Adjust other spacing values */
}
```

### Modifying Typography
Edit font variables in `css/design-system.css`:
```css
:root {
  --font-family-base: "Your Font", sans-serif;
  --font-size-base: 16px;
  /* Update other typography values */
}
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Accessibility
- [ ] Run axe DevTools on all pages (Chrome extension)
- [ ] Check contrast ratios using WebAIM Contrast Checker
- [ ] Test keyboard navigation (Tab through all pages)
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Verify no keyboard traps
- [ ] Check focus indicators are visible

#### Responsive Design
- [ ] Test on mobile (< 768px) in DevTools
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify no horizontal scrolling
- [ ] Check touch targets are ≥ 44px

#### Dark Mode
- [ ] Toggle theme on all pages
- [ ] Verify persistence after page refresh
- [ ] Check contrast in dark mode
- [ ] Verify all elements are readable

#### Form & Upload
- [ ] Upload valid file (success case)
- [ ] Try uploading invalid format (error case)
- [ ] Try uploading oversized file (error case)
- [ ] Try uploading without selecting file (error case)

#### Cross-Browser
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge

---

## 📊 Performance Metrics

### Target Metrics
- **Lighthouse Performance:** 90+
- **Page Load Time:** < 3 seconds on 4G
- **Largest Contentful Paint:** < 2.5 seconds
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

### Optimization Techniques
- CSS is inline or critical
- JavaScript is minified and deferred
- Chart.js loads only on results page
- Images are optimized (if any)
- CSS Grid and Flexbox for efficient layout

---

## 🔒 Privacy & Security

### Data Handling
- ✅ **Local Processing:** All analysis happens in your browser
- ✅ **No Data Transfer:** Your resume is never sent to servers
- ✅ **No Tracking:** No analytics or tracking code
- ✅ **Session-Only:** Data is cleared on page refresh
- ✅ **Optional Storage:** Theme preference saved locally (no personal data)

### localStorage Usage
- `resume-optimizer-theme` — Stores dark/light mode preference (only)
- No resume content is ever stored
- All data remains on your device

---

## 🐛 Troubleshooting

### File Upload Not Working
- **Problem:** "Analyze" button is disabled
- **Solution:** Make sure you've selected a file in a supported format (PDF, Word, TXT)

### Dark Mode Not Persisting
- **Problem:** Theme resets after page refresh
- **Solution:** Check if localStorage is enabled in your browser settings

### Charts Not Displaying
- **Problem:** Bar/pie charts not visible
- **Solution:** Charts require JavaScript to be enabled; check browser settings

### Navigation Links Not Working
- **Problem:** Can't navigate between pages
- **Solution:** Make sure all HTML files are in the same directory

### Focus Outline Not Visible
- **Problem:** Blue outline not showing when tabbing
- **Solution:** Check if browser extensions are interfering; try in incognito/private mode

---

## 📈 Future Enhancements

### Phase 2 Features
- [ ] Settings page for user preferences
- [ ] Tips & Best Practices guide
- [ ] FAQ section
- [ ] About page
- [ ] Contact/Support form
- [ ] Resume improvement tips based on analysis
- [ ] Export results as PDF
- [ ] Multiple resume comparison

### Phase 3 Features
- [ ] Backend API integration for advanced analysis
- [ ] User accounts and saved resumes
- [ ] Real AI-powered analysis (not mock)
- [ ] Resume templates
- [ ] Job suggestion matching

---

## 📝 Contributing

This is a template application. You can customize and extend it for your needs:

1. **Modify colors:** Edit `css/design-system.css`
2. **Add new pages:** Create new HTML files, update nav in header
3. **Extend analysis:** Update mock data in `js/scripts.js`
4. **Add features:** Create new JavaScript modules in `js/` folder

---

## 📄 License

This project is provided as-is for educational and professional use.

---

## ❓ FAQs

**Q: Is my resume data stored anywhere?**
A: No. All processing happens locally in your browser. Your resume is never sent to any server or stored anywhere.

**Q: Does this work without internet?**
A: Yes! After initial page load, the application works completely offline (except for the Chart.js library which is loaded from CDN on first page load).

**Q: Can I use this on mobile?**
A: Yes! The application is fully responsive and works on all modern mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile, etc.).

**Q: Why are the results the same every time?**
A: This is a demo version with mock analysis data. A production version would integrate with real AI/ML backends for genuine analysis.

**Q: How do I customize the analysis criteria?**
A: Edit the mock data in `js/scripts.js` in the `ANALYSIS_MOCK_DATA` object. You can modify scores, categories, and recommendations.

**Q: Can I change the colors?**
A: Yes! All colors are CSS variables in `css/design-system.css`. Update the color values to customize the entire design.

**Q: Is this WCAG compliant?**
A: Yes! This application is designed to meet **WCAG 2.1 Level AA** standards, making it accessible for users with disabilities.

---

## 📞 Support

For questions or issues, please refer to:
1. **Troubleshooting section** above
2. **Code comments** throughout the application
3. **Design system documentation** in CSS files

---

**Resume Optimizer v1.0**  
Built with ❤️ for job seekers everywhere.  
© 2026 All Rights Reserved.
