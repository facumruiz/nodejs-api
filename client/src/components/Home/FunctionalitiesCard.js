import React, { useState } from 'react';
import { Link } from "react-router-dom";

const FunctionalitiesCard = () => {
    const [activeTab, setActiveTab] = useState("usuarios");

    return (
        <div className="card text-center border-0">
            <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs justify-content-center">
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === "usuarios" ? "active" : ""}`} href="#" onClick={() => setActiveTab("usuarios")}>Login & Auth</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === "roles" ? "active" : ""}`} href="#" onClick={() => setActiveTab("roles")}>Password Recovery</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === "configuracion" ? "active" : ""}`} href="#" onClick={() => setActiveTab("configuracion")}>User Management</a>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                {activeTab === "usuarios" && (
                    <>

                        <p className="card-text">Operaciones relacionadas con la autenticación de los usuarios, permitiendo la validación de las credenciales y el acceso a la API mediante un token JWT.</p>
                        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                        <Link to="/signup" className="btn btn-primary mx-2">Signup</Link>

                    </>
                )}
                {activeTab === "roles" && (
                    <>

                        <p className="card-text">Operaciones relacionadas con la recuperación de contraseñas. Permite a los usuarios solicitar un enlace para restablecer su contraseña en caso de olvido, y también restablecerla al recibir un token único.</p>
                        <Link to="/request-password-reset" className="btn btn-primary">Ir a Recuperar Contraseña</Link>
                    </>
                )}
                {activeTab === "configuracion" && (
                    <>

                        <p className="card-text">Operaciones relacionadas con la gestión de los usuarios, incluyendo la creación, obtención, actualización, eliminación y confirmación del correo electrónico.</p>
                        <Link to="/admin" className="btn btn-primary">Ir a Panel Admin</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default FunctionalitiesCard;
