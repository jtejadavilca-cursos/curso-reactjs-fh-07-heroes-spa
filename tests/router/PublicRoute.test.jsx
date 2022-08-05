import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas en <PublicRoute />', () => {

    const login = jest.fn();
    const logout = jest.fn();

    test('Debe de mostrar el children si no estoy autenticado', () => {
        const contextValue = {
            logged: false
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Elemento de ruta pública debe mostrarse</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Elemento de ruta pública debe mostrarse')).toBeTruthy();
    });

    test('Debe de navegar si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Jose Test'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Elemento de ruta pública NO debe mostrarse</h1>
                            </PublicRoute>
                        } />
                        <Route path='/' element={<h1>Página Interna</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Página Interna')).toBeTruthy();
    });
});