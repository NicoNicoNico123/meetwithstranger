# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application for connecting strangers through a simple friendship request interface. The application features two main buttons that determine user interaction flow.

## Application Flow

1. **Accept Invite Button**: When clicked, reveals a contact form field where users can input their Instagram ID or WhatsApp number
2. **Reject Button**: When clicked, displays a polite interruption message/popup

## Technology Stack

This is a **static web application** that should be built with:
- **HTML5**: Semantic structure for the main interface
- **CSS3**: Styling and responsive design (consider using modern CSS frameworks like Tailwind CSS for rapid development)
- **Vanilla JavaScript**: For button interactions, form field visibility, and popup functionality
- **No backend required**: All functionality is client-side

## Development Commands

Since this is a static application:
- **Development**: Open `index.html` directly in a browser or use a local server like `python -m http.server` or `npx serve`
- **Testing**: Manual testing in browser, no automated testing framework needed
- **Build**: No build process required for static files

## Architecture

```
/
├── index.html          # Main application entry point
├── css/
│   └── styles.css      # Application styling
├── js/
│   └── main.js         # Button interactions and UI logic
└── assets/             # Images, icons, or other media (if needed)
```

## Key Components

1. **Main Interface**: Two-button layout with clear CTAs
2. **Contact Form**: Initially hidden, revealed when "Accept" is clicked
3. **Modal/Popup**: For rejection message with polite interruption text
4. **Form Validation**: Basic validation for Instagram ID or WhatsApp number formats

## Development Guidelines

- Keep the interface simple and intuitive
- Use semantic HTML for accessibility
- Ensure responsive design for mobile and desktop
- Add smooth transitions for button interactions and form field appearance
- Consider form validation for contact information (basic format checking)