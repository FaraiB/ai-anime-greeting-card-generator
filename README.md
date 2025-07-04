
# AI Anime Greeting Card Generator

![Greeting Card App Screenshot](https://placehold.co/800x450/E879F9/FFFFFF/png?text=AI+Anime+Greeting+Card+Generator&font=poppins)

Create unique, cute, and heartfelt anime-style greeting cards for any occasion. This app uses the Google Gemini API to generate both a custom message (with Gemini 2.5 Flash) and a beautiful image (with Imagen 3), which are then combined into a shareable, downloadable digital card.

---

## ✨ Features

- **AI-Powered Content**: Generates unique images and messages using state-of-the-art AI.
- **Multiple Occasions**: Choose from a selection of occasions like Valentine's, Birthday, Congrats, and Thank You.
- **Anime Art Style**: All generated images are created with a cute, high-quality anime aesthetic.
- **Download Your Card**: Save the final card as a high-quality JPG image to share or print.
- **Responsive Design**: Looks great on both desktop and mobile devices.
- **Development Mock Mode**: A built-in mode to use placeholder images, allowing for development and testing without incurring Imagen API costs.

---

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
  - **Text Generation**: `gemini-2.5-flash-preview-04-17`
  - **Image Generation**: `imagen-3.0-generate-002`
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🛠️ Getting Started: Local Development

Follow these instructions to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-anime-greeting-card-generator.git
    cd ai-anime-greeting-card-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project. This file is for secret keys and is ignored by Git.

    ```bash
    touch .env.local
    ```

    Open `.env.local` and add your Google Gemini API key:
    ```
    VITE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```

    **Important:** The Imagen 3 model requires your Google Cloud project to have a billing account enabled. See the section below on "Mock Image Mode" for a development workaround.


4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

---

### 🖼️ Using Mock Image Mode (Recommended for Development)

To avoid API costs during development or if your account is not yet enabled for Imagen, you can use the built-in mock mode. This will replace the Imagen API call with a placeholder image.

To enable it, add the following line to your `.env.local` file:
```
# .env.local

VITE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
VITE_USE_MOCK_IMAGES=true
```
A banner will appear at the top of the app to remind you that mock mode is active.

---

## 🌐 Deployment to Vercel

This project is pre-configured for seamless deployment to Vercel.

1.  **Push your code** to a Git repository (e.g., on GitHub).
2.  **Create a new project** on Vercel and import your repository.
3.  **Configure Environment Variables**: In your Vercel project settings, navigate to `Settings` -> `Environment Variables`. Add your Gemini API key:
    - **Key**: `VITE_API_KEY`
    - **Value**: `YOUR_GEMINI_API_KEY_HERE`
4.  **Deploy!** Vercel will automatically use the `vercel.json` and `package.json` configurations to build and deploy your site.

---

## 📂 Project Structure

```
/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable React components
│   │   ├── CardDisplay.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── OccasionSelector.tsx
│   ├── services/         # API interaction logic
│   │   └── geminiService.ts
│   ├── App.tsx           # Main application component
│   ├── constants.tsx     # Global constants (e.g., occasion data)
│   ├── index.tsx         # App entry point
│   └── types.ts          # TypeScript type definitions
├── .env.local            # Local environment variables (not committed)
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.js        # Vite build configuration
```
