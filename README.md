# GameVerse

GameVerse is a modern, responsive web application for exploring video games. Built with a cyberpunk aesthetic, it offers an immersive experience for gamers to discover, search, and browse games across different genres and categories.

![GameVerse Screenshot](https://via.placeholder.com/1200x600/0a0a0a/06b6d4?text=GameVerse)

## Features

- **Cyberpunk UI**: Modern, responsive interface with a cyberpunk aesthetic
- **Game Discovery**: Browse popular, new releases, and top-rated games
- **Genre Exploration**: Explore games by genre with pagination support
- **Game Details**: View comprehensive information about each game
- **Search Functionality**: Find games by title or keywords
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Live Demo

[View Live Demo](https://game-verse-demo.netlify.app) (Replace with your actual deployment URL)

## Tech Stack

- **Frontend**:
  - React 19
  - TypeScript
  - Vite
  - React Router v7
  - Framer Motion (animations)
  - Zustand (state management)
  - Tailwind CSS (styling)
  - Radix UI (accessible components)

- **API**:
  - [RAWG Video Games Database API](https://rawg.io/apidocs)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/game-verse.git
   cd game-verse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your RAWG API key:
   ```
   VITE_API_KEY=your_rawg_api_key
   ```
   You can get an API key by registering at [RAWG](https://rawg.io/apidocs).

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
game-verse/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, and other assets
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions and helpers
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Key Pages

- **Home**: Featured games, trending titles, and category navigation
- **Game Details**: Comprehensive information about a specific game
- **Genre Pages**: Browse games by genre with pagination
- **Search Results**: Find games by title or keywords
- **Category Pages**: Popular games, new releases, top-rated games

## Components

- **GameCard**: Displays a game with its cover, title, and rating
- **GameGrid**: Displays games in a responsive grid or carousel
- **GamePagination**: Pagination component for browsing large game collections
- **HeroBanner**: Featured games showcase with interactive elements
- **GameHero**: Detailed hero section for individual game pages

## State Management

The application uses Zustand for state management, with the following main stores:
- **gameStore**: Manages game data, filtering, and API requests

## API Integration

GameVerse uses the RAWG Video Games Database API to fetch game data. API calls are handled through the `game-service.ts` service.

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Linting

```bash
npm run lint
# or
yarn lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [RAWG API](https://rawg.io/apidocs) for providing the game data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
