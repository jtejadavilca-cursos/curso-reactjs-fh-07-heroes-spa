import { heroes } from "../data/heroes"

export const getHeroById = ( id ) => {
    console.log('getHeroById << ENTER', id);
    return heroes.find( h => h.id ===id );
}


