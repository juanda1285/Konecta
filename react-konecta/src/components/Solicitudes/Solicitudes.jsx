import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { fetchSolicitudes, addSolicitud, deleteSolicitud, fetchEmpleados } from '../../api';

const Solicitudes = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [empleados, setEmpleados] = useState([]); // Estado para almacenar la lista de empleados
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSolicitud, setNewSolicitud] = useState({
    codigo: '',
    descripcion: '',
    resumen: '',
    id_empleado: '',
  });

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSolicitud({ ...newSolicitud, [name]: value });
  };

  const loadSolicitudes = async () => {
    const solicitudesObject = await fetchSolicitudes();
    setSolicitudes(solicitudesObject.data);
  };

  const loadEmpleados = async () => {
    try {
      const empleadosData = await fetchEmpleados();
      setEmpleados(empleadosData.data); // Ajusta según la estructura de la respuesta
    } catch (error) {
      console.error('Error al cargar empleados:', error);
    }
  };

  useEffect(() => {
    loadSolicitudes();
    loadEmpleados(); // Cargar empleados al montar el componente
  }, []);

  const handleAddSolicitud = async () => {
    try {
      await addSolicitud(newSolicitud);
      alert('Solicitud agregada');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      loadSolicitudes();
    }
  };

  const handleDeleteSolicitud = async (id) => {
    await deleteSolicitud(id);
    setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Solicitudes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Resumen</TableCell>
              {user.role === 'admin' && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell>{solicitud.id}</TableCell>
                <TableCell>{solicitud.codigo}</TableCell>
                <TableCell>{solicitud.descripcion}</TableCell>
                <TableCell>{solicitud.resumen}</TableCell>
                {user.role === 'admin' && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteSolicitud(solicitud.id)}
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
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={handleOpenModal}>
          Agregar Solicitud
        </Button>
      )}
      <Dialog open={modalIsOpen} onClose={handleCloseModal}>
        <DialogTitle>Agregar Solicitud</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Codigo"
            type="text"
            name="codigo"
            value={newSolicitud.codigo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Descripcion"
            type="text"
            name="descripcion"
            value={newSolicitud.descripcion}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Resumen"
            type="text"
            name="resumen"
            value={newSolicitud.resumen}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="empleado-select-label">Empleado</InputLabel>

            {empleados.length === 0 && (
              <p style={{ color: "red", fontStyle: "italic" }}>
                Primero debes registrar un empleado
              </p>
            )}
            <Select
              labelId="empleado-select-label"
              id="id_empleado"
              name="id_empleado"
              value={newSolicitud.id_empleado}
              onChange={handleInputChange}
              label="Empleado"
              disabled={empleados.length === 0}
            >
              {empleados.map((empleado) => (
                <MenuItem key={empleado.id} value={empleado.id}>
                  {empleado.nombre} (ID: {empleado.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddSolicitud} disabled={empleados.length === 0} color="primary" variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Solicitudes;