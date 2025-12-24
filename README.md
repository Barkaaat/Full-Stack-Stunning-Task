# ✨ Vibe Coder (Stunning Candidate Task)

A "Vibe Coding" interface that transforms rough website ideas into professional, developer-ready project briefs using AI. Built with a focus on speed, aesthetic fluidity, and immediate gratification.

![Project Preview](https://placehold.co/600x400/000000/FFF?text=Vibe+Coder+Preview)

## 🚀 Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS + Framer Motion (Animations)
* **AI Engine:** Groq API (Llama 3.3-70b Versatile) - *Chosen for ultra-low latency inference.*
* **Icons:** Lucide React

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone [https://github.com/yourusername/vibe-coder.git](https://github.com/yourusername/vibe-coder.git)
cd vibe-coder
npm install
```

### 2. Configure Environment
Create a .env.local file in the root directory and add your Groq API key:

GROQ_API_KEY=gsk_your_actual_key_here

Note: This project uses Groq for instant AI responses. You can get a free key at [console.groq.com](https://console.groq.com) 

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 to see the app.

### 💡 How it Works
Input: User enters a vague idea (e.g., "A dark portfolio for a photographer").

Process: The backend sends the prompt to Llama 3.3 via Groq with a strict system prompt to act as a Product Designer.

Output: Returns a structured Markdown brief including Color Palette, Typography, Key Features, and Tech Stack.

### ✅ Project Highlights
Real-time Feel: Optimized for speed using Groq instead of standard LLM endpoints.

Glassmorphism UI: Modern, dark-mode aesthetic consistent with "Stunning" design language.

Clean Architecture: Separation of concerns between Client UI and API logic.
