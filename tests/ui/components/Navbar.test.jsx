import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    });
    
    const contextValue = {
        logged: true,
        user : {
            id:'XYZ',
            name: 'JOSE TESTER'
        },
        logout: jest.fn()
    };

    test('Debe de mostrar el navbar por default', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('JOSE TESTER') ).toBeTruthy();
        expect( screen.getByRole('button', {name: 'Logout'}) ).toBeTruthy()

    });

    test('Debe de ejecutar el onLogout al dar click en el botón logout', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('JOSE TESTER') ).toBeTruthy();
        expect( screen.getByRole('button', {name: 'Logout'}) ).toBeTruthy()

        const btnLogout = screen.getByRole('button', {name: 'Logout'});
        fireEvent.click(btnLogout);

        expect( contextValue.logout ).toHaveBeenCalledTimes(1);
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { replace: true });

    });
});