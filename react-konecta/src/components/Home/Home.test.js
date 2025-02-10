import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'jest';
import jest from 'jest-mock';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Home from './Home';

jest.mock('../Empleados/Empleados', () => <div>Componente Empleados</div>);
jest.mock('../Solicitudes/Solicitudes', () => <div>Componente Solicitudes</div>);

describe('Home Component', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(useNavigate, 'mockReturnValue').mockReturnValue(mockNavigate);
  });

  const renderHome = (role = 'admin') => {
    render(
      <AuthContext.Provider value={{ user: { username: 'testuser', role }, logout: mockLogout }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  test('Debe mostrar el usuario y rol en el navbar', () => {
    renderHome();
    expect(screen.getByText(/Usuario: testuser - Role: admin/i)).toBeInTheDocument();
  });

  test('Debe cambiar entre pestañas y mostrar el contenido correspondiente', () => {
    renderHome();

    // Verificar que se carga "Empleados" por defecto
    expect(screen.getByText('Componente Empleados')).toBeInTheDocument();
    expect(screen.queryByText('Componente Solicitudes')).not.toBeInTheDocument();

    // Cambiar a la pestaña "Solicitudes"
    fireEvent.click(screen.getByText('Solicitudes'));

    // Verificar que se muestra "Solicitudes" y no "Empleados"
    expect(screen.getByText('Componente Solicitudes')).toBeInTheDocument();
    expect(screen.queryByText('Componente Empleados')).not.toBeInTheDocument();
  });

  test('Debe llamar a logout y redirigir al usuario al hacer clic en "Cerrar sesión"', () => {
    renderHome();

    fireEvent.click(screen.getByText('Cerrar sesión'));

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('Debe mostrar el texto "Cargando..." antes de cargar los componentes', () => {
    renderHome();
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });
});
