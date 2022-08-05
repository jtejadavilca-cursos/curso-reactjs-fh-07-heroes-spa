import { heroes } from "../data/heroes";

export const getHeroesByName = (heroName = '', publisher = '' ) => {
    heroName = heroName.toLocaleLowerCase().trim();

    if( heroName.length == 0 ) return [];

    return heroes
            .filter( h => h.superhero.toLocaleLowerCase().includes( heroName ) )
            .filter( h => publisher === '' ? true : h.publisher === publisher );
}
