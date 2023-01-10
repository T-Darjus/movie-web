import React, { useState, useEffect } from "react";
import axios from "axios";
import "./movies.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import Pagination from "../pagination/Pagination";

interface MovieList {
  id: number;
  poster: string;
  title: string;
  length: string;
  year: string;
  date_added: string;
}

const Movies: React.FC = () => {
  const [movieList, setMovieList] = useState<MovieList[]>([]);
  const [titleSort, setTitleSort] = useState(false);

  const signinState = useSelector((state: State) => state.signedIn);
  const currentPage = useSelector((state: State) => state.currentPage);

  const dispatch = useDispatch();
  const { signedIn, pageTotal } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const getMovies = async () => {
      const token = localStorage.getItem("token");

      await axios
        .get<MovieList[]>("http://localhost:3000/movies", {
          headers: {
            Authorization: "Bearer " + token,
          },
          responseType: "json",
        })
        .then((response) => {
          setMovieList([...response.data]);
        })
        .catch((err) => console.log(err));
    };
    getMovies();
  }, []);

  pageTotal(Math.ceil(movieList.length / 3));

  const sortListTitle = () => {
    setTitleSort((prevTitleSort) => !prevTitleSort);
  };

  useEffect(() => {
    titleSort
      ? setMovieList(
          [...movieList].sort((a, b) => a.title.localeCompare(b.title))
        )
      : setMovieList(
          [...movieList].sort((a, b) => b.title.localeCompare(a.title))
        );
    // eslint-disable-next-line
  }, [titleSort]);

  const showList = movieList.slice((currentPage - 1) * 3, currentPage * 3);

  const handleSignOut = () => {
    signedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <>
      {signinState ? (
        <div className="main-container">
          <div className="movie__container">
            <div className="movie__header">
              <h2>Welcome</h2>
              <button onClick={handleSignOut} className="btn-signout">
                Sign out
              </button>
            </div>
            <h1>Movie list</h1>
            <div className="movie__sort grid-4">
              <p>Cover</p>
              <p onClick={sortListTitle}>Title </p>
              <p>Length</p>
              <p>Year</p>
            </div>
            <ul className="movie__list">
              {showList.map((movie, index) => {
                return (
                  <li className="movie__item grid-4" key={index}>
                    <img src={movie.poster} alt="random" />
                    <h4>{movie.title}</h4>
                    <p>{movie.length}</p>
                    <p>{movie.year}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pagination">
            <Pagination />
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div className="movie__container">
            <h2>Please log in to see this content</h2>
            <button onClick={handleSignOut} className="btn-signout">
              Go to sign in page.
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Movies;
