import React, { useState } from 'react';
import { userApi } from '../../services/api';
import { jwtDecode } from 'jwt-decode'; // Importación con llaves
import { useNavigate, Link } from 'react-router-dom'; // Combina las importaciones de useNavigate y Link

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Agregar estado para loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga
    setError('');
    try {
      const response = await userApi.login(email, password);
      const token = response.data.token;
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const isAdmin = decodedToken.role === 'admin';

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error de autenticación, por favor intenta de nuevo.');
      }
    } finally {
      setLoading(false); // Desactivar el estado de carga cuando termine la solicitud
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-3 text-center">
          ¿No tienes cuenta? <Link to="/signup">Regístrate aquí</Link>
        </p>
        <p className="text-center">
          ¿Olvidaste tu contraseña? <Link to="/request-password-reset">Recupérala aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
