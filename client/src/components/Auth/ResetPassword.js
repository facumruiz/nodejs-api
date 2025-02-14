import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Obtiene el token desde la URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Estado para loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Activar el estado de carga

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false); // Desactivar el estado de carga
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5050/user/reset-password/${token}`, { newPassword });
      setSuccess(response.data.message);

      // Redirecciona a la página de login después de unos segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al restablecer la contraseña. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Restablecer Contraseña</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Ingresa tu nueva contraseña"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirmar Nueva Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirma tu nueva contraseña"
            />
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}

          <button 
            type="submit" 
            className="btn btn-primary w-100 mt-3" 
            disabled={loading}
          >
            {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
