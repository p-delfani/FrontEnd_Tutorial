import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { getMovies } from "./api/movies";
import "./App.css";

// ========================================
// CONSTANTS
// ========================================

const FAVORITES_STORAGE_KEY = "movieapp-favorites";

// ========================================
// NAVBAR
// ========================================

function Navbar({ favoriteCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">▤</span>

        <span>
          Movie<span className="brand-accent">App</span>
        </span>
      </Link>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">⌂</span>
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">♥</span>
          Favorites

          <span className="nav-favorite-count">
            {favoriteCount}
          </span>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">ⓘ</span>
          About
        </NavLink>
      </div>
    </nav>
  );
}

// ========================================
// FAVORITE BUTTON
// ========================================

function FavoriteButton({
  movie,
  isFavorite,
  onToggle,
}) {
  return (
    <button
      type="button"
      className={`favorite-button ${
        isFavorite ? "is-favorite" : ""
      }`}
      onClick={() => onToggle(movie.id)}
      aria-label={
        isFavorite
          ? `Remove ${movie.title} from favorites`
          : `Add ${movie.title} to favorites`
      }
      aria-pressed={isFavorite}
      title={
        isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"
      }
    >
      <span aria-hidden="true">
        {isFavorite ? "♥" : "♡"}
      </span>

      <span className="favorite-button-text">
        {isFavorite ? "Favorited" : "Add to Favorites"}
      </span>
    </button>
  );
}

// ========================================
// MOVIE POSTER
// ========================================

function MoviePoster({
  src,
  alt,
  className = "",
  loading = "lazy",
}) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  if (!src || imageFailed) {
    return (
      <div
        className={`poster-fallback ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="poster-fallback-icon">🎬</span>
        <span>Poster unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setImageFailed(true)}
    />
  );
}

// ========================================
// MOVIE CARD
// ========================================

function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <article className="movie-card">
      <div className="movie-poster-container">
        <MoviePoster
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="movie-poster"
        />

        <div className="poster-overlay" />

        <FavoriteButton
          movie={movie}
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
        />

        <div className="poster-caption">
          <span className="poster-caption-label">
            STUDIO GHIBLI
          </span>

          <h3>{movie.title}</h3>
        </div>
      </div>

      <div className="movie-info">
        <p className="movie-year">
          <span aria-hidden="true">▦</span>{" "}
          {movie.year || "Year unknown"}
        </p>

        <p className="movie-description">
          {movie.description ||
            "No description available."}
        </p>

        <Link
          className="details-link"
          to={`/movie/${movie.id}`}
        >
          View details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

// ========================================
// LOADING SKELETON
// ========================================

function MovieSkeleton() {
  return (
    <article className="movie-card skeleton-card" aria-hidden="true">
      <div className="skeleton-poster skeleton-shimmer" />

      <div className="skeleton-info">
        <div className="skeleton-line skeleton-year skeleton-shimmer" />
        <div className="skeleton-line skeleton-title skeleton-shimmer" />
        <div className="skeleton-line skeleton-text skeleton-shimmer" />
        <div className="skeleton-line skeleton-text skeleton-shimmer" />
        <div className="skeleton-line skeleton-text short skeleton-shimmer" />
        <div className="skeleton-line skeleton-button skeleton-shimmer" />
      </div>
    </article>
  );
}

function LoadingSkeleton() {
  return (
    <main className="loading-page">
      <section className="loading-heading">
        <span className="details-label">PLEASE WAIT</span>
        <h1>Discovering magical stories...</h1>
        <p>We're getting the movie collection ready for you.</p>
      </section>

      <div className="movies-list skeleton-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}

// ========================================
// HOME
// ========================================

function Home({
  movies,
  favorites,
  onToggleFavorite,
}) {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Available genres

  const genres = [
    ...new Set(
      movies.flatMap((movie) =>
        movie.genre
          ? movie.genre.split(" / ").map((genre) => genre.trim())
          : []
      )
    ),
  ].filter(Boolean).sort();

  // Available release years

  const years = [
    ...new Set(
      movies
        .map((movie) => movie.year)
        .filter(
          (year) =>
            year !== null &&
            year !== undefined &&
            year !== "" &&
            Number.isFinite(Number(year))
        )
        .map(Number)
    ),
  ].sort((a, b) => b - a);

  // Search and filter

  const filteredMovies = movies.filter((movie) => {
    const normalizedSearch = search.trim().toLowerCase();

    const matchesSearch =
      (movie.title || "")
        .toLowerCase()
        .includes(normalizedSearch);

    const movieGenres = movie.genre
      ? movie.genre.split(" / ").map((genre) => genre.trim())
      : [];

    const matchesGenre =
      selectedGenre === "All" ||
      movieGenres.includes(selectedGenre);

    const matchesYear =
      selectedYear === "All" ||
      Number(movie.year) === Number(selectedYear);

    return matchesSearch && matchesGenre && matchesYear;
  });

  // Sort results

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "title-asc") {
      return (a.title || "").localeCompare(b.title || "");
    }

    if (sortBy === "title-desc") {
      return (b.title || "").localeCompare(a.title || "");
    }

    if (sortBy === "year-desc") {
      return (Number(b.year) || 0) - (Number(a.year) || 0);
    }

    if (sortBy === "year-asc") {
      return (Number(a.year) || 0) - (Number(b.year) || 0);
    }

    return 0;
  });

  // Reset filters

  function resetFilters() {
    setSearch("");
    setSelectedGenre("All");
    setSelectedYear("All");
    setSortBy("default");
  }

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedGenre !== "All" ||
    selectedYear !== "All" ||
    sortBy !== "default";

  return (
    <main className="home-page">
      {/* HERO */}

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            YOUR ANIMATION DESTINATION
          </div>

          <h1>
            Every Story
            <br />
            Has a <span>Magic.</span>
          </h1>

          <p className="hero-description">
            Step into the magical worlds of Studio Ghibli.
            Discover unforgettable stories, beautiful animation,
            and movies that stay with you forever.
          </p>

          <div className="hero-search">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              type="text"
              className="search-input"
              placeholder="Search your favorite movie..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search movies"
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="hero-tags">
            <span>✦ Studio Ghibli</span>
            <span>✦ Animated Classics</span>
            <span>✦ Magical Stories</span>
          </div>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />

          <span className="hero-sparkle sparkle-one">✦</span>
          <span className="hero-sparkle sparkle-two">✧</span>
          <span className="hero-sparkle sparkle-three">✦</span>
        </div>
      </section>

      {/* MOVIE COLLECTION */}

      <section className="movies-section">
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="genre-filter">Genre</label>

            <select
              id="genre-filter"
              className="filter-select"
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              <option value="All">All Genres</option>

              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year-filter">Release Year</label>

            <select
              id="year-filter"
              className="filter-select"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              <option value="All">All Years</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="reset-filters"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
          >
            <span aria-hidden="true">↻</span>
            Reset Filters
          </button>
        </div>

        <div className="section-heading">
          <div>
            <h2>
              {search.trim() ||
              selectedGenre !== "All" ||
              selectedYear !== "All"
                ? "Search Results"
                : "Popular Movies"}
            </h2>

            <div className="heading-underline" />
          </div>

          <div className="results-tools">
            <span className="movie-count">
              {sortedMovies.length}{" "}
              {sortedMovies.length === 1 ? "movie" : "movies"}
            </span>

            <select
              className="filter-select sort-select"
              aria-label="Sort movies"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="default">Default order</option>
              <option value="title-asc">Title: A–Z</option>
              <option value="title-desc">Title: Z–A</option>
              <option value="year-desc">Newest first</option>
              <option value="year-asc">Oldest first</option>
            </select>
          </div>
        </div>

        {sortedMovies.length === 0 ? (
          <div className="empty-message">
            <h3>No movies found</h3>

            <p>Try another title or change your filters.</p>

            <button
              type="button"
              className="reset-filters"
              onClick={resetFilters}
            >
              ↻ Clear all filters
            </button>
          </div>
        ) : (
          <div className="movies-list">
            {sortedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// ========================================
// FAVORITES
// ========================================

function Favorites({
  movies,
  favorites,
  onToggleFavorite,
}) {
  const favoriteMovies = movies.filter((movie) =>
    favorites.includes(movie.id)
  );

  return (
    <main className="favorites-page">
      <section className="favorites-heading">
        <p className="details-label">YOUR PERSONAL COLLECTION</p>

        <h1>
          My <span>Favorites</span>
        </h1>

        <p className="favorites-subtitle">
          Your favorite movies, all in one place.
        </p>
      </section>

      <section className="movies-section favorites-section">
        <div className="section-heading">
          <div>
            <h2>Saved Movies</h2>
            <div className="heading-underline" />
          </div>

          <span className="movie-count">
            {favoriteMovies.length}{" "}
            {favoriteMovies.length === 1 ? "movie" : "movies"}
          </span>
        </div>

        {favoriteMovies.length === 0 ? (
          <div className="favorites-empty">
            <span className="empty-heart">♡</span>

            <h2>No favorites yet</h2>

            <p>
              Explore the movie collection and tap the heart
              to save movies you love.
            </p>

            <Link to="/" className="back-link">
              Explore Movies →
            </Link>
          </div>
        ) : (
          <div className="movies-list">
            {favoriteMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// ========================================
// ABOUT
// ========================================

function About() {
  return (
    <main className="about-page">
      <p className="details-label">ABOUT THIS PROJECT</p>

      <h1>About MovieApp</h1>

      <p>
        Discover movies, explore their details, and find your
        next favorite movie.
      </p>

      <p>Movie information is loaded from an external API.</p>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </main>
  );
}

// ========================================
// MOVIE DETAILS
// ========================================

function MovieDetails({
  movies,
  favorites,
  onToggleFavorite,
}) {
  const { movieid } = useParams();

  const movie = movies.find(
    (item) => String(item.id) === movieid
  );

  if (!movie) {
    return (
      <main className="details-page">
        <div className="not-found">
          <p className="details-label">OOPS!</p>

          <h1>Movie Not Found</h1>

          <p>We couldn't find the movie you're looking for.</p>

          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const isFavorite = favorites.includes(movie.id);

  const hasRating =
    movie.rating !== null &&
    movie.rating !== undefined &&
    movie.rating !== "" &&
    Number.isFinite(Number(movie.rating)) &&
    Number(movie.rating) > 0;

  return (
    <main
      className="details-page"
      style={{
        "--movie-backdrop": `url("${movie.backdrop || movie.poster || ""}")`,
      }}
    >
      <div className="details-container">
        <div className="details-poster-wrapper">
          <MoviePoster
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="details-poster"
            loading="eager"
          />
        </div>

        <div className="details-content">
          <p className="details-label">MOVIE DETAILS</p>

          <h1>{movie.title}</h1>

          <div className="details-meta">
            <span className="meta-item">
              📅 {movie.year || "Year unknown"}
            </span>

            {movie.duration && (
              <span className="meta-item">
                ◷ {movie.duration}
              </span>
            )}
          </div>

          {movie.genre && (
            <div className="details-genres">
              {movie.genre
                .split(" / ")
                .map((genre) => genre.trim())
                .filter(Boolean)
                .map((genre) => (
                  <span className="genre-tag" key={genre}>
                    {genre}
                  </span>
                ))}
            </div>
          )}

          {hasRating && (
            <div className="rating">
              <span className="star">★</span>
              <strong>{Number(movie.rating).toFixed(1)}</strong>
              <span className="rating-out-of">/ 10</span>
            </div>
          )}

          <h2>About the movie</h2>

          <p className="details-description">
            {movie.description || "No description available."}
          </p>

          <div className="details-actions">
            <FavoriteButton
              movie={movie}
              isFavorite={isFavorite}
              onToggle={onToggleFavorite}
            />

            <Link to="/" className="back-link">
              <span>←</span> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// ========================================
// API STATUS
// ========================================

function ApiStatus({ error, onRetry }) {
  return (
    <main className="api-message">
      <div className="api-message-icon" aria-hidden="true">
        ⚠
      </div>

      <p className="details-label">CONNECTION ISSUE</p>

      <h2>Could not load movies</h2>

      <p className="api-error-text">
        {error || "Something went wrong while loading movies."}
      </p>

      <button
        type="button"
        className="api-retry-button"
        onClick={onRetry}
      >
        <span aria-hidden="true">↻</span>
        Try Again
      </button>
    </main>
  );
}

// ========================================
// APP
// ========================================

function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(
        FAVORITES_STORAGE_KEY
      );

      const parsedFavorites = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

      return Array.isArray(parsedFavorites)
        ? parsedFavorites
        : [];
    } catch {
      return [];
    }
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  // Save favorites

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (err) {
      console.error("Could not save favorites:", err);
    }
  }, [favorites]);

  // Fetch movies

  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      setLoading(true);
      setError("");

      try {
        const data = await getMovies();

        if (!Array.isArray(data)) {
          throw new Error("The API returned an invalid movie list.");
        }

        if (!cancelled) {
          setMovies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load movies."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  // Toggle favorites

  function toggleFavorite(movieId) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(movieId)
        ? currentFavorites.filter((id) => id !== movieId)
        : [...currentFavorites, movieId]
    );
  }

  // Retry API request

  function retryLoading() {
    setRetryCount((count) => count + 1);
  }

  return (
    <BrowserRouter>
      <Navbar favoriteCount={favorites.length} />

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ApiStatus
                error={error}
                onRetry={retryLoading}
              />
            ) : (
              <Home
                movies={movies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )
          }
        />

        <Route
          path="/favorites"
          element={
            loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ApiStatus
                error={error}
                onRetry={retryLoading}
              />
            ) : (
              <Favorites
                movies={movies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/movie/:movieid"
          element={
            loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ApiStatus
                error={error}
                onRetry={retryLoading}
              />
            ) : (
              <MovieDetails
                movies={movies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )
          }
        />

        <Route
          path="*"
          element={
            <main className="api-message">
              <div className="api-message-icon" aria-hidden="true">
                ⌕
              </div>

              <p className="details-label">404 ERROR</p>

              <h2>Page Not Found</h2>

              <p>The page you're looking for doesn't exist.</p>

              <Link to="/" className="back-link">
                ← Back to Home
              </Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
