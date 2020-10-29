# GorilaCLI #
 
## Instalación ##
>``npm i -g https://github.com/RodrigoCid95/GorilaCLI.git``

## gorila new \<name\> ##
Crea un proyecto de gorila.

Entrada | Descripción
 -- | --
name | Nombre del proyecto.

## gorila build ##
Compila el proyecto y toma como salida el directorio "/dist"

### Opciones ###
Opción | Descripción
  -- | --
--prod o -p | Especifica si el proyecto se va a minificar.
--deleteOutDir o -dod | Especifica si se eliminará el directorio "/dist" antes de compilar.
 
### Ejemplo ###
``gorila build --prod -dod``

## gorila watch ##
Observa cambios el proyecto, lo compila y toma como salida el directorio "/dist"

### Ejemplo ###
``gorila watch``
