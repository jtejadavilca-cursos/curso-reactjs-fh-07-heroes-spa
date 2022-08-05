import { heroes } from  '../data/heroes';

export const getHeroesByPublisher = ( publisher ) => {
    console.log('getHeroesByPublisher << ENTER');

    const validPublisher = [ 'DC Comics', 'Marvel Comics' ];

    let heroesByPublisher = null;

    if( !validPublisher.includes( publisher ) ) {
        throw new Error(`No existe el publisher ${publisher}`);
    }

    if( !heroesByPublisher ) heroesByPublisher = heroes.filter(h => h.publisher === publisher);

    return heroesByPublisher;

}
