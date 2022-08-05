import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {
    test('Debe de mostrar el login si no está autenticado', () => {
        const contextValue = {logged: false}
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( screen.getByText('LoginPage') ).toBeTruthy();
    });

    test('Debe de mostrar el MarvelPage si está autenticado', () => {
        const contextValue = {logged: true, user : {id:'XYZ', name: 'JOSE TESTER'}};
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );


        expect( screen.getByText('MarvelPage') ).toBeTruthy();
        expect( screen.getByText('JOSE TESTER') ).toBeTruthy();
    });

    test('Debe de mostrar el DCPage si está autenticado', () => {
        const contextValue = {logged: true, user : {id:'XYZ', name: 'JOSE TESTER'}};
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('DCPage') ).toBeTruthy();
        expect( screen.getByText('JOSE TESTER') ).toBeTruthy();
    });
});