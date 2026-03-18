# Aria Solano — Architecture Portfolio

A premium, immersive architecture portfolio built with Next.js, TypeScript, GSAP, Three.js, and Tailwind CSS.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **GSAP** (ScrollTrigger, timelines, parallax)
- **Three.js** (WebGL architectural scene)
- **Tailwind CSS**
- **Lenis** (smooth scrolling)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

## Features

- 🏗️ **WebGL Three.js Scene** — Procedurally generated architectural cityscape with real-time lighting, fog, and mouse parallax
- ✨ **GSAP Animations** — SplitText headline reveals, scroll-triggered stagger effects, parallax on all sections
- 🔄 **Horizontal Scroll Projects** — Pinned horizontal scroll section with 5 project cards using GSAP ScrollTrigger
- 🎯 **Custom Cursor** — Dot + follower with expansion on interactive elements
- 📜 **Lenis Smooth Scroll** — Buttery smooth scrolling with configurable easing
- 📐 **Blueprint Aesthetic** — Grid overlays, structural corner brackets, coordinate labels
- 📱 **Fully Responsive** — Mobile-first with reduced animation intensity on touch devices
- 🎨 **Premium Typography** — Cormorant Garamond (display) + Outfit (body) + Space Mono (labels)

## Customisation

### Change Architect Info
Edit `src/components/about/About.tsx` — update name, bio, and specializations.

### Update Projects
Edit `src/components/projects/Projects.tsx` — update the `projects` array with real project data and replace SVG visuals with actual images.

### Replace Portrait
In `About.tsx`, replace the inline SVG with an `<Image>` component pointing to `/public/portrait.jpg`.

### Update Contact Details
Edit `src/components/contact/Contact.tsx` — update email, phone, and studio location.

### Color Scheme
Edit `src/app/globals.css` CSS variables and `tailwind.config.ts` to adjust the color palette.

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles, CSS variables, animations
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page (assembles all sections)
├── components/
│   ├── hero/
│   │   ├── Hero.tsx       # Fullscreen hero with GSAP text reveal
│   │   └── WebGLScene.tsx # Three.js architectural cityscape
│   ├── about/
│   │   └── About.tsx      # About section with portrait + bio
│   ├── projects/
│   │   └── Projects.tsx   # Horizontal scroll project showcase
│   ├── skills/
│   │   └── Skills.tsx     # Blueprint bar skill charts
│   ├── education/
│   │   └── Education.tsx  # Animated timeline
│   ├── services/
│   │   └── Services.tsx   # Service cards with hover depth
│   ├── contact/
│   │   └── Contact.tsx    # Contact form with conversion UX
│   └── ui/
│       ├── CustomCursor.tsx
│       ├── Navbar.tsx
│       ├── SmoothScroll.tsx
│       └── Footer.tsx
├── hooks/
│   └── useScrollAnimation.ts
└── lib/
    └── SplitText.ts       # Lightweight text splitting utility
```

## License

Built for portfolio use. All rights reserved.
