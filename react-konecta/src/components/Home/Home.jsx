import { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Container, Box } from '@mui/material';

const Empleados = lazy(() => import('../Empleados/Empleados'));
const Solicitudes = lazy(() => import('../Solicitudes/Solicitudes'));

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Usuario: {user.username} - Role: {user.role}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Container sx={{ mt: 3 }}>
        <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} centered>
          <Tab label="Empleados" />
          <Tab label="Solicitudes" />
        </Tabs>
      </Container>

      {/* Contenido */}
      <Container sx={{ mt: 3 }}>
        <Suspense fallback={<Typography>Cargando...</Typography>}>
          {activeTab === 0 && <Empleados />}
          {activeTab === 1 && <Solicitudes />}
        </Suspense>
      </Container>
    </Box>
  );
};

export default Home;
