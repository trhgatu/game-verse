import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GameDetailsPage from './pages/GameDetailsPage';
import SearchPage from './pages/SearchPage';
import GenresPage from './pages/GenresPage';
import GenrePage from './pages/GenrePage';
import PopularGamesPage from './pages/PopularGamesPage';
import NewReleasesPage from './pages/NewReleasesPage';
import TopRatedPage from './pages/TopRatedPage';
import RecommendedPage from './pages/RecommendedPage';
import AllGamesPage from './pages/AllGamesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="games/:id" element={<GameDetailsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="genres" element={<GenresPage />} />
          <Route path="genres/:genreId" element={<GenrePage />} />
          <Route path="popular" element={<PopularGamesPage />} />
          <Route path="new-releases" element={<NewReleasesPage />} />
          <Route path="top-rated" element={<TopRatedPage />} />
          <Route path="recommended" element={<RecommendedPage />} />
          <Route path="all-games" element={<AllGamesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
