import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';

import { HeroCard } from './';

import { getHeroesByPublisher } from '../';

export const HeroList = ({  publisher }) => {

    const heroesData = useMemo(() => getHeroesByPublisher( publisher ), [publisher]);

    return (
        <div className='row row-cols-1 row-cols-md-2 g-3'>
            {
                heroesData
                .map( h => (
                        <HeroCard
                            key={h.id}
                            {...h}
                            />
                    )
                )
            }
        </div>
    )
}

HeroList.propTypes = {
    publisher: PropTypes.string.isRequired
}
