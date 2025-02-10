-- Crear la tabla Empleados
CREATE TABLE public."Empleados" (
    id SERIAL PRIMARY KEY,
    fecha_ingreso TIMESTAMP WITH TIME ZONE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    salario INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Crear la tabla Solicitudes
CREATE TABLE public."Solicitudes" (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    resumen VARCHAR(255) NOT NULL,
    id_empleado INTEGER NOT NULL,
    FOREIGN KEY (id_empleado) REFERENCES public."Empleados"(id)
);

-- Crear la tabla Users
CREATE TABLE public."Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);