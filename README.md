# API de Reservas de Citas Médicas

## Descripción

Esta es una **API construida con Node.js y Express**, conectada a una base de datos MySQL, que permite gestionar reservas de citas para un consultorio médico.  

Los usuarios pueden:  
- Registrarse y autenticarse  
- Ver sus propias citas  
- Crear, actualizar y cancelar sus citas  

El administrador puede:  
- Gestionar todo el calendario  
- Crear nuevos bloques de citas y servicios  
- Listar y administrar todas las reservas  

La API cuenta con manejo de conflictos de horarios para evitar colisiones entre usuarios que intenten reservar el mismo bloque de tiempo.

---

## Características principales

- Diseño RESTful de rutas  
- Autenticación con JWT  
- CRUD completo para reservas, usuarios y bloques de citas  
- Paginación y filtros en endpoints de listas  
- Validación de datos (express-validator o lógica propia)  
- Manejo global de errores  
- Buenas prácticas de Express  
- Persistencia en MySQL  
- Documentación mínima incluida  

---

## Requerimientos técnicos

- Node.js  
- Express.js  
- MySQL  
- Middlewares:
  - Autenticación con JWT  
  - Autorización por rol  
  - Validación de datos  
  - Manejo global de errores  
- Paginación en endpoints de listas  
- Variables de entorno (`dotenv`)  
- Encriptación de contraseñas (`bcrypt`)  
- Uso correcto de status codes HTTP (`201 Created`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, etc.)

---

## Instalación

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/reservas-citas-medicas.git

2. Entrar al directorio del proyecto:
    cd reservas-citas-medicas

3. Instalar dependencias:
    npm install

4. Configurar variables de entorno creando un archivo .env basado en .env.example:
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_datos
    JWT_SECRET=tu_secreto_jwt

5. Inicializar la base de datos MySQL y ejecutar los scripts necesarios para crear tablas (users, appointments, time_blocks, etc.)

USO
Iniciar el servidor en modo desarrollo: npm run dev

Acceder a los endpoints usando un cliente como Postman:

Ejemplos de endpoints
- Método	Ruta	Descripción
- POST	/api/auth/register	          (Registrar usuario)
- POST	/api/auth/login	             (Iniciar sesión y obtener token)
- GET	/api/users/:id/appointments	   (Obtener citas de un usuario)
- POST	/api/reservations	           (Crear una reserva)
- PUT	/api/reservations/:id	         (Actualizar una reserva)
- DELETE	/api/reservations/:id	     (Cancelar una reserva)
- GET	/api/admin/reservations	       (Listar todas las reservas (solo admin))

  
Buenas prácticas y consideraciones:

- Todos los endpoints protegidos requieren token JWT

- Validar siempre la fecha y bloque de la cita antes de insertar

- El usuario solo puede ver y manipular sus propias reservas

- El administrador tiene acceso a todas las reservas y bloques

- Manejo de errores global para respuestas consistentes

  AUTOR:
    Ing. Juan Carlos Moncada <juancarlosmoncadaomana@gmail.com>

  
   
