import { types } from "../../../src/auth";

describe('Pruebas en Types', () => {
    test('Debe validar los types', () => {
        expect( Object.keys(types).length ).toBe(2);
        expect( types ).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout'
        });
    });
});