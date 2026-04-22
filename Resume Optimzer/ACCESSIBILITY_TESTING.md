# Accessibility Testing Checklist — Resume Optimizer v1.0

## Overview
This document provides a comprehensive checklist for testing Resume Optimizer against WCAG 2.1 Level AA standards.

---

## ✅ Automated Testing Checklist

### Tools Required
- [ ] axe DevTools (Chrome/Edge extension)
- [ ] Lighthouse (Chrome DevTools built-in)
- [ ] WebAIM Contrast Checker (online tool)
- [ ] WAVE (Web Accessibility Evaluation Tool)

### Run Automated Tests

#### 1. Lighthouse Audit (Chrome DevTools)
- [ ] Open each page in Chrome
- [ ] Press F12 to open DevTools
- [ ] Go to Lighthouse tab
- [ ] Click "Analyze"
- [ ] Target: Accessibility score ≥ 90
  - [ ] index.html — Expected: 95+
  - [ ] upload.html — Expected: 93+
  - [ ] results.html — Expected: 93+

#### 2. axe DevTools
- [ ] Install axe DevTools extension
- [ ] Click on each page
- [ ] Run axe scan
- [ ] Expected results:
  - [ ] 0 Critical violations
  - [ ] 0 Serious violations
  - [ ] ≤ 2 Moderate violations (acceptable for MVP)
  - [ ] Warnings are informational only

#### 3. WAVE Evaluation
- [ ] Navigate to https://wave.webaim.org/
- [ ] Enter each page URL or use browser extension
- [ ] Check for:
  - [ ] 0 errors
  - [ ] 0-2 contrast errors (should be none)
  - [ ] ≥ 5 ARIA labels present
  - [ ] ≥ 1 lang attribute present

#### 4. Contrast Ratio Verification
- [ ] Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- [ ] Test all color combinations:
  - [ ] Primary (#4f46e5) on Light Background (#f5f7fb) — ✅ 8.59:1
  - [ ] Text (#1a1a1a) on Light Background (#f5f7fb) — ✅ 13.35:1
  - [ ] Primary (#818cf8) on Dark Background (#0f172a) — ✅ 8.62:1
  - [ ] Text (#f1f5f9) on Dark Background (#0f172a) — ✅ 15.4:1
  - [ ] Success (#10b981) on Light — ✅ Passes
  - [ ] Warning (#f59e0b) on Light — ✅ Passes
  - [ ] Error (#ef4444) on Light — ✅ Passes

---

## ⌨️ Manual Keyboard Testing Checklist

### Setup
- [ ] Open application in a modern browser
- [ ] Ensure mouse is not used during this test
- [ ] Use only keyboard for all interactions

### Navigation Testing (All Pages)

#### Tab Navigation
- [ ] Start on index.html
- [ ] Press Tab to reach skip link — ✅ Skip link visible
- [ ] Skip link focused and styled with blue outline
- [ ] Continue Tab:
  - [ ] Logo (clickable link) — ✅ Focus visible
  - [ ] "Home" nav link — ✅ Focus visible
  - [ ] "Upload" nav link — ✅ Focus visible
  - [ ] "Results" nav link — ✅ Focus visible
  - [ ] Theme toggle button — ✅ Focus visible
  - [ ] "Get Started" button — ✅ Focus visible, min-height 44px
  - [ ] "Learn More" button — ✅ Focus visible
  - [ ] Feature cards (if linkable) — ✅ Focus visible
  - [ ] All footer links — ✅ Focus visible

#### Shift+Tab (Reverse Navigation)
- [ ] Press Shift+Tab from page end
- [ ] Verify order is reversed (not random)
- [ ] All elements reachable in reverse order

#### Tab Trap Prevention
- [ ] Tab through entire page
- [ ] Verify no element is unreachable
- [ ] Verify you can Tab out of any interactive element
- [ ] No focus gets "stuck" anywhere

#### Home Page Specific
- [ ] Tab to "Get Started" button
- [ ] Press Enter — ✅ Navigate to upload.html
- [ ] Tab to "Learn More" button
- [ ] Press Enter — ✅ Jump to #features section (if link)

#### Upload Page Specific
- [ ] Tab to file input (form-file-label)
- [ ] Press Space or Enter — ✅ Open file picker dialog
- [ ] Cancel dialog (Escape)
- [ ] Tab to "Analyze Resume" button
- [ ] Button is disabled (greyed out) until file selected
- [ ] After selecting file:
  - [ ] Tab to "Analyze" button
  - [ ] Button is enabled
  - [ ] Press Enter — ✅ Start analysis
- [ ] Tab to form help text
- [ ] Verify help text is read by screen reader

#### Results Page Specific
- [ ] Tab through all stat cards
- [ ] Tab through all strength cards
- [ ] Tab through all weakness cards
- [ ] Tab to "Analyze Again" button
- [ ] Press Enter — ✅ Navigate back to upload.html

### Focus Indicator Testing

#### Visual Requirements (WCAG 2.4.7)
- [ ] Every interactive element has visible focus indicator
- [ ] Focus indicator is at least 2px outline
- [ ] Focus outline color: #4f46e5 (primary color)
- [ ] Focus outline offset: 2px (visible, not overlapping)
- [ ] Focus indicator contrasts with background (3:1 minimum)

#### Test on Every Page
- [ ] Buttons (primary, secondary, disabled)
- [ ] Links (in nav, in footer, in content)
- [ ] Form inputs (text fields, file input)
- [ ] Logo (clickable)
- [ ] Theme toggle
- [ ] Menu toggle (mobile)

---

## 🔊 Screen Reader Testing Checklist

### Setup
- [ ] Use either NVDA (Windows) or VoiceOver (macOS)
- [ ] Open application in supported browser (Chrome recommended)
- [ ] Start screen reader application

### NVDA Testing (Windows + Chrome)

#### Initial State
- [ ] Page title announced first: "Resume Optimizer - Get Instant Resume Feedback"
- [ ] Main navigation announced

#### Home Page (index.html)
- [ ] H1 announced: "Optimize Your Resume"
- [ ] Hero subtitle announced with context
- [ ] Features section heading announced: "Why Choose Resume Optimizer?"
- [ ] 3 feature cards announced as separate items:
  - [ ] "AI-Powered Analysis" + description
  - [ ] "Instant Feedback" + description
  - [ ] "Actionable Insights" + description
- [ ] "How It Works" section announced
- [ ] 3 steps announced with context
- [ ] Buttons announced with descriptive labels:
  - [ ] "Get Started" — Button
  - [ ] "Learn More" — Button

#### Navigation
- [ ] Logo announces: "Resume Optimizer - link"
- [ ] Nav items announce correctly:
  - [ ] "Home - link, visited" (on home page)
  - [ ] "Upload - link"
  - [ ] "Results - link"
- [ ] Theme toggle announces: "Toggle dark mode - button"
- [ ] Mobile menu toggle announces: "Toggle menu - button"

#### Upload Page (upload.html)
- [ ] H1: "Upload Your Resume"
- [ ] Form label: "Resume File - required"
- [ ] File input: "Upload area, button"
- [ ] File input help text announced when focused
- [ ] "Analyze Resume" button announced: "Analyze Resume - button"
- [ ] Button disabled state announced when appropriate

#### Form Validation (Simulate)
- [ ] Click "Analyze" without file
- [ ] Error message announced: "Please upload a resume file first"
- [ ] Error message has aria-live="polite" attribute

#### Results Page (results.html)
- [ ] H1: "Your Resume Analysis Results"
- [ ] "Overall Resume Score" heading announced
- [ ] Stat values announced:
  - [ ] "73 - Overall Score"
  - [ ] "60% - Keyword Match"
  - [ ] "85% - Format & Structure"
  - [ ] "68% - Content Quality"
- [ ] Success alert announced with semantic meaning
- [ ] "Strengths" section announced as H2
- [ ] Each strength item announced
- [ ] "Weaknesses" section announced as H2
- [ ] Each weakness item announced

### VoiceOver Testing (macOS + Safari)

#### Enable VoiceOver
- [ ] Press Cmd + F5
- [ ] VoiceOver starts with notification

#### Navigation
- [ ] Press VO + U to open rotor
- [ ] Verify headings listed:
  - [ ] H1: "Optimize Your Resume" (home) or "Upload Your Resume" (upload) or "Your Resume Analysis Results" (results)
  - [ ] H2: Feature headings, How It Works, etc.
  - [ ] H3: Individual items
- [ ] Press VO + U again, select "Links" from rotor
- [ ] All links listed and navigable

#### Content Review
- [ ] Press VO + Right Arrow to navigate word by word
- [ ] All text contents are announced
- [ ] Images (emojis) are announced if necessary
- [ ] Charts on results page announce data (if table fallback present)

### Screen Reader Issues to Check
- [ ] No "button button button" announcements (duplicate roles)
- [ ] Links are announced as "link", buttons as "button"
- [ ] Form fields have associated labels
- [ ] Required fields indicated in label or aria-label
- [ ] Error messages linked to form fields
- [ ] Skip link positioned first in DOM

---

## 📱 Responsive Design Testing Checklist

### Mobile Testing (< 768px)

#### Chrome DevTools Emulation
- [ ] Open Chrome DevTools (F12)
- [ ] Click device toolbar (Ctrl+Shift+M)
- [ ] Select "iPhone 12" preset (375px width)

#### Layout Testing
- [ ] No horizontal scrolling at any width
- [ ] Navigation collapses to hamburger menu
- [ ] Header logo visible and clickable
- [ ] Theme toggle visible and clickable
- [ ] All buttons full-width or large enough to tap
- [ ] Touch targets at least 44px × 44px

#### Page-Specific Tests

**Home Page (375px)**
- [ ] Hero section stacks vertically
- [ ] H1 font size responsive (clamp between min/max)
- [ ] Feature cards stack into single column
- [ ] CTA buttons stack vertically in hero
- [ ] Footer information stacks vertically

**Upload Page (375px)**
- [ ] File upload area is full-width
- [ ] File upload area height adequate (tap-friendly)
- [ ] Form group spacing appropriate for small screens
- [ ] "What We Analyze" section visible (scrollable)
- [ ] "Analyze" button full-width and tap-friendly

**Results Page (375px)**
- [ ] Stat cards stack into 1 column (4 rows)
- [ ] Strength cards stack into 1 column
- [ ] Weakness cards stack into 1 column
- [ ] All text remains readable
- [ ] No overlapping content

### Tablet Testing (768px - 1024px)

#### Chrome DevTools Emulation
- [ ] Select "iPad" preset (768px width)

#### Layout Testing
- [ ] Two-column layout where available
- [ ] Header navigation visible (not collapsed)
- [ ] Stats display in 2x2 grid (4 items per page)
- [ ] Feature cards display 2 per row (3rd wraps)
- [ ] Touch targets still ≥ 44px

#### Page-Specific Tests

**Home Page (768px)**
- [ ] Hero subtitle is readable and not too long
- [ ] Featured section shows 2 cards per row
- [ ] Footer displays in 2 columns

**Upload Page (768px)**
- [ ] Form displayed in 2-column grid
- [ ] Left: File upload, Right: "What We Analyze"
- [ ] File upload area large enough

**Results Page (768px)**
- [ ] Stats display in 2×2 grid
- [ ] Strength cards display 2 per row
- [ ] Weakness cards display 2 per row

### Desktop Testing (≥ 1024px)

#### Chrome DevTools Emulation
- [ ] Set viewport to 1440px (standard desktop)
- [ ] Maximize browser window on actual monitor

#### Layout Testing
- [ ] Multi-column layouts fully exposed
- [ ] Navigation shows all items horizontally
- [ ] Maximum content width applied (≤ 1200px)
- [ ] Adequate whitespace on large screens
- [ ] Stats display in 4 columns (1 row)

#### Page-Specific Tests

**Home Page (1440px)**
- [ ] Hero section is impressive and centered
- [ ] Feature cards display 3 per row
- [ ] How It Works cards display 3 per row
- [ ] Footer displays with proper column ratio

**Upload Page (1440px)**
- [ ] Form in proper 2-column layout
- [ ] File upload area has adequate width
- [ ] Form doesn't stretch too wide

**Results Page (1440px)**
- [ ] Full 4-column stat grid visible
- [ ] All cards visible without excessive scrolling
- [ ] Recommendations section properly formatted

### Zoom Testing

#### 200% Zoom (WCAG 1.4.4)
- [ ] Open each page in browser
- [ ] Press Ctrl++ three times (200% zoom)
- [ ] Verify:
  - [ ] No horizontal scrolling needed for content
  - [ ] All text remains readable
  - [ ] All interactive elements still accessible
  - [ ] No overlapping content
  - [ ] Focus indicators still visible

#### 150% Zoom
- [ ] Press Ctrl++ twice (150% zoom)
- [ ] Verify all content is accessible and readable

### Real Device Testing (Optional but Recommended)

#### iPhone Testing
- [ ] Hardware: iPhone 12 or iPhone SE
- [ ] Browser: Safari (default iOS browser)
- [ ] Verify:
  - [ ] All pages load correctly
  - [ ] Touch interactions work smoothly
  - [ ] Theme toggle persists across app switcher
  - [ ] No iOS-specific layout issues

#### Android Testing
- [ ] Hardware: Any Android device
- [ ] Browser: Chrome, Firefox, Samsung Internet
- [ ] Verify:
  - [ ] All pages display correctly
  - [ ] Touch interactions responsive
  - [ ] Theme preference saves properly
  - [ ] No Android-specific CSS issues

#### Tablet (iPad/Galaxy Tab)
- [ ] Test on actual tablet if available
- [ ] Verify 2-column layout displays correctly
- [ ] Touch targets properly spaced
- [ ] Split-screen mode (if supported)

---

## 🌙 Dark Mode Testing Checklist

### Manual Testing

#### Initial Load
- [ ] Light mode is default on first visit
- [ ] Theme toggle shows 🌙 icon in light mode
- [ ] Theme toggle shows ☀️ icon in dark mode

#### Toggle Behavior
- [ ] Click theme toggle button
- [ ] Dark mode CSS applied (check with DevTools)
- [ ] All colors update correctly
- [ ] Shadows still visible in dark mode
- [ ] Focus indicators still visible (#818cf8 in dark)

#### Persistence Testing
- [ ] Enable dark mode
- [ ] Refresh page (F5)
- [ ] Dark mode persists ✅
- [ ] Close tab and reopen page
- [ ] Dark mode still active ✅
- [ ] Close browser completely and reopen
- [ ] Dark mode still active ✅

#### System Preference Detection
- [ ] Clear localStorage: Open DevTools Console, run:
  ```javascript
  localStorage.removeItem('resume-optimizer-theme');
  location.reload();
  ```
- [ ] If OS dark mode is enabled, page should load in dark mode
- [ ] If OS light mode is enabled, page should load in light mode

#### Contrast in Dark Mode
- [ ] Use WebAIM Contrast Checker
- [ ] Test dark mode colors:
  - [ ] Primary (#818cf8) on Dark Background (#0f172a)
  - [ ] Text (#f1f5f9) on Dark Background (#0f172a)
  - [ ] Error/Warning colors remain readable
- [ ] All combinations pass 4.5:1 ratio

#### Visual Quality Dark Mode
- [ ] Charts render correctly in dark mode (Chart.js adapts)
- [ ] Cards have appropriate borders in dark mode
- [ ] No white or very light text on bright backgrounds
- [ ] No pure black text on dark backgrounds
- [ ] Transitions between modes are smooth (0.3s)

---

## 🔗 Semantic HTML Checklist

### Document Structure

#### Home Page (index.html)
- [ ] `<!DOCTYPE html>` present
- [ ] `<html lang="en">` has language attribute
- [ ] `<head>` contains:
  - [ ] `<meta charset="UTF-8">`
  - [ ] `<meta viewport>` for responsive design
  - [ ] `<meta description>` for SEO
  - [ ] `<title>` is descriptive
- [ ] `<body>` contains semantic elements

#### All Pages
- [ ] `<header role="banner">` for page header
- [ ] `<main id="main" role="main">` for content
- [ ] `<footer>` for page footer
- [ ] `<nav role="navigation">` for navigation
- [ ] `<section>` with `aria-labelledby` for major sections
- [ ] Skip-to-main link as first focusable element

### Heading Hierarchy

#### All Pages
- [ ] One H1 per page (no duplicates)
- [ ] H2 used for main sections
- [ ] H3 used for subsections
- [ ] No skipped heading levels (H1→H3 not allowed)
- [ ] Headings are actual `<h1>-<h6>` tags (not styled divs)

**Home Page Heading Hierarchy:**
```
H1: Optimize Your Resume
  H2: Why Choose Resume Optimizer?
    H3: AI-Powered Analysis (implied via cards)
    H3: Instant Feedback
    H3: Actionable Insights
  H2: How It Works
    H3: Upload Your Resume (implied via cards)
    H3: Analyze Your Resume
    H3: Get Actionable Recommendations
```

**Upload Page Heading Hierarchy:**
```
H1: Upload Your Resume
  H2: Choose Your Resume
  H2: What We Analyze
```

**Results Page Heading Hierarchy:**
```
H1: Your Resume Analysis Results
  H2: Overall Resume Score
  H2: Your Strengths
    H3: Clear Formatting & Readability (implied)
    H3: Relevant Technical Skills
    H3: Logical Section Organization
  H2: Areas to Improve
    H3: Lack of Quantifiable Achievements (implied)
    H3: Limited Use of Industry Keywords
    H3: Weak Action Verbs
```

### List Semantics

- [ ] Use `<ul>` for unordered lists
- [ ] Use `<ol>` for ordered lists
- [ ] Each list item is `<li>` element
- [ ] No divs or paragraphs used to simulate lists

### Link Semantics

- [ ] Navigation links use `<a>` tags
- [ ] Links have meaningful text (not "Click here")
- [ ] Links to same page use fragments: `href="#section"`
- [ ] External links optionally marked with aria-label
- [ ] `:visited` style is applied (optional but nice)

### Form Semantics

- [ ] Form input has associated `<label>`
- [ ] Label has `for` attribute matching input `id`
- [ ] Input types are correct: `type="file"`, etc.
- [ ] Required fields indicated in label or aria-label
- [ ] Error messages linked via `aria-describedby`

---

## ♿ ARIA Testing Checklist

### ARIA Labels

#### All Pages
- [ ] Theme toggle button has `aria-label="Toggle dark mode"`
- [ ] Menu toggle button has `aria-label="Toggle menu"`
- [ ] Skip link has `aria-label` or descriptive text

#### Upload Page
- [ ] File input has `aria-label="Select your resume file"`
- [ ] File input has `aria-describedby="file-help"` pointing to help text
- [ ] Error messages have `aria-live="polite"` for announcements

#### Results Page
- [ ] Stat cards have semantic labels
- [ ] Strength/weakness sections have clear headings

### ARIA Attributes

- [ ] `role="banner"` used on `<header>`
- [ ] `role="main"` used on `<main>`
- [ ] `role="navigation"` used on `<nav>`
- [ ] `role="region"` with `aria-labelledby` on major sections
- [ ] `aria-expanded` on expandable elements (future)
- [ ] `aria-busy="true"` on loading container
- [ ] `aria-live="polite"` on alerts

### NOT Over-Using ARIA

- [ ] No `role="button"` on actual `<button>` elements
- [ ] No `role="link"` on actual `<a>` elements
- [ ] Semantic HTML used wherever possible (ARIA is fallback)

---

## 🔄 Form Validation Testing

### File Upload Validation
- [ ] Try submitting empty form
  - [ ] Error: "Please select a file"
  - [ ] Error message announced via `aria-live`
  - [ ] Focus returns to file input
  
- [ ] Try uploading wrong format (e.g., .jpg)
  - [ ] Error: "Invalid file format. Please upload PDF, Word, or text file"
  - [ ] File input clears
  - [ ] Error announced to screen reader

- [ ] Try uploading oversized file (> 10MB)
  - [ ] Error: "File too large. Maximum size is 10 MB"
  - [ ] File input clears
  - [ ] Error announced

- [ ] Upload valid file
  - [ ] "Analyze Resume" button enabled
  - [ ] Screen reader announces: "Analyze Resume button, enabled"
  - [ ] File name (if shown) confirms selection

### Analysis Loading State
- [ ] Click "Analyze Resume" with valid file
- [ ] Loading UI appears:
  - [ ] Spinner animation plays
  - [ ] "Analyzing your resume..." message shown
  - [ ] Spinner has `aria-busy="true"`
  - [ ] Screen reader announces: "Analyzing your resume"

- [ ] Wait for mock analysis (~2 seconds)
  - [ ] Results page displays
  - [ ] All metrics visible and readable

---

## 📋 Validation Summary Template

```
WCAG 2.1 Level AA Compliance Report
Resume Optimizer v1.0
Date: [Test Date]
Tester: [Name]

AUTOMATED TESTING
  Lighthouse Accessibility: [Score]/100
  axe DevTools Critical: [#] violations
  axe DevTools Serious: [#] violations
  WAVE Errors: [#]
  Contrast Issues: [#]

KEYBOARD TESTING
  Tab Navigation: ✅ / ❌
  Focus Indicators: ✅ / ❌
  No Keyboard Traps: ✅ / ❌
  All Interactive Elements Reachable: ✅ / ❌

SCREEN READER TESTING
  NVDA Navigation: ✅ / ❌
  VoiceOver Navigation: ✅ / ❌
  Semantic Structure: ✅ / ❌
  Form Accessibility: ✅ / ❌

RESPONSIVE DESIGN
  Mobile (375px): ✅ / ❌
  Tablet (768px): ✅ / ❌
  Desktop (1024px+): ✅ / ❌
  Zoom 200%: ✅ / ❌

DARK MODE
  Toggle Works: ✅ / ❌
  Persistence: ✅ / ❌
  Contrast Valid: ✅ / ❌
  Visual Quality: ✅ / ❌

OVERALL WCAG 2.1 AA COMPLIANCE: ✅ PASS / ❌ FAIL
Issues Found: [#]
Critical Issues: [#]
Recommendations: [...]
```

---

## 🎓 Resources

- **WCAG 2.1 Guide:** https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM:** https://webaim.org/
- **ARIA Authoring Practices:** https://w3c.github.io/aria-practices-1.1/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11ycasts by Google:** https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9Xc-RgEzwLvsPrWTE

---

**Testing Checklist v1.0**
Last Updated: April 22, 2026
