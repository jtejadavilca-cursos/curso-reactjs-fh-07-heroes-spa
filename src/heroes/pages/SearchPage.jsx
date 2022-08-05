
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string';

import { HeroCard } from '../';

import { useForm } from '../../hooks';

import { getHeroesByName } from '../';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '', selPublisher = '' } = queryString.parse( location.search );

  const heroes = getHeroesByName( q, selPublisher );

  const { searchText, publisher, onInputChange } = useForm({
    searchText: q,
    publisher: selPublisher
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    let query = searchText.trim().length === 0 ? '' : `?q=${searchText.trim()}`;
    if( publisher.length > 0 ) {
      query += query.length > 0 ? `&selPublisher=${publisher}` :  '';
    }

    navigate( query );

  }

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form aria-label="form" onSubmit={onSearchSubmit}>
            <div className="input-group mb-1">
              <input
                type="text"
                placeholder="Search a hero"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={onInputChange}
              />

              <select
                name="publisher"
                defaultValue={publisher}
                className="form-select"
                onChange={onInputChange}
              >
                <option value="">Todos</option>
                <option value="DC Comics">DC</option>
                <option value="Marvel Comics">MARVEL</option>
              </select>
            </div>
            <button type="submit" className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            (
              q.trim().length == 0
              && <div className="alert alert-primary animate__animated animate__fadeIn">Search a hero</div>
            )
          }
          {
            (
              q.trim().length > 0
              && heroes.length === 0
              && <div className="alert alert-danger animate__animated animate__fadeIn"> No hero with <b>{ q }</b> </div>
            )
          }

          {
            heroes.map( h =>  <HeroCard key={h.id} {...h} /> )
          }
        </div>
      </div>
    </>
  )
}
