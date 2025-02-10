import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({ username, password });
      const userData = JSON.parse(atob(token.split('.')[1]));
      login({ ...userData, token });
      alert('Login exitoso'); // Mostrar alerta
      navigate('/home');
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error en el login: Usuario o contraseña incorrectos'); // Mostrar alerta
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: 400, padding: 3, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Iniciar sesión
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
            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Iniciar sesión
            </Button>
          </form>
          <Typography sx={{ mt: 2, cursor: 'pointer', color: 'white' }} onClick={handleRegisterRedirect}>
            ¿No tienes cuenta? Regístrate aquí.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
