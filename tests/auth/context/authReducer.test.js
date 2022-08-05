import { authReducer, types } from '../../../src/auth';

describe('Pruebas en authReducer', () => {

    const initialState = { logged: false };
    
    test('Debe de retornar el estado por defecto', () => {
        const newState = authReducer( initialState, {} );
        
        expect( newState ).toBe( initialState );
    });
    
    test('Debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Jose Test'
            }
        };
        const { logged, user } = authReducer( initialState, action );
        
        expect( logged ).toBeTruthy();
        expect( user ).toBeTruthy();
        expect( user.id ).toBe( '123' );
        expect( user.name ).toBe('Jose Test');

    });

    test('Debe de (logout) borrar el name del usuario y logged en false', () => {
        const loggedState = {
            logged: true,
            user: {
                id: '123',
                name: 'Name Test'
            }
        }
        const action = {
            type: types.logout
        };

        const { logged, user } = authReducer( loggedState, action );

        expect( logged ).toBeFalsy();
        expect( user ).toBeUndefined();
    });
});