import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FunctionalitiesCard from "./FunctionalitiesCard";
import { API_URL } from '../../services/api';

const Home = () => {
    const [apiDocsLink, setApiDocsLink] = useState('');

    // Función para obtener el link de la documentación
    useEffect(() => {
        const fetchApiDocs = async () => {
            try {
                const response = await userApi.fetchApiDocs(); // Llamada a la API
                console.log(response.data);
                setApiDocsLink(response.data); // Suponiendo que la respuesta tiene el enlace
            } catch (error) {
                console.error('Error al obtener la documentación de la API:', error);
            }
        };

        fetchApiDocs();
    }, []);

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-primary border-bottom pb-3">¡Bienvenido!</h1>
            <p>¡Hola! Mi nombre es Facu y soy el desarrollador de esta aplicación.</p>
            <p>Esta página sirve como front de prueba para mi API REST</p>

            <h2 className="text-secondary text-center mt-5">Funcionalidades</h2>
            <FunctionalitiesCard />

            <h2 className="text-secondary mt-5">Links</h2>
            <p>Enlaces de interés:</p>
            <div className="list-group">
                <a
                    href={"https://nodejs-api-gd4t.onrender.com/api-docs/"}
                    className="list-group-item list-group-item-action text-primary py-1 px-3 fs-6 mb-1 border-0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link de documentación en Swagger
                </a>
                <a
                    href="https://github.com/facumruiz/nodejs-api/tree/main"
                    className="list-group-item list-group-item-action text-primary py-1 px-3 fs-6 mb-1 border-0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link de repositorio
                </a>
            </div>

        </div>
    );
};

export default Home;
