import { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "1ede23a0";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], "watched");

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }
    function handleCloseMovie() {
        setSelectedId(null);
    }
    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }
    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            <Navbar>
                <Search
                    query={query}
                    setQuery={setQuery}
                />
                <NumResults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}

                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetail
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
function Loader() {
    return <p className='loader'>Loading...</p>;
}

function ErrorMessage({ message }) {
    return (
        <p className='error'>
            <span>❌</span>
            {message}
        </p>
    );
}
function Navbar({ children }) {
    return (
        <nav className='nav-bar'>
            {" "}
            <Logo />
            {children}
        </nav>
    );
}

function Logo() {
    return (
        <div className='logo'>
            <span role='img'>🍿</span>
            <h1>CineRateHub</h1>
        </div>
    );
}

function Search({ query, setQuery }) {
    const inputEl = useRef(null);
    useKey("Enter", function () {
        if (document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        setQuery("");
    });
    return (
        <input
            className='search'
            type='text'
            placeholder='Search movies...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
}

function NumResults({ movies }) {
    return (
        <p className='num-results'>
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function Main({ children }) {
    return <main className='main'>{children}</main>;
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className='box '>
            <button
                className='btn-toggle'
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className='list list-movies '>
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}

function Movie({ movie, onSelectMovie }) {
    return (
        <li
            key={movie.imdbID}
            onClick={() => onSelectMovie(movie.imdbID)}
        >
            <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
            />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

    const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        imdbRating,
        Plot: plot,
        Runtime: runtime,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
        };

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useKey("Escape", onCloseMovie);

    useEffect(
        function () {
            document.title = `Movie | ${title}`;
            return function () {
                document.title = "CineRateHub";
            };
        },
        [title]
    );

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`);
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedId]
    );

    return (
        <div className='details'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button
                            className='btn-back'
                            onClick={onCloseMovie}
                        >
                            &larr;
                        </button>
                        <img
                            src={poster}
                            alt={`Poster of ${title}`}
                        />
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>🌟</span>
                                {imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>
                            {!isWatched ? (
                                <>
                                    {" "}
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className='btn-add'
                                            onClick={handleAdd}
                                        >
                                            + Add to List
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You Rated this movie : {watchedUserRating}
                                    <span>⭐</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}

function WatchedSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className='summary'>
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
    return (
        <ul className='list '>
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
}

function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <li key={movie.imdbID}>
            <img
                src={movie.poster}
                alt={`${movie.title} poster`}
            />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
            <button
                className='btn-delete'
                onClick={() => onDeleteWatched(movie.imdbID)}
            >
                ❌
            </button>
        </li>
    );
}
