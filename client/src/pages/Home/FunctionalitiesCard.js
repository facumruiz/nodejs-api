import React, { useState } from 'react';
import { Link } from "react-router-dom";

import parte1 from "../../assets/parte1.webm";
import parte2 from "../../assets/parte2.webm";
import parte3 from "../../assets/parte3.webm";
import recupero from "../../assets/recuperocontraseña.webm";

import "./FunctionalitiesCard.css"; // Archivo CSS para estilos personalizados

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
                        <video className="video-large img-fluid mb-3" autoPlay loop muted>
                            <source src={parte1} type="video/webm" />
                            Tu navegador no soporta videos WebM.
                        </video>
                        <p className="card-text">Envio de mail para confirmar registro</p>
                        <video className="video-large img-fluid mb-3" autoPlay loop muted>
                            <source src={parte2} type="video/webm" />
                            Tu navegador no soporta videos WebM.
                        </video>
                        <div>
                        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                        <Link to="/signup" className="btn btn-primary mx-2">Signup</Link>
                        </div>
                    </>
                )}
                {activeTab === "roles" && (
                    <>
                        <p className="card-text">Operaciones relacionadas con la recuperación de contraseñas. Permite a los usuarios solicitar un enlace para restablecer su contraseña en caso de olvido.</p>
                        <video className="video-large img-fluid mb-3" autoPlay loop muted>
                            <source src={recupero} type="video/webm" />
                            Tu navegador no soporta videos WebM.
                        </video>
                        <div>

                        <Link to="/request-password-reset" className="btn btn-primary">Ir a Recuperar Contraseña</Link>
                        </div>
                    </>
                )}
                {activeTab === "configuracion" && (
                    <>
                        <p className="card-text">Operaciones relacionadas con la gestión de los usuarios, incluyendo la creación, obtención, actualización y eliminación de cuentas.</p>
                        <video className="video-large img-fluid mb-3" autoPlay loop muted>
                            <source src={parte3} type="video/webm" />
                            Tu navegador no soporta videos WebM.
                        </video>
                        <div>
                        <Link to="/admin" className="btn btn-primary">Ir a Panel Admin</Link>
                        </div>
                       
                    </>
                )}
            </div>
        </div>
    );
};

export default FunctionalitiesCard;
