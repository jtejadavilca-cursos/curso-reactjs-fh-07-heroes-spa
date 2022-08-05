import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('Debe de mostrar la interfaz por default', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( screen.getByText('SearchPage') ).toBeTruthy();
        expect( screen.getByText('Searching') ).toBeTruthy();
        expect( screen.getByText('Results') ).toBeTruthy();

        expect( screen.getByRole('textbox') ).toBeTruthy();
        expect( screen.getByRole('combobox') ).toBeTruthy();
        expect( screen.getAllByRole('option').length ).toBe(3);
        expect( screen.getByRole('button') ).toBeTruthy();

        expect( screen.getByText('Search a hero') ).toBeTruthy();
        expect( container.getElementsByClassName('alert-danger').length ).toBe(0);
        expect( container.getElementsByClassName('card').length ).toBe(0);

        expect(container).toMatchSnapshot();

    });

    test('Debe de mostrar la interfaz por default al realizar la búsqueda con campo en blanco', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        const btnSearch = screen.getByRole('button');
        fireEvent.click( btnSearch );

        expect( screen.getByText('SearchPage') ).toBeTruthy();
        expect( screen.getByText('Searching') ).toBeTruthy();
        expect( screen.getByText('Results') ).toBeTruthy();

        expect( screen.getByRole('textbox') ).toBeTruthy();
        expect( screen.getByRole('combobox') ).toBeTruthy();
        expect( screen.getAllByRole('option').length ).toBe(3);
        expect( screen.getByRole('button') ).toBeTruthy();

        expect( screen.getByText('Search a hero') ).toBeTruthy();
        expect( container.getElementsByClassName('alert-danger').length ).toBe(0);
        expect( container.getElementsByClassName('card').length ).toBe(0);

    });

    test('Debe de validar que el navigate sea invocado', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        const inputSearch = screen.getByRole('textbox');
        fireEvent.change(inputSearch, {target: { value: 'xxxxsss' }});
        const btnSearch = screen.getByRole('button');
        fireEvent.click( btnSearch );

        expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=xxxxsss');

        
    });

    test('Debe de mostrar resultado al realizar la búsqueda con nombre existente', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=bat']}>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container.getElementsByClassName('alert-primary').length ).toBe(0);
        expect( container.getElementsByClassName('alert-danger').length ).toBe(0);
        expect( container.getElementsByClassName('card').length ).toBeGreaterThan(0);
        expect( screen.getAllByText('Más...').length ).toBeGreaterThan(0);

    });

    test('Debe de mostrar alerta al realizar la búsqueda con nombre inexistente', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=xsxsxsx']}>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container.getElementsByClassName('alert-primary').length ).toBe(0);
        expect( container.getElementsByClassName('alert-danger').length ).toBe(1);
        expect( container.getElementsByClassName('card').length ).toBe(0);
        expect( screen.getAllByText('No hero with').length ).toBe(1);
        expect( screen.getAllByText('xsxsxsx').length ).toBe(1);

    });
});

