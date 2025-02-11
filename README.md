# README - Proyecto Konecta

## Descripción del Proyecto
Este proyecto es una aplicación web para gestionar empleados y solicitudes, con funcionalidades CRUD, autenticación basada en roles y un enfoque en la seguridad y el rendimiento. La aplicación está compuesta por:

- **Backend**: API REST desarrollada con Node.js y Express, utilizando Sequelize como ORM para interactuar con una base de datos PostgreSQL.
- **Frontend**: Aplicación de una sola página (SPA) desarrollada con React, utilizando Context API para el manejo del estado global y Lazy Loading para optimizar la carga de componentes.
- **Base de Datos**: PostgreSQL para almacenar la información.
- **Autenticación**: JWT (JSON Web Tokens) con roles diferenciados (admin, usuario).
- **Docker**: Configuración para dockerizar la aplicación y facilitar su despliegue.

---

## Requisitos de Instalación

### Requisitos Previos
- **Docker**: Versión 20 o superior.  
- **Docker Compose**: Versión 1.29 o superior.  
- **Node.js**: Versión 16 o superior.
- **PostgreSQL**: Versión 13 o superior.  

---

## Pasos para Ejecutar el Proyecto con Docker Compose  

### 1. Clonar el Repositorio
```sh
git clone https://github.com/juanda1285/Konecta.git  
cd Konecta 
```  
2. Configurar el Entorno  
 -  Actualizar el archivo .env del backend con los datos necesarios(Opcional)

3. Ejecutar Docker Compose
 - Construir y levantar los contenedores:

Ejecutar
```sh
docker-compose up --build
```   
- Espera a que todos los servicios estén en funcionamiento. Verás mensajes en la terminal indicando que el backend, el frontend y la base de datos están listos.

4. Acceder a la Aplicación
- Frontend: Abre tu navegador y visita http://localhost:3000.

- Backend: La API estará disponible en http://localhost:3001.

## Estructura del Proyecto
- **nodejs-konecta/**: Contiene el código del backend (Node.js + Express + Sequelize).

- **react-konecta/**: Contiene el código del frontend (React).

- **docker-compose.yml**: Configuración de Docker Compose para levantar los servicios.

- **estructura.sql**: Script SQL para crear la estructura de la base de datos (opcional, si no usas migraciones).

 ## Mejores Prácticas
- **Backend**:
- Uso de Sequelize: Se utilizó Sequelize como ORM para evitar SQL Injection y facilitar la interacción con la base de datos.
- Async/Await: Todas las operaciones asincrónicas se manejaron con async/await para mejorar la legibilidad del código..

 - **Frontend**:
- Context API: Se utilizó Context API para el manejo del estado global, evitando el prop drilling y mejorando la escalabilidad.  
- Lazy Loading: Se aplicó Lazy Loading para optimizar la carga de componentes y mejorar el rendimiento.  
- Componentes Funcionales y Hooks: Se desarrollaron componentes funcionales utilizando hooks como useState, useEffect y useContext.  

- **Seguridad**:
- JWT: Se implementó autenticación JWT con roles diferenciados (admin, usuario) para controlar el acceso a la aplicación.

- Protección contra SQL Injection: Se utilizaron consultas parametrizadas a través de Sequelize.

- Protección contra XSS: Se sanitizaron las entradas del usuario y se escaparon los datos antes de renderizarlos en el frontend.

**Autenticación y Autorización**

-  Roles Diferenciados: Se implementaron roles (admin, usuario) para controlar el acceso a las funcionalidades de la aplicación.

**Protección de Datos**
- Encriptación: Las contraseñas de los usuarios se almacenan encriptadas utilizando bcrypt.

- CORS: Se configuró CORS para permitir solicitudes solo desde el frontend.

**Protección contra Ataques Comunes**
- SQL Injection: Se evitó mediante el uso de consultas parametrizadas con Sequelize.

- XSS: Se sanitizaron las entradas del usuario y se escaparon los datos antes de renderizarlos.

**Pruebas**
- Backend: Pruebas unitarias y de integración con Jest y Supertest.

 - Frontend: Pruebas básicas con React Testing Library(Bug).
