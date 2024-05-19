# Personal Website

Welcome to the repository for my personal website! This site showcases some of the projects I've built throughout my career, a blog section with articles I've written, and details about my work experience. The site is built with modern web technologies including TypeScript, Next.js, React, TailwindCSS, and Vercel for CI/CD.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Features

- **Project Portfolio**: A comprehensive list of all my projects with detailed descriptions and links.
- **Blog**: Articles and tutorials on various web development topics.
- **Work Experience**: A timeline of my professional journey and roles.

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (v20.x or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jpsanantonio/jayvicsanantonio.dev.git
   ```

2. Navigate to the project directory:

   ```bash
   cd jayvicsanantonio.dev
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see your website in action.

## Deployment

The website is automatically deployed on [Vercel](https://vercel.com/). Every push to the main branch triggers a deployment. To manually deploy, follow these steps:

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Run the deployment command:

   ```bash
   vercel
   ```

## Project Structure

```plaintext
├── public          # Static files
├── src
│   ├── components  # React components
│   ├── pages       # Next.js pages
│   ├── styles      # TailwindCSS styles
│   ├── utils       # Utility functions
│   └── data        # Data files (projects, blog posts, etc.)
├── .eslintrc.json  # ESLint configuration
├── .prettierrc     # Prettier configuration
├── tailwind.config.js # TailwindCSS configuration
├── next.config.js  # Next.js configuration
└── tsconfig.json   # TypeScript configuration
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or create a pull request.

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out to me at [jayvicsanantonio@gmail.com](mailto:jayvicsanantonio@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/jayvicsanantonio/).

---

Thank you for visiting my personal website repository!
