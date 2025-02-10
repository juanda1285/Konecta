import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach } from 'jest';
import jest from 'jest-mock';
import Empleados from "../Empleados";
import { useAuth } from "../../context/AuthContext";
import { fetchEmpleados, addEmpleado, deleteEmpleado } from "../../api";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn()
}));

jest.mock("../../api", () => ({
  fetchEmpleados: jest.fn(),
  addEmpleado: jest.fn(),
  deleteEmpleado: jest.fn()
}));

describe("Empleados Component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: { role: "admin" } });
    fetchEmpleados.mockResolvedValue({ data: [{ id: 1, nombre: "Juan", salario: 5000, fecha_ingreso: "2023-01-01" }] });
  });

  test("Renderiza correctamente la tabla de empleados", async () => {
    render(<Empleados />);
    await waitFor(() => {
      expect(screen.getByText("Juan")).toBeInTheDocument();
      expect(screen.getByText("5000")).toBeInTheDocument();
    });
  });

  test("Abre y cierra el modal de agregar empleado", () => {
    render(<Empleados />);
    fireEvent.click(screen.getByText("Agregar Empleado"));
    expect(screen.getByText("Agregar Empleado")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancelar"));
    expect(screen.queryByText("Agregar Empleado")).not.toBeInTheDocument();
  });

  test("Agrega un nuevo empleado", async () => {
    addEmpleado.mockResolvedValue({});
    render(<Empleados />);
    fireEvent.click(screen.getByText("Agregar Empleado"));
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Pedro" } });
    fireEvent.change(screen.getByLabelText("Salario"), { target: { value: "6000" } });
    fireEvent.click(screen.getByText("Agregar"));
    await waitFor(() => expect(addEmpleado).toHaveBeenCalled());
  });

  test("Elimina un empleado", async () => {
    deleteEmpleado.mockResolvedValue({});
    render(<Empleados />);
    await waitFor(() => {
      expect(screen.getByText("Juan")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Eliminar"));
    await waitFor(() => expect(deleteEmpleado).toHaveBeenCalledWith(1));
  });
});
