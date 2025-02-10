import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, TextField, Button, MenuItem } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ username, password, role });
      // login(data);
      alert('Registro exitoso, por favor inicia sesión'); // Mostrar alerta
      navigate('/login'); // Redirige después del registro
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: 400, padding: 3, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Registrarse
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Usuario"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              select
              label="Rol"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              variant="outlined"
              required
            >
              <MenuItem value="user">Empleado</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </TextField>
            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Registrar
            </Button>
          </form>
          <Typography sx={{ mt: 2, cursor: 'pointer', color: 'white' }} onClick={handleLoginRedirect}>
            ¿Ya tienes cuenta? Inicia sesión aquí.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
