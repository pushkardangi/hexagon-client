# Hexagon | where prompts become pixels

A simple, fast, and reliable tool to transform your ideas into images using OpenAI's DALL·E models. Built with modern frontend tooling and designed for easy contribution.

## 🚀 Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pushkardangi/hexagon-client.git
cd hexagon-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=https://your-api-endpoint.com
```

_This is used to connect to your backend service handling image generation._

## 📂 Project Structure

```bash
src/
├── api/            # Axios API functions
├── assets/         # Static assets like preview image
├── components/     # Reusable components (Loader, Radio, Error, FormField)
├── constants/      # Constant values and remote assets
├── contexts/       # React context providers (auth, theme, etc.)
├── hooks/          # Custom React hooks
├── pages/          # Pages
├── utils/          # Helper functions (e.g., getRandomPrompt)
└── App.jsx         # Main App file
```

## 💡 Features

- Generate AI images using prompt and custom options
- Toggle between DALL·E 2 and DALL·E 3
- Adjustable model options like quality, style, and size
- Save generated images to your gallery

## 🤝 Contribution Guide

Contributions are always welcome!

### 📌 To contribute

1. Fork the repository
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: add new feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

For major changes, open an issue first to discuss the proposed update.

## 📜 Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: a new feature
- `fix`: a bug fix
- `ui`: changes to UI components or layout
- `style`: CSS, styling-only changes
- `docs`: documentation changes
- `refactor`: code refactoring (no logic change)
- `test`: adding or updating tests
- `chore`: tooling or configs (no app logic)
- `deps`: dependency updates
- `cleanup`: remove unused code or files
- `moved`: file/folder restructuring
- `typo`: grammar/spelling fixes

## 🌟 Show Your Support

If you like this project, consider giving it a ⭐ on GitHub, sharing it, or contributing!
