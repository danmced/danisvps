---
name: pixel-art-letter-website
description: Build pixel art themed letter writing websites with social sharing. Use for creating interactive Valentine's Day sites, retro gaming-style letter platforms, or themed letter writing applications with Instagram Stories integration, emoji reactions, and letter templates.
license: MIT
---

# Pixel Art Letter Website Builder

Build beautiful pixel art themed letter writing websites with social sharing capabilities, emoji reactions, and customizable templates.

## Overview

This skill provides a complete workflow for creating pixel art styled letter writing platforms. It includes:

- **8-bit retro gaming aesthetic** with chunky pixel borders and classic fonts
- **Letter management** (write, view, archive, share)
- **Social media integration** (Instagram Stories, X, Threads, Email)
- **Interactive features** (emoji reactions, letter templates, image downloads)
- **Responsive design** with Tailwind CSS and shadcn/ui

## Quick Start

### 1. Initialize the Project

Use `webdev_init_project` with a static template:

```
Project type: Static (React 19 + Tailwind 4 + shadcn/ui)
```

### 2. Design Phase

Create a design brainstorm document (`ideas.md`) with 3 distinct approaches:

**Recommended: 8-bit Retro Gaming Aesthetic**
- Design Movement: NES/Famicom era pixel art
- Core Principles: Strict pixel grid, limited color palette, game-like interactions
- Color Palette: Warm Valentine colors (reds, pinks, creams) with dark outlines
- Typography: Press Start 2P (display) + Silkscreen (body)
- Signature Elements: Pixel hearts, chunky borders, floating decorations

### 3. Generate Visual Assets

Generate 4 key pixel art images:
1. **Hero background** (1920x600): Pixel landscape with floating hearts, trees, mailboxes
2. **Heart decoration** (128x128): Cute pixel heart sprite
3. **Envelope icon** (128x128): Pixel envelope with letter
4. **Cupid sprite** (128x128): Cute pixel cupid character

**Prompt template:**
```
Pixel art 8-bit retro game style [element]. Chunky pixels, warm Valentine colors 
(reds, pinks, creams), dark outlines. Nostalgic NES-style aesthetic.
```

### 4. Implement Core Pages

#### Home Page (`Home.tsx`)
- Hero section with background image and floating hearts
- Main content box with title and CTA buttons
- "How It Works" section with 3 feature cards
- Footer with branding

#### Write Letter Page (`WriteLetter.tsx`)
- Form with recipient name, sender name, message textarea
- Template selector button
- Send button that saves to localStorage
- Archive functionality

#### View Letters Page (`ViewLetters.tsx`)
- Grid display of all letters
- Modal for reading full letter content
- Share button (opens ShareModal)
- Emoji reaction picker
- Filter toggle (show sent vs archived)

### 5. Add Interactive Features

#### Letter Templates (`letterTemplates.ts`)
Create template objects with romantic, funny, and friendship themes:

```typescript
interface LetterTemplate {
  id: string;
  theme: 'romantic' | 'funny' | 'friendship';
  title: string;
  content: string; // with [RECIPIENT] and [YOUR NAME] placeholders
}
```

#### Emoji Reactions (`reactionUtils.ts`)
Implement reaction tracking with localStorage:
- Available reactions: ❤️, 😍, 🥰, 😊, 💕, ✨
- Store reactions per letter ID
- Display reaction counts on letter cards

#### Letter Card Generator (`letterCardGenerator.ts`)
Create canvas-based image generator for Instagram Stories (1080x1920):
- Draw decorative borders and pixel hearts
- Render letter content with text wrapping
- Export as PNG blob for sharing

#### Social Media Sharing (`shareUtils.ts`)
Implement sharing functions:
- **Instagram Stories**: Use Web Share API + native app intent
- **X/Twitter**: Share with pre-filled text and hashtags
- **Threads**: Open with message text
- **Email**: Generate mailto link with subject and body

### 6. Styling with Tailwind & CSS

#### Global Theme (`index.css`)
```css
/* Pixel art specific utilities */
.pixel-border { border: 4px solid var(--dark); }
.pixel-border-thick { border: 8px solid var(--dark); }
.pixel-float { animation: pixelFloat 3s ease-in-out infinite; }
.pixel-pulse { animation: pixelPulse 0.6s ease-in-out infinite; }

@keyframes pixelFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes pixelPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

#### Color Palette (OKLCH format)
```
Primary: #E63946 (Red)
Secondary: #FFB3D9 (Soft Pink)
Accent: #FF6B9D (Hot Pink)
Background: #FFF5E1 (Cream)
Dark: #2B2D42 (Charcoal)
```

### 7. Data Structure

#### Letter Interface
```typescript
interface Letter {
  id: string;
  to: string;
  from: string;
  message: string;
  date: string;
  isArchived?: boolean;
  reactions?: {
    [emoji: string]: number;
  };
}
```

Store in localStorage under `valentineLetters` key as JSON array.

## Common Customizations

### Change Theme Colors
Edit color values in `index.css` `:root` section and component files.

### Modify Letter Templates
Edit `letterTemplates.ts` to add/remove templates or change placeholder text.

### Adjust Canvas Dimensions
For different social media platforms, modify `STORY_WIDTH` and `STORY_HEIGHT` in `letterCardGenerator.ts`.

### Add More Emoji Reactions
Update the `REACTIONS` array in `reactionUtils.ts` with additional emoji strings.

## Troubleshooting

### Images Not Displaying
Ensure image URLs use the full CDN URL with query parameters. Use `manus-upload-file` to get valid CDN URLs.

### Letter Card Frame Text Overflow
Adjust `contentWidth` and line heights in `letterCardGenerator.ts`. Test with longer message content.

### Instagram Stories Sharing Not Working
Check browser support for Web Share API. Fallback downloads image and opens Instagram web on desktop.

### Reactions Not Persisting
Verify localStorage is enabled. Check browser console for storage quota errors.

## File Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── WriteLetter.tsx
│   │   └── ViewLetters.tsx
│   ├── components/
│   │   ├── LetterTemplates.tsx
│   │   ├── ShareModal.tsx
│   │   ├── ReactionPicker.tsx
│   │   └── ReactionDisplay.tsx
│   ├── lib/
│   │   ├── letterTemplates.ts
│   │   ├── letterCardGenerator.ts
│   │   ├── shareUtils.ts
│   │   ├── reactionUtils.ts
│   │   └── instagramShare.ts
│   ├── App.tsx
│   └── index.css
└── index.html
```

## Next Steps

After building the basic site, consider:

1. **Letter search/filtering**: Add search bar to find letters by name or date
2. **Letter expiration**: Set optional expiration dates (24h, 7d, etc.)
3. **Statistics dashboard**: Show total letters sent, most reacted, favorite theme
4. **Sound effects**: Add 8-bit retro sound effects for interactions
5. **Collaborative letters**: Allow multiple users to contribute to one letter
6. **Letter templates UI**: Create visual template preview gallery

## Resources

- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Web Share API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
- **Press Start 2P Font**: https://fonts.google.com/specimen/Press+Start+2P
- **Silkscreen Font**: https://fonts.google.com/specimen/Silkscreen
