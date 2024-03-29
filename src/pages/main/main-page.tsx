import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiRoute, AppRoute } from '../../constants.ts';
import { MovieDetail } from '../../types';
import { Footer, Header, Loader, MyListButton } from '../../components';
import { api } from '../../store';
import Catalog from '../../components/catalog/catalog.tsx';


const MainPage = () => {
  const navigate = useNavigate();

  const [promo, setPromo] = useState<MovieDetail>();

  useEffect(() => {
    api.get<MovieDetail>(ApiRoute.Promo)
      .then(({ data }) => {
        setPromo(data);
      });
  }, []);

  if (!promo) {
    return <Loader />;
  }


  return (
    <React.Fragment>
      <section className="film-card" data-testid={'promo-card'}>
        <div className="film-card__bg">
          <img src={promo?.backgroundImage} alt={promo.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo?.posterImage} alt={promo.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{ promo.name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ promo.genre }</span>
                <span className="film-card__year">{ promo.released }</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player }/${ promo.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                { promo && <MyListButton movieId={promo.id} /> }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Catalog />

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default MainPage;
