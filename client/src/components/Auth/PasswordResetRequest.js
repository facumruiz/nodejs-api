import React, { useState } from 'react';
import { userApi } from '../../services/api'; 
import { Link } from 'react-router-dom';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga
    setMessage('');
    setError('');
    try {
      await userApi.requestPasswordReset({ email });
      setMessage('Si el correo está registrado, te enviaremos instrucciones para recuperar tu contraseña.');
    } catch (error) {
      setError('Error al solicitar la recuperación de contraseña, intenta nuevamente.');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 mt-3" 
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <p className="text-center mt-3">
          <Link to="/login" className="text-decoration-none text-primary">Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
