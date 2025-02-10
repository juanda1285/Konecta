import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchEmpleados, addEmpleado, deleteEmpleado } from '../../api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Empleados = () => {
  const { user } = useAuth();
  const [empleados, setEmpleados] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEmpleado, setNewEmpleado] = useState({
    fecha_ingreso: '',
    nombre: '',
    salario: 0,
  });

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmpleado({ ...newEmpleado, [name]: value });
  };

  const loadEmpleados = async () => {
    const empleadosObject = await fetchEmpleados();
    setEmpleados(empleadosObject.data);
  };

  useEffect(() => {
    loadEmpleados();
  }, []);

  const handleAddEmpleado = async () => {
    try {
      await addEmpleado(newEmpleado);
     
      handleCloseModal();
    } catch (error) {
      console.error('Error adding employee:', error);
    }finally{
      loadEmpleados();  
    }
  };

  const handleDeleteEmpleado = async (id) => {
    try {
      // Suponiendo que tienes una API para eliminar empleados
      await deleteEmpleado(id);
      alert('Empleado eliminado');
    } catch (error) {
      console.error('Error deleting employee:', id);
    }finally{
      loadEmpleados();  
    }
  };

  return (
    <div>
      <h1>Empleados</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Salario</TableCell>
              <TableCell>Fecha de Ingreso</TableCell>
              {user.role === 'admin' && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.salario}</TableCell>
                <TableCell>
                  {new Date(empleado.fecha_ingreso).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </TableCell>
                {user.role === 'admin' && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteEmpleado(empleado.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {user.role === 'admin' && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          style={{ marginTop: '10px' }}
        >
          Agregar Empleado
        </Button>
      )}

      <Dialog open={modalIsOpen} onClose={handleCloseModal}>
        <DialogTitle>Agregar Empleado</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Fecha Ingreso"
            type="date"
            name="fecha_ingreso"
            InputLabelProps={{ shrink: true }}
            value={newEmpleado.fecha_ingreso}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Nombre"
            type="text"
            name="nombre"
            value={newEmpleado.nombre}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Salario"
            type="number"
            name="salario"
            value={newEmpleado.salario}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddEmpleado} color="primary" variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Empleados;