import { Genre } from '../../types';
import React from 'react';
import { useAppDispatch, useTypedSelector } from '../../hooks/use-typed-selector.ts';
import { changeGenre } from '../../store/movies/movies.slice.ts';


export const GenresList = () => {
  const dispatch = useAppDispatch();
  const { genres, selectedGenre } = useTypedSelector((state) => state.movies);

  const handleGenreClick = (e: React.MouseEvent<HTMLAnchorElement>, genre: Genre) => {
    e.preventDefault();
    dispatch(changeGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      { genres.map((genre) => (
        <li key={genre.id} className={`catalog__genres-item ${ genre.title === selectedGenre.title ? 'catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link" onClick={(e) => handleGenreClick(e, genre)}>{ genre.title }</a>
        </li>
      )) }
    </ul>
  );
};
