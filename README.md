# APIWEB
Este es un proyecto en el cual se desarrolla un API

Las tecnologias a utilizar son:
-Node y Postgre 

Rutas:
Obtener incidentes: /incidents
Obtener un incidente especifico: /incidents/"id"
Crear un incidente: /incidents
Actualizar un incidente: /incidents/"id"
Eliminar un incidente: /incidents/"id"


Para poder probar el Api seguir los siguientes pasos:

Configuracion de la base de datos:

Abre PgAdmin y crea una base de datos llamada: ReportesIncidentes
Luego de eso ejecuta el codigo que se encuentra en el .sql llamado Tabla incidentes
dentro del documento .env que se encuentra en la carpeta LABAPI deberas colocar la contraseña de su server de postgre


Configuracion de 

1 dependencias: abrir la terminal y colocar "npm install express cors dotenv"
2 iniciar el servidor: npm start
3 utilizar las rutas 
4 la forma de ingresar los datos es en formato jason 

Ejemplo de post:
{
  "reporter": "nombre",
  "description": "..."
}

Ejemplo de put:
{
    "status": "en proceso"
}






